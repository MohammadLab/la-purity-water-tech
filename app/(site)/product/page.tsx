// app/(site)/product/page.tsx
import { Suspense } from "react";
import { getAllProducts, getAllCategories } from "@/lib/queries";
import ProductGrid from "@/components/product/ProductGrid";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import CategoryFilters from "@/components/product/CategoryFilters";
import SearchBar from "@/components/product/SearchBar";

export const revalidate = 60;

function parseSelected(searchParams: { [k: string]: string | string[] | undefined }) {
  const raw = searchParams?.categories;
  if (!raw) return [];
  const list = Array.isArray(raw) ? raw.join(",") : raw;
  return list.split(",").map((s) => s.trim()).filter(Boolean);
}

export default async function ProductIndex({
  searchParams,
}: {
  searchParams?: { [k: string]: string | string[] | undefined };
}) {
  const [allProducts, allCategories] = await Promise.all([
    getAllProducts(),
    getAllCategories?.() ?? [],
  ]);

  const selected = parseSelected(searchParams ?? {});
  const selectedSet = new Set(selected);

  const q = (typeof searchParams?.q === "string" ? searchParams?.q : "")
    ?.trim()
    .toLowerCase();

  const matchesQuery = (p: any) => {
    if (!q) return true;
    const hay = [
      p?.title,
      p?.subtitle,
      p?.blurb,
      p?.description,
      p?.sku,
      p?.model,
      Array.isArray(p?.tags) ? p.tags.join(" ") : "",
      p?.category?.title,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  };

  const products = Array.isArray(allProducts)
    ? allProducts.filter((p: any) => {
      // category filter
      const catSlugish =
        p?.category?.slug?.current ?? p?.category?.slug ?? p?.category ?? p?.categorySlug;
      const catSlug = typeof catSlugish === "string" ? catSlugish : catSlugish?.current;
      const passesCategory = selected.length === 0 ? true : catSlug ? selectedSet.has(catSlug) : false;

      // search filter
      const passesQuery = matchesQuery(p);

      return passesCategory && passesQuery;
    })
    : [];

  const categories = (allCategories || []).map((c: any) => ({
    title: c.title,
    slug: typeof c.slug === "string" ? c.slug : c?.slug?.current,
  }));

  return (
    <Section className="py-10">
      <Container className="max-w-screen-2xl">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold">Products</h1>
          <div className="text-sm text-gray-500">
            {products.length} result{products.length === 1 ? "" : "s"}
          </div>
        </div>

        {/* Search above */}
        <div className="mt-6 flex justify-left">
          <SearchBar className="w-50% max-w-2xl" />
        </div>

        {/* Filters below */}
        <div className="mt-4">
          <Suspense>
            <CategoryFilters categories={categories} selected={selected} />
          </Suspense>
        </div>


        <div className="mt-8">
          <ProductGrid products={products} />
        </div>
      </Container>
    </Section>
  );
}
