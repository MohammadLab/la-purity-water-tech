// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = url;

  // Match /products/<slug> (but not /products itself)
  // e.g. /products/water-softeners  ->  /products?categories=water-softeners
  const m = pathname.match(/^\/products\/([^/]+)\/?$/);
  if (m) {
    const slugFromPath = m[1];

    // Start from current URL to preserve any existing query params
    const params = url.searchParams;

    // Merge with existing categories param (multi-select friendly)
    const existing = params.get("categories");
    const set = new Set((existing ?? "").split(",").filter(Boolean));
    set.add(slugFromPath);

    params.set("categories", Array.from(set).join(","));

    // Redirect to canonical /products?categories=...
    url.pathname = "/products";
    url.search = params.toString();

    // 308 preserves method/body on POST if ever used
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

// Ensure middleware runs for any /products/* path
export const config = {
  matcher: ["/products/:path*"],
};
