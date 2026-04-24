import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  // CRITICAL: useCdn must be false — CDN bypasses revalidateTag cache invalidation.
  // Per ADR: next-sanity 9 + revalidateTag requires direct API hits.
  useCdn: false,
});
