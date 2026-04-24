---
name: whatsapp-integration
description: wa.me deep link construction, message templates by product type, URL encoding, and click analytics with Vercel Analytics. Load when implementing any WhatsApp CTA.
---

# WhatsApp Integration — BakingArt GDL

## Función base

```typescript
// src/lib/whatsapp.ts

type WhatsAppTemplate = 'pastel' | 'curso' | 'general'

interface WhatsAppLinkOptions {
  numero: string        // desde siteConfig de Sanity, formato: '521XXXXXXXXXX'
  template: WhatsAppTemplate
  contexto?: {
    nombre?: string     // nombre del producto/curso
    variante?: string   // tamaño, sabor, etc.
  }
}

export function buildWhatsAppLink({ numero, template, contexto }: WhatsAppLinkOptions): string {
  const mensaje = getTemplate(template, contexto)
  const encoded = encodeURIComponent(mensaje)
  return `https://wa.me/${numero}?text=${encoded}`
}

function getTemplate(template: WhatsAppTemplate, ctx?: WhatsAppLinkOptions['contexto']): string {
  switch (template) {
    case 'pastel':
      return ctx?.nombre
        ? `Hola! Me interesa cotizar el pastel "${ctx.nombre}"${ctx.variante ? ` (${ctx.variante})` : ''}. ¿Podrían darme más información?`
        : 'Hola! Me gustaría cotizar un pastel personalizado. ¿Pueden ayudarme?'

    case 'curso':
      return ctx?.nombre
        ? `Hola! Estoy interesada/o en el curso "${ctx.nombre}". ¿Hay lugares disponibles?`
        : 'Hola! Me gustaría información sobre los cursos de repostería disponibles.'

    case 'general':
    default:
      return 'Hola! Vi su página y me gustaría más información sobre sus productos.'
  }
}
```

## Uso en componente

```tsx
// Número siempre desde siteConfig — nunca hardcodeado
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { track } from '@vercel/analytics'

interface WhatsAppCTAProps {
  numero: string  // viene de siteConfig.whatsappNumero
  template: 'pastel' | 'curso' | 'general'
  productName?: string
  label?: string
}

export function WhatsAppCTA({ numero, template, productName, label }: WhatsAppCTAProps) {
  const href = buildWhatsAppLink({
    numero,
    template,
    contexto: { nombre: productName },
  })

  function handleClick() {
    track('whatsapp_click', { template, product: productName ?? 'none' })
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="/* clases tailwind del design system */"
      aria-label={`Cotizar ${productName ?? 'por WhatsApp'}`}
    >
      {label ?? 'Cotizar por WhatsApp'}
    </a>
  )
}
```

## Formato del número

```
Correcto:   521XXXXXXXXXX  (México: 52 + 1 + 10 dígitos)
Incorrecto: +521XXXXXXXXXX  (no incluir +)
Incorrecto: 521-XXXX-XXXX   (sin guiones)
```

El número se almacena en `siteConfig.whatsappNumero` en Sanity.
El campo tiene validación: `Rule.regex(/^521\d{10}$/)`.

## Analytics con Vercel

```typescript
// Eventos a trackear
track('whatsapp_click', {
  template,            // 'pastel' | 'curso' | 'general'
  product: string,     // nombre del producto o 'none'
  page: string,        // pathname
})
```

## Checklist de implementación
- [ ] Número viene de `siteConfig` de Sanity (Server Component fetch)
- [ ] `encodeURIComponent` aplicado al mensaje
- [ ] `target="_blank"` + `rel="noopener noreferrer"` en el link
- [ ] `aria-label` descriptivo
- [ ] `track()` en el onClick
- [ ] No hay número hardcodeado en ningún archivo de código
