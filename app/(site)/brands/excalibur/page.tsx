import ProductGrid from "@/components/product/ProductGrid";
import { getBrandBySlug, getProductsByBrandSlug } from "@/lib/queries";

export const revalidate = 60;

export default async function ExcaliburPage() {
  const brand = await getBrandBySlug("excalibur");
  const products = await getProductsByBrandSlug("excalibur");

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">{brand?.title || "Excalibur"}</h1>
        {brand?.description && <p className="text-gray-700">{brand.description}</p>}
      </header>
      <ProductGrid products={products} />
    </div>
  );
}
