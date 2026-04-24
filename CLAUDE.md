# BakingArt GDL — Pastelería artesanal en Guadalajara

## Contexto de negocio
- Dueña: Karenina (también "Sara" en el logo)
- Ubicación: Guadalajara, MX
- Instagram: @bakingartgdl
- Ofrece: pasteles personalizados + cursos de repostería
- Canal de venta: cotización vía WhatsApp (NO carrito de compra)

## Stack
- Next.js 15 App Router + TypeScript strict
- Sanity.io (free tier) para CMS
- Tailwind v4 + shadcn/ui
- Vercel Hobby para hosting
- Paleta: rosa #F4B6C2 / turquesa #4DD0E1 / crema #FFF8F0

## Pipeline agéntico
Ver `.claude/agents/` — usar `pm-spec` para cualquier feature nueva.
Nunca pasar al `implementer` sin ADR aprobado por `architect`.

Pipeline: pm-spec → architect → [ui-designer ∥ sanity-modeler] → implementer → qa-tester → devops-deployer

Estado de specs en `docs/specs/{slug}.state`:
DRAFT → READY_FOR_ARCH → READY_FOR_BUILD → IN_PROGRESS → READY_FOR_QA → READY_FOR_DEPLOY → DONE

Estados de excepción:
- `BLOCKED` — architect encontró ambigüedad o riesgo que requiere decisión del PM antes de continuar
- `QA_FAILED` — qa-tester encontró issues bloqueantes; regresa a IN_PROGRESS con notas

## Reglas de implementación
- Server Components por default; `"use client"` solo cuando hay interactividad real
- Imágenes siempre vía `next/image` con sources del CDN de Sanity
- Todo texto visible listo para i18n (arrancamos solo en ES)
- WhatsApp CTA nunca hardcodeada — siempre desde config de Sanity
- Lighthouse móvil ≥ 90 antes de merge a main
- TypeScript strict: no `any`, no type assertions sin justificación

## /compact policy
Preservar: ADRs, schemas Sanity, decisiones de diseño, criterios de aceptación.
Resumible: exploraciones de libs descartadas, debugging ya resuelto.

## Roadmap de features
| Slug | Descripción | Prioridad |
|------|-------------|-----------|
| 01-setup-scaffolding | Next + Sanity + Tailwind + CI | P0 |
| 02-design-system | Tokens, tipografía, componentes base | P0 |
| 03-layout-global | Header, footer, nav móvil | P0 |
| 04-home | Hero, categorías, CTA | P0 |
| 05-catalog-pasteles | Grid + filtros + detalle | P0 |
| 06-whatsapp-cta | Links dinámicos desde Sanity | P0 |
| 07-cursos | Listado + detalle | P1 |
| 08-promociones | Banner dinámico con vigencia | P1 |
| 09-about-contacto | Páginas estáticas | P1 |
| 10-seo-analytics | Metadata, sitemap, Plausible | P1 |
| 11-admin-training | Docs para Karenina sobre Sanity Studio | P2 |
