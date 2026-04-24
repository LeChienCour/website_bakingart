---
name: nextjs-conventions
description: Next.js 15 App Router patterns — Server vs Client components, ISR vs SSG vs SSR decision tree, data fetching conventions, route groups, metadata API, loading/error boundaries. Load before writing any route or component.
---

# Next.js 15 Conventions — BakingArt GDL

## Rendering Decision Tree

```
¿Datos cambian frecuentemente (< 1h)?
├── No → SSG (generateStaticParams + no revalidate)
├── Sí, pero predecibles → ISR (revalidate: N segundos)
└── Sí, por usuario/request → SSR (no cache o cache: 'no-store')

¿Necesita interactividad del browser (clicks, formularios, estado)?
├── No → Server Component (default)
└── Sí → Client Component ("use client")
```

## Server vs Client Components

```typescript
// Server Component (DEFAULT — sin directiva)
// ✓ fetch de datos  ✓ acceso directo a DB/CMS  ✓ SEO
// ✗ onClick  ✗ useState  ✗ useEffect  ✗ browser APIs

// Client Component ("use client" en la primera línea del archivo)
// ✓ interactividad  ✓ hooks  ✓ browser events
// ✗ async/await en el componente  ✗ secrets del servidor
```

## Estructura de rutas

```
src/app/
  layout.tsx              # Root layout (html, body, providers)
  page.tsx                # Home — SSG
  (marketing)/            # Route group sin segmento de URL
    pasteles/
      page.tsx            # /pasteles — ISR
      [slug]/
        page.tsx          # /pasteles/[slug] — ISR + generateStaticParams
        loading.tsx       # Skeleton mientras carga
        error.tsx         # Error boundary (Client Component)
    cursos/
      page.tsx
      [slug]/
        page.tsx
  api/
    revalidate/
      route.ts            # Webhook de Sanity para ISR
```

## Data fetching patterns

**CRÍTICO — Next.js 15**: el fetch es `no-store` por default (cambio vs 13/14).
Todo `client.fetch()` DEBE especificar opciones de cache explícitas o se convierte en SSR silenciosamente.

```typescript
// En Server Component — siempre especificar opciones de cache
async function getData() {
  const data = await client.fetch(query, params, {
    next: { revalidate: 3600, tags: ['pasteles'] }
    // Sin esto en Next.js 15 → no-store → SSR sin cache
  })
  return data
}

// ISR con tag-based revalidation (preferido sobre time-based)
// En page.tsx
export const revalidate = 3600 // fallback si no hay webhook

// En api/revalidate/route.ts
import { revalidateTag } from 'next/cache'
export async function POST(req: Request) {
  // verificar SANITY_WEBHOOK_SECRET
  revalidateTag('pasteles')
  return Response.json({ revalidated: true })
}
```

## Rutas dinámicas — dynamicParams y notFound

```typescript
// En detail pages (pasteles/[slug], cursos/[slug])
// Previene que slugs inexistentes se conviertan en SSR renders
export const dynamicParams = false

// En la page, manejar slug no encontrado explícitamente
import { notFound } from 'next/navigation'

const item = await client.fetch(queryBySlug, { slug: params.slug }, { next: { tags: [_type] } })
if (!item) notFound() // 404 correcto en vez de render vacío
```

## generateStaticParams

```typescript
// Para rutas dinámicas con SSG/ISR
export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(
    `*[_type == "pastel" && defined(slug.current)].slug.current`
  )
  return slugs.map((slug) => ({ slug }))
}
```

## Metadata API

```typescript
// En cada page.tsx
import type { Metadata } from 'next'

export async function generateMetadata({ params }): Promise<Metadata> {
  const item = await getData(params.slug)
  return {
    title: `${item.titulo} | BakingArt GDL`,
    description: item.descripcionCorta,
    openGraph: {
      images: [urlFor(item.imagen).width(1200).height(630).url()],
    },
  }
}
```

## Loading y Error boundaries

```typescript
// loading.tsx — se muestra mientras el Server Component carga
export default function Loading() {
  return <SkeletonCard /> // componente de skeleton
}

// error.tsx — DEBE ser Client Component
'use client'
export default function Error({ error, reset }) {
  return (
    <div>
      <p>Algo salió mal</p>
      <button onClick={reset}>Reintentar</button>
    </div>
  )
}
```

## Naming conventions
- Archivos de componentes: PascalCase (`ProductCard.tsx`)
- Archivos de ruta: lowercase (`page.tsx`, `layout.tsx`)
- Hooks: camelCase con prefijo `use` (`useWhatsAppLink.ts`)
- Utilidades: camelCase (`formatPrice.ts`)
- Tipos: PascalCase con sufijo descriptivo (`PastelCardProps`)
