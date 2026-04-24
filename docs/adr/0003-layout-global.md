# ADR 0003: Layout Global
Slug: 03-layout-global
Fecha: 2026-04-23
Estado: Aceptado

## Contexto

Se necesita una carcasa de navegación persistente (header + footer) que aparezca en todas las páginas del sitio. El header requiere manejo de estado (scroll shadow, toggle del menú móvil, ruta activa), lo que obliga a decidir el límite Server/Client Component. La app ya tiene `src/app/layout.tsx` con las fuentes configuradas; este feature añade componentes que se importan directamente en ese layout.

El negocio opera exclusivamente por WhatsApp — el CTA principal de cada página es un enlace a `wa.me`. El número debe ser configurable sin redeploy. Los nav links son conocidos y estables; Sanity no tiene schemas todavía y la navegación dinámica es scope futuro.

## Decisiones

### Component split (Server vs Client boundary)

```
src/components/layout/
├── header.tsx          → Server Component (shell + semántica)
├── nav-desktop.tsx     → Client Component ("use client") — usePathname para link activo
├── nav-mobile.tsx      → Client Component ("use client") — useState drawer + focus trap
├── scroll-header.tsx   → Client Component ("use client") — useEffect scroll shadow
└── footer.tsx          → Server Component (solo HTML estático)
```

**Decisión**: el `<Header>` raíz es Server Component. El estado de scroll shadow se aisla en un wrapper `<ScrollHeader>` que es Client Component y envuelve el `<header>` HTML con la clase de sombra dinámica. Los nav links de escritorio se mueven a `<NavDesktop>` (Client) solo por `usePathname`. El drawer móvil vive en `<NavMobile>` (Client).

**Rationale**: mantener el máximo de superficie como Server Components reduce el JS enviado al cliente. El único estado que necesita el header completo es la sombra de scroll — se contiene en el wrapper más pequeño posible. `usePathname` de `next/navigation` requiere Client Component; se usa solo en los dos nav components.

### File structure (exact paths)

```
src/
├── app/
│   └── layout.tsx                    MODIFICAR — importar Header y Footer
├── components/
│   └── layout/
│       ├── header.tsx                CREAR — Server Component, shell del header
│       ├── nav-desktop.tsx           CREAR — Client Component, links + link activo
│       ├── nav-mobile.tsx            CREAR — Client Component, hamburguesa + drawer
│       ├── scroll-header.tsx         CREAR — Client Component, scroll shadow wrapper
│       └── footer.tsx                CREAR — Server Component, footer estático
└── lib/
    └── nav-links.ts                  CREAR — array de nav items (label + href)
```

`layout.tsx` queda así:

