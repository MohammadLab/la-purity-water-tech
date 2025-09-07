// components/nav/GlobalHeader.tsx
"use client";

import { usePathname } from "next/navigation";

export default function GlobalHeader() {
  const pathname = usePathname();
  if (pathname === "/") return null; // home draws its own strip

  // Full-bleed navy strip directly under the hero
  return (
    <div
      aria-hidden
      className="
        relative
        w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]
        h-12 bg-[#0D1B2A]
      "
    />
  );
}
