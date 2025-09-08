// app/(site)/product/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import RelatedProductsRail from "@/components/product/RelatedProductsRail";
import ProductTabs from "@/components/product/ProductTabs";
import ProductGallery from "@/components/product/ProductGallery";
import { getProductBySlug, getRelatedProducts } from "@/lib/queries";

export const revalidate = 60;

/** Build a CDN URL for Sanity "file" assets from their ref */
function fileRefToCdnUrl(ref: string) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "znbgi3bm";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const parts = ref.split("-");
  const id = parts.slice(1, -1).join("-");
  const ext = parts[parts.length - 1];
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${ext}`;
}

/** Try common image field names and return the first found */
function firstImageLike(p: any) {
  return (
    p?.heroImage ??
    p?.mainImage ??
    p?.image ??
    p?.images?.[0] ??
    p?.gallery?.[0] ??
    null
  );
}

/** Collect all images into an array (unique by _key/_id) for the gallery */
function allImages(p: any) {
  const arr: any[] = [];
  if (p?.heroImage) arr.push(p.heroImage);
  if (p?.mainImage) arr.push(p.mainImage);
  if (p?.image) arr.push(p.image);
  if (Array.isArray(p?.images)) arr.push(...p.images);
  if (Array.isArray(p?.gallery)) arr.push(...p.gallery);

  const seen = new Set();
  return arr.filter((img) => {
    const key = img?._key || img?._id || JSON.stringify(img);
    if (seen.has(key)) return false;
    seen.add(key);
    return !!img;
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) return notFound();

  // Robust category slug extraction (supports {slug: "x"} or {slug: {current: "x"}})
  const catSlug =
    typeof product?.category?.slug === "string"
      ? product.category.slug
      : product?.category?.slug?.current;

  // Fetch related products from the same category, excluding current
  const related = await getRelatedProducts({
    currentSlug: params.slug,
    categorySlug: catSlug,
    limit: 12,
  });


  // Images for the gallery
  const images = allImages(product);

  // Documents (Brochure + extra downloads)
  const brochureUrl = product?.brochure?.asset?._ref
    ? fileRefToCdnUrl(product.brochure.asset._ref)
    : null;

  const extraDocs: Array<{ title: string; url: string | null }> = Array.isArray(
    product?.downloads
  )
    ? product.downloads.map((d: any) => ({
      title: d?.title || "Download",
      url: d?.file?.asset?._ref ? fileRefToCdnUrl(d.file.asset._ref) : null,
    }))
    : [];

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 space-y-10">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/products" className="underline">
          Products
        </Link>
        <span> / </span>
        <span>{product.title}</span>
      </nav>

      {/* Title + meta */}
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold">{product.title}</h1>
        <div className="mt-2 text-gray-600">
          {product.category?.title && (
            <span>Category: {product.category.title}</span>
          )}
        </div>
      </header>

      {/* Main layout */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* LEFT: image gallery */}
        <div className="lg:col-span-6">
          <ProductGallery images={images} title={product.title} />
        </div>

        {/* RIGHT: tabs ABOVE the contact card */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Tabs */}
          <section>
            <ProductTabs
              descriptionBlocks={product.description}
              features={product.features}
              specs={product.specs}
              documents={[
                ...(brochureUrl
                  ? [{ title: "Brochure (PDF)", url: brochureUrl }]
                  : []),
                ...extraDocs,
              ]}
            />
          </section>

          {/* Contact card */}
          <section className="rounded-xl border bg-white shadow-sm">
            <div className="p-5">
              <h3 className="text-lg font-semibold text-[#0D1B2A]">
                Contact us for more information
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Have questions about sizing, installation, or availability?
                We’re happy to help.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-block rounded-lg bg-[#0D1B2A] px-4 py-2 text-white hover:bg-[#0b1420]"
              >
                Contact Us
              </Link>
            </div>
          </section>
        </div>
      </div>

      {/* RELATED PRODUCTS RAIL */}
      <RelatedProductsRail
        items={related}
        containerClassName="mt-14"
        railClassName="pb-3"
        cardWidth={360}
        cardImageHeight={200}
        showRibbon
        ribbonHeight={3}
      />


    </article>
  );
}
