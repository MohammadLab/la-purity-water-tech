// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";



// Only category slugs go here (adjust to match your Sanity categories)
const CATEGORY_SLUGS = new Set([
  "water-softeners",
  "chemical-removal",
  "iron-sulphur-manganese",
  "tannin",
  "ultraviolet-uv",
  "whole-home-filtration",
  "scale-control-systems",
  "smart-connect-ecosystem",
  "ph-neutralizing",
  "hybrid-multi-contaminant",
]);

export function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const { pathname, search } = url;

  // Only consider /products/<slug>
  if (pathname.startsWith("/products/")) {
    const parts = pathname.split("/").filter(Boolean); // ["products", "<slug>"]
    const slug = parts[1] || "";
    if (pathname.startsWith("/products/")) {
      const slug = pathname.replace("/products/", "");
      return NextResponse.rewrite(new URL(`/product/${slug}`, req.url));
    }

    // If slug is a known category → redirect to /products?categories=<slug>
    if (CATEGORY_SLUGS.has(slug)) {
      const to = new URL("/products", req.url);
      const sp = new URLSearchParams(search);
      sp.set("categories", slug);
      to.search = sp.toString();
      return NextResponse.redirect(to); // or NextResponse.rewrite(to) if you prefer
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/products/:path*"],
};
