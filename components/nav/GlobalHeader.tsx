// components/nav/GlobalHeader.tsx
"use client";

import { usePathname } from "next/navigation";
import TabsRow from "@/components/nav/TabsRow";

/**
 * Shows the same home-page tabs bar (rounded pill) for all non-home routes.
 * - Dark navy strip
 * - Centered TabsRow pill
 * - Sticky at top (like a normal header)
 */
export default function GlobalHeader() {
  const pathname = usePathname();

  // Home already has the in-hero tabs + StickyTabs behavior.
  if (pathname === "/") return null;

  return (
    <header className="sticky top-0 z-50 bg-[#0D1B2A]">
      <div className="mx-auto max-w-[1400px] px-4 py-3 flex justify-center">
        <TabsRow />
      </div>
    </header>
  );
}
