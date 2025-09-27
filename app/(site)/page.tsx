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
import SiteHero from "@/components/hero/SiteHero";

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


// app/(site)/page.tsx
function toCategoryHref(slugish: Cat["slug"]) {
  const s = typeof slugish === "string" ? slugish : slugish?.current;
  return s ? `/products?categories=${encodeURIComponent(s)}` : "/products";
}


export default async function Home() {

  const products = await getAllProducts();


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
      image = urlFor(c.thumbnail).width(500).height(500).fit("crop").url();
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
      {/* ========================== HERO ========================== */}
      <SiteHero />
      {/* Sticky tabs only after hero leaves viewport */}
      <StickyTabs />

      {/* Sticky tabs (only after hero scrolls out) */}


      {/* Dark navy strip between hero and waves */}
      <section className="relative h-12">
        <div aria-hidden className="absolute inset-0 w-screen bg-[#0D1B2A]" />
      </section>

      {/* ========================== VALUE PROPS ========================== */}
      <section className="relative">
        {/* Full-bleed waves BG + blur */}
        <div
          aria-hidden
          className="
          absolute left-1/2 top-0 -translate-x-1/2
          w-screen h-full
        "
        >
          <div className="absolute inset-0 bg-[url('/images/waves-blue.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-white/65 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10">
          <ValueProps />
        </div>
      </section>

      {/* ========================== CATEGORIES ========================== */}
      <section className="relative">
        <div aria-hidden className="absolute inset-0 w-full h-full" />
        <Section className="py-10 relative z-10">
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

            <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-4 items-stretch">
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
      </section>

      
    </main>
  );

}
