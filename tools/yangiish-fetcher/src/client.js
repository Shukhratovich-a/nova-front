import { requestJson, HttpError } from "./http.js";
import { getToken } from "./auth/index.js";

/**
 * An authenticated JSON client. Holds one token for the whole run and, on a
 * single 401, re-authenticates once and retries. Once — never in a loop: if the
 * fresh token is also rejected, the problem is not staleness and hammering the
 * auth endpoint will not fix it.
 */
export function createClient({ log = () => {} } = {}) {
  let token = null;
  let reauthenticated = false;

  async function ensureToken() {
    if (!token) token = await getToken({ log });
    return token;
  }

  async function getJson(url) {
    const bearer = await ensureToken();

    try {
      return await requestJson(url, {
        headers: { authorization: `Bearer ${bearer}`, accept: "application/json" },
      });
    } catch (error) {
      const unauthorized = error instanceof HttpError && (error.status === 401 || error.status === 403);
      if (!unauthorized || reauthenticated) throw error;

      log(`Got ${error.status}; re-authenticating once and retrying...`);
      reauthenticated = true;
      token = await getToken({ force: true, log });

      return requestJson(url, {
        headers: { authorization: `Bearer ${token}`, accept: "application/json" },
      });
    }
  }

  return { getJson, ensureToken };
}
