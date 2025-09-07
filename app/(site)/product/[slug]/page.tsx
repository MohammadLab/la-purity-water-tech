import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/queries";
import { urlFor } from "@/lib/sanityImage"; // ensure this helper exists/works
import ProductTabs from "@/components/product/ProductTabs";
import { getRelatedProducts } from "@/lib/queries";
import ProductGallery from "@/components/product/ProductGallery";

export const revalidate = 60;

// build a CDN url for Sanity "file" assets
function fileRefToCdnUrl(ref: string) {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "znbgi3bm";
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
    const parts = ref.split("-");
    const id = parts.slice(1, -1).join("-");
    const ext = parts[parts.length - 1];
    return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${ext}`;
}

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

// Helper to collect all images into an array
function allImages(p: any) {
    const arr: any[] = [];
    if (p?.heroImage) arr.push(p.heroImage);
    if (p?.mainImage) arr.push(p.mainImage);
    if (p?.image) arr.push(p.image);
    if (Array.isArray(p?.images)) arr.push(...p.images);
    if (Array.isArray(p?.gallery)) arr.push(...p.gallery);
    // Remove duplicates (by _key or _id if available)
    const seen = new Set();
    return arr.filter(img => {
        const key = img?._key || img?._id || JSON.stringify(img);
        if (seen.has(key)) return false;
        seen.add(key);
        return !!img;
    });
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
    const product = await getProductBySlug(params.slug);
    if (!product) return notFound();

    const related =
        product?.category?.slug
            ? await getRelatedProducts(product.category.slug, product._id)
            : [];

    // Get all images
    const images = allImages(product);

    const brochureUrl =
        product?.brochure?.asset?._ref
            ? fileRefToCdnUrl(product.brochure.asset._ref)
            : null;

    return (
        <article className="mx-auto max-w-7xl px-4 py-8">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm text-gray-600">
                <Link href="/products" className="underline">Products</Link>
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
                    {/* Tabs (restyled component below) */}
                    <section>
                        <ProductTabs
                            descriptionBlocks={product.longDescription} // or whatever your description field is
                            features={product.features}
                            specs={product.specs}
                            documents={[
                                ...(product?.brochure?.asset?._ref
                                    ? [
                                        {
                                            title: "Brochure (PDF)",
                                            url: fileRefToCdnUrl(product.brochure.asset._ref),
                                        },
                                    ]
                                    : []),
                                // then any downloads
                                ...(product?.downloads?.length
                                    ? product.downloads.map((d: any) => ({
                                        title: d.title || "Download",
                                        url: d?.file?.asset?._ref ? fileRefToCdnUrl(d.file.asset._ref) : null,
                                    }))
                                    : []),
                            ]}
                        />
                    </section>

                    {/* Contact card */}
                    <section className="rounded-xl border bg-white shadow-sm">
                        <div className="p-5">
                            <h3 className="text-lg font-semibold text-[#0D1B2A]">Contact us for more information</h3>
                            <p className="mt-2 text-sm text-gray-600">
                                Have questions about sizing, installation, or availability? We’re happy to help.
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
            </div> {/* <-- This is the end of your main grid */}

            {/* RELATED PRODUCTS */}
            {related?.length > 0 && (
                <section className="mx-auto mt-12 max-w-7xl">
                    <h2 className="mb-4 text-lg font-semibold text-[#0D1B2A]">
                        More in {product.category?.title}
                    </h2>
                    <div className="relative -mx-4 px-4">
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {related.map((r: any) => {
                                const img =
                                    r.heroImage ?? r.mainImage ?? r.image ?? r.images ?? r.gallery ?? null;
                                const imgUrl = img ? urlFor(img).width(300).height(220).fit("max").url() : null;

                                return (
                                    <Link
                                        key={r._id}
                                        href={`/product/${r.slug}`}
                                        className="min-w-[240px] max-w-[240px] flex-shrink-0 rounded-xl border bg-white shadow-sm hover:shadow-md transition"
                                    >
                                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-xl bg-gray-50">
                                            {imgUrl ? (
                                                <Image
                                                    src={imgUrl}
                                                    alt={r.title}
                                                    fill
                                                    className="object-contain"
                                                    sizes="240px"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center rounded-t-xl bg-gray-100 text-gray-400">
                                                    No image
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-4">
                                            <h3 className="text-sm font-semibold text-[#0D1B2A] line-clamp-1">
                                                {r.title}
                                            </h3>
                                            {r.price && (
                                                <p className="mt-1 text-lg font-bold text-[#0D1B2A]">
                                                    ${r.price}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </article>
    );
}


