# yangiish-fetcher

Pulls the six datasets from `yangiish.mehnat.uz` into JSON files, on a schedule,
without a human pasting a fresh token every four hours.

Zero runtime dependencies — Node 20+ only. It does not touch the Next.js app.

```
node src/cli.js                  # all six datasets -> ./data
node src/cli.js --only employees # just one
node src/cli.js --check-token    # is the session still good?
node src/cli.js --help
npm test                         # offline tests against a local mock
```

## Datasets

| Key | Endpoint | Output |
|---|---|---|
| `employees` | `/api/api/v2/get-employees` | `doimiy.json` |
| `yatts` | `/api/api/v2/get-yatts` | `yatts.json` |
| `income` | `/api/api/v2/income/employees` | `income.json` |
| `selfEmployed` | `/api/api/v2/income/self-employeds` | `self.json` |
| `farmers` | `/api/api/v2/income/farmers` | `farmers.json` |
| `persons` | `/api/api/v2/income/persons` | `persons.json` |

## Setup

```bash
cp .env.example .env
```

Then seed a token once:

1. Log in to the portal with E-IMZO in a browser.
2. DevTools → Network → click any `/api/` request → copy the `authorization`
   header value, **without** the leading `Bearer `.
3. Paste it into `.env` as `YANGIISH_TOKEN=…`.
4. `node src/cli.js --check-token` to confirm it is live.

## How the "auto" part works

The portal's access token lasts **4 hours** — too short to schedule around. But
the backend runs Laravel with `tymon/jwt-auth` (visible in the token's `prv`
claim), whose refresh window is much longer than the access window, typically two
weeks.

So each run:

1. reads the cached token from `.token.json`;
2. if it is close to expiry, POSTs it to the refresh endpoint and stores the
   token that comes back;
3. only falls back to `YANGIISH_TOKEN` from `.env` when that chain is broken.

Net effect: **one manual E-IMZO login covers weeks of scheduled runs.** You only
re-seed when the refresh window itself lapses, or if you go longer than that
between runs.

> The refresh path is not yet confirmed against the live portal. `YANGIISH_REFRESH_PATHS`
> holds a comma-separated candidate list; the first path that works is remembered
> in `.token.json` so later runs go straight to it. If none of them work, find the
> real one in DevTools and set it explicitly.

### Why login is not fully automated

E-IMZO is a desktop application exposing a local WebSocket
(`ws://127.0.0.1:64646/service/cryptapi`), so signing only works on a machine
where it is installed and running — never on a headless server. More to the
point, its `loadKey()` step opens a **native password dialog** that browser
automation cannot type into. Automating that away would mean signing directly
from the `DSKEYS/*.pfx` file with the key password in config, which is a
security decision rather than an implementation detail.

`src/auth/eimzo.js` documents the full flow and what it would take. Given the
refresh chain above, the payoff is small.

## Scheduling

Anything that runs a command works. Exit codes are meaningful, so failures are
visible rather than silent:

| Code | Meaning |
|---|---|
| 0 | Success |
| 1 | Fetch failure (network, server, bad response) |
| 2 | Authentication needs your attention — re-seed the token |

cron, every 6 hours:

```cron
0 */6 * * * cd /path/to/nova-front/tools/yangiish-fetcher && /usr/bin/node src/cli.js --quiet >> fetch.log 2>&1
```

PM2, alongside the existing apps in `ecosystem.config.js`:

```js
{
  name: "yangiish-fetcher",
  cwd: "./tools/yangiish-fetcher",
  script: "src/cli.js",
  autorestart: false,
  cron_restart: "0 */6 * * *",
}
```

Refresh happens per-run, so schedule at least once inside the refresh window.

## Notes on correctness

Things this handles that the original one-off script did not:

- **Real error reporting.** An expired token used to surface as
  `TypeError: Cannot read properties of undefined` — the response shape is now
  checked before it is destructured.
- **Retries.** Exponential backoff on 429/5xx/network errors; a single re-auth
  on 401.
- **Deduplication.** Paging with `sort=id desc` over a table that is being
  written to can return the same row twice or skip one. Records are deduped by
  `id`, the default sort is `id asc` (new rows land on the last page instead of
  shifting every page), and a count mismatch against the API's own `total` is
  reported as a warning.
- **Atomic writes.** A crash mid-run cannot leave a truncated JSON file that
  looks valid to whatever reads it next.
- **Fewer requests.** Default page size 200 instead of 20.
- **Politeness.** Two endpoints in flight at a time, pages sequential — the
  original fired all six at once, unthrottled.
- **A typo fix.** The original sent `sort=id+descc` for `persons`.

## Testing

`npm test` runs the CLI as a subprocess against an in-process mock of the portal
(`test/mock-server.js`) — pagination, retry, refresh-on-expiry, 401 recovery and
exit codes. No network needed.

To poke at the mock by hand:

```bash
npm run mock   # prints its port and a valid seed token
```

## Security

`.env`, `.token.json` and `data/` are gitignored. `.token.json` is written
`0600`. Never commit a token — it is a live session for a government portal.
