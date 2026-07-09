/**
 * Single source of truth for per-tenant (country) settings, resolved at
 * runtime by incoming hostname instead of being baked into the build.
 *
 * Each tenant's values come from env vars (see .env.example) so ops can
 * change domains/phones without a code change or rebuild. Default UI
 * locale is intentionally NOT per-tenant here — see next-i18next.config.js
 * for why (Next's i18n.domains requires each locale to belong to a single
 * domain, which doesn't fit "all 4 languages on all 3 tenant domains").
 */

/** @typedef {{ key: string, hostnames: string[], apiDomain: string, whatsappPhone: string }} TenantConfig */

/** @type {TenantConfig[]} */
const tenants = [
  {
    key: "uz",
    hostnames: (process.env.TENANT_UZ_HOSTNAMES || "").split(",").map((h) => h.trim()).filter(Boolean),
    apiDomain: process.env.TENANT_UZ_API_DOMAIN || "",
    whatsappPhone: process.env.TENANT_UZ_WHATSAPP_PHONE || "",
  },
  {
    key: "tr",
    hostnames: (process.env.TENANT_TR_HOSTNAMES || "").split(",").map((h) => h.trim()).filter(Boolean),
    apiDomain: process.env.TENANT_TR_API_DOMAIN || "",
    whatsappPhone: process.env.TENANT_TR_WHATSAPP_PHONE || "",
  },
  {
    key: "eg",
    hostnames: (process.env.TENANT_EG_HOSTNAMES || "").split(",").map((h) => h.trim()).filter(Boolean),
    apiDomain: process.env.TENANT_EG_API_DOMAIN || "",
    whatsappPhone: process.env.TENANT_EG_WHATSAPP_PHONE || "",
  },
];

const DEFAULT_TENANT = tenants[0];

const hostMap = new Map();
for (const tenant of tenants) {
  for (const hostname of tenant.hostnames) {
    hostMap.set(hostname.toLowerCase(), tenant);
  }
}

/**
 * @param {string | null | undefined} hostname
 * @returns {TenantConfig}
 */
function resolveTenantByHostname(hostname) {
  if (!hostname) return DEFAULT_TENANT;
  const host = String(hostname).split(":")[0].toLowerCase();
  return hostMap.get(host) || DEFAULT_TENANT;
}

module.exports = { tenants, DEFAULT_TENANT, resolveTenantByHostname };
