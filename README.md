# Real Estate Demo

A static client demonstration based on the approved **M1 Soft Blue** design. React, TypeScript, and Vite; our own React components with plain CSS and CSS Modules. No Tailwind or third-party component framework.

## Run locally

Use **Node 24 LTS** and npm.

```sh
npm ci
npm run dev
```

Open the address printed by Vite (normally http://127.0.0.1:5173).

```sh
npm test
npm run build
npm run preview
```

`build` checks TypeScript and produces `dist/`. `preview` serves that production build locally.

## Current increment

Home follows the reviewed layout and photographs. Search combines location, buying/renting, property type, and price. Property previews and inquiry dialogs work with fictional sample data. Inquiries stay in this browser; **no message is sent**. Reset demo clears this demo's saved inquiries.

Home navigation currently jumps to sections on Home. Property details are previews; dedicated pages come in subsequent increments. The demo has 20 fictional listings in Davao City, Samal, Panabo, Tagum, Digos, Mati, General Santos, Cagayan de Oro, and Malaybalay. Six are featured on Home; View all and search expose the complete inventory. Prices use Philippine pesos (PHP/₱), rental prices are monthly, and areas use square metres with floor/lot labels. Location suggestions come from the inventory. Prices and specifications are invented demo values; the original design photographs are reused and labelled illustrative, not actual photos of these places.

There is no database, application backend, real sign-in, or email service. Production integrations are a separate stage. No deployment or GitHub push is part of this increment.

## Sources and next pages

Authoritative documents: `D:\Users\Winzyl\Documents\Manifold\Winz Vault\projects\Real Estate Full`.

Read `Project 1 - Static Client Demo Plan.md` there for the agreed scope. Design references and image provenance are in `docs/`.

Next: Properties, Property Details, About, Services, Contact, and Privacy, followed by the demo admin pages. Build and review one page at a time. Planned hosting is Cloudflare Workers Static Assets on a provider URL; hosting is not configured yet.
