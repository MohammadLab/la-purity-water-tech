// app/(site)/page.tsx
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
      {/* Hero */}
      <section
        className="relative text-center py-16 md:py-24 px-4 bg-cover bg-[40%_center] sm:bg-center bg-no-repeat"
        // Swap this with a real image in /public/images/hero-water.jpg
        style={{ backgroundImage: "url('/images/hero-water.jpg')" }}
      >
        {/* overlay (no blur so images stay crisp) */}
        <div className="absolute inset-0 bg-white/75 sm:bg-white/60" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
            Water Treatment, Modernized
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold mb-4 text-[#0D1B2A]">
            Engineered water treatment for every home
          </h1>
          <p className="text-lg mb-6 max-w-xl mx-auto text-gray-700">
            Softer water, fewer contaminants, longer-lasting fixtures. Explore our
            softeners, filtration, UV, iron/sulfur and more.
          </p>
          <Link
            href="/products"
            className="inline-flex h-11 px-6 items-center justify-center rounded-full
                       bg-[#0D1B2A] text-white text-base font-semibold
                       hover:bg-[#102134] active:bg-[#0B1622] focus:outline-none transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </section>

      {/* “All Products” preview */}
      <Section className="py-12">
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
            <Link
              href="/products"
              className="text-sm font-semibold text-cyan-700 hover:underline"
            >
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
