# Current design reference

Use [Project 1 — C1 Company & Trust / M1 Soft Blue](https://stitch.withgoogle.com/projects/11829459736944564846), project ID `11829459736944564846`. The old project `7173783488663285669` is historical reference only and must not be modified.

The original C1 baseline is retained as screen `8290053624029887183`. Home + Properties is screen `15186841812853264350`. The exact current page IDs and export fingerprints are recorded in `stitch-reference.json`.

## Implementation mapping

| Reviewed screen | Demo route |
| --- | --- |
| 01 — Home + Properties | /#home and /#properties |
| 03 — Property Details / Reviewed revision | /properties/:slug |
| 04 — About Us / Reviewed revision | /about |
| 05 — Services | /services |
| 06 — Contact / Reviewed revision | /contact |
| 07 — Privacy Information | /privacy |
| 08 — Administrator Sign-in | /admin, explicit demo entry |
| 09 — Administrator Properties | /admin/properties |
| 10 — Property Editor | /admin/properties/:id/edit and /admin/properties/new |
| 13 — Administrator Inquiries | /admin/inquiries |

Company Content and Staff Access are deferred. The legacy /properties address redirects to Home's catalog.

## Visual rules

User correction — 2026-10-12: the public website fills the browser width. Remove the centered 1280px outer frame, page border, and top gap. Header, footer, section backgrounds, and content grids span the available desktop width with modest responsive inner padding. The fixed-width Stitch canvas is a reference viewport, not a runtime page-width limit.

Company first, modern and welcoming, Davao/Mindanao, PHP, sqm. Preserve C1's human team photograph, company introduction, open catalog, service sections, dark footer, and supporting public-page structure.

Use Plus Jakarta Sans, #365FA8 primary, #2D508E hover, #F0F4FA tint, #0F172A headings, #334155 body, #64748B muted, and #E2E8F0 rules. Shared controls, typography, navigation, and section spacing belong in our own React/CSS components. Avoid excessive cards, nested rounded panels, colored left strips, bento layouts, clutter, and overly sparse navigation.

The exports are visual references. Their Tailwind classes and static placeholder controls are not retained as application dependencies. The demo implements real browser-local navigation, forms, record changes, filtering, sorting, pagination, and galleries.

## Demo adaptations

User correction — 2026-10-12: public listings append six more records when the visitor scrolls near the end of the displayed grid. Previous records stay visible. Replace public pagination with a clear Show more properties fallback button, readable progress, and an end-of-results message. Search and sort reset the visible batch. Admin tables retain pagination. This supersedes the static Home export's pagination controls.

Sign-in becomes an explicit admin demo entry without asking for credentials. Privacy text describes actual browser-local demo behavior. Notification delivery is absent; the sample retry state is labeled simulated. Functional Reset demo and Admin demo links appear in the footer. Public company contact details remain unconfirmed placeholders.

The catalog sorts actual featured flags and current property records, so ordering can differ from static example rows. Each detail route uses its own property rather than the exports' repeated sample destination. Only published records appear in public browsing.

Image assets are bundled locally. `sample-image-sources.json` records their exact reviewed-export provenance. These are illustrations, not actual photographs of the fictional properties.

Authoritative source folder: D:\Users\Winzyl\Documents\Manifold\Winz Vault\projects\Real Estate Full.
