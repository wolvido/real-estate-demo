# Real Estate Demo

A static client demo based on **C1 — Company & Trust / M1 Soft Blue**. React, TypeScript, Vite, and our own components with plain CSS and CSS Modules. No Tailwind or third-party component framework.

## Run locally

Use Node 24 LTS and npm.

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

The production files are generated in `dist/`.

## Current pages

- Home and Properties share one page. The company introduction leads into the full catalog. Navigation scrolls between sections and follows the visible section.
- Property Details uses the selected record, an illustrative photo gallery, availability, related listings, and a property-specific inquiry form.
- About, Services, Contact, and Privacy use the current C1 public shell.
- Admin demo entry, Property Records, Property Editor, and Inquiries show one administrator's workflows.
- Company Content and Staff Access remain deferred.

Search combines location, sale/rent, type, and budget. Choosing a sale or rental budget selects the corresponding offering. Sale and monthly rental prices are sorted separately. The public catalog starts with six listings and appends more as you scroll. A Show more properties button is available as a fallback. Results include progress, sorting, reset, empty states, and a completion message. Admin tables retain pagination.

The 20 bundled properties are fictional examples from Davao and Mindanao. Prices use PHP and areas use sqm. The company identity, service descriptions, and contact information remain samples. Images are illustrative and bundled locally from the reviewed design exports.

## Try the complete journey

1. Browse properties on Home and open a listing.
2. Submit an inquiry using fictional information. It stays on this device; no message is sent.
3. Choose **Admin demo** in the footer, then **Enter admin demo**. No password is needed.
4. Review the inquiry, add a sample note, and mark it handled.
5. Edit a listing, choose and reorder sample photos, or add a new draft.
6. Publish the listing and return to the public website to see the changes.
7. Use **Reset demo** to restore the original properties and sample inquiries.

Listing publication and availability are independent. Drafts, unpublished records, and archived records stay out of public browsing. While in the admin demo, a hidden record can be previewed with an explicit administrator-preview label. This is a demo convenience, not access protection.

Edits, inquiries, and inquiry status are remembered with namespaced browser storage when available. If storage is blocked, the demo stays usable for that visit. Records are not shared with another browser or device. Reset clears only this demo's stored records and restores the fictional fixtures. Exports download CSV files; notification retry is a labeled simulation.

## Design reference and validation

Current Stitch project: [Project 1 — C1 Company & Trust / M1 Soft Blue](https://stitch.withgoogle.com/projects/11829459736944564846).

Exact page IDs are recorded in `docs/stitch-reference.json`. Read `docs/design-reference.md` and `docs/implementation-status.md` for scope and validation limits.

Reference documents: `D:\Users\Winzyl\Documents\Manifold\Winz Vault\projects\Real Estate Full`. The later C1 decisions supersede the original demo plan's old project link and separate Properties-page structure.

There is no database, application backend, external CMS, real authentication, or email integration. Deployment and production integrations are separate steps. This update is local; it has not been committed, pushed, or deployed. Planned hosting remains Cloudflare Workers Static Assets with SPA route fallback.
