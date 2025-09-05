import Image from "next/image";
import { urlFor } from "@/lib/image";
import Badge from "@/components/ui/Badge";

export default function ProductHero({ product }: { product: any }) {
  const img = product.heroImage ?? product.gallery?.[0];

  return (
    <header className="mt-6 grid gap-8 md:grid-cols-2">
      <div className="rounded-2xl border bg-white p-2">
        {img && (
          <Image
            src={urlFor(img).width(1200).height(900).fit("crop").url()}
            alt={product.title}
            width={1200}
            height={900}
            className="h-auto w-full rounded-xl object-cover"
            priority
          />
        )}
      </div>
      <div>
        {product.category?.title && <Badge>{product.category.title}</Badge>}
        <h1 className="mt-3 text-3xl font-bold tracking-tight">{product.title}</h1>
        {product.brand?.title && (
          <p className="mt-1 text-sm text-gray-500">by {product.brand.title}</p>
        )}
        {product.brochure?.asset?.url && (
          <a
            href={product.brochure.asset.url}
            className="mt-4 inline-flex rounded-full bg-[#0D1B2A] px-4 py-2 text-sm text-white"
          >
            Download Brochure
          </a>
        )}
      </div>
    </header>
  );
}
