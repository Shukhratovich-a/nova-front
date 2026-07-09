/**
 * Request-scoped tenant storage for the server. server.js wraps every
 * incoming request in runWithTenant() so SSR code anywhere in the call
 * stack can read the current tenant via getServerTenant() without prop
 * drilling. Plain CommonJS so server.js can require() it with no build step.
 *
 * This module is also pulled in (transitively, via src/helpers/api.helper.ts
 * and src/api/axios.ts) by client-side bundles, so the async_hooks usage
 * must not execute in the browser — guard both the require() and the
 * AsyncLocalStorage instantiation, not just the calls.
 */

/** @type {import("async_hooks").AsyncLocalStorage<{ tenant: import("./tenant.config").TenantConfig }> | undefined} */
let als;

if (typeof window === "undefined") {
  const { AsyncLocalStorage } = require("async_hooks");
  als = new AsyncLocalStorage();
}

/**
 * @template T
 * @param {import("./tenant.config").TenantConfig} tenant
 * @param {() => T} fn
 * @returns {T}
 */
function runWithTenant(tenant, fn) {
  if (!als) return fn();
  return als.run({ tenant }, fn);
}

function getServerTenant() {
  return als?.getStore()?.tenant;
}

module.exports = { runWithTenant, getServerTenant };
