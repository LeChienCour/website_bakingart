import { createClient } from "next-sanity";

export const client = createClient({
  // Fallback to "placeholder" so createClient doesn't throw at import time
  // when env vars are absent (CI build without secrets). The isSanityConfigured()
  // guard in queries.ts prevents actual API calls in that case.
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  // CRITICAL: useCdn must be false — CDN bypasses revalidateTag cache invalidation.
  // Per ADR: next-sanity 9 + revalidateTag requires direct API hits.
  useCdn: false,
});
