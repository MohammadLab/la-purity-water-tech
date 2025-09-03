Phase 2 — Public Pages

Added under app/(site)/:
- layout.tsx
- page.tsx                  -> Home
- products/page.tsx         -> Product list
- products/[slug]/page.tsx  -> Product detail
- contact/page.tsx          -> Quote form (POST /api/contact)
- brands/excalibur/page.tsx -> Brand landing using 'excalibur' slug

Also extended lib/queries.ts with brand queries.

Usage:
  pnpm dev
  # /          -> Home
  # /products  -> List
  # /products/<slug> -> Detail
  # /contact   -> Quote form
  # /brands/excalibur -> Brand page

Notes:
- Ensure you have at least one Brand document with slug "excalibur" and Products referencing it.
- If downloads are attached to products, the file links resolve via the Sanity CDN.
