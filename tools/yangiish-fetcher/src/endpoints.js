/**
 * The six datasets exposed by the portal.
 *
 * They differ only in path, output filename, and which extra query parameters
 * they accept — everything else (paging, sort, year) is applied uniformly by
 * the collector, so there is no reason to hand-write six fetch loops.
 */
export const ENDPOINTS = {
  employees: {
    path: "/api/api/v2/get-employees",
    out: "doimiy.json",
    label: "Doimiy ishchilar",
    query: { sector: "", direction_type: "employment" },
  },
  yatts: {
    path: "/api/api/v2/get-yatts",
    out: "yatts.json",
    label: "YaTT",
    query: { direction_type: "employment" },
  },
  income: {
    path: "/api/api/v2/income/employees",
    out: "income.json",
    label: "Daromadli ishchilar",
    query: {},
  },
  selfEmployed: {
    path: "/api/api/v2/income/self-employeds",
    out: "self.json",
    label: "O'z-o'zini band qilganlar",
    query: {},
  },
  farmers: {
    path: "/api/api/v2/income/farmers",
    out: "farmers.json",
    label: "Fermerlar",
    query: {},
  },
  persons: {
    path: "/api/api/v2/income/persons",
    out: "persons.json",
    label: "Jismoniy shaxslar",
    query: {},
  },
};

export const ENDPOINT_KEYS = Object.keys(ENDPOINTS);

/** Resolve a comma-separated `--only` list into validated endpoint keys. */
export function resolveKeys(only) {
  if (!only) return ENDPOINT_KEYS;

  const requested = only
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  const unknown = requested.filter((k) => !ENDPOINTS[k]);
  if (unknown.length) {
    throw new Error(`Unknown endpoint(s): ${unknown.join(", ")}. Available: ${ENDPOINT_KEYS.join(", ")}`);
  }

  return requested;
}
