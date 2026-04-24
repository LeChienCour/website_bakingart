---
name: tailwind-design-system
description: BakingArt design tokens (pink #F4B6C2, turquoise #4DD0E1, cream #FFF8F0), typography (Playfair Display + Inter), spacing scale, component patterns, and dark mode policy. Load before styling any component.
---

# BakingArt Design System — Tailwind v4

## Paleta de colores

```css
/* Colores primarios de marca */
--color-rosa:        #F4B6C2;  /* Rosa pastel — CTAs secundarios, acentos */
--color-rosa-oscuro: #E8929F;  /* Hover de rosa */
--color-turquesa:    #4DD0E1;  /* Turquesa — CTAs primarios, links */
--color-turquesa-oscuro: #26C6DA; /* Hover de turquesa */
--color-crema:       #FFF8F0;  /* Fondo principal */
--color-crema-oscuro: #F5EDE0; /* Fondo de secciones alternas */

/* Neutros */
--color-gris-oscuro: #2D2D2D;  /* Texto principal */
--color-gris-medio:  #6B7280;  /* Texto secundario */
--color-gris-claro:  #E5E7EB;  /* Bordes, dividers */
--color-blanco:      #FFFFFF;  /* Fondos de cards */
```

## Tailwind config (v4 CSS-first)

```css
/* En globals.css o tailwind.css */
@theme {
  --color-rosa: #F4B6C2;
  --color-rosa-dark: #E8929F;
  --color-turquesa: #4DD0E1;
  --color-turquesa-dark: #26C6DA;
  --color-crema: #FFF8F0;
  --color-crema-dark: #F5EDE0;
  --color-gris-text: #2D2D2D;
  --color-gris-secondary: #6B7280;

  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;

  --radius-card: 1rem;
  --radius-button: 0.5rem;
}
```

## Tipografía

| Token | Fuente | Uso |
|-------|--------|-----|
| `font-heading` | Playfair Display | H1–H3, nombres de productos |
| `font-body` | Inter | Párrafos, labels, UI |

```html
<!-- Headings con Playfair -->
<h1 class="font-heading text-4xl font-bold text-gris-text">Pasteles</h1>

<!-- Body con Inter -->
<p class="font-body text-base text-gris-secondary">Descripción...</p>
```

## Componentes base

### Button primario (turquesa)
```html
<button class="
  bg-turquesa hover:bg-turquesa-dark
  text-white font-body font-semibold
  px-6 py-3 rounded-button
  transition-colors duration-200
  focus-visible:outline-2 focus-visible:outline-turquesa focus-visible:outline-offset-2
">
  Cotizar por WhatsApp
</button>
```

### Button secundario (rosa)
```html
<button class="
  bg-rosa hover:bg-rosa-dark
  text-gris-text font-body font-semibold
  px-6 py-3 rounded-button
  transition-colors duration-200
  focus-visible:outline-2 focus-visible:outline-rosa focus-visible:outline-offset-2
">
  Ver catálogo
</button>
```

### Card de producto
```html
<article class="
  bg-white rounded-card shadow-sm
  hover:shadow-md transition-shadow duration-200
  overflow-hidden
">
  <div class="aspect-square relative"><!-- imagen --></div>
  <div class="p-4">
    <h3 class="font-heading text-lg font-semibold text-gris-text">Nombre</h3>
    <p class="font-body text-sm text-gris-secondary mt-1">Descripción corta</p>
  </div>
</article>
```

### Badge de categoría
```html
<span class="
  inline-flex items-center
  bg-rosa/20 text-gris-text
  text-xs font-body font-medium
  px-2.5 py-0.5 rounded-full
">
  Pasteles de boda
</span>
```

## Espaciado y layout

- Padding de sección: `py-16 md:py-24`
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Grid de productos: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`

## Animaciones permitidas
- `transition-colors duration-200` — hover de botones
- `transition-shadow duration-200` — hover de cards
- `transition-transform duration-300` — slide de menú móvil

## Dark mode
No implementado. No agregar `dark:` classes todavía.

## Accesibilidad mínima en componentes
- Foco visible en todos los interactivos: `focus-visible:outline-2`
- No depender solo del color para comunicar estado
- Contraste texto/fondo ≥ 4.5:1 (verificar con gris-text sobre crema: ✓ ratio ~14:1)
