import { FC, PropsWithChildren, createContext, useContext } from "react";

import { DEFAULT_TENANT } from "../../tenant.config";

type TenantConfig = typeof DEFAULT_TENANT;

// Populated per-request from getServerSideProps (see pages' `tenant` prop,
// resolved from the request's Host header) and passed down through
// pageProps — SSR and the client share the exact same value, so there's
// no hydration mismatch. Components must read the domain/phone via
// useApiDomain()/useWhatsappPhone() rather than importing a constant,
// since a single running process now serves all tenants.
export const TenantContext = createContext<TenantConfig>(DEFAULT_TENANT);

export const TenantProvider: FC<PropsWithChildren<{ tenant?: TenantConfig }>> = ({ tenant, children }) => (
  <TenantContext.Provider value={tenant ?? DEFAULT_TENANT}>{children}</TenantContext.Provider>
);

export const useApiDomain = (): string => useContext(TenantContext).apiDomain;
export const useWhatsappPhone = (): string => useContext(TenantContext).whatsappPhone;
