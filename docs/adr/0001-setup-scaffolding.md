# ADR 0001: Setup & Scaffolding
Slug: 01-setup-scaffolding
Fecha: 2026-04-23
Estado: Aceptado

## Contexto

BakingArt GDL requiere una base técnica sólida y reproducible antes de construir cualquier funcionalidad orientada al cliente o al CMS. Esta decisión establece el stack tecnológico, la estructura de directorios, las estrategias de rendering, la configuración de servicios externos y el pipeline de CI/CD que servirán de fundamento para todas las features subsecuentes. No existen dependencias previas; este es el punto de partida del proyecto.

## Decisiones

### Stack y versiones exactas

| Paquete | Versión | Justificación |
|---|---|---|
| `next` | `15.x` | App Router estable, soporte nativo de RSC y ISR con `revalidateTag` |
| `react` / `react-dom` | `19.x` | Requerido por Next.js 15 |
| `typescript` | `5.x` | `strict: true` obligatorio per spec; mejor inferencia y seguridad de tipos |
| `tailwindcss` | `4.x` | CSS-first config; integración nativa con Next.js vía `@tailwindcss/postcss` |
| `@shadcn/ui` | CLI `latest` | Componentes accesibles copiados al repo; Button y Card validados en `/` |
| `sanity` | `3.x` | Studio v3 embebido en Next.js App Router en `/studio` |
| `next-sanity` | `9.x` | Provee `createClient`, `parseBody` para webhooks, y helpers de ISR |
| `@sanity/image-url` | `1.x` | Transformación de imágenes desde Sanity CDN |
| `eslint` | `9.x` | Flat config; `next lint` corre sobre el proyecto completo |
| `prettier` | `3.x` | Formato consistente; integrado con ESLint vía `eslint-config-prettier` |

TypeScript con `strict: true`. Tailwind v4 CSS-first: paleta y tipografías declaradas en `globals.css` con `@theme`.

### Estructura de directorios

```
.
├── .env.example
├── .env.local                  # gitignored
├── .github/
│   └── workflows/
│       ├── ci.yml              # tsc + lint + build en PR y push
│       └── backup.yml          # backup semanal de dataset Sanity
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── sanity.config.ts            # Sanity Studio config (embebido)
├── sanity.cli.ts
├── public/
│   └── fonts/                  # Playfair Display + Inter si se sirven localmente
├── src/
│   ├── app/
│   │   ├── layout.tsx          # RootLayout: fuentes, metadata global
│   │   ├── globals.css         # @import "tailwindcss"; @theme con paleta y tipografía
│   │   ├── page.tsx            # / → SSG puro (sin fetch en esta fase)
│   │   ├── studio/
│   │   │   └── [[...tool]]/
│   │   │       └── page.tsx    # NextStudio embebido, "use client"
│   │   └── api/
│   │       └── revalidate/
│   │           └── route.ts    # Webhook handler con parseBody + HMAC-SHA256
│   ├── components/
│   │   └── ui/                 # Componentes shadcn/ui copiados (button.tsx, card.tsx)
│   ├── lib/
│   │   ├── sanity/
│   │   │   ├── client.ts       # createClient con useCdn: false
│   │   │   └── queries.ts      # GROQ queries tipadas
│   │   └── utils.ts            # cn() helper de shadcn
│   └── types/
│       └── sanity.d.ts
└── studio/
    └── schemas/
        └── index.ts
```

### Rendering Strategy

La ruta `/` en esta fase no consume Sanity — **SSG puro**. Sin `generateStaticParams` ni `revalidate`; Next.js 15 la trata como estática por defecto.

Features futuras con datos de Sanity usarán **ISR** con `revalidateTag` vía webhook. Nunca SSR puro (proteger límite de 100k invocaciones/mes de Vercel Hobby).

```typescript
// src/app/page.tsx — fase scaffolding
export default function HomePage() {
  return (
    <main>
      <Button>BakingArt GDL</Button>
      <Card>Próximamente...</Card>
    </main>
  )
}
// Sin export const dynamic ni revalidate → SSG por defecto en Next.js 15
```

### Sanity client configuration

`useCdn: false` es **crítico**: CDN activo hace bypass del data cache de Next.js; `revalidateTag` no tiene efecto. Con `useCdn: false`, el sistema de tags de Next.js controla el ciclo de vida del caché.

```typescript
// src/lib/sanity/client.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false, // REQUERIDO para que revalidateTag funcione con ISR
})
```

