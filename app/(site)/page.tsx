import Link from "next/link";
import ProductGrid from "@/components/product/ProductGrid";
import { getAllProducts } from "@/lib/queries";

export const revalidate = 60;

export default async function HomePage() {
  const products = await getAllProducts();
  const featured = products.slice(0, 6);

  return (
    <div className="space-y-10">
      <section className="rounded-2xl border p-8 bg-gray-50">
        <h1 className="text-3xl font-semibold">LaPurity Water Tech</h1>
        <p className="mt-2 text-gray-700">
          Premium water treatment systems — softeners, reverse osmosis, iron & sulfur filters, UV sterilization, and more.
        </p>
        <div className="mt-6">
          <Link href="/products" className="inline-block rounded bg-black px-4 py-2 text-white">
            Browse Products
          </Link>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Featured Products</h2>
          <Link href="/products" className="text-sm underline">View all</Link>
        </div>
        <ProductGrid products={featured} />
      </section>
    </div>
  );
}
