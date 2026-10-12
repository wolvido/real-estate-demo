# Deploy the client demo

Latest update: mobile navigation deployed as `955adb74-ac37-47bf-a225-d8a19dd2c4fa`. The mobile menu uses vertical 52px link rows, subtle dividers, a soft-blue active state, and a full-width contact button. Selection closes the menu. Build and hosted 390px/320px mobile checks passed; desktop navigation remains horizontal. Initial deployment checks below are historical; current checks are in `deployment-record.json`.

## Current deployment

Deployed 2026-10-12: https://real-estate-demo.real-estate-demo.workers.dev

Cloudflare confirms initial version `071b96fe-ddb6-4aed-92d6-d39d637e7ab5` was active at 100% on initial deployment, and the workers.dev route is enabled. The initial HTTPS issue cleared. Normal HTTPS requests, the live homepage, all 10 direct routes, and all 13 non-HTML assets passed verification. Browser checks passed for scroll loading, search reset, property/gallery/inquiry flow, admin handling and notes, listing edits, refresh persistence, and reset. QA changes were cleared from the verification browser. Details and built asset hashes are recorded in `deployment-record.json`; HTTP checks are in `hosted-http-checks.json`.

The chosen host is Cloudflare Workers Static Assets. This application deploys the files in `dist/` without a database or Worker application script. `wrangler.toml` enables React page links and direct-route refreshes through SPA fallback.

## First deployment

1. Create or sign in to a Cloudflare account. Use the free plan for this static demo.
2. Open PowerShell in `D:\repo\real-estate-demo` with Node 24 enabled. Confirm with `node --version`; the application requires Node 24 or newer.
3. Run these commands one at a time:

```powershell
Set-Location 'D:\repo\real-estate-demo'
npm run build
npx wrangler login
npx wrangler deploy
```

`login` opens a browser for Cloudflare authorization. If npm asks to install Wrangler, accept that installation. Stop if the build or login fails. Deployment may ask you to choose an account or configure a workers.dev subdomain.

When deployment succeeds, Wrangler prints the actual `workers.dev` URL. Open that URL and share it with the client. No custom domain is required. The first CLI deployment does not require pushing the code to GitHub.

The configured Worker name is `real-estate-demo`. If a Worker with that name already exists in the selected account, deployment updates it; use a different name in `wrangler.toml` if that existing Worker is unrelated.

## Later updates

```powershell
npm run build
npx wrangler deploy
```

Use the same Cloudflare account and Worker name to update the same demo URL. Always rebuild before deploying so `dist/` contains the latest changes.

GitHub auto-deployment can be connected later through Workers Builds after the current changes are committed and pushed. Use build command `npm run build`, deploy command `npx wrangler deploy`, repository root as the project directory, and Node 24. The dashboard Worker name must match `real-estate-demo` in `wrangler.toml`.

## Check the deployed demo

- Open `/`, `/about`, `/contact`, a property URL, and `/admin` directly; refresh each to check SPA routing.
- Confirm that photos and fonts load and properties append as you scroll.
- Try a sample inquiry, admin entry, listing edit, publish/unpublish, and reset.
- Saved demo edits remain specific to that browser and hosted URL. Local-preview changes do not transfer to the hosted demo or to the client's browser.

The first deployment was performed by Codex after the user completed Cloudflare browser authorization. The instructions above describe how to publish subsequent updates from the user's terminal.

Official references: [static assets deployment](https://developers.cloudflare.com/workers/static-assets/get-started/), [SPA routing](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/), [static asset pricing](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/), [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/).
