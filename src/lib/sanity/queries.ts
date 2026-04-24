/**
 * Sanity GROQ queries.
 *
 * Pattern:
 *   1. Define a query string with `defineQuery` (or plain string) from sanity.
 *   2. Export a typed fetcher function that calls `client.fetch(query, params, { next: { tags: [...] } })`.
 *   3. Use the matching tag in the /api/revalidate webhook handler to invalidate on publish.
 *
 * Example:
 *   export const siteConfigQuery = `*[_type == "siteConfig"][0]{ title, description }`;
 *
 *   export async function getSiteConfig() {
 *     return client.fetch<SiteConfig>(
 *       siteConfigQuery,
 *       {},
 *       { next: { tags: ["siteConfig"] } }
 *     );
 *   }
 *
 * Schemas and their tags will be added as features are built.
 */

export const siteConfigQuery = `*[_type == "siteConfig"][0]{ title, description }`;
