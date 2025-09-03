import ProductGrid from "@/components/product/ProductGrid";
import { getAllProducts } from "@/lib/queries";

export const revalidate = 60;

export default async function ProductsPage() {
  const products = await getAllProducts();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">All Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}
