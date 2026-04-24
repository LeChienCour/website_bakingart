---
name: seo-checklist
description: Next.js 15 metadata API, Open Graph, Twitter Cards, sitemap.xml generation, robots.txt, schema.org LocalBusiness and Product markup, canonical URLs. Load before shipping any page.
---

# SEO Checklist — BakingArt GDL

## Metadata API por página

```typescript
// app/pasteles/[slug]/page.tsx
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const pastel = await getPastel(params.slug)

  return {
    title: `${pastel.titulo} | BakingArt GDL`,
    description: pastel.descripcionCorta,
    alternates: {
      canonical: `https://bakingartgdl.com/pasteles/${params.slug}`,
    },
    openGraph: {
      title: pastel.titulo,
      description: pastel.descripcionCorta,
      url: `https://bakingartgdl.com/pasteles/${params.slug}`,
      siteName: 'BakingArt GDL',
      images: [{
        url: urlFor(pastel.imagen).width(1200).height(630).url(),
        width: 1200,
        height: 630,
        alt: pastel.imagen.alt,
      }],
      locale: 'es_MX',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pastel.titulo,
      description: pastel.descripcionCorta,
      images: [urlFor(pastel.imagen).width(1200).height(630).url()],
    },
  }
}
```

## Root layout metadata (globals)

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://bakingartgdl.com'),
  title: {
    default: 'BakingArt GDL — Pasteles Artesanales en Guadalajara',
    template: '%s | BakingArt GDL',
  },
  description: 'Pasteles personalizados y cursos de repostería en Guadalajara, Jalisco. Cotiza por WhatsApp.',
  robots: { index: true, follow: true },
  verification: {
    // google: 'CÓDIGO_DE_VERIFICACIÓN' — agregar cuando esté disponible
  },
}
```

## sitemap.xml dinámico

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await client.fetch<Array<{slug: string, updatedAt: string}>>(
    `*[_type in ["pastel", "curso"] && defined(slug.current)]{
      "slug": slug.current,
      "updatedAt": _updatedAt,
      _type
    }`
  )

  const dynamicRoutes = slugs.map(({ slug, updatedAt, _type }) => ({
    url: `https://bakingartgdl.com/${_type === 'pastel' ? 'pasteles' : 'cursos'}/${slug}`,
    lastModified: new Date(updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    { url: 'https://bakingartgdl.com', lastModified: new Date(), priority: 1.0 },
    { url: 'https://bakingartgdl.com/pasteles', lastModified: new Date(), priority: 0.9 },
    { url: 'https://bakingartgdl.com/cursos', lastModified: new Date(), priority: 0.9 },
    { url: 'https://bakingartgdl.com/contacto', lastModified: new Date(), priority: 0.6 },
    ...dynamicRoutes,
  ]
}
```

## robots.txt

```typescript
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: 'https://bakingartgdl.com/sitemap.xml',
  }
}
```

## Schema.org LocalBusiness

```typescript
// app/layout.tsx — JSON-LD global
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Bakery',
  name: 'BakingArt GDL',
  description: 'Pasteles personalizados y cursos de repostería en Guadalajara',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Guadalajara',
    addressRegion: 'Jalisco',
    addressCountry: 'MX',
  },
  telephone: '+52-1-XXX-XXX-XXXX', // desde siteConfig
  sameAs: ['https://www.instagram.com/bakingartgdl'],
}

// En layout.tsx JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

## Checklist pre-merge
- [ ] `<title>` único en cada página (usa template)
- [ ] `<meta name="description">` de 120–160 chars
- [ ] Open Graph con imagen 1200×630
- [ ] Canonical URL correcta
- [ ] `sitemap.xml` incluye la nueva ruta
- [ ] No hay links rotos (`<Link>` de next/link)
- [ ] Imágenes tienen alt text descriptivo
- [ ] Schema.org aplicado donde corresponde
- [ ] Lighthouse SEO ≥ 90
