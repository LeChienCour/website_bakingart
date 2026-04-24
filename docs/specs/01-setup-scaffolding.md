# Spec: Setup & Scaffolding
Slug: 01-setup-scaffolding
Fecha: 2026-04-23
Estado: READY_FOR_ARCH

## Problema / Oportunidad
BakingArt GDL necesita una base técnica sólida y reproducible antes de construir cualquier funcionalidad de cara al cliente o al CMS.

## User Stories

1. **Como desarrollador**, quiero un repositorio Next.js 15 con App Router y TypeScript strict configurado, para que todo el código del proyecto tenga tipado estricto desde el inicio.
2. **Como desarrollador**, quiero Tailwind v4 y shadcn/ui instalados y funcionando, para poder construir UI consistente sin configuración adicional.
3. **Como desarrollador**, quiero el proyecto de Sanity.io (free tier) creado y conectado al repo via `next-sanity`, para que el CMS esté listo para recibir esquemas de contenido.
4. **Como desarrollador**, quiero un pipeline de CI básico en GitHub Actions que valide lint y build en cada push, para detectar regresiones de forma automática.
5. **Como desarrollador**, quiero el proyecto desplegado en Vercel Hobby con preview deployments activos, para que cada PR tenga una URL de previsualización funcional.
6. **Como dueña del negocio (Karenina)**, quiero que el dominio o subdominio del proyecto esté apuntado correctamente a Vercel, para que la URL final sea presentable desde el primer día.
7. **Como desarrollador**, quiero un archivo `.env.example` con todas las variables de entorno requeridas documentadas, para que cualquier colaborador pueda onboardearse sin fricción.

## Criterios de Aceptación

- [ ] El repo corre `next dev` sin errores; `tsconfig.json` tiene `"strict": true` y `tsc --noEmit` pasa sin errores.
- [ ] `tailwind.config.ts` (v4) y los componentes base de shadcn/ui (Button, Card) renderizan correctamente en `/` sin errores de consola.
- [ ] El Sanity Studio es accesible en `/studio` y `sanityClient` devuelve respuesta 200 al hacer una query vacía contra el dataset `production`.
- [ ] GitHub Actions ejecuta `tsc --noEmit`, `next lint` y `next build` en cada push a `main` y a PRs; el badge de estado es visible en el README.
- [ ] Vercel genera una URL de preview única por cada PR abierto; el deploy de `main` está en estado "Ready" en el dashboard de Vercel.
- [ ] El dominio/subdominio configurado resuelve correctamente (HTTP 200) sin redirecciones inesperadas.
- [ ] `.env.example` lista todas las variables (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`, `SANITY_WEBHOOK_SECRET`) con descripción pero sin valores reales; `.env.local` está en `.gitignore`.

## Edge Cases

- Si el plan Hobby de Vercel supera los límites de build minutes, el CI de GitHub Actions debe seguir siendo la fuente de verdad para validación.
- El token de Sanity usado en CI debe ser de solo lectura; el token de escritura únicamente en `.env.local`.
- Si `next-sanity` requiere una versión de React incompatible con Next.js 15, fijar la versión compatible antes de continuar.
- Las variables de entorno con prefijo `NEXT_PUBLIC_` son visibles en el cliente; no incluir secretos con ese prefijo.
- El Sanity free tier tiene límite de 3 usuarios y 500k peticiones/mes — documentar para Karenina.

## Assets requeridos

- Cuenta de GitHub con el repositorio creado.
- Cuenta de Vercel conectada al repositorio de GitHub.
- Proyecto de Sanity.io creado con dataset `production`; Project ID y token de API disponibles.
- Decisión sobre dominio (propio o `bakingartgdl.vercel.app`).
- Node.js ≥ 20 LTS en el entorno de desarrollo local.

## Fuera de scope

- Diseño visual, paleta de colores, tipografía o branding (→ `02-design-system`).
- Esquemas de contenido de Sanity para productos o categorías.
- Cualquier página o componente de cara al usuario final.
- Integración con WhatsApp.
- SEO, metadatos Open Graph o sitemap.
- Analytics o scripts de terceros.

## Dependencias

Ninguna — este es el primer feature del proyecto.
