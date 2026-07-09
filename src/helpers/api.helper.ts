import { getServerTenant } from "@/server/tenant-context";
import { DEFAULT_TENANT, resolveTenantByHostname } from "../../tenant.config";

// For axios's baseURL only (see src/api/axios.ts) — plain functions, not
// hooks, because axios interceptors aren't React components. Components
// needing the tenant's domain/phone for rendering must use
// useApiDomain()/useWhatsappPhone() from @/contexts/tenant.context instead:
// this getApiDomain() only resolves correctly inside a getServerSideProps
// call wrapped in runWithTenant() (or on the client) — it does NOT see the
// tenant during React's render pass, since Next.js runs getServerSideProps
// and the render pass as separate, unlinked async chains.
export function getApiDomain(): string {
  if (typeof window === "undefined") {
    return getServerTenant()?.apiDomain ?? DEFAULT_TENANT.apiDomain;
  }
  return resolveTenantByHostname(window.location.hostname).apiDomain;
}
