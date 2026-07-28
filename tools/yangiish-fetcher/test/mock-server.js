/**
 * A stand-in for yangiish.mehnat.uz, used to verify the fetcher offline.
 *
 * It mimics the parts that matter: the `{ data: { data, total, limit } }`
 * envelope, tymon/jwt-auth style short-lived tokens that can be refreshed after
 * expiry, 401s on stale tokens, and a transient 500 to exercise retry.
 */
import http from "node:http";
import crypto from "node:crypto";

const SECRET = "mock-secret";
const ACCESS_TTL_SECONDS = 4 * 60 * 60;
const REFRESH_WINDOW_SECONDS = 14 * 24 * 60 * 60;

const DATASETS = {
  "/api/api/v2/get-employees": 45,
  "/api/api/v2/get-yatts": 7,
  "/api/api/v2/income/employees": 130,
  "/api/api/v2/income/self-employeds": 0,
  "/api/api/v2/income/farmers": 23,
  "/api/api/v2/income/persons": 12,
};

const base64url = (input) => Buffer.from(input).toString("base64url");

export function mintToken({ ageSeconds = 0, sub = 3532 } = {}) {
  const now = Math.floor(Date.now() / 1000) - ageSeconds;
  const header = base64url(JSON.stringify({ typ: "JWT", alg: "HS256" }));
  const payload = base64url(
    JSON.stringify({
      iss: "http://mock/api/v1/esi-auth",
      iat: now,
      exp: now + ACCESS_TTL_SECONDS,
      nbf: now,
      jti: crypto.randomBytes(8).toString("hex"),
      sub,
      prv: "mock",
    })
  );
  const signature = crypto.createHmac("sha256", SECRET).update(`${header}.${payload}`).digest("base64url");

  return `${header}.${payload}.${signature}`;
}

function verify(token, { allowExpired = false } = {}) {
  if (!token) return { ok: false, reason: "missing" };

  const [header, payload, signature] = token.split(".");
  if (!header || !payload || !signature) return { ok: false, reason: "malformed" };

  const expected = crypto.createHmac("sha256", SECRET).update(`${header}.${payload}`).digest("base64url");
  if (expected !== signature) return { ok: false, reason: "bad signature" };

  const claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  const now = Math.floor(Date.now() / 1000);

  if (claims.exp < now) {
    if (!allowExpired) return { ok: false, reason: "expired" };
    // tymon/jwt-auth accepts a recently expired token for refresh only.
    if (claims.iat + REFRESH_WINDOW_SECONDS < now) return { ok: false, reason: "outside refresh window" };
  }

  return { ok: true, claims };
}

function makeRecord(path, id) {
  return {
    id,
    pinfl: String(30000000000000 + id),
    full_name: `Test Person ${id}`,
    source: path,
    created_at: new Date(Date.UTC(2026, 0, 1 + (id % 28))).toISOString(),
  };
}

export function createServer({ scenario = {} } = {}) {
  const stats = { refreshCalls: 0, requests: 0, byPath: {}, unauthorized: 0 };
  const alreadyFailed = new Set();

  const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");
    const send = (status, body) => {
      res.writeHead(status, { "content-type": "application/json" });
      res.end(JSON.stringify(body));
    };

    stats.requests++;
    stats.byPath[url.pathname] = (stats.byPath[url.pathname] || 0) + 1;

    if (url.pathname === "/__stats") return send(200, stats);

    const auth = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");

    // Only one refresh path answers; the others 404, exactly like the real
    // candidate-probing situation the client has to cope with.
    if (url.pathname === "/api/api/v1/refresh") {
      stats.refreshCalls++;
      const result = verify(auth, { allowExpired: true });
      if (!result.ok) return send(401, { message: `refresh rejected: ${result.reason}` });
      return send(200, { data: { token: mintToken({ sub: result.claims.sub }) } });
    }

    if (url.pathname.startsWith("/api/api/v1/")) {
      return send(404, { message: "Not Found" });
    }

    if (!(url.pathname in DATASETS)) return send(404, { message: "Not Found" });

    // Serve a 401 once, on demand, to exercise the mid-run re-auth path.
    if (scenario.unauthorizedOnce && !alreadyFailed.has("401")) {
      alreadyFailed.add("401");
      stats.unauthorized++;
      return send(401, { message: "Token has expired" });
    }

    const result = verify(auth);
    if (!result.ok) {
      stats.unauthorized++;
      return send(401, { message: `Unauthorized: ${result.reason}` });
    }

    if (scenario.flakyPath === url.pathname && !alreadyFailed.has("500")) {
      alreadyFailed.add("500");
      return send(500, { message: "Internal Server Error" });
    }

    const total = DATASETS[url.pathname];
    const limit = Math.max(1, Number(url.searchParams.get("limit")) || 20);
    const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
    const start = (page - 1) * limit;

    const rows = [];
    for (let i = start; i < Math.min(start + limit, total); i++) {
      rows.push(makeRecord(url.pathname, i + 1));
    }

    return send(200, { data: { data: rows, total, limit, page } });
  });

  return { server, stats };
}

// Standalone mode: `npm run mock`. Prints the port it bound to so callers do
// not have to guess a free one.
if (import.meta.url === `file://${process.argv[1]}`) {
  const { server } = createServer({ scenario: { flakyPath: "/api/api/v2/income/farmers" } });
  server.listen(Number(process.env.PORT) || 8787, "127.0.0.1", () => {
    const { port } = server.address();
    console.log(`LISTENING ${port}`);
    console.log(`Seed token: ${mintToken()}`);
  });
}
