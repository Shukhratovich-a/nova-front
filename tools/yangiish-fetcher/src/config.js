import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const TOOL_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Minimal .env reader. Deliberately dependency-free: this tool has to run on a
 * bare machine (and possibly offline), so pulling in dotenv is not worth it.
 * Values already present in the real environment always win.
 */
function loadEnvFile(file) {
  if (!fs.existsSync(file)) return;

  for (const raw of fs.readFileSync(file, "utf8").split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;

    const eq = line.indexOf("=");
    if (eq === -1) continue;

    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (process.env[key] === undefined) process.env[key] = value;
  }
}

loadEnvFile(path.join(TOOL_DIR, ".env"));

const num = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const stripTrailingSlash = (url) => url.replace(/\/+$/, "");

export const config = {
  baseUrl: stripTrailingSlash(process.env.YANGIISH_BASE_URL || "https://yangiish.mehnat.uz"),
  seedToken: (process.env.YANGIISH_TOKEN || "").replace(/^Bearer\s+/i, "").trim(),
  year: process.env.YANGIISH_YEAR || String(new Date().getFullYear()),
  limit: num(process.env.YANGIISH_LIMIT, 200),
  concurrency: num(process.env.YANGIISH_CONCURRENCY, 2),
  outDir: path.resolve(TOOL_DIR, process.env.YANGIISH_OUT_DIR || "./data"),
  sort: process.env.YANGIISH_SORT || "id asc",
  refreshPaths: (
    process.env.YANGIISH_REFRESH_PATHS ||
    "/api/api/v1/refresh,/api/api/v1/auth/refresh,/api/api/v1/esi-auth/refresh"
  )
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean),
  timeoutMs: num(process.env.YANGIISH_TIMEOUT_MS, 60_000),
  retries: num(process.env.YANGIISH_RETRIES, 4),
  // Overridable so several accounts (or several test runs) can coexist without
  // trampling each other's session.
  tokenFile: path.resolve(TOOL_DIR, process.env.YANGIISH_TOKEN_FILE || ".token.json"),
  /** Refresh this long before the token actually expires. */
  expiryMarginMs: 5 * 60 * 1000,
};
