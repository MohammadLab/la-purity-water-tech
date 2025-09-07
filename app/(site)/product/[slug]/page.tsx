// app/(site)/products/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug } from "@/lib/queries";
import { urlFor } from "@/lib/sanity.client";
import ProductTabs from "@/components/product/ProductTabs"; // <= tabs UI

export const dynamic = "force-dynamic"; // add this near the top
export const revalidate = 60;

// Let Next prerender product pages by their slugs
export async function generateStaticParams() {
  const products = await getAllProducts().catch(() => []);
  return (products ?? [])
    .map((p: any) => {
      const s =
        typeof p?.slug === "string" ? p.slug : p?.slug?.current;
      return s ? { slug: s } : null;
    })
    .filter(Boolean);
}

// If you want ISR + dynamic fallback, keep this true (default)
// export const dynamicParams = true;

/** Turn Sanity file ref into CDN URL */
function fileRefToCdnUrl(ref: string) {
  // file-<id>-<dimensions>-<ext>
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "znbgi3bm";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const parts = ref.split("-");
  const id = parts.slice(1, -1).join("-"); // file id
  const ext = parts[parts.length - 1];     // ext
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${ext}`;
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  // Normalize slug and fetch
  const slug = (params?.slug || "").replace(/\/+$/g, "");
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  // Main hero image
  const heroUrl = product?.heroImage
    ? urlFor(product.heroImage).width(1200).height(900).url()
    : null;

  // Optional marketing brochure (single file)
  const brochureUrl = product?.brochure?.asset?._ref
    ? fileRefToCdnUrl(product.brochure.asset._ref)
    : null;

  // Documents: either the single brochure above OR an array "downloads"
  const documents: Array<{ title?: string; href: string }> = [];
  if (Array.isArray(product?.downloads)) {
    for (const d of product.downloads) {
      const href = d?.file?.asset?._ref ? fileRefToCdnUrl(d.file.asset._ref) : d?.url;
      if (href) documents.push({ title: d?.title || "Download", href });
    }
  }
  if (brochureUrl) {
    documents.unshift({ title: "Product Brochure", href: brochureUrl });
  }

  return (
    <article className="space-y-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600">
        <Link href="/products" className="underline">Products</Link>
        <span> / </span>
        <span>{product.title}</span>
      </nav>

      {/* Header */}
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-[#0D1B2A]">{product.title}</h1>
        <div className="text-gray-600 flex flex-wrap gap-4">
          {product?.brand?.title && (
            <span>
              Brand:{" "}
              <span className="font-medium">{product.brand.title}</span>
            </span>
          )}
          {product?.category?.title && (
            <span>
              Category:{" "}
              <span className="font-medium">{product.category.title}</span>
            </span>
          )}
        </div>
      </header>

      {/* Top section: image on left, key info + CTA on right */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main image */}
        <div className="relative w-full aspect-[16/11] overflow-hidden rounded-lg border bg-white">
          {heroUrl ? (
            <Image src={heroUrl} alt={product.title} fill className="object-contain" />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>

        {/* Details + CTA */}
        <div className="space-y-6">
          {/* Quick bullets if you want them here too */}
          {Array.isArray(product?.features) && product.features.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Highlights</h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {product.features.map((f: string, i: number) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact box */}
          <div className="rounded-2xl border bg-white/80 p-5 ring-1 ring-black/5 shadow-sm">
            <h3 className="text-lg font-semibold text-[#0D1B2A]">
              Contact us for more information
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Have questions about sizing, installation, or availability? We’re happy to help.
            </p>
            <div className="mt-4">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-md bg-[#0D1B2A] px-4 py-2 text-white hover:bg-[#0B1623] transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tabbed content (Description, Features, Specs, Documents) */}
      <ProductTabs
        description={product?.description}
        features={Array.isArray(product?.features) ? product.features : []}
        specs={Array.isArray(product?.specs) ? product.specs : []}
        documents={documents}
      />

      {/* Optional gallery */}
      {Array.isArray(product?.gallery) && product.gallery.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {product.gallery.map((img: any, i: number) => {
              const url = urlFor(img).width(600).height(400).url();
              return (
                <div
                  key={i}
                  className="relative w-full aspect-[3/2] rounded border overflow-hidden bg-white"
                >
                  <Image src={url} alt={`${product.title} ${i + 1}`} fill className="object-contain" />
                </div>
              );
            })}
          </div>
        </section>
      )}
    </article>
  );
}
