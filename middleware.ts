// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Canonicalize /products → /product
 * - /products                         => /product
 * - /products?categories=softeners    => /product?categories=softeners
 * - /products/<slug>                  => /product?categories=<slug>   (treat as category filter)
 * - /products/<anything>/...          => /product                     (fallback)
 *
 * NOTE:
 *  - Detail pages live at /product/[slug]
 *  - Listing (with filters) lives at /product
 */
export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname, searchParams } = url;

  // Only touch /products (case-sensitive)
  if (!pathname.startsWith("/products")) {
    return NextResponse.next();
  }

  // Split path: e.g. "/products/uv" -> ["products","uv"]
  const parts = pathname.split("/").filter(Boolean);

  // /products (no extra segments)
  if (parts.length === 1) {
    // Preserve any existing query (?categories=...)
    url.pathname = "/product";
    return NextResponse.redirect(url); // use rewrite(url) if you prefer not changing the address bar
  }

  // /products/<slug>  → treat <slug> as a CATEGORY filter
  if (parts.length === 2) {
    const cat = parts[1];

    // Merge existing ?categories=… with the path slug
    const params = new URLSearchParams(searchParams.toString());
    const existing = params.get("categories");
    if (existing) {
      const set = new Set(existing.split(",").filter(Boolean));
      set.add(cat);
      params.set("categories", Array.from(set).join(","));
    } else {
      params.set("categories", cat);
    }

    const dest = new URL(req.url);
    dest.pathname = "/product";
    dest.search = params.toString();
    return NextResponse.redirect(dest);
  }

  // /products/<something>/<more> → fallback to listing
  const dest = new URL(req.url);
  dest.pathname = "/product";
  dest.search = searchParams.toString();
  return NextResponse.redirect(dest);
}

// Only run on /products...
export const config = {
  matcher: ["/products", "/products/:path*"],
};
