/**
 * E-IMZO login — not implemented yet, deliberately.
 *
 * What it would take, and why it is a second phase rather than the first:
 *
 *   - E-IMZO is a desktop application. It exposes a local WebSocket at
 *     ws://127.0.0.1:64646/service/cryptapi, so only a machine with E-IMZO
 *     installed and running can sign at all. A headless server cannot.
 *
 *   - The app gates callers by an API key bound to the requesting origin, so
 *     the practical approach is to serve a small page from http://localhost
 *     and drive the standard e-imzo-client.js flow:
 *         install() -> listAllUserKeys() -> loadKey() -> createPkcs7(id, challenge)
 *     then POST the PKCS#7 to /api/v1/esi-auth and keep the returned JWT.
 *
 *   - loadKey() opens a NATIVE password dialog owned by the E-IMZO app. Browser
 *     automation cannot type into it. So even when built, this is an *assisted*
 *     login — one password entry from a human, roughly once per refresh window —
 *     not a fully unattended one.
 *
 *   - Truly unattended login would mean signing directly from the DSKEYS/*.pfx
 *     file with the key password sitting in config. That is a real
 *     secret-handling decision, not an implementation detail, and should not be
 *     taken without an explicit go-ahead.
 *
 * Until the request/response shape of /api/v1/esi-auth is captured from a real
 * login (DevTools -> Save all as HAR), anything written here would be guesswork.
 */

export function eimzoLoginHint() {
  return (
    `Automatic E-IMZO login is not wired up (see src/auth/eimzo.js for why).\n` +
    `Because the backend uses tymon/jwt-auth, one manual login normally covers\n` +
    `weeks of scheduled runs — the token is renewed automatically before each\n` +
    `4-hour expiry, so you should only need to do this occasionally.`
  );
}

export async function loginWithEimzo() {
  throw new Error(eimzoLoginHint());
}
