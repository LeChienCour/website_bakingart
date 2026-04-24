---
name: sanity-patterns
description: Sanity CMS schema design, GROQ queries, typed projections, image optimization with urlFor, preview mode, and webhook-based ISR revalidation. Load before modeling content or writing queries.
---

# Sanity Patterns — BakingArt GDL

## Schema types

```typescript
// Document: entidades de primer nivel con su propia URL en Studio
defineType({ type: 'document', name: 'pastel', ... })

// Object: tipos embebidos dentro de documentos
defineType({ type: 'object', name: 'precioVariante', ... })

// Singleton pattern (siteConfig)
// En sanity.config.ts añadir plugin de singleton o filtrar en lista
```

## Patrones de campo comunes

```typescript
// Slug con source automático
defineField({
  name: 'slug',
  type: 'slug',
  options: {
    source: 'titulo',
    maxLength: 96,
    isUnique: isUniqueOtherThanLanguage, // helper custom
  },
  validation: (Rule) => Rule.required(),
})

// Imagen con hotspot
defineField({
  name: 'imagen',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({ name: 'alt', type: 'string', title: 'Texto alternativo' }),
  ],
})

// Referencia a otro documento
defineField({
  name: 'categoria',
  type: 'reference',
  to: [{ type: 'categoria' }],
})

// Portable Text (rich text)
defineField({
  name: 'descripcion',
  type: 'array',
  of: [{ type: 'block' }],
})
```

## GROQ query patterns

```groq
// Proyección completa para listado
*[_type == "pastel" && !(_id in path("drafts.**"))
  && defined(slug.current)
] | order(_createdAt desc) {
  _id,
  titulo,
  "slug": slug.current,
  descripcionCorta,
  imagen { asset->, alt, hotspot, crop },
  "categoria": categoria->{ _id, nombre, "slug": slug.current },
  precioBase,
  destacado
}

// Por slug (detalle)
*[_type == "pastel" && slug.current == $slug
  && !(_id in path("drafts.**"))
][0] {
  ...,  // todos los campos
  "categoria": categoria->{ nombre, "slug": slug.current }
}

// Singleton siteConfig
*[_type == "siteConfig"][0] {
  whatsappNumero,
  mensajeBienvenida,
  instagram,
}
```

## Cliente tipado

```typescript
// src/lib/sanity/client.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  // CRÍTICO: useCdn: true hace bypass del data cache de Next.js.
  // revalidateTag() no tendrá efecto con CDN activo.
  // Usar false para todos los Server Component fetches con ISR tags.
  useCdn: false,
})

// src/lib/sanity/image.ts
import imageUrlBuilder from '@sanity/image-url'
const builder = imageUrlBuilder(client)
export const urlFor = (source: SanityImageSource) => builder.image(source)
```

## Queries tipadas (patrón)

```typescript
import { groq } from 'next-sanity'

export const pastelesQuery = groq`
  *[_type == "pastel" && !(_id in path("drafts.**"))]{ ... }
`

// Tipo espejo del GROQ
export type PastelListItem = {
  _id: string
  titulo: string
  slug: string
  imagen: { asset: { url: string }; alt: string }
  precioBase: number
  destacado: boolean
}

// Uso en Server Component
const pasteles = await client.fetch<PastelListItem[]>(pastelesQuery)
```

## Webhook ISR revalidation

```typescript
// src/app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache'
import { parseBody } from 'next-sanity/webhook'

// parseBody valida la firma HMAC-SHA256 de Sanity en el header
// 'sanity-webhook-signature' — NO usar Authorization header para validación.
// En Sanity dashboard: Webhooks → NO agregar header Authorization custom.
// El secret se configura en Sanity como "Signing secret" del webhook.
export async function POST(req: Request) {
  const { body, isValidSignature } = await parseBody<{ _type: string }>(
    req,
    process.env.SANITY_WEBHOOK_SECRET
  )
  if (!isValidSignature) return new Response('Invalid signature', { status: 401 })

  revalidateTag(body._type) // e.g. 'pastel', 'curso'
  return Response.json({ revalidated: true, type: body._type })
}

// Verificar manualmente (simula request real de Sanity con HMAC):
// Usar la herramienta de test en Sanity dashboard → Webhooks → Send test notification
// NO usar curl con Bearer token — no reproduce la firma HMAC real.
```
```

## siteConfig singleton (schema)

```typescript
// Campos mínimos del singleton global
{
  _type: 'siteConfig',
  whatsappNumero: string,      // '521XXXXXXXXXX' — con código de país
  mensajeDefault: string,      // Mensaje default para WhatsApp
  instagram: string,           // '@bakingartgdl'
  nombreNegocio: string,
  logoClaro: image,
  logoOscuro: image,
}
```
