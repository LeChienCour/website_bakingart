---
name: vercel-deployment
description: Vercel Hobby plan constraints (100GB bandwidth, 100k invocations/month), env var setup, preview deployments workflow, Sanity webhook for ISR revalidation, custom domain and DNS configuration. Load for any deployment task.
---

# Vercel Deployment — BakingArt GDL

## Límites del plan Hobby

| Recurso | Límite | Alerta en |
|---------|--------|-----------|
| Bandwidth | 100 GB/mes | 70 GB |
| Serverless invocations | 100,000/mes | 70,000 |
| Build minutes | 6,000/mes | 4,000 |
| Function duration | 10s máx | — |
| Function memory | 1024 MB | — |
| Cron jobs | No disponible | — |

Si se alcanzan límites: escalar imágenes vía Sanity CDN (no Vercel Image Optimization) para reducir bandwidth.

## Variables de entorno requeridas

```bash
# En Vercel Dashboard → Settings → Environment Variables

# Públicas (disponibles en browser)
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
NEXT_PUBLIC_SANITY_DATASET=production

# Privadas (solo server-side)
SANITY_API_TOKEN=sk...         # Token con permisos read (para ISR)
SANITY_WEBHOOK_SECRET=...      # Secret para validar webhooks
```

**Nunca en `.env.local` commiteado. Nunca en código fuente.**

## vercel.json mínimo

```json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "no-store" }
      ]
    }
  ]
}
```

## Flujo de preview deployments

1. PR abierta → Vercel crea preview URL automáticamente
2. URL formato: `https://website-bakingart-{hash}-diego-sandovals-projects.vercel.app`
3. QA corre contra esta URL (ver agente `qa-tester`)
4. Merge a `main` → deploy a producción automático

## Sanity webhook → ISR revalidation

### Configurar en Sanity (una sola vez)
1. Sanity Dashboard → API → Webhooks → Add webhook
2. Name: `Next.js ISR Revalidation`
3. URL: `https://bakingartgdl.com/api/revalidate`
4. Dataset: `production`
5. Triggers: `create`, `update`, `delete`
6. HTTP method: `POST`
7. **Signing secret**: pegar el valor de `SANITY_WEBHOOK_SECRET` en el campo "Secret" del webhook.
   → Sanity firma el request con HMAC-SHA256 en el header `sanity-webhook-signature`.
   → `parseBody` de `next-sanity/webhook` lee ese header — NO configurar un Authorization header custom.

### Verificar que funciona
Usar la herramienta de test integrada en Sanity Dashboard → Webhooks → Send test notification.
El curl con Bearer token NO reproduce la firma HMAC y dará `Invalid signature`.

## Dominio personalizado

1. Vercel → proyecto → Settings → Domains → Add domain
2. Ingresar: `bakingartgdl.com`
3. Configurar en registrador de dominio:
   ```
   Tipo A    @     76.76.21.21
   CNAME     www   cname.vercel-dns.com
   ```
4. SSL provisioned automáticamente (Let's Encrypt)
5. Verificar: `https://bakingartgdl.com` → redirect `www` → apex (o viceversa)

## GitHub Action — CI (type check + lint en cada PR)

```yaml
# .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main]
  pull_request:

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npx tsc --noEmit
      - run: next lint
      - run: next build
        env:
          NEXT_PUBLIC_SANITY_PROJECT_ID: ${{ secrets.NEXT_PUBLIC_SANITY_PROJECT_ID }}
          NEXT_PUBLIC_SANITY_DATASET: production
```

## GitHub Action — backup semanal de Sanity

```yaml
# .github/workflows/sanity-backup.yml
name: Sanity Weekly Backup
on:
  schedule:
    - cron: '0 2 * * 0'  # Domingos 2am UTC
  workflow_dispatch:

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Set date
        id: date
        run: echo "value=$(date +%Y%m%d)" >> $GITHUB_OUTPUT
      - name: Export Sanity dataset
        run: |
          npx sanity@latest dataset export production backup-${{ steps.date.outputs.value }}.tar.gz \
            --project-id ${{ secrets.SANITY_PROJECT_ID }} \
            --token ${{ secrets.SANITY_API_TOKEN }}
      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          # shell substitution no funciona en `with` — usar step output
          name: sanity-backup-${{ steps.date.outputs.value }}
          path: '*.tar.gz'
          retention-days: 30
```

## Checklist de deploy
- [ ] Variables de entorno en Vercel (no en código)
- [ ] `next build` pasa sin errores localmente
- [ ] Preview URL verificada por QA
- [ ] Webhook Sanity apuntando a URL correcta
- [ ] Dominio custom con SSL activo
- [ ] `sitemap.xml` accesible en producción
- [ ] No hay `console.error` en Vercel Functions logs
