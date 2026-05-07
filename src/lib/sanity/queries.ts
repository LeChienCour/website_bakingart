import { client } from "./client";

// ── Types ──────────────────────────────────────────────────────────────────

export type SanityImage = {
  asset: { _ref: string; _type: "reference" };
  alt: string;
  hotspot?: { x: number; y: number };
};

export type Pastel = {
  _id: string;
  nombre: string;
  slug: string;
  descripcion: string;
  imagen: SanityImage;
  categoria: "boda" | "xv" | "cumpleanos" | "babyShower" | "corporativo" | "tematico";
  porciones?: string;
  tag?: "popular" | "new" | "temporada";
  destacado: boolean;
  orden: number;
};

export type SiteConfig = {
  title: string;
  description?: string;
  whatsappNumber: string;
  instagramUrl?: string;
  direccion?: string;
  email?: string;
};

// ── Queries ────────────────────────────────────────────────────────────────

const pastelProjection = `
  _id,
  nombre,
  "slug": slug.current,
  descripcion,
  imagen{ asset, alt, hotspot },
  categoria,
  porciones,
  tag,
  destacado,
  orden
`;

export const pastelesQuery = `*[_type == "pastel"] | order(orden asc, nombre asc){${pastelProjection}}`;
export const pastelesDestacadosQuery = `*[_type == "pastel" && destacado == true] | order(orden asc){${pastelProjection}}`;
export const pastelBySlugQuery = `*[_type == "pastel" && slug.current == $slug][0]{${pastelProjection}}`;
export const siteConfigQuery = `*[_type == "siteConfig"][0]{ title, description, whatsappNumber, instagramUrl, direccion, email }`;

// ── Fetchers ───────────────────────────────────────────────────────────────

function isSanityConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_DATASET
  );
}

export async function getPasteles(): Promise<Pastel[]> {
  if (!isSanityConfigured()) return [];
  try {
    return await client.fetch<Pastel[]>(pastelesQuery, {}, { next: { tags: ["pastel"] } });
  } catch {
    return [];
  }
}

export async function getPastelesDestacados(): Promise<Pastel[]> {
  if (!isSanityConfigured()) return [];
  try {
    return await client.fetch<Pastel[]>(pastelesDestacadosQuery, {}, { next: { tags: ["pastel"] } });
  } catch {
    return [];
  }
}

export async function getPastelBySlug(slug: string): Promise<Pastel | null> {
  if (!isSanityConfigured()) return null;
  try {
    return await client.fetch<Pastel | null>(
      pastelBySlugQuery,
      { slug },
      { next: { tags: ["pastel", `pastel:${slug}`] } }
    );
  } catch {
    return null;
  }
}

export async function getSiteConfig(): Promise<SiteConfig | null> {
  if (!isSanityConfigured()) return null;
  try {
    return await client.fetch<SiteConfig | null>(
      siteConfigQuery,
      {},
      { next: { tags: ["siteConfig"] } }
    );
  } catch {
    return null;
  }
}
