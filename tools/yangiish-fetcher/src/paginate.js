import { config } from "./config.js";
import { ENDPOINTS } from "./endpoints.js";

/**
 * Normalise the paged envelope. The portal returns
 * `{ data: { data: [...], total, limit } }`, but tolerate a couple of common
 * variations rather than throwing on a shape we half-expected.
 */
export function unwrapPage(payload, url) {
  const envelope = payload?.data ?? payload;
  const rows = Array.isArray(envelope?.data) ? envelope.data : Array.isArray(envelope) ? envelope : null;

  if (!rows) {
    // The original script destructured straight into `data.total` here, so an
    // expired token surfaced as a bewildering TypeError. Be explicit instead.
    throw new Error(
      `Unexpected response shape from ${url}. Expected { data: { data: [...], total } }, got keys: ` +
        `${payload && typeof payload === "object" ? Object.keys(payload).join(", ") || "(none)" : typeof payload}`
    );
  }

  const total = Number(envelope?.total);

  return {
    rows,
    total: Number.isFinite(total) ? total : null,
    limit: Number(envelope?.limit) || null,
  };
}

function buildUrl(endpoint, { page, limit, year, sort }) {
  const url = new URL(`${config.baseUrl}${endpoint.path}`);

  const params = {
    page: String(page),
    limit: String(limit),
    total: "0",
    ...endpoint.query,
    year: String(year),
    sort,
  };

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  return url.toString();
}

/**
 * Walk every page of one endpoint and return the collected records.
 *
 * Pages are fetched sequentially: the page count is only known after the first
 * response, and firing concurrent requests at a government API for no real gain
 * is a good way to get rate-limited.
 */
export async function collect(key, client, options = {}) {
  const endpoint = ENDPOINTS[key];
  const limit = options.limit ?? config.limit;
  const year = options.year ?? config.year;
  const sort = options.sort ?? config.sort;
  const maxPages = options.maxPages ?? Infinity;
  const log = options.log ?? (() => {});

  const seen = new Set();
  const records = [];
  const warnings = [];

  let totalPages = 1;
  let reportedTotal = null;

  for (let page = 1; page <= totalPages && page <= maxPages; page++) {
    const url = buildUrl(endpoint, { page, limit, year, sort });
    const payload = await client.getJson(url);
    const { rows, total, limit: serverLimit } = unwrapPage(payload, url);

    if (page === 1) {
      reportedTotal = total;
      const effectiveLimit = serverLimit || limit;
      totalPages = total !== null ? Math.max(1, Math.ceil(total / effectiveLimit)) : 1;
      log(`  ${key}: ${total ?? "?"} records across ${totalPages} page(s) at limit ${effectiveLimit}`);
    }

    // An empty page means we have run past the end regardless of what `total`
    // claimed — stop rather than requesting the remaining pages for nothing.
    if (rows.length === 0) break;

    for (const row of rows) {
      // Paging over a table that is being written to can hand back the same row
      // twice. Dedupe on id; rows without one are kept as-is.
      const id = row?.id;
      if (id === undefined || id === null) {
        records.push(row);
        continue;
      }
      if (seen.has(id)) continue;
      seen.add(id);
      records.push(row);
    }
  }

  if (reportedTotal !== null && maxPages === Infinity && records.length !== reportedTotal) {
    warnings.push(
      `${key}: collected ${records.length} records but the API reported ${reportedTotal}. ` +
        `This usually means rows were inserted or removed mid-run.`
    );
  }

  return { key, endpoint, records, reportedTotal, warnings };
}
