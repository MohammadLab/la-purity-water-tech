// components/hero/SiteHero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import TabsRow from "@/components/nav/TabsRow";
import HeroSlideshow from "@/components/hero/HeroSlideshow";

const SLIDES = [
  "/images/hero/1.png",
  "/images/hero/2.png",
  "/images/hero/3.png",
  "/images/hero/4.png",
  "/images/hero/5.png",
  "/images/hero/6.png",
  "/images/hero/7.png",
];

export default function SiteHero() {
  return (
    <section
      id="hero"
      className={`
    relative isolate
    w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]
    min-h-[60vh] sm:min-h-[70vh] overflow-hidden
    bg-black
  `}
      aria-label="Site hero"
    >
      {/* Slideshow background */}
      <HeroSlideshow images={SLIDES} intervalMs={5000} fadeMs={800} />

      {/* Foreground content with dark transparent overlay */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-16 md:py-24 text-center">
        {/* Overlay behind the content */}
        {/* Soft oval dropfade directly behind the text */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div
            className="h-40 sm:h-48 md:h-56 lg:h-64 w-[100%] max-w-[10000px] rounded-full translate-y-[40%]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.50) 35%, rgba(0,0,0,0.28) 60%, rgba(0, 0, 0, 0) 75%)",
              filter: "blur(3px)",
            }}
          />
        </div>



        {/* Actual content */}
        <div className="relative z-10">
          <Link
            href="/"
            aria-label="Go to homepage"
            className="block relative mx-auto w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px]"
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

          <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Residential Water Softening, Filtration, &amp; Purification Solutions
          </h1>
          <p className="mt-3 text-base sm:text-lg text-white/90">
            Proud Canadian provider of premium whole-home water treatment systems.
          </p>

          <div className="mt-8 flex justify-center">
            <TabsRow />
          </div>
        </div>
      </div>

    </section>
  );
}
