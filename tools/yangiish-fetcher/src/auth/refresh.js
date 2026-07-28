import { config } from "../config.js";
import { requestJson } from "../http.js";

/**
 * Pull a JWT out of a response body without assuming the exact envelope —
 * Laravel APIs wrap payloads inconsistently, and the real shape has not been
 * confirmed against the live portal yet.
 */
export function extractToken(payload) {
  const candidates = [
    payload?.token,
    payload?.access_token,
    payload?.data?.token,
    payload?.data?.access_token,
    payload?.data?.data?.token,
    payload?.result?.token,
  ];

  return candidates.find((value) => typeof value === "string" && value.split(".").length === 3) || null;
}

/**
 * `tymon/jwt-auth` (which this backend uses — see the `prv` claim) issues short
 * access tokens but accepts a recently-expired one for refresh, within a much
 * longer refresh window. That is what lets a single E-IMZO login cover weeks of
 * scheduled runs.
 *
 * The exact path is unconfirmed, so we probe the configured candidates once and
 * let the caller remember whichever answered.
 */
export async function refreshToken(oldToken, { knownPath } = {}) {
  if (!oldToken) return null;

  const paths = knownPath ? [knownPath, ...config.refreshPaths.filter((p) => p !== knownPath)] : config.refreshPaths;
  const failures = [];

  for (const path of paths) {
    const url = `${config.baseUrl}${path}`;

    try {
      const payload = await requestJson(url, {
        method: "POST",
        headers: {
          authorization: `Bearer ${oldToken}`,
          accept: "application/json",
          "content-type": "application/json",
        },
        body: "{}",
        // A wrong candidate path should fail fast rather than burn the full
        // retry budget on every 404 in the list.
        retries: knownPath === path ? config.retries : 0,
      });

      const token = extractToken(payload);
      if (token) return { token, path };

      failures.push(`${path}: 200 but no token in response`);
    } catch (error) {
      failures.push(`${path}: ${error.message.slice(0, 120)}`);
    }
  }

  const detail = failures.map((f) => `\n    - ${f}`).join("");
  throw new Error(`No refresh endpoint accepted the token.${detail}`);
}
