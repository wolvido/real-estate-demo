# Approved design reference

- Stitch project: [Project 1 — M1 Soft Blue](https://stitch.withgoogle.com/projects/7173783488663285669)
- Baseline screen: `c3a1e2822a2c478ca160ef2f0af382e9`
- Reviewed Home: `1ea723147e8742e984b86ad319f34ce3`
- Exported Home: `C:\Users\User\.codex\.chatgpt-projects\g-p-6ac7630ef82c819180af5fd3435b3e0c\exports\first-three\home.html`
- Reviewed page index: same project workspace, `exports\reviewed-pages.json`.

Keep the soft blue `#365FA8`, Plus Jakarta Sans typography, open sections, modest dividers, unboxed property previews, and original photographs. Avoid nested rounded panels, left color stripes, bento layouts, and unnecessary minimalism. Desktop is the design review baseline; the page should still function at narrower widths.

The exported markup is a visual reference. The implementation uses our own React components and CSS, without its Tailwind dependency. Images are bundled in `public/assets/`; `sample-image-sources.json` records their approved-export provenance. Confirm image rights and real business content before production use.

For Home's working demo, quick browsing can cover both buying and renting. An Any intent state makes that explicit; price ranges are separated by intent so sale prices and monthly rents are not compared as equivalent values.
