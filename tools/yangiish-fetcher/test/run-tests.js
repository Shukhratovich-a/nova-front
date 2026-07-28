/**
 * End-to-end checks against the local mock. No network access required, so this
 * runs anywhere — including CI and this repo's sandbox.
 *
 * Each case starts a fresh mock, a fresh temp output dir and a fresh token
 * cache, then runs the real CLI as a subprocess and asserts on files + exit code.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createServer, mintToken } from "./mock-server.js";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CLI = path.join(HERE, "..", "src", "cli.js");

let passed = 0;
let failed = 0;

function listen(scenario) {
  const { server, stats } = createServer({ scenario });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      resolve({ server, stats, baseUrl: `http://127.0.0.1:${server.address().port}` });
    });
  });
}

function runCli(args, env) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [CLI, ...args], {
      env: {
        ...process.env,
        YANGIISH_TOKEN: "",
        YANGIISH_REFRESH_PATHS: "/api/api/v1/refresh,/api/api/v1/auth/refresh",
        YANGIISH_RETRIES: "3",
        YANGIISH_TIMEOUT_MS: "5000",
        ...env,
      },
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (d) => (stdout += d));
    child.stderr.on("data", (d) => (stderr += d));
    child.on("close", (code) => resolve({ code, stdout, stderr }));
  });
}

function sandbox() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "yangiish-test-"));
  return {
    dir,
    out: path.join(dir, "data"),
    // Redirect the token cache into the sandbox so cases cannot leak into
    // each other or clobber a real .token.json.
    env: {
      YANGIISH_OUT_DIR: path.join(dir, "data"),
      YANGIISH_TOKEN_FILE: path.join(dir, "token.json"),
    },
    cleanup: () => fs.rmSync(dir, { recursive: true, force: true }),
  };
}

async function test(name, fn) {
  try {
    await fn();
    console.log(`  ok  ${name}`);
    passed++;
  } catch (error) {
    console.error(`  FAIL ${name}\n       ${error.message}`);
    failed++;
  }
}

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));

console.log("yangiish-fetcher tests\n");

// ---------------------------------------------------------------- happy path
await test("fetches all six datasets, dedupes, and matches reported totals", async () => {
  const { server, baseUrl } = await listen({});
  const box = sandbox();

  try {
    const { code, stdout, stderr } = await runCli([], {
      ...box.env,
      YANGIISH_BASE_URL: baseUrl,
      YANGIISH_TOKEN: mintToken(),
      YANGIISH_LIMIT: "20",
    });

    assert.equal(code, 0, `expected exit 0, got ${code}\n${stdout}\n${stderr}`);

    const expected = {
      "doimiy.json": 45,
      "yatts.json": 7,
      "income.json": 130,
      "self.json": 0,
      "farmers.json": 23,
      "persons.json": 12,
    };

    for (const [file, count] of Object.entries(expected)) {
      const records = readJson(path.join(box.out, file));
      assert.equal(records.length, count, `${file}: expected ${count} records, got ${records.length}`);

      const ids = records.map((r) => r.id);
      assert.equal(new Set(ids).size, ids.length, `${file}: duplicate ids present`);
    }

    assert.ok(!stderr.includes("WARNING"), `unexpected warning: ${stderr}`);
  } finally {
    server.close();
    box.cleanup();
  }
});

// ------------------------------------------------------------------- pagination
await test("paginates correctly when total is an exact multiple of limit", async () => {
  const { server, baseUrl } = await listen({});
  const box = sandbox();

  try {
    // income has 130 records; limit 13 -> exactly 10 pages, no partial last page.
    const { code } = await runCli(["--only", "income", "--limit", "13"], {
      ...box.env,
      YANGIISH_BASE_URL: baseUrl,
      YANGIISH_TOKEN: mintToken(),
    });

    assert.equal(code, 0);
    assert.equal(readJson(path.join(box.out, "income.json")).length, 130);
  } finally {
    server.close();
    box.cleanup();
  }
});

await test("--max-pages stops early", async () => {
  const { server, baseUrl } = await listen({});
  const box = sandbox();

  try {
    const { code } = await runCli(["--only", "income", "--limit", "10", "--max-pages", "2"], {
      ...box.env,
      YANGIISH_BASE_URL: baseUrl,
      YANGIISH_TOKEN: mintToken(),
    });

    assert.equal(code, 0);
    assert.equal(readJson(path.join(box.out, "income.json")).length, 20);
  } finally {
    server.close();
    box.cleanup();
  }
});

await test("an empty dataset yields an empty array, not a failure", async () => {
  const { server, baseUrl } = await listen({});
  const box = sandbox();

  try {
    const { code } = await runCli(["--only", "selfEmployed"], {
      ...box.env,
      YANGIISH_BASE_URL: baseUrl,
      YANGIISH_TOKEN: mintToken(),
    });

    assert.equal(code, 0);
    assert.deepEqual(readJson(path.join(box.out, "self.json")), []);
  } finally {
    server.close();
    box.cleanup();
  }
});

// ------------------------------------------------------------------------ retry
await test("retries a transient 500 and still succeeds", async () => {
  const { server, baseUrl } = await listen({ flakyPath: "/api/api/v2/income/farmers" });
  const box = sandbox();

  try {
    const { code, stdout, stderr } = await runCli(["--only", "farmers"], {
      ...box.env,
      YANGIISH_BASE_URL: baseUrl,
      YANGIISH_TOKEN: mintToken(),
    });

    assert.equal(code, 0, `expected recovery from 500\n${stdout}\n${stderr}`);
    assert.equal(readJson(path.join(box.out, "farmers.json")).length, 23);
  } finally {
    server.close();
    box.cleanup();
  }
});

// ------------------------------------------------------------------------- auth
await test("refreshes an expired token exactly once and proceeds", async () => {
  const { server, stats, baseUrl } = await listen({});
  const box = sandbox();

  try {
    const { code, stdout, stderr } = await runCli(["--only", "yatts"], {
      ...box.env,
      YANGIISH_BASE_URL: baseUrl,
      // Expired 10 minutes ago: unusable as-is, still inside the refresh window.
      YANGIISH_TOKEN: mintToken({ ageSeconds: 4 * 60 * 60 + 600 }),
    });

    assert.equal(code, 0, `expected refresh to rescue the run\n${stdout}\n${stderr}`);
    assert.equal(stats.refreshCalls, 1, `expected exactly 1 refresh, got ${stats.refreshCalls}`);
    assert.equal(readJson(path.join(box.out, "yatts.json")).length, 7);
  } finally {
    server.close();
    box.cleanup();
  }
});

await test("recovers from a mid-run 401 with a single re-auth", async () => {
  const { server, stats, baseUrl } = await listen({ unauthorizedOnce: true });
  const box = sandbox();

  try {
    const { code, stdout, stderr } = await runCli(["--only", "persons"], {
      ...box.env,
      YANGIISH_BASE_URL: baseUrl,
      YANGIISH_TOKEN: mintToken(),
    });

    assert.equal(code, 0, `expected recovery from 401\n${stdout}\n${stderr}`);
    assert.equal(stats.unauthorized, 1);
    assert.equal(readJson(path.join(box.out, "persons.json")).length, 12);
  } finally {
    server.close();
    box.cleanup();
  }
});

await test("exits 2 with actionable guidance when no token is available", async () => {
  const { server, baseUrl } = await listen({});
  const box = sandbox();

  try {
    const { code, stderr } = await runCli(["--only", "yatts"], {
      ...box.env,
      YANGIISH_BASE_URL: baseUrl,
      YANGIISH_TOKEN: "",
    });

    assert.equal(code, 2, "expected the dedicated auth exit code");
    assert.match(stderr, /log in with E-IMZO/i);
  } finally {
    server.close();
    box.cleanup();
  }
});

await test("--check-token reports status and exits 2 when unusable", async () => {
  const box = sandbox();

  try {
    const usable = await runCli(["--check-token"], { ...box.env, YANGIISH_TOKEN: mintToken() });
    assert.equal(usable.code, 0);
    assert.match(usable.stdout, /expires in \d+ min/);

    const stale = await runCli(["--check-token"], {
      ...box.env,
      YANGIISH_TOKEN: mintToken({ ageSeconds: 5 * 60 * 60 }),
    });
    assert.equal(stale.code, 2);
    assert.match(stale.stdout, /expired \d+ min ago/);
  } finally {
    box.cleanup();
  }
});

// ------------------------------------------------------------------ diagnostics
await test("reports a clear error for an unknown endpoint name", async () => {
  const box = sandbox();

  try {
    const { code, stderr } = await runCli(["--only", "nosuchthing"], {
      ...box.env,
      YANGIISH_TOKEN: mintToken(),
    });

    assert.equal(code, 1);
    assert.match(stderr, /Unknown endpoint/);
  } finally {
    box.cleanup();
  }
});

await test("persons endpoint sends a valid sort value", async () => {
  // Guards the `sort=id+descc` typo carried in the original script.
  const { ENDPOINTS } = await import("../src/endpoints.js");
  for (const [key, endpoint] of Object.entries(ENDPOINTS)) {
    assert.ok(!JSON.stringify(endpoint).includes("descc"), `${key} still carries the descc typo`);
  }
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
