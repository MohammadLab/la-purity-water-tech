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
        min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh]
        overflow-hidden
        bg-black
      `}
      aria-label="Site hero"
    >
      {/* === Background slideshow === */}
      <HeroSlideshow images={SLIDES} intervalMs={5000} fadeMs={800} />

      {/* === Logo (mobile-style position for all screens) === */}
      <div
        className="
    absolute
    top-[20px] sm:top-[60px] md:top-[40px]
    left-[20px] sm:left-[40px] md:left-[60px]
    z-20
    w-[130px] sm:w-[150px] md:w-[180px]
  "
      >

        <Link
          href="/"
          aria-label="Go to homepage"
          className="block relative w-full h-full aspect-square"
        >
          <Image
            src="/logo-lapurity-circle.png"
            alt="LaPurity Water Tech Inc."
            fill
            sizes="(max-width: 768px) 130px, 160px, 180px"
            className="object-contain"
            priority
          />
        </Link>
      </div>

      {/* === Centered text === */}
      <div
        className="
          relative z-10 mx-auto max-w-[1400px]
          px-4 py-5 md:py-5
          text-center flex flex-col items-center justify-end h-full
        "
      >
        {/* Oval fade stays fixed in center */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div
            className="
              h-[250px] sm:h-[400px] md:h-[350px]
              w-[90%] max-w-[1200px] rounded-full 
              translate-y-[15%]
            "
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0) 80%)",
              filter: "blur(6px)",
            }}
          />
        </div>

        {/* Foreground text */}
        <div
          className="
    relative z-10
    mt-[140px] sm:mt-[220px] md:mt-[200px]
    px-2 sm:px-0
  "
        >

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Water Softening, Filtration, &amp; Purification Solutions
            <br />
            <span className="block text-xl sm:text-2xl md:text-3xl font-semibold mt-2 text-white/90">
              Residential &ndash; Commercial &ndash; Industrial
            </span>
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
