# Spec: Layout Global
Slug: 03-layout-global
Fecha: 2026-04-23
Estado: READY_FOR_ARCH

## Problema / Oportunidad

BakingArt GDL no tiene aún un header ni un footer globales. Sin ellos, los visitantes no pueden navegar entre secciones, identificar la marca, ni encontrar las vías de contacto (WhatsApp, Instagram) que son el único canal de venta. Este feature entrega la carcasa persistente del sitio: header con identidad visual y navegación completa, y footer con información de negocio y enlaces directos, alineados con la referencia visual cupcady.mx.

## User Stories

**US-01 — Visitante / navegación**
Como visitante del sitio, quiero ver un menú de navegación claro con las categorías principales (Inicio, Pasteles, Cursos, Promociones, Nosotros), para encontrar lo que busco sin fricciones.

**US-02 — Visitante / contacto rápido**
Como visitante interesado en comprar, quiero un botón de WhatsApp prominente en el header, para iniciar una conversación con Karenina en un solo clic desde cualquier página.

**US-03 — Visitante móvil / menú**
Como visitante en celular, quiero un menú hamburguesa que abra un drawer con todos los enlaces, para navegar cómodamente en pantalla pequeña sin scroll horizontal.

**US-04 — Visitante / footer informativo**
Como visitante que llega al final de la página, quiero encontrar el nombre del negocio, un enlace directo a Instagram y otro a WhatsApp, para poder seguir la marca o hacer un pedido de inmediato.

**US-05 — Karenina / identidad de marca**
Como dueña, quiero que el header muestre el logotipo textual "BakingArt GDL" en Playfair Display y que la paleta rosa-turquesa-crema sea reconocible en toda la navegación, para reforzar la identidad visual del negocio.

## Criterios de Aceptación

### Header
- [ ] Logo textual "BakingArt GDL" en `font-heading` (Playfair Display), peso 700, enlaza a `/`
- [ ] Links de navegación: Inicio (`/`), Pasteles (`/pasteles`), Cursos (`/cursos`), Promociones (`/promociones`), Nosotros (`/nosotros`)
- [ ] Link activo muestra indicador visual (underline o color rosa) usando `usePathname()`
- [ ] Botón "Pedir por WhatsApp" (`brand-primary` del design system) abre `https://wa.me/<NUMERO>` en `_blank` con `rel="noopener noreferrer"`
- [ ] Header sticky (`sticky top-0 z-50`) con fondo crema y sombra sutil al hacer scroll
- [ ] Fondo: `bg-crema` con `border-b border-rosa/30`

### Mobile nav
- [ ] En viewport `< lg` se ocultan los nav links y el botón; aparece icono hamburguesa (Lucide `Menu`)
- [ ] Click en hamburguesa abre un drawer lateral (slide-in desde la derecha o top), fondo crema, ancho `w-72` o full-width en móvil muy pequeño
- [ ] Drawer contiene: logo textual, todos los nav links en vertical, botón WhatsApp, botón de cerrar (icono `X`)
- [ ] Focus trap activo mientras el drawer está abierto (Tab/Shift+Tab ciclan solo dentro del drawer)
- [ ] `aria-expanded` en el botón hamburguesa refleja el estado del drawer
- [ ] `role="dialog"` y `aria-modal="true"` en el drawer; `aria-label="Menú de navegación"`
- [ ] Tecla `Escape` cierra el drawer y devuelve el foco al botón hamburguesa
- [ ] Click en overlay (fondo semitransparente) cierra el drawer
- [ ] Cambio de ruta cierra el drawer automáticamente

### Footer
- [ ] Nombre del negocio: "BakingArt GDL" en `font-heading`
- [ ] Enlace a Instagram: `https://instagram.com/bakingartgdl` — abre en `_blank` con `rel="noopener noreferrer"`
- [ ] Enlace a WhatsApp: mismo número que el header — abre en `_blank`
- [ ] Texto de copyright: `© 2026 BakingArt GDL. Todos los derechos reservados.`
- [ ] Fondo: `bg-gris-text` (oscuro), texto en `text-crema` — contraste verificado ≥ 4.5:1
- [ ] Responsive: columna única en móvil, fila centrada en `md+`

### Accesibilidad general
- [ ] Todos los elementos interactivos tienen `focus-visible` ring (heredado del design system)
- [ ] Skip-to-content link como primer elemento del DOM: `<a href="#main-content">Ir al contenido</a>`
- [ ] Landmarks semánticos: `<header>`, `<nav aria-label="Navegación principal">`, `<main id="main-content">`, `<footer>`
- [ ] Links externos tienen `aria-label` explícito o texto descriptivo (no solo "click aquí")

### Scroll shadow en header
- [ ] Sin scroll: sin sombra; con scroll (> 0px): `shadow-sm` — se activa con `useEffect` + `window.addEventListener("scroll")`

## Edge Cases

- **Número de WhatsApp no configurado**: si `NEXT_PUBLIC_WHATSAPP_NUMBER` está vacío/ausente, el botón se renderiza con `href="#"` y `aria-disabled="true"` — no rompe el build
- **Ruta no reconocida**: el indicador de link activo no explota si `pathname` no coincide con ningún nav item
- **Fuente no cargada (FOIT)**: Playfair Display tiene `display: swap` — el logo textual muestra serif del sistema hasta que carga; tipografía de fallback: `Georgia, serif`
- **Drawer abierto + resize a desktop**: al pasar de móvil a `lg+`, el drawer debe cerrarse automáticamente para evitar superposición con el nav de escritorio
- **SSR**: componentes con `useState`/`useEffect`/`usePathname` marcados `"use client"` — el Server Component raíz no puede usar hooks

## Assets requeridos

- Icono hamburguesa: `Menu` de `lucide-react` (ya instalado con shadcn/ui)
- Icono cerrar: `X` de `lucide-react`
- Icono Instagram: SVG inline o `lucide-react` `Instagram`
- Número de WhatsApp de Karenina: provisto como `NEXT_PUBLIC_WHATSAPP_NUMBER` en `.env.local` (ej. `521XXXXXXXXXX`)
- No se requiere logo gráfico — logotipo es texto

## Fuera de scope

- Nav links dinámicos desde Sanity CMS (feature futuro)
- Mega-menú con subcategorías
- Selector de idioma
- Modo oscuro
- Animaciones complejas (solo `transition-transform` para el drawer)
- Breadcrumbs
- Barra de anuncio / banner promocional encima del header
- Autenticación o menú de usuario

## Dependencias

- `02-design-system` DONE: tokens de color, `Button` con variante `brand-primary`, `font-heading`, `font-body` disponibles ✓
- `01-setup-scaffolding` DONE: `layout.tsx` existe, fuentes ya cargadas, `bg-crema text-gris-text` en `<body>` ✓
- `lucide-react` instalado como dependencia de shadcn/ui ✓
- Variable de entorno `NEXT_PUBLIC_WHATSAPP_NUMBER` debe definirse en `.env.local` antes de QA
