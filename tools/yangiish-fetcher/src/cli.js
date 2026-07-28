#!/usr/bin/env node
import { config } from "./config.js";
import { ENDPOINT_KEYS, resolveKeys } from "./endpoints.js";
import { createClient } from "./client.js";
import { collect } from "./paginate.js";
import { writeJson } from "./output.js";
import { AuthError } from "./auth/index.js";
import * as store from "./token-store.js";

const EXIT_OK = 0;
const EXIT_FETCH_FAILED = 1;
const EXIT_AUTH_FAILED = 2;

function parseArgs(argv) {
  const args = { flags: new Set(), values: {} };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;

    const [name, inline] = arg.slice(2).split("=");
    const next = argv[i + 1];

    if (inline !== undefined) {
      args.values[name] = inline;
    } else if (next && !next.startsWith("--")) {
      args.values[name] = next;
      i++;
    } else {
      args.flags.add(name);
    }
  }

  return args;
}

function usage() {
  return `
yangiish-fetch — pull datasets from ${config.baseUrl}

Usage:
  node src/cli.js [options]

Options:
  --only a,b        Fetch only these endpoints (default: all)
                    Available: ${ENDPOINT_KEYS.join(", ")}
  --year 2026       Reporting year                      (default: ${config.year})
  --limit 200       Records per request                 (default: ${config.limit})
  --sort "id asc"   Sort order                          (default: ${config.sort})
  --out ./data      Output directory                    (default: ${config.outDir})
  --max-pages 1     Stop after N pages per endpoint — useful as a smoke test
  --concurrency 2   Endpoints fetched in parallel       (default: ${config.concurrency})
  --check-token     Report token status and exit
  --quiet           Only print warnings and errors
  --help            Show this message

Exit codes: 0 ok, 1 fetch failure, 2 authentication needs your attention.
`.trimStart();
}

/** Run tasks with a bounded number in flight. */
async function pooled(items, size, worker) {
  const results = new Array(items.length);
  let cursor = 0;

  const runners = Array.from({ length: Math.max(1, Math.min(size, items.length)) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index]);
    }
  });

  await Promise.all(runners);
  return results;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.flags.has("help")) {
    process.stdout.write(usage());
    return EXIT_OK;
  }

  const quiet = args.flags.has("quiet");
  const log = (message) => {
    if (!quiet) console.log(message);
  };

  if (args.flags.has("check-token")) {
    const cached = store.read();
    const token = cached?.token || config.seedToken;

    console.log(`Cached:  ${cached?.token ? store.describe(cached.token) : "none"}`);
    console.log(`Seed:    ${config.seedToken ? store.describe(config.seedToken) : "none (YANGIISH_TOKEN unset)"}`);
    console.log(`Refresh: ${cached?.refreshPath || "not yet discovered"}`);

    return token && store.isUsable(token) ? EXIT_OK : EXIT_AUTH_FAILED;
  }

  const keys = resolveKeys(args.values.only);
  const outDir = args.values.out ?? config.outDir;
  const options = {
    year: args.values.year ?? config.year,
    limit: args.values.limit ? Number(args.values.limit) : config.limit,
    sort: args.values.sort ?? config.sort,
    maxPages: args.values["max-pages"] ? Number(args.values["max-pages"]) : Infinity,
    log,
  };

  const client = createClient({ log });

  // Authenticate before touching any endpoint, so a stale token fails once and
  // clearly instead of six times in parallel.
  await client.ensureToken();

  log(`Fetching ${keys.length} dataset(s) for year ${options.year} into ${outDir}`);

  const concurrency = args.values.concurrency ? Number(args.values.concurrency) : config.concurrency;
  const started = Date.now();

  const results = await pooled(keys, concurrency, async (key) => {
    try {
      const result = await collect(key, client, options);
      const file = await writeJson(outDir, result.endpoint.out, result.records);
      log(`  ${key}: wrote ${result.records.length} records -> ${file}`);
      return { ...result, ok: true };
    } catch (error) {
      console.error(`  ${key}: FAILED — ${error.message}`);
      return { key, ok: false, error };
    }
  });

  const warnings = results.flatMap((r) => r.warnings ?? []);
  for (const warning of warnings) console.warn(`WARNING: ${warning}`);

  const failed = results.filter((r) => !r.ok);
  const total = results.filter((r) => r.ok).reduce((sum, r) => sum + r.records.length, 0);
  const seconds = ((Date.now() - started) / 1000).toFixed(1);

  log(`Done in ${seconds}s — ${total} records across ${results.length - failed.length}/${results.length} dataset(s)`);

  if (failed.length) {
    // An auth failure that survived the in-run retry is the operator's problem,
    // not a transient one — report it distinctly so a scheduler can alert.
    if (failed.some((f) => f.error instanceof AuthError)) return EXIT_AUTH_FAILED;
    return EXIT_FETCH_FAILED;
  }

  return EXIT_OK;
}

main()
  .then((code) => process.exit(code))
  .catch((error) => {
    if (error instanceof AuthError) {
      console.error(`\nAuthentication failed.\n\n${error.message}\n`);
      process.exit(EXIT_AUTH_FAILED);
    }
    console.error(`\nFatal: ${error.message}\n`);
    process.exit(EXIT_FETCH_FAILED);
  });
