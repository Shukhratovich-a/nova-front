import { config } from "../config.js";
import * as store from "../token-store.js";
import { refreshToken } from "./refresh.js";
import { eimzoLoginHint } from "./eimzo.js";

export class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthError";
  }
}

function seedInstructions(reason) {
  return (
    `${reason}\n\n` +
    `To get going again:\n` +
    `  1. Open ${config.baseUrl} in a browser and log in with E-IMZO.\n` +
    `  2. DevTools -> Network -> pick any /api/ request -> copy the\n` +
    `     'authorization' header value, without the leading "Bearer ".\n` +
    `  3. Put it in tools/yangiish-fetcher/.env as YANGIISH_TOKEN=...\n` +
    `     (or delete .token.json and re-run with the new value).\n\n` +
    eimzoLoginHint()
  );
}

/**
 * Returns a usable bearer token, trying the cheapest source first:
 *
 *   1. the cached token, if it still has life left in it
 *   2. a refresh of the cached token — the step that makes unattended runs work
 *   3. the seed token from .env, for a first run or after the refresh window lapsed
 *   4. a refresh of the seed token, in case it too is stale but refreshable
 *
 * `force` skips step 1, which is how a 401 mid-run gets a second chance.
 */
export async function getToken({ force = false, log = () => {} } = {}) {
  const cached = store.read();

  if (!force && cached?.token && store.isUsable(cached.token)) {
    log(`Using cached token (${store.describe(cached.token)})`);
    return cached.token;
  }

  if (cached?.token) {
    log(`Cached token needs renewal (${store.describe(cached.token)}); refreshing...`);
    try {
      const { token, path } = await refreshToken(cached.token, { knownPath: cached.refreshPath });
      store.write({ token, refreshPath: path });
      log(`Refreshed via ${path} (${store.describe(token)})`);
      return token;
    } catch (error) {
      log(`Refresh failed: ${error.message}`);
    }
  }

  if (config.seedToken) {
    if (store.isUsable(config.seedToken)) {
      log(`Using seed token from .env (${store.describe(config.seedToken)})`);
      store.write({ token: config.seedToken, refreshPath: cached?.refreshPath ?? null });
      return config.seedToken;
    }

    log(`Seed token from .env is stale (${store.describe(config.seedToken)}); trying to refresh it...`);
    try {
      const { token, path } = await refreshToken(config.seedToken, { knownPath: cached?.refreshPath });
      store.write({ token, refreshPath: path });
      log(`Refreshed via ${path} (${store.describe(token)})`);
      return token;
    } catch (error) {
      log(`Refresh of seed token failed: ${error.message}`);
    }
  }

  throw new AuthError(
    seedInstructions(
      config.seedToken || cached?.token
        ? "The stored session has expired and could not be refreshed."
        : "No token available — nothing in .token.json and YANGIISH_TOKEN is unset."
    )
  );
}
