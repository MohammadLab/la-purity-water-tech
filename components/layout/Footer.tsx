"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Water Softeners", href: "/products/water-softeners" },
  { label: "UV", href: "/products/uv" },
  { label: "Chemical Removal", href: "/products/chemical-removal" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer
      className="
        relative left-1/2 -translate-x-1/2 w-screen
        bg-[#0D1B2A] text-white
      "
      role="contentinfo"
    >
      {/* content is centered, background is full-bleed */}
      <Container>
        <div className="py-10 md:py-12">
          {/* Top: contact + quick links */}
          <div className="grid gap-8 md:grid-cols-3">
            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold">Contact</h3>
              <div className="mt-3 space-y-2 text-sm/6 text-white/80">
                <p>
                  <span className="block font-medium text-white/90">Address</span>
                  <span>Windsor, ON, Canada</span>
                </p>
                <p>
                  <span className="block font-medium text-white/90">Phone</span>
                  <a href="tel:+1-000-000-0000" className="hover:underline">
                    (226) 340-7900
                  </a>
                </p>
                <p>
                  
                  
                </p>
              </div>
            </div>

            {/* Quick links (same tabs as header) */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold">Navigate</h3>
              <nav aria-label="Footer primary" className="mt-4">
                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm/6 text-white/80">
                  {NAV.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 h-px bg-white/10" />

          {/* Bottom bar */}
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
            <p className="text-xs text-white/60">
              © {new Date().getFullYear()} LaPurity Water Tech Inc. All rights reserved.
            </p>
            <div className="text-xs text-white/60">
              <Link href="/privacy" className="hover:text-white hover:underline">
                Privacy
              </Link>
              <span className="mx-2">•</span>
              <Link href="/terms" className="hover:text-white hover:underline">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
