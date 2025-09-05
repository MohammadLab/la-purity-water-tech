import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [] }: { products: any[] }) {
  if (!products.length) return <p className="text-sm text-gray-500">No products found.</p>;
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => <ProductCard key={p._id} product={p} />)}
    </div>
  );
}
