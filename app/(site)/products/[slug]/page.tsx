import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/queries";
import { urlFor } from "@/lib/sanity.client";

export const revalidate = 60;

function fileRefToCdnUrl(ref: string) {
  // Sanity file ref example: file-abc123-1200x800-pdf
  // CDN URL pattern: https://cdn.sanity.io/files/<projectId>/<dataset>/<fileId>.<ext>
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "znbgi3bm";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const parts = ref.split("-");
  const id = parts.slice(1, -1).join("-"); // abc123
  const ext = parts[parts.length - 1];     // pdf (or png, etc.)
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${ext}`;
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return notFound();

  const heroUrl = product.heroImage ? urlFor(product.heroImage).width(1000).height(700).url() : null;

  const brochureUrl =
    product?.brochure?.asset?._ref
      ? fileRefToCdnUrl(product.brochure.asset._ref)
      : null;

  return (
    <article className="space-y-8">
      <nav className="text-sm text-gray-600">
        <Link href="/products" className="underline">Products</Link>
        <span> / </span>
        <span>{product.title}</span>
      </nav>

      <header className="space-y-4">
        <h1 className="text-3xl font-semibold">{product.title}</h1>
        <div className="text-gray-600">
          {product.brand?.title && (
            <span>
              Brand:{" "}
              <Link href={`/brands/${product.brand.slug}`} className="underline">
                {product.brand.title}
              </Link>
            </span>
          )}
          {product.category?.title && (
            <span className="ml-4">Category: {product.category.title}</span>
          )}
        </div>

        {brochureUrl && (
          <div className="mt-2">
            <a
              href={brochureUrl}
              className="inline-block rounded bg-black px-4 py-2 text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Brochure
            </a>
          </div>
        )}
      </header>

      {heroUrl && (
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg border bg-white">
          <Image src={heroUrl} alt={product.title} fill className="object-contain" />
        </div>
      )}

      {product.gallery?.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {product.gallery.map((img: any, i: number) => {
              const url = urlFor(img).width(600).height(400).url();
              return (
                <div key={i} className="relative w-full aspect-[3/2] rounded border overflow-hidden bg-white">
                  <Image src={url} alt={`${product.title} ${i+1}`} fill className="object-contain" />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {product.features?.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-2">Features</h2>
          <ul className="list-disc pl-5 space-y-1">
            {product.features.map((f: string, i: number) => <li key={i}>{f}</li>)}
          </ul>
        </section>
      )}

      {product.specs?.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-2">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {product.specs.map((s: any, i: number) => (
              <div key={i} className="flex justify-between border rounded p-2">
                <span className="font-medium">{s.label}</span>
                <span className="text-gray-700">{s.value}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {product.downloads?.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-2">Downloads</h2>
          <ul className="list-disc pl-5 space-y-1">
            {product.downloads.map((d: any, i: number) => (
              <li key={i}>
                {d.file?.asset?._ref ? (
                  <a
                    className="underline"
                    href={fileRefToCdnUrl(d.file.asset._ref)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {d.title || "Download"}
                  </a>
                ) : (
                  <span>{d.title || "Download"}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {product.sellable && (
        <section className="rounded border p-4">
          <h2 className="text-lg font-semibold mb-2">Purchase</h2>
          <div className="space-y-1">
            {product.sku && <div>SKU: {product.sku}</div>}
            {product.price && <div>Price: {product.currency || "USD"} {product.price}</div>}
            <div className="text-sm text-gray-600">E-commerce is coming soon.</div>
          </div>
        </section>
      )}
    </article>
  );
}
