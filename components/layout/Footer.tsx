"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import { Mail, MapPin, Phone } from "lucide-react";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
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
      <Container>
        <div className="py-10 md:py-12">
          {/* Top: contact + quick links */}
          <div className="grid gap-8 md:grid-cols-3">
            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold">Contact</h3>
              <ul className="mt-3 space-y-2 text-[0.9375rem] leading-relaxed text-white/80 pr-2">
                <li className="flex items-center gap-2">
                  <Mail size={16} className="text-cyan-400 shrink-0" />
                  <a
                    href="mailto:olabak.lapurity@gmail.com"
                    className="hover:text-white hover:underline break-all"
                  >
                    olabak.lapurity@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="text-cyan-400 mt-[2px] shrink-0" />
                  <span>
                    3395 Howard Ave Unit #10
                    <br />
                    N9E 3N6 Windsor, ON, Canada
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone size={16} className="text-cyan-400 mt-[2px] shrink-0" />
                  <span className="whitespace-nowrap md:whitespace-normal">
                    Ousama Labak — Partner & Executive Manager
                    <br />
                    Cellphone:{" "}
                    <a
                      href="tel:+12263407900"
                      className="text-cyan-400 hover:text-white underline"
                    >
                      +1 (226) 340-7900
                    </a>{" "}
                    • Mon–Fri 10:00am–6:00pm
                  </span>
                </li>
              </ul>

              <p className="mt-4 text-sm text-white/70 pr-2">
                Prefer email? We respond within two business days.
              </p>
            </div>


            {/* Quick links */}
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
