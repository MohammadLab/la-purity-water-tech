import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import ProductGrid from "@/components/product/ProductGrid";
import { getAllProducts, getAllCategories } from "@/lib/queries";

// Revalidate content every 60s (ISR)
export const revalidate = 60;

// Optional: SEO for the Homepage
export const metadata = {
  title: "LaPurity Water Tech Inc. — Water Softeners, Filtration & UV",
  description:
    "Premium residential water softening, filtration, and purification systems engineered for Canadian homes.",
};

type Cat = {
  title: string;
  slug?: { current?: string } | string;
};

function toCategoryHref(slugish: Cat["slug"]) {
  const s = typeof slugish === "string" ? slugish : slugish?.current;
  return s ? `/products/${s}` : "/products";
}

export default async function Home() {
  const products = await getAllProducts();
  const featured = Array.isArray(products) ? products.slice(0, 6) : [];

  let categories: Array<{ title: string; href: string; key: string }> = [];
  try {
    const cats = (await getAllCategories()) as Cat[] | undefined;
    categories = (cats ?? []).slice(0, 6).map((c, i) => ({
      title: c.title,
      href: toCategoryHref(c.slug),
      key: (typeof c.slug === "string" ? c.slug : c.slug?.current) ?? `cat-${i}`,
    }));
  } catch {
    // Fallback manual list (safe if Sanity categories aren’t wired yet)
    categories = [
      { title: "Water Softeners", href: "/products/water-softeners", key: "softeners" },
      { title: "Chemical Removal", href: "/products/chemical-removal", key: "chem" },
      { title: "Iron & Sulphur", href: "/products/iron-sulphur", key: "iron" },
      { title: "UV Systems", href: "/products/uv", key: "uv" },
      { title: "Tannin Filters", href: "/products/tannin", key: "tannin" },
      { title: "Scale Control", href: "/products/scale-control", key: "scale" },
    ];
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* =====================================================================
         HERO (full-bleed)
         ===================================================================== */}
      <section
        className="
  relative isolate
  w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]
  bg-repeat-x bg-[length:1600px_auto] bg-top
"

        style={{ backgroundImage: "url('/images/hero-blue.jpg')" }}
      >
        {/* Soft white veil + tiny blur for legibility */}
        <div className="absolute inset-0 bg-white/65 backdrop-blur-[2px]" />

        {/* Centered content container */}
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-16 md:py-24 text-center">
          {/* Big round logo (works perfectly with circular logos) */}
          <div
            className="
              mx-auto relative rounded-full bg-white/95 p-5 shadow-xl ring-1 ring-black/5
              w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px]
            "
            aria-hidden="true"
          >
            <Image
              src="/logo-lapurity-circle.png"
              alt="LaPurity Water Tech Inc."
              fill
              sizes="(max-width: 768px) 240px, 280px"
              className="object-contain"
              priority
            />
          </div>

          <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0D1B2A]">
            Residential Water Softening, Filtration, &amp; Purification Solutions
          </h1>
          <p className="mt-3 text-base sm:text-lg text-gray-700">
            Proud Canadian provider of premium whole-home water treatment systems.
          </p>

          {/* Tabs inside hero (Excalibur-style strip) */}
          <nav
            aria-label="Primary"
            className="
              mt-8 inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-3
              rounded-2xl bg-[#0D1B2A] px-4 py-3 text-sm font-medium text-white
              ring-1 ring-black/5 shadow
            "
          >
            <Link href="/" className="hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">Home</Link>
            <Link href="/products" className="hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">Products</Link>
            <Link href="/products/water-softeners" className="hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">Water Softeners</Link>
            <Link href="/products/uv" className="hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">UV</Link>
            <Link href="/products/chemical-removal" className="hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">Chemical Removal</Link>
            <Link href="/resources" className="hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">Resources</Link>
            <Link href="/contact" className="hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">Contact</Link>
          </nav>
        </div>
      </section>

      {/* Sticky tabs that appear after scrolling past hero */}
      <div className="sticky top-0 z-40 hidden bg-[#0D1B2A]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0D1B2A]/80 md:block">
        <div className="mx-auto max-w-[1400px] px-4">
          <nav className="flex gap-6 py-2 text-sm font-medium text-white">
            <Link href="/" className="hover:text-cyan-300">Home</Link>
            <Link href="/products" className="hover:text-cyan-300">Products</Link>
            <Link href="/products/water-softeners" className="hover:text-cyan-300">Water Softeners</Link>
            <Link href="/products/uv" className="hover:text-cyan-300">UV</Link>
            <Link href="/products/chemical-removal" className="hover:text-cyan-300">Chemical Removal</Link>
            <Link href="/resources" className="hover:text-cyan-300">Resources</Link>
            <Link href="/contact" className="hover:text-cyan-300">Contact</Link>
          </nav>
        </div>
      </div>


      {/* =====================================================================
         “Solves all your water treatment problems” section
         ===================================================================== */}
      <Section className="py-12 md:py-16">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0D1B2A]">
              LaPurity Water Tech solves all your water treatment problems…
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Softer water, fewer contaminants, longer-lasting fixtures, and better taste — engineered solutions for municipal and well water.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-[#0D1B2A]">Premium Components</h3>
              <p className="mt-2 text-sm text-gray-600">
                High-quality tanks, valves, and media chosen for reliability and performance.
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-[#0D1B2A]">Engineered for Canada</h3>
              <p className="mt-2 text-sm text-gray-600">
                Systems sized and configured for Canadian homes and water profiles.
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-[#0D1B2A]">Service & Support</h3>
              <p className="mt-2 text-sm text-gray-600">
                Friendly expertise before and after install — parts, media, and maintenance.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* =====================================================================
         Categories strip
         ===================================================================== */}
      <Section className="py-10">
        <Container>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0D1B2A]">
                Explore Categories
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

          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {categories.map((c) => (
              <Link
                key={c.key}
                href={c.href}
                className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              >
                <div className="text-sm text-gray-500">Category</div>
                <div className="mt-1 text-lg font-semibold text-[#0D1B2A]">{c.title}</div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* =====================================================================
         Featured Products grid
         ===================================================================== */}
      <Section className="py-12">
        <Container>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0D1B2A]">
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
