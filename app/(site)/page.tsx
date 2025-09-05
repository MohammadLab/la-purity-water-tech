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
      {/* ===== Hero Banner (tabs on top, big title over image) ===== */}
      <header className="relative">
        {/* Background image */}
        <div className="absolute inset-0 -z-10">
          {/* Put your wide image at /public/images/hero-blue.jpg */}
          <Image
            src="/images/hero-blue.jpg"
            alt="LaPurity background"
            fill
            priority
            className="object-cover opacity-60 blur-[1px]"
          />
          {/* Blue vibe overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/70 via-[#0D1B2A]/40 to-[#00C2FF]/10" />
        </div>

        {/* Tabs (top navigation) */}
        <Container className="pt-4">
          <nav
            className="flex items-center justify-center gap-6 text-sm font-medium text-white/90"
            aria-label="Primary"
          >
            <Link className="hover:text-white" href="/">Home</Link>
            <Link className="hover:text-white" href="/products">Products</Link>
            <Link className="hover:text-white" href="/products/water-softeners">Water Softeners</Link>
            <Link className="hover:text-white" href="/products/uv">UV</Link>
            <Link className="hover:text-white" href="/products/chemical-removal">Chemical Removal</Link>
            <Link className="hover:text-white" href="/resources">Resources</Link>
            <Link className="hover:text-white" href="/contact">Contact</Link>
          </nav>
        </Container>

        {/* Tall head with big title + breadcrumb (like your reference) */}
        <Container className="py-24 md:py-28">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
              ABOUT LAPURITY
            </h1>
            <div className="mt-4 text-xs md:text-sm text-white/80">
              <Link href="/" className="hover:underline">Home</Link>
              <span className="mx-2">/</span>
              <span>About Us</span>
            </div>
          </div>
        </Container>
      </header>

      {/* ===== Content / Featured ===== */}
      <Section className="py-14">
        <Container>
          <div className="grid gap-10 md:grid-cols-[1fr,2fr] items-start">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#0D1B2A]">Our Promise</h3>
              <p className="mt-2 text-sm text-gray-600 leading-6">
                At LaPurity, we engineer water treatment systems that elevate taste, protect fixtures,
                and improve daily life—built with reliability, performance, and clean design.
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <blockquote className="text-xl font-medium text-[#0D1B2A]">
                “Softer water. Fewer contaminants. Longer-lasting homes.”
              </blockquote>
              <p className="mt-2 text-sm text-gray-500">— LaPurity Management</p>
            </div>
          </div>

          {/* section divider like the reference */}
          <div className="mt-12 h-px w-full bg-gradient-to-r from-[#00C2FF]/40 via-[#00C2FF]/10 to-transparent" />

          <div className="mt-10 flex items-end justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0D1B2A]">Featured Products</h2>
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
