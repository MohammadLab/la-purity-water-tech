"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";

export default function HeroBannerFull({
  logoSrc = "/logo-lapurity-circle.png",
  bg = "/images/hero-blue.jpg",         // super-wide blue hero you generated
  title = "Residential Water Softening, Filtration & Purification Solutions",
}: {
  logoSrc?: string;
  bg?: string;
  title?: string;
}) {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden">
      {/* Background: repeat + blur (image is CSS background so it can tile) */}
      <div
        className="
          absolute inset-0 -z-20
          bg-[length:1200px_auto]    /* controls the tile width */
          bg-repeat-x                 /* tile horizontally; use bg-repeat if you want both */
          blur-[2px]                  /* subtle soft-focus */
          opacity-70
        "
        style={{ backgroundImage: `url('${bg}')` }}
      />

      {/* Optional gradient wash for the blue vibe */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0D1B2A]/70 via-[#0D1B2A]/35 to-[#00C2FF]/10" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[100dvh] items-center">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            {/* Big circular logo */}
            <div
              className="
                relative rounded-full bg-white/95 p-6 shadow-xl ring-1 ring-black/5
                w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px]
              "
            >
              <Image
                src={logoSrc}
                alt="LaPurity Water Tech Inc."
                fill
                sizes="(max-width: 768px) 260px, 300px"
                className="object-contain"
                priority
              />
            </div>

            <p className="mt-6 text-base sm:text-lg text-white/85">
              {title}
            </p>

            {/* Tabs row lives in the hero (since we hid the default header) */}
            <nav
              aria-label="Primary"
              className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium text-white/90"
            >
              <a className="hover:text-white" href="/">Home</a>
              <a className="hover:text-white" href="/products">Products</a>
              <a className="hover:text-white" href="/products/water-softeners">Water Softeners</a>
              <a className="hover:text-white" href="/products/uv">UV</a>
              <a className="hover:text-white" href="/products/chemical-removal">Chemical Removal</a>
              <a className="hover:text-white" href="/resources">Resources</a>
              <a className="hover:text-white" href="/contact">Contact</a>
            </nav>
          </div>
        </Container>
      </div>
    </section>
  );
}
