import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/queries";
import { urlFor } from "@/lib/sanityImage"; // ensure this helper exists/works
import { useState } from "react";
import ProductTabs from "@/components/product/ProductTabs";


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

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
    const product = await getProductBySlug(params.slug);
    if (!product) return notFound();

    const mainImg = firstImageLike(product);
    const mainUrl = mainImg ? urlFor(mainImg).width(900).height(700).fit("max").url() : null;

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

                {brochureUrl && (
                    <div className="mt-3">
                        <a
                            href={brochureUrl}
                            className="inline-block rounded bg-[#0D1B2A] px-4 py-2 text-white hover:bg-[#0b1420]"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Download Brochure
                        </a>
                    </div>
                )}
            </header>

            {/* Main layout */}
            <div className="grid gap-8 lg:grid-cols-12">
                {/* LEFT: image (auto-hide if missing) */}
                <div className="lg:col-span-6">
                    {mainUrl ? (
                        <div className="relative w-full rounded-xl border bg-white shadow-sm overflow-hidden">
                            {/* keep height sane, no massive empty box */}
                            <div className="relative aspect-[4/3] md:aspect-[3/2]">
                                <Image
                                    src={mainUrl}
                                    alt={product.title}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-xl border bg-gray-50 p-8 text-center text-sm text-gray-500">
                            No image
                        </div>
                    )}
                </div>

                {/* RIGHT: tabs ABOVE the contact card */}
                <div className="lg:col-span-6 flex flex-col gap-6">
                    {/* Tabs (restyled component below) */}
                    <section>

                        <ProductTabs
                            description={product.description}
                            features={product.features}
                            specs={product.specs}
                            documents={product.downloads?.map((d: any) => ({
                                title: d.title || "Download",
                                url: d?.file?.asset?._ref ? fileRefToCdnUrl(d.file.asset._ref) : null,
                            }))}
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
            </div>
        </article>
    );
}



type DocLink = { title: string; url: string | null };


