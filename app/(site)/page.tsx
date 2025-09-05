// app/(site)/page.tsx
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import ProductGrid from "@/components/product/ProductGrid";
import { getAllProducts } from "@/lib/queries";

export const revalidate = 60;

export default async function Home() {
  const products = await getAllProducts();
  const featured = Array.isArray(products) ? products.slice(0, 6) : [];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* HERO (same tactic as your other site: it's just a section) */}
      <section
        className="
          relative
          text-center
          py-16 md:py-24
          px-4
          bg-cover bg-center bg-no-repeat
        "
        style={{ backgroundImage: "url('/images/hero-blue.jpg')" }}
      >
        {/* soft blur & dim so content pops */}
        <div className="absolute inset-0 bg-white/70 sm:bg-white/60 backdrop-blur-[1.5px]" />

        <div className="relative z-10 mx-auto max-w-4xl">
          {/* BIG circular logo */}
          <div
            className="
              mx-auto relative rounded-full bg-white/95 p-5 shadow-xl ring-1 ring-black/5
              w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px]
            "
          >
            <Image
              src="/logo-lapurity-circle.png"
              alt="LaPurity Water Tech Inc."
              fill
              sizes="(max-width: 768px) 260px, 300px"
              className="object-contain"
              priority
            />
          </div>

          <p className="mt-6 text-base sm:text-lg text-gray-800">
            Residential Water Softening, Filtration &amp; Purification Solutions
          </p>

          {/* Tabs bar INSIDE the hero (like your other site’s bar under the banner) */}
          <nav
            aria-label="Primary"
            className="
              mt-8 inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-3
              rounded-2xl bg-[#0D1B2A] px-4 py-3 text-sm font-medium text-white
            "
          >
            <Link href="/" className="hover:text-cyan-300">Home</Link>
            <Link href="/products" className="hover:text-cyan-300">Products</Link>
            <Link href="/products/water-softeners" className="hover:text-cyan-300">Water Softeners</Link>
            <Link href="/products/uv" className="hover:text-cyan-300">UV</Link>
            <Link href="/products/chemical-removal" className="hover:text-cyan-300">Chemical Removal</Link>
            <Link href="/resources" className="hover:text-cyan-300">Resources</Link>
            <Link href="/contact" className="hover:text-cyan-300">Contact</Link>
          </nav>
        </div>
      </section>

      {/* FEATURED (same flow as before) */}
      <Section className="py-14">
        <Container>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0D1B2A]">
                Featured Products
              </h2>
              <div
                aria-hidden
                className="mt-1 h-px w-24 rounded-full
                           bg-gradient-to-r from-[#00C2FF]/40 via-[#00C2FF]/20 to-transparent"
              />
            </div>
            <Link href="/products" className="text-sm font-semibold text-cyan-700 hover:underline">
              View all →
            </Link>
          </div>

          <div className="mt-6">
            <ProductGrid products={featured} />
          </div>
        </Container>
      </Section>
    </main>
  );
}
