// components/hero/SiteHero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import TabsRow from "@/components/nav/TabsRow";

export default function SiteHero() {
  return (
    <section
      id="hero"
      className={`
        relative isolate
        w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]
        bg-no-repeat bg-cover bg-center
        hero-bg
      `}
      aria-label="Site hero"
    >
      <div className="absolute inset-0 bg-white/65 backdrop-blur-[2px]" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-16 md:py-24 text-center">
        {/* Clickable logo */}
        <Link
          href="/"
          aria-label="Go to homepage"
          className="
            block relative mx-auto
            w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px]
          "
        >
          <Image
            src="/logo-lapurity-circle.png"
            alt="LaPurity Water Tech Inc."
            fill
            sizes="(max-width: 768px) 240px, 280px"
            className="object-contain"
            priority
          />
        </Link>

        <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0D1B2A]">
          Residential Water Softening, Filtration, &amp; Purification Solutions
        </h1>
        <p className="mt-3 text-base sm:text-lg text-gray-800">
          Proud Canadian provider of premium whole-home water treatment systems.
        </p>

        <div className="mt-8 flex justify-center">
          <TabsRow />
        </div>
      </div>
    </section>
  );
}
