# Spec: Design System
Slug: 02-design-system
Fecha: 2026-04-23
Estado: READY_FOR_ARCH

## Problema / Oportunidad

El sitio de BakingArt GDL necesita una base visual coherente antes de construir cualquier componente o página. Sin tokens centralizados y componentes base documentados, cada feature podría aplicar colores, tipografías y espaciados de forma inconsistente. Este feature establece el sistema de diseño completo: tokens de color, escala tipográfica, componentes atómicos reutilizables — la fuente de verdad visual que todas las demás features consumen.

## User Stories

**US-01 — Desarrollador / tokens**
Como desarrollador, quiero todos los colores, fuentes y espaciados como tokens Tailwind v4 en un solo lugar, para no hardcodear valores ni generar inconsistencias.

**US-02 — Desarrollador / componentes base**
Como desarrollador, quiero componentes atómicos (Button, Badge, SectionWrapper, Heading, Text) ya estilizados con la marca BakingArt, para ensamblar páginas rápidamente.

**US-03 — Karenina / identidad visual**
Como dueña, quiero que el sitio refleje desde el primer componente la paleta rosa-turquesa-crema y la tipografía Playfair+Inter.

**US-04 — Visitante / legibilidad**
Como visitante, quiero texto legible sobre fondos cálidos y botones claramente accionables.

## Criterios de Aceptación

### Tokens de color
- [ ] `--color-rosa: #F4B6C2` en `globals.css` `@theme`, clases `bg-rosa`, `text-rosa`, `border-rosa` funcionales
- [ ] `--color-turquesa: #4DD0E1` ídem
- [ ] `--color-crema: #FFF8F0` ídem — fondo base del sitio
- [ ] `--color-gris-text: #2D2D2D` ídem — texto principal
- [ ] `--color-gris-secondary: #6B7280` ídem — texto secundario

### Tipografía
- [ ] Playfair Display cargada vía `next/font/google`, weights 400/700, var `--font-heading`
- [ ] Inter cargada vía `next/font/google`, weights 400/500/600, var `--font-body`
- [ ] Ambas variables aplicadas en `<html>` desde `app/layout.tsx`
- [ ] Escala tipográfica en `@theme`: `text-display` (48px), `text-h1` (36px), `text-h2` (28px), `text-body` (16px), `text-small` (14px)

### Componentes base
- [ ] **Button**: variantes `primary` (rosa), `secondary` (turquesa), `outline`, `ghost`; tamaños `sm/md/lg`; estado `disabled` y `loading`
- [ ] **Badge**: variantes `new` (rosa), `popular` (turquesa), `agotado` (gris), `temporada` (amber)
- [ ] **SectionWrapper**: padding vertical `py-16 md:py-24`, max-width centrado, prop `background` (crema/white/rosa-light)
- [ ] **Heading**: acepta `as` (h1–h4) y `size` (display/h1/h2/h3), Playfair Display, prop `accent` para span en rosa
- [ ] **Text**: variantes `body/small/caption`, prop `muted` para `gris-secondary`

### Accesibilidad
- [ ] Contraste gris-text (#2D2D2D) sobre crema (#FFF8F0) ≥ 4.5:1 ✓
- [ ] `focus-visible` ring visible en todos los interactivos
- [ ] Fuentes con `display: swap` (garantizado por `next/font`)

### Documentación
- [ ] `src/lib/design-tokens.ts` exporta constantes de color/fuentes como strings TS

## Edge Cases

- Rosa sobre blanco puro: documentar restricción de contraste si alguna feature usa `bg-white`
- Fallback fonts: `Georgia, serif` para Playfair; `system-ui, sans-serif` para Inter
- Tailwind v4 purge: no usar template literals para clases dinámicas — clases completas en código
- shadcn/ui overrides: documentar qué variables CSS de shadcn se sobreescriben

## Assets requeridos

- Ningún asset gráfico — fuentes vía `next/font/google`
- Paleta base ya aprobada por Karenina

## Fuera de scope

- Dark mode
- Animaciones/transiciones globales
- Header, Footer, Hero (son features separados)
- Storybook
- i18n / RTL

## Dependencias

- `01-setup-scaffolding` debe estar DONE (Next.js 15 + Tailwind v4 + shadcn/ui corriendo) ✓
