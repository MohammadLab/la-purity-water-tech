// app/(site)/layout.tsx
"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import "@/styles/globals.css";
import SiteHero from "@/components/hero/SiteHero";
import GlobalHeader from "@/components/nav/GlobalHeader";
import StickyTabs from "@/components/nav/StickyTabs";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Non-home: show the SAME hero as home, then the navy strip, then sticky tabs */}
      {!isHome && (
        <>
          <SiteHero />
          <GlobalHeader />
          <StickyTabs />
        </>
      )}

      {/* Pages control their own spacing/containers */}
      <main className="flex-1 w-full">{children}</main>

      <Footer />
    </div>
  );
}
