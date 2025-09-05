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
      {/* Tall Header with Logo + Tabs */}
      <header className="relative border-b">
        {/* smaller/softer hero image (kept subtle so logo + tabs pop) */}
        <div className="absolute inset-0 -z-10">
          {/* Put your hero image at public/images/hero-blue.jpg */}
          <Image
            src="/images/hero-blue.jpg"
            alt="Water treatment backdrop"
            fill
            priority
            className="object-cover opacity-50 blur-[1px]"
          />
          {/* blue vibe gradient wash */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/70 via-[#0D1B2A]/40 to-[#00C2FF]/10" />
        </div>

        {/* Top tabs (navigation) */}
        <Container className="pt-4">
          <nav
            className="flex items-center justify-center gap-6 text-sm font-medium text-white/90"
            aria-label="Primary"
          >
            <Link className="hover:text-white" href="/products">Products</Link>
            <Link className="hover:text-white" href="/products/water-softeners">Water Softeners</Link>
            <Link className="hover:text-white" href="/products/uv">UV</Link>
            <Link className="hover:text-white" href="/products/chemical-removal">Chemical Removal</Link>
            <Link className="hover:text-white" href="/resources">Resources</Link>
            <Link className="hover:text-white" href="/contact">Contact</Link>
          </nav>
        </Container>

        {/* Tall head to allow a BIG logo */}
        <Container className="py-14 md:py-20">
          <div className="flex flex-col items-center text-center">
            {/* swap with your real logo asset */}
            <Image
              src="/logo-lapurity.svg"
              alt="LaPurity"
              width={560}
              height={120}
              className="h-auto w-[70%] max-w-[560px] drop-shadow-lg"
            />
            <p className="mt-4 max-w-2xl text-white/85">
              Engineered water treatment for every home.
            </p>

            {/* CTA row (optional) */}
            <div className="mt-6 flex gap-3">
              <Link
                href="/products"
                className="inline-flex h-11 items-center rounded-full bg-white/95 px-6 text-sm font-semibold text-[#0D1B2A] shadow hover:bg-white"
              >
                Browse Products
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center rounded-full border border-white/50 px-6 text-sm font-semibold text-white hover:bg-white/10"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </Container>
      </header>

      {/* Featured products preview */}
      <Section className="py-12">
        <Container>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0D1B2A]">
                Featured Products
              </h2>
              <div
                aria-hidden
                className="mt-1 h-px w-24 rounded-full bg-gradient-to-r from-[#00C2FF]/40 via-[#00C2FF]/20 to-transparent"
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