Next.js 15: `fetch` es `no-store` por defecto. Todas las llamadas a `client.fetch` deben declarar cache options explícitamente:

```typescript
const data = await client.fetch(QUERY, {}, {
  next: { tags: ['homepage'], revalidate: 3600 }
})
```

### Variables de entorno

```bash
# .env.example

# Sanity (públicas)
NEXT_PUBLIC_SANITY_PROJECT_ID=   # ID en sanity.io/manage
NEXT_PUBLIC_SANITY_DATASET=      # Nombre del dataset (production)

# Sanity (server-only — nunca NEXT_PUBLIC_)
SANITY_API_TOKEN=                # Token con permisos editor
SANITY_WEBHOOK_SECRET=           # Secret HMAC-SHA256 del webhook

# Site
NEXT_PUBLIC_SITE_URL=            # URL canónica (https://bakingart.mx)
```

### CI/CD Pipeline

#### `ci.yml`

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npx tsc --noEmit
      - run: npx next lint
      - run: npx next build
        env:
          NEXT_PUBLIC_SANITY_PROJECT_ID: ${{ secrets.NEXT_PUBLIC_SANITY_PROJECT_ID }}
          NEXT_PUBLIC_SANITY_DATASET: ${{ secrets.NEXT_PUBLIC_SANITY_DATASET }}
          NEXT_PUBLIC_SITE_URL: ${{ secrets.NEXT_PUBLIC_SITE_URL }}
```

#### `backup.yml`

```yaml
name: Sanity Dataset Backup
on:
  schedule:
    - cron: '0 3 * * 0'
  workflow_dispatch:

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install -g @sanity/cli
      - name: Export dataset
        run: sanity dataset export ${{ secrets.NEXT_PUBLIC_SANITY_DATASET }} .
        env:
          SANITY_AUTH_TOKEN: ${{ secrets.SANITY_API_TOKEN }}
      - name: Get date
        id: date
        run: echo "value=$(date +'%Y-%m-%d')" >> $GITHUB_OUTPUT
      - uses: actions/upload-artifact@v4
        with:
          name: sanity-backup-${{ steps.date.outputs.value }}
          path: '*.tar.gz'
          retention-days: 30
```

### Vercel configuration

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "devCommand": "next dev",
  "installCommand": "npm ci",
  "regions": ["iad1"]
}
```

**DNS** (en registrador):
- `A @ 76.76.21.21`
- `CNAME www cname.vercel-dns.com`

**Webhook Sanity → ISR**:
- URL: `https://bakingart.mx/api/revalidate`
- Method: POST, triggers: create/update/delete
- **Signing secret** en campo "Secret" de Sanity dashboard — Sanity firma en header `sanity-webhook-signature` (HMAC-SHA256); `parseBody` lo valida. NO usar Authorization Bearer.

```typescript
// src/app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache'
import { parseBody } from 'next-sanity/webhook'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string }>(
      req,
      process.env.SANITY_WEBHOOK_SECRET
    )
    if (!isValidSignature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
    }
    revalidateTag(body._type)
    return NextResponse.json({ revalidated: true, type: body._type })
  } catch (err) {
    return NextResponse.json({ message: String(err) }, { status: 500 })
  }
}
```

### Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Límites Vercel Hobby agotados | Baja | Alto | ISR sobre SSR; monitorear en dashboard; escalar a Pro si supera 70% |
| Webhook secret expuesto | Media | Alto | Validar HMAC con `parseBody`; nunca loguear; rotar si compromiso |
| Variables de entorno faltantes en CI build | Media | Medio | Todas las `NEXT_PUBLIC_*` mapeadas en GitHub Secrets y `ci.yml` |
| Incompatibilidad Tailwind v4 con shadcn | Baja | Medio | shadcn copia componentes como código; sin dependencia runtime de plugins legacy |
| Drift de `apiVersion` en cliente Sanity | Baja | Bajo | Fecha fija; actualizar solo de forma intencional |

## Alternativas descartadas

- **Astro**: mejor para sitios estáticos, pero ecosistema shadcn/ui + `next-sanity` ISR más maduro en Next.js
- **Remix**: sin soporte nativo de ISR — incompatible con límites de Hobby
- **Tailwind v3**: v4 en GA; sistema CSS-first elimina config JS extra
- **Contentful/Prismic**: Sanity Studio embebible + GROQ tipado + free tier más generoso
- **Railway/Render**: Vercel es plataforma de referencia para Next.js; preview deployments zero-config

## Impacto en features existentes

Ninguno. Primer feature del proyecto.
