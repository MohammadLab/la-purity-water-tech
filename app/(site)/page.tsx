import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import ProductGrid from "@/components/product/ProductGrid";
import { getAllProducts, getAllCategories } from "@/lib/queries";
import TabsRow from "@/components/nav/TabsRow";
import StickyTabs from "@/components/nav/StickyTabs";
import ValueProps from "@/components/sections/ValueProps";
import CategoryCard from "@/components/category/CategoryCard";
import { urlFor } from "@/lib/sanityImage"; // add this at top




// Revalidate content every 60s (ISR)
export const revalidate = 60;

// Optional SEO
export const metadata = {
  title: "LaPurity Water Tech Inc. — Water Softeners, Filtration & UV",
  description:
    "Premium residential water softening, filtration, and purification systems engineered for Canadian homes.",
};

type Cat = {
  _id?: string;
  title: string;
  slug?: { current?: string } | string;
  thumbnail?: any;       // from Sanity
  blurb?: string;        // from Sanity
};


function toCategoryHref(slugish: Cat["slug"]) {
  const s = typeof slugish === "string" ? slugish : slugish?.current;
  return s ? `/products/${s}` : "/products";
}

export default async function Home() {
  // Data: featured products + categories
  const products = await getAllProducts();
  const featured = Array.isArray(products) ? products.slice(0, 6) : [];

  let categories: Array<{ title: string; href: string; key: string }> = [];
  try {
    const cats = (await getAllCategories()) as Cat[] | undefined;
    categories = (cats ?? []).map((c, i) => ({
      title: c.title,
      href: toCategoryHref(c.slug),
      key: (typeof c.slug === "string" ? c.slug : c.slug?.current) ?? `cat-${i}`,
      thumbnail: c.thumbnail,  // keep Sanity thumbnail
      blurb: c.blurb,          // keep Sanity blurb
    }));

  } catch {
    // Fallback manual list if Sanity categories aren’t wired yet
    categories = [
      { title: "Water Softeners", href: "/products/water-softeners", key: "softeners" },
      { title: "Chemical Removal", href: "/products/chemical-removal", key: "chem" },
      { title: "Iron & Sulphur", href: "/products/iron-sulphur", key: "iron" },
      { title: "UV Systems", href: "/products/uv", key: "uv" },
      { title: "Tannin Filters", href: "/products/tannin", key: "tannin" },
      { title: "Scale Control", href: "/products/scale-control", key: "scale" },
    ];
  }

  // Try to find the first product image for a category key
  function firstImageForCategory(catKey: string): string | null {
    if (!Array.isArray(products)) return null;

    for (const p of products as any[]) {
      const catSlug = p?.category?.slug || p?.categorySlug || p?.category;
      const key = typeof catSlug === "string" ? catSlug : catSlug?.current;
      if (key !== catKey) continue;

      // Try common shapes: images[0], mainImage, image
      const imgObj =
        p?.images?.[0] ??
        p?.mainImage ??
        p?.image ??
        null;

      if (imgObj) {
        // build a nice, banner-ish URL
        return urlFor(imgObj).width(1200).height(300).fit("crop").url();
      }
    }
    return null;
  }




  // Build the cards data
  const categoryCards = categories.map((c: any) => {
    const slug = typeof c.key === "string" ? c.key : c?.slug?.current || c?.slug;

    let image: string | null = null;
    if (c.thumbnail?.asset?._ref) {
      image = urlFor(c.thumbnail).width(1200).height(300).fit("crop").url();
    } else {
      image = firstImageForCategory(slug);
    }

    return {
      ...c,
      key: slug,
      image,
      desc: c.blurb,
    };
  });

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* =====================================================================
         HERO (full-bleed banner; same 'hero as a section' tactic)
         ===================================================================== */}
      <section
        id="hero" // ← StickyTabs watches this sentinel
        className="
          relative isolate
          w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]
          bg-no-repeat bg-cover bg-center
        "
        style={{ backgroundImage: "url('/images/hero-blue.jpg')" }}
      >
        {/* blue vibe: soft dim + slight blur so text stays readable */}
        <div className="absolute inset-0 bg-white/65 backdrop-blur-[2px]" />

        {/* Inner content stays centered in a max width container */}
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-16 md:py-24 text-center">
          {/* Large circular logo (optional — comment if you prefer only text) */}
          <div
            className="
              mx-auto relative rounded-full bg-white/95 p-5 shadow-xl ring-1 ring-black/5
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
          </div>

          {/* Headline + subhead */}
          <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0D1B2A]">
            Residential Water Softening, Filtration, &amp; Purification Solutions
          </h1>
          <p className="mt-3 text-base sm:text-lg text-gray-700">
            Proud Canadian provider of premium whole-home water treatment systems.
          </p>

          {/* Tabs row inside the hero (like Excalibur’s strip) */}
          <div className="mt-8">
            <TabsRow />
          </div>
        </div>
      </section>

      {/* Sticky tabs (same style) that only appear after the hero leaves */}
      <StickyTabs />

      {/* Fancy value props */}
      <ValueProps />


      {/* =====================================================================
         Categories strip (6 cards)
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
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-items-center">

            {categoryCards.map((c: any) => (
              <CategoryCard
                key={c.key}
                title={c.title}
                href={c.href}
                imageUrl={c.image}
                description={c.desc}
              />
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
              <h2 className="text-2xl md:3xl lg:text-3xl font-bold tracking-tight text-[#0D1B2A]">
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
