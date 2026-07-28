import fs from "node:fs";
import path from "node:path";
import { config } from "./config.js";

/**
 * Decode a JWT payload without verifying it. We cannot verify — the signing
 * secret lives on the server — but the `exp` claim is still the cheapest way
 * to know whether a request is worth making at all.
 */
export function decodeJwt(token) {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

export function expiresAt(token) {
  const payload = decodeJwt(token);
  return payload?.exp ? new Date(payload.exp * 1000) : null;
}

/** Valid for at least `marginMs` beyond now. Tokens without `exp` are trusted. */
export function isUsable(token, marginMs = config.expiryMarginMs) {
  if (!token) return false;
  const exp = expiresAt(token);
  if (!exp) return true;
  return exp.getTime() - Date.now() > marginMs;
}

export function describe(token) {
  if (!token) return "no token";

  const payload = decodeJwt(token);
  if (!payload?.exp) return "token present (no expiry claim)";

  const exp = new Date(payload.exp * 1000);
  const minutes = Math.round((exp.getTime() - Date.now()) / 60_000);
  const state = minutes > 0 ? `expires in ${minutes} min` : `expired ${Math.abs(minutes)} min ago`;

  return `subject ${payload.sub ?? "?"}, ${state} (${exp.toISOString()})`;
}

export function read() {
  try {
    return JSON.parse(fs.readFileSync(config.tokenFile, "utf8"));
  } catch {
    return null;
  }
}

/**
 * Written atomically and owner-only — this file is a live session credential.
 * `refreshPath` caches whichever refresh URL actually worked, so later runs
 * do not re-probe the candidate list.
 */
export function write({ token, refreshPath }) {
  const previous = read();
  const record = {
    token,
    refreshPath: refreshPath ?? previous?.refreshPath ?? null,
    savedAt: new Date().toISOString(),
    expiresAt: expiresAt(token)?.toISOString() ?? null,
  };

  fs.mkdirSync(path.dirname(config.tokenFile), { recursive: true });

  const tmp = `${config.tokenFile}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(record, null, 2), { mode: 0o600 });
  fs.renameSync(tmp, config.tokenFile);

  return record;
}
