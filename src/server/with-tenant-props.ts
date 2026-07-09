import type { GetServerSideProps, GetServerSidePropsContext } from "next";

import { resolveTenantByHostname } from "../../tenant.config";
import { runWithTenant } from "./tenant-context";

// Wraps a page's getServerSideProps so that:
//  1) any axios calls made inside it resolve the right tenant's API domain
//     (via the same-bundle AsyncLocalStorage set up in tenant-context.ts —
//     this only works within getServerSideProps itself, not during the
//     later React render pass, which is a separate, unlinked call from
//     Next's internals)
//  2) the resolved tenant is added to the page's props, so _app.tsx can put
//     it into TenantContext for components to read via useApiDomain() /
//     useWhatsappPhone() during render (both SSR and after hydration).
export function withTenantProps<P extends { [key: string]: unknown }>(
  getServerSideProps: GetServerSideProps<P>
): GetServerSideProps<P> {
  return async (context: GetServerSidePropsContext) => {
    const tenant = resolveTenantByHostname(context.req.headers.host);

    return runWithTenant(tenant, async () => {
      const result = await getServerSideProps(context);

      if ("props" in result) {
        const props = await result.props;
        return { ...result, props: { ...props, tenant } };
      }

      return result;
    });
  };
}
