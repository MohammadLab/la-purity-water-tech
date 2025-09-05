import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/image";

export default function ProductCard({ product }: { product: any }) {
  const img = product.heroImage ?? product.gallery?.[0];

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-gray-50">
        {img ? (
          <Image
            src={urlFor(img).width(800).height(600).fit("crop").url()}
            alt={product.title}
            width={800}
            height={600}
            className="h-full w-full object-cover transition group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">No image</div>
        )}
        <div className="absolute inset-0 hidden bg-white/10 backdrop-blur-sm transition group-hover:block" />
      </div>
      <div className="p-4">
        <div className="text-xs text-gray-500">{product.category?.title}</div>
        <h3 className="mt-1 text-base font-semibold">{product.title}</h3>
        {product.description && (
          <p className="mt-2 line-clamp-2 text-sm text-gray-600">{product.description}</p>
        )}
        <div className="mt-4 text-sm font-medium text-cyan-600">View details →</div>
      </div>
    </Link>
  );
}
