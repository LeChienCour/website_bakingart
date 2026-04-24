---
name: accessibility-wcag
description: WCAG 2.2 AA checklist — color contrast ratios, focus states, ARIA for interactive components, keyboard navigation, alt text for Sanity images, skip links. Load before finalizing any component.
---

# Accesibilidad WCAG 2.2 AA — BakingArt GDL

## Contraste de color (SC 1.4.3 / 1.4.11)

| Combinación | Ratio | Estado |
|-------------|-------|--------|
| #2D2D2D sobre #FFF8F0 | ~14:1 | ✓ AAA |
| #2D2D2D sobre #FFFFFF | ~18:1 | ✓ AAA |
| #2D2D2D sobre #F4B6C2 | ~6.5:1 | ✓ AA |
| #2D2D2D sobre #4DD0E1 | ~4.8:1 | ✓ AA |
| #FFFFFF sobre #4DD0E1 | ~2.8:1 | ✗ FALLA — no usar |
| #FFFFFF sobre #F4B6C2 | ~1.6:1 | ✗ FALLA — no usar |

Texto grande (≥18pt o ≥14pt bold): umbral 3:1.

## Focus states (SC 2.4.7 / 2.4.11)

```html
<!-- Siempre usar focus-visible, nunca outline:none sin alternativa -->
<button class="focus-visible:outline-2 focus-visible:outline-turquesa focus-visible:outline-offset-2">
```

```css
/* En globals.css — eliminar focus para mouse, preservar para teclado */
:focus:not(:focus-visible) { outline: none; }
:focus-visible { outline: 2px solid #4DD0E1; outline-offset: 2px; }
```

## Imágenes (SC 1.1.1)

```tsx
// Imagen de Sanity — alt SIEMPRE
<Image
  src={urlFor(imagen).width(800).url()}
  alt={imagen.alt ?? ''}  // campo 'alt' en schema de Sanity
  width={800}
  height={600}
/>

// Imagen decorativa
<Image src={...} alt="" role="presentation" width={...} height={...} />
```

## Skip link (SC 2.4.1)

```tsx
// Primer elemento en layout.tsx, antes del header
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-turquesa text-white px-4 py-2 rounded"
>
  Ir al contenido principal
</a>

// En page.tsx
<main id="main-content" tabIndex={-1}>
  {children}
</main>
```

## Formularios (SC 1.3.1, 3.3.2)

```tsx
// Label siempre explícito — no placeholder como sustituto
<div>
  <label htmlFor="nombre" className="font-body text-sm font-medium text-gris-text">
    Nombre *
  </label>
  <input
    id="nombre"
    name="nombre"
    type="text"
    required
    aria-required="true"
    aria-describedby={errors.nombre ? 'nombre-error' : undefined}
  />
  {errors.nombre && (
    <p id="nombre-error" role="alert" className="text-red-600 text-sm mt-1">
      {errors.nombre}
    </p>
  )}
</div>
```

## Navegación con teclado (SC 2.1.1)

```tsx
// Menú móvil — focus trap cuando está abierto
import { useFocusTrap } from '@/hooks/useFocusTrap' // hook custom

// Orden de foco lógico — no usar tabIndex > 0
// Elementos ocultos fuera del foco — aria-hidden="true" o display:none

// Dropdown / Menú
<nav aria-label="Navegación principal">
  <ul role="list">
    <li><a href="/pasteles">Pasteles</a></li>
    <li><a href="/cursos">Cursos</a></li>
  </ul>
</nav>
```

## ARIA para componentes interactivos

```tsx
// Botón que actúa como toggle
<button
  aria-expanded={isOpen}
  aria-controls="menu-id"
  aria-label="Abrir menú de navegación"
>

// Carousel / slider
<section aria-label="Imágenes del producto" aria-roledescription="carrusel">
  <div role="group" aria-roledescription="diapositiva" aria-label="1 de 5">

// Loading state
<div aria-live="polite" aria-atomic="true">
  {isLoading && <span className="sr-only">Cargando productos...</span>}
</div>
```

## Checklist pre-merge
- [ ] Contraste ≥ 4.5:1 en texto normal, ≥ 3:1 en texto grande
- [ ] Skip link presente en layout.tsx
- [ ] Todas las imágenes con alt (o alt="" si decorativas)
- [ ] Focus visible en todos los elementos interactivos
- [ ] No hay `tabIndex > 0`
- [ ] No hay `outline: none` sin alternativa visible
- [ ] Formularios con labels explícitos y mensajes de error descriptivos
- [ ] Lighthouse Accessibility ≥ 90
- [ ] Navegación funciona completamente con teclado (Tab, Enter, Escape)
