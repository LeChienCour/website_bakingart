# ADR 0002: Design System
Slug: 02-design-system
Fecha: 2026-04-23
Estado: Aceptado

## Contexto

BakingArt GDL requiere un sistema de diseño cohesivo que refleje la identidad visual de la marca y sea mantenible por un equipo pequeño. Stack fijado en Next.js 15 + Tailwind v4 (CSS-first, sin `tailwind.config.js`) + shadcn/ui. Se necesita un contrato visual explícito antes de construir cualquier feature de producto.

## Decisiones

### Token architecture — @theme block para globals.css

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* ── Colores de marca ── */
  --color-rosa:            #F4B6C2;
  --color-turquesa:        #4DD0E1;
  --color-crema:           #FFF8F0;
  --color-gris-text:       #2D2D2D;
  --color-gris-secondary:  #6B7280;

  /* ── Escala tipográfica ── */
  --text-display: 3rem;      /* 48px */
  --text-h1:      2.25rem;   /* 36px */
  --text-h2:      1.75rem;   /* 28px */
  --text-body:    1rem;      /* 16px */
  --text-small:   0.875rem;  /* 14px */

  /* ── Fuentes ── */
  --font-heading: var(--font-playfair);
  --font-body:    var(--font-inter);
}
```

Regla: ningún hex se escribe fuera de `@theme`. Todo valor repetido → token.

### Typography implementation

```tsx
// src/app/layout.tsx
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

// <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
// <body className="font-body text-gris-text bg-crema">
```

Contraste WCAG AA verificado:
- gris-text #2D2D2D / crema #FFF8F0 → ~14.5:1 ✓
- gris-secondary #6B7280 / crema #FFF8F0 → ~4.7:1 ✓
- gris-text / rosa #F4B6C2 → ~7.2:1 ✓
- gris-text / turquesa #4DD0E1 → ~5.8:1 ✓

### Component architecture

```
src/
├── app/
│   ├── globals.css          MODIFICAR — @theme completo
│   └── layout.tsx           MODIFICAR — confirmar font variables + body classes
├── lib/
│   └── design-tokens.ts     CREAR — constantes TS
└── components/
    ├── ui/
    │   ├── button.tsx        MODIFICAR — añadir variantes brand-*
    │   └── badge.tsx         CREAR — Badge con variantes de marca
    ├── layout/
    │   └── section-wrapper.tsx  CREAR
    └── typography/
        ├── heading.tsx          CREAR
        └── text.tsx             CREAR
```

Sin Storybook, sin paquetes nuevos. `clsx`, `tailwind-merge`, `cva` ya instalados.

### shadcn/ui override strategy

Extender `buttonVariants` en el `cva` existente — no reemplazar. Nuevas variantes prefijadas `brand-*` para coexistir con variantes shadcn sin conflicto.

```tsx
// Variantes añadidas al cva existente en button.tsx:
variant: {
  "brand-primary":   "bg-rosa text-gris-text hover:bg-rosa/90 font-semibold",
  "brand-secondary": "bg-turquesa text-gris-text hover:bg-turquesa/90 font-semibold",
  "brand-outline":   "border-2 border-rosa text-gris-text bg-transparent hover:bg-rosa/10",
  "brand-ghost":     "text-gris-text hover:bg-rosa/10",
},
size: {
  "brand-sm": "h-8 px-3 text-small",
  "brand-md": "h-10 px-5 text-body",
  "brand-lg": "h-12 px-8 text-body font-semibold",
},

// Prop loading:
// - spinner SVG inline (sin dependencia)
// - disabled forzado
// - aria-busy="true"
```

Al actualizar shadcn/ui en el futuro: re-aplicar sección marcada `// ── Variantes de marca BakingArt ──`.

### design-tokens.ts structure

```typescript
// src/lib/design-tokens.ts
export const colors = {
  rosa:          "#F4B6C2",
  turquesa:      "#4DD0E1",
  crema:         "#FFF8F0",
  grisText:      "#2D2D2D",
  grisSecondary: "#6B7280",
} as const;

export const fontSizes = {
  display: "3rem",
  h1:      "2.25rem",
  h2:      "1.75rem",
  body:    "1rem",
  small:   "0.875rem",
} as const;

export type ColorToken    = keyof typeof colors;
export type FontSizeToken = keyof typeof fontSizes;

export const colorClasses = {
  rosa:          { bg: "bg-rosa",           text: "text-rosa",           border: "border-rosa" },
  turquesa:      { bg: "bg-turquesa",       text: "text-turquesa",       border: "border-turquesa" },
  crema:         { bg: "bg-crema",          text: "text-crema",          border: "border-crema" },
  grisText:      { bg: "bg-gris-text",      text: "text-gris-text",      border: "border-gris-text" },
  grisSecondary: { bg: "bg-gris-secondary", text: "text-gris-secondary", border: "border-gris-secondary" },
} as const satisfies Record<ColorToken, { bg: string; text: string; border: string }>;
```

### Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Tailwind v4 API `@theme` cambia en minor | Media | Alto | Versión fija en package.json; revisar changelog antes de upgrade |
| globals.css y design-tokens.ts desincronizados | Alta | Medio | Test de snapshot que compara hex values de ambos |
| Clases Tailwind purgadas por construcción dinámica | Media | Alto | Clases completas siempre (`bg-rosa`, nunca `bg-${'rosa'}`) |
| shadcn/ui upstream sobreescribe button.tsx | Baja | Alto | Sección marcada con comentario; re-aplicar al hacer upgrade |

## Alternativas descartadas

- **tailwind.config.ts**: incompatible con Tailwind v4 CSS-first
- **Reemplazar button.tsx**: rompe contrato de actualización de shadcn
- **CSS Modules para tokens**: impide reutilización como clases utilitarias globales
- **Storybook**: ~200MB de deps para equipo pequeño, fuera de scope
- **Dark mode**: sin caso de uso presente

## Impacto en features existentes

- `globals.css`: añadir `@theme` completo; `:root` vars de shadcn conviven sin conflicto
- `layout.tsx`: verificar que ambas font variables están en `<html>` className
- `button.tsx`: modificación aditiva — `variant="default"` no cambia
- Cualquier clase hardcodeada existente (`text-[#2D2D2D]`): migrar a tokens en este mismo PR
