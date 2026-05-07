# Deployment Checklist — BakingArt GDL

## 1. Sanity project setup (one-time)

- [ ] Create project at sanity.io/manage → "New Project"
- [ ] Note `Project ID` and `Dataset` name (usually `production`)
- [ ] Add CORS origins in sanity.io/manage → API → CORS:
  - `http://localhost:3000`
  - `https://your-vercel-domain.vercel.app`
  - `https://*.vercel.app`
  - `https://your-custom-domain.com` (when you have one)

## 2. Local .env.local

Create `/Volumes/Dock/Repository/website_bakingart/.env.local` (never commit this file):

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_WHATSAPP_NUMBER=5213312345678
SANITY_WEBHOOK_SECRET=any_random_string_you_generate
```

Generate `SANITY_WEBHOOK_SECRET`: run `openssl rand -hex 32` in terminal.

## 3. Vercel deploy

1. Push branch to GitHub
2. Import repo in vercel.com → "New Project"
3. Set all env vars (same 5 as above) in Vercel dashboard → Settings → Environment Variables
4. Deploy → note your production URL

## 4. Sanity ISR webhook (after first deploy)

In sanity.io/manage → API → Webhooks → "Create webhook":
- **URL**: `https://your-domain.vercel.app/api/revalidate`
- **Dataset**: `production`
- **Trigger on**: Create, Update, Delete
- **Filter**: `_type in ["pastel", "siteConfig"]`
- **HTTP method**: POST
- **Secret**: same value as `SANITY_WEBHOOK_SECRET`

## 5. GitHub Actions secrets (for backup.yml)

GitHub repo → Settings → Secrets and variables → Actions:

| Secret | Value | How to get |
|--------|-------|------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | your project ID | sanity.io/manage → project |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | sanity.io/manage → datasets |
| `SANITY_API_READ_TOKEN` | Viewer token | sanity.io/manage → API → Tokens → "Add API token" → **Viewer** |

After adding secrets, go to Actions → "Sanity Dataset Backup" → "Run workflow" to verify it works.

## 6. First content setup (in Studio)

1. Visit `your-domain.vercel.app/studio`
2. Create **Configuración del sitio** (singleton — fill whatsappNumber)
3. Create 3–6 **Pasteles** with real photos
4. Publish each → verify they appear on `/pasteles`

## 7. Verify

- [ ] `/pasteles` shows real photos (not emoji fallback)
- [ ] WhatsApp buttons use correct number
- [ ] Editing a pastel in Studio → site updates within 30s
- [ ] `/studio` accessible and authenticated
- [ ] GitHub Actions backup runs without error

## Architecture notes

- `useCdn: false` in `src/lib/sanity/client.ts` — **do not change**. Required for `revalidateTag` ISR to work.
- Fallback emoji cards shown when Sanity has 0 pasteles — site always renders something.
- ISR revalidation triggered by Sanity webhook → `POST /api/revalidate` → `revalidateTag("pastel")`.
- Sanity free tier: 10k docs, 100k API req/month, 10 GB asset bandwidth/month.
