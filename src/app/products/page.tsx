import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import ProductGrid from "@/components/product/ProductGrid";
import ProductFilters from "@/components/product/ProductFilters";
import { getAllProducts, getAllCategories, getAllBrands } from "@/lib/queries";

export const revalidate = 60;

export default async function ProductsPage() {
  const [products, categories, brands] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
    getAllBrands().catch(()=>[]),
  ]);

  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-bold" style={{fontFamily:"var(--font-dm-sans)"}}>All Products</h1>
        <div className="mt-6 grid gap-6">
          {/* @ts-expect-error Server/Client boundary simplified for scaffold */}
          <ProductFilters products={products} categories={categories} brands={brands} onChange={() => {}} />
          <div id="product-grid">
            <ProductGrid products={products} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