```tsx
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body className="min-h-screen antialiased bg-crema text-gris-text font-body">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-crema focus:px-4 focus:py-2 focus:rounded focus:text-gris-text focus:font-semibold">
          Ir al contenido
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

### Navigation links data

**Decisión**: array hardcodeado en `src/lib/nav-links.ts`. No se consulta Sanity.

```typescript
// src/lib/nav-links.ts
export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Inicio",       href: "/" },
  { label: "Pasteles",     href: "/pasteles" },
  { label: "Cursos",       href: "/cursos" },
  { label: "Promociones",  href: "/promociones" },
  { label: "Nosotros",     href: "/nosotros" },
];
```

**Rationale**: Sanity no tiene schemas de navegación en este sprint. Hardcodear en un archivo dedicado (no inline en el componente) permite migrar a Sanity en una sola edición cuando llegue el momento — el componente no cambia, solo la fuente del array. Un archivo `.ts` puro también es consumible desde Server Components sin overhead de fetch.

**Migración futura**: cuando `nav-config` exista en Sanity, `nav-links.ts` se reemplaza por un fetch; los componentes consumen `NavLink[]` sin cambios.

### WhatsApp number handling

**Decisión**: `NEXT_PUBLIC_WHATSAPP_NUMBER` como variable de entorno de Next.js.

```typescript
// src/lib/whatsapp.ts
export function getWhatsAppHref(message?: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  if (!number) return "#";
  const encoded = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${encoded}`;
}
```

**Rationale**:
- Hardcodear el número en código fuente expone datos personales en el repositorio — descartado.
- Un fetch a Sanity solo para el número del header añade latencia y complejidad innecesaria; el número no cambia frecuentemente — descartado por ahora.
- `NEXT_PUBLIC_` hace el valor disponible en el bundle del cliente, necesario para componentes Client que renderizan el `href`. Sin embargo, el valor no es secreto (es un número público de negocio).
- Fallback a `"#"` con `aria-disabled="true"` evita que un `.env.local` sin configurar rompa el render.

Cuando Karenina quiera cambiar el número: edita `.env.local` + redeploy (Vercel). No requiere cambio de código.

### Mobile menu implementation

**Decisión**: `useState` + CSS `transform/translate` — no CSS-only, no librería de dialog.

```tsx
// src/components/layout/nav-mobile.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function NavMobile() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Cerrar al cambiar de ruta
  useEffect(() => { setOpen(false); }, [pathname]);

  // Cerrar al pasar a desktop (≥ 1024px)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => { if (e.matches) setOpen(false); };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Focus trap manual (Tab / Shift+Tab)
  // Escape cierra + devuelve foco a triggerRef
  // ...
}
```

Drawer: `position: fixed`, `inset-y-0 right-0 w-72`, `transform: translateX(100%)` cerrado → `translateX(0)` abierto, `transition-transform duration-300`. Overlay: `fixed inset-0 bg-gris-text/40`.

**Rationale**:
- CSS-only (`:checked` hack o `:has()`) no permite focus trap real ni `aria-expanded` reactivo — descartado por accesibilidad.
- `@radix-ui/react-dialog` ya está disponible vía shadcn/ui pero agrega un portal al `<body>` con comportamiento de focus trap propio. Usarlo introduce dependencia en un componente tan simple; además el patrón de shadcn/ui `Sheet` (drawer) resolvería lo mismo pero añade un archivo más de configuración. Se prefiere implementación manual por control total y tamaño de bundle.
- No se usa `Headless UI` ni `react-aria` para evitar dependencias nuevas.

**Focus trap**: implementación manual con `querySelectorAll` de focusables dentro del drawer + listeners de `keydown`. Patrón estándar, sin librería.

### Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| `usePathname` causa hydration mismatch | Baja | Alto | `usePathname` es seguro en App Router — retorna `null` en SSR, string en cliente; condicionar clases solo al valor no-null |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` ausente en producción | Media | Alto | Fallback a `href="#"` + `aria-disabled`; CI check con `grep WHATSAPP .env.example` |
| Focus trap roto en Safari (iOS) | Media | Medio | Test manual en Safari iOS; usar `tabindex="0"` explícito en elementos que no son focusables por defecto |
| Drawer no cierra al resize | Baja | Bajo | `matchMedia` listener cubre el caso; testeado con DevTools |
| Header sticky tapa anclas (`#section`) | Alta | Medio | Añadir `scroll-margin-top` a secciones con ID — documentado como deuda para features de página |
| Conflicto `z-index` con modales futuros | Baja | Medio | Convención: header `z-50`, modales `z-[60]+`, drawer `z-[55]` — documentar en design-tokens |

## Alternativas descartadas

- **Header 100% Client Component**: innecesario — solo el drawer y el scroll shadow necesitan estado. Pagar el costo de hidratación completa del header por comodidad es un trade-off desfavorable.
- **CSS-only hamburguesa (`:has()` / checkbox hack)**: no permite focus trap accesible ni `aria-expanded` reactivo. Incompatible con WCAG 2.1 AA.
- **shadcn/ui `Sheet` para el drawer**: agrega un archivo de configuración extra y un portal al body. La implementación manual de un drawer tan simple es equivalente en complejidad y da más control sobre el z-index y la animación.
- **Nav links en Sanity desde el inicio**: Sanity no tiene schemas aún. Añadir un fetch de navegación en el layout global en un schema inexistente bloquearía el desarrollo.
- **Número de WhatsApp hardcodeado**: expone datos personales en el repo. Descartado por privacidad y mantenibilidad.
- **Fetch de WhatsApp a Sanity**: latencia añadida en cada request al layout global (SSR); el número no es contenido editorial. Descartado por over-engineering.

## Impacto en features existentes

- **`src/app/layout.tsx`**: se añaden importaciones de `<Header>` y `<Footer>`, el skip-link, y `<main id="main-content">` envolviendo `{children}`. Ninguna de las configuraciones de fuente ni metadata existentes cambia.
- **`02-design-system`**: se consume `Button` variante `brand-primary` para el CTA WhatsApp. No se modifica ningún componente del design system.
- **`globals.css`**: sin cambios — los tokens ya cubren todos los colores necesarios (`bg-crema`, `text-gris-text`, `border-rosa`, `bg-gris-text`, `text-crema`).
- **Páginas futuras**: todas heredan `<Header>` y `<Footer>` automáticamente por estar en `layout.tsx`. Deben incluir `id="main-content"` en su contenedor raíz solo si la página no tiene el `<main>` del layout (no aplica — el `<main>` vive en el layout).
