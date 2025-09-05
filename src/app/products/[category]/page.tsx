import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import ProductGrid from "@/components/product/ProductGrid";
import { getAllCategories, getProductsByCategory } from "@/lib/queries";

export const revalidate = 60;

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const categorySlug = params.category;
  const categories = await getAllCategories();
  const current = categories.find((c:any)=> c.slug === categorySlug);
  const products = await getProductsByCategory(categorySlug);

  return (
    <Section>
      <Container>
        <Breadcrumbs items={[
          { href: "/", label: "Home" },
          { href: "/products", label: "Products" },
          { href: `/products/${categorySlug}`, label: current?.title ?? "Category" }
        ]} />
        <header className="mt-6">
          <h1 className="text-3xl font-bold" style={{fontFamily:"var(--font-dm-sans)"}}>
            {current?.title ?? "Category"}
          </h1>
          {current?.description && (
            <p className="mt-2 text-gray-600">{current.description}</p>
          )}
        </header>
        <div className="mt-8">
          <ProductGrid products={products} />
        </div>
      </Container>
    </Section>
  );
}
