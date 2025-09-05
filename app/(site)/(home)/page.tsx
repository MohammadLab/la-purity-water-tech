// app/(site)/(home)/page.tsx  (or app/(site)/page.tsx if you didn’t make the group)
import HeroBannerFull from "@/components/hero/HeroBannerFull";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import ProductGrid from "@/components/product/ProductGrid";
import { getAllProducts } from "@/lib/queries";

export const revalidate = 60;

export default async function Home() {
  const products = await getAllProducts();
  const featured = Array.isArray(products) ? products.slice(0, 6) : [];

  return (
    <main className="bg-white text-gray-900">
      <HeroBannerFull
        logoSrc="/logo-lapurity-circle.png"
        bg="/images/hero-blue.jpg"      // put your chosen wide blue background here
      />

      <Section className="py-14">
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
            <a href="/products" className="text-sm font-semibold text-cyan-700 hover:underline">
              View all →
            </a>
          </div>

          <div className="mt-6">
            <ProductGrid products={featured} />
          </div>
        </Container>
      </Section>
    </main>
  );
}
