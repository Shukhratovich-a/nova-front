import { config } from "./config.js";

export class HttpError extends Error {
  constructor(status, url, body) {
    super(`HTTP ${status} for ${url}${body ? ` — ${String(body).slice(0, 300)}` : ""}`);
    this.name = "HttpError";
    this.status = status;
    this.url = url;
    this.body = body;
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const RETRYABLE_STATUS = new Set([408, 425, 429, 500, 502, 503, 504]);

/**
 * `fetch` with a timeout and exponential backoff. Retries transport errors and
 * transient server statuses; 4xx other than 429 fail immediately, since
 * retrying a rejected request just annoys the server.
 */
export async function request(url, { method = "GET", headers = {}, body, retries = config.retries } = {}) {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt > 0) {
      const backoff = Math.min(2 ** (attempt - 1) * 1000, 16_000);
      const jitter = Math.floor(Math.random() * 250);
      await sleep(backoff + jitter);
    }

    let response;
    try {
      response = await fetch(url, {
        method,
        headers,
        body,
        signal: AbortSignal.timeout(config.timeoutMs),
      });
    } catch (error) {
      lastError = error;
      continue;
    }

    if (response.ok) return response;

    const text = await response.text().catch(() => "");
    lastError = new HttpError(response.status, url, text);

    if (!RETRYABLE_STATUS.has(response.status)) throw lastError;
  }

  throw lastError;
}

/**
 * The portal answers with JSON on success but can answer with an HTML error
 * page (proxy timeouts, auth redirects). Surfacing that as "unexpected token
 * <" helps nobody, so we detect it here.
 */
export async function requestJson(url, options) {
  const response = await request(url, options);
  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(
      `Expected JSON from ${url} but got ${response.headers.get("content-type") || "unknown content type"}: ` +
        `${text.slice(0, 200)}`
    );
  }
}
