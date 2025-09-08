// app/components/product/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/image";

export default function ProductCard({ product }: { product: any }) {
  const img = product.heroImage ?? product.gallery?.[0];
  const imageUrl = img ? urlFor(img).width(600).height(600).url() : null;

  return (
    <Link href={`/product/${product.slug}`} className="group block h-full">
      <div className="relative flex h-full flex-col md:flex-row overflow-hidden rounded-2xl border bg-white ring-1 ring-black/5 shadow-sm transition hover:shadow-lg">
        
        {/* LEFT: Image */}
        <div className="relative w-full md:w-56 lg:w-64">
          <div className="relative aspect-[4/3] w-full md:aspect-auto md:h-full overflow-hidden md:rounded-l-2xl">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 320px, 400px"
                className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400">
                No image
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Text */}
        <div className="flex flex-1 flex-col p-5 min-h-[160px]">
          {product.category?.title && (
            <div className="text-xs text-gray-500">{product.category.title}</div>
          )}
          <h3 className="mt-1 text-lg font-semibold leading-tight text-[#0D1B2A] min-h-[44px]">
            {product.title}
          </h3>

          {product.description ? (
            <p className="mt-2 text-sm text-gray-700 line-clamp-2">{product.description}</p>
          ) : (
            <p className="mt-2 text-sm text-gray-500">
              Premium systems sized for Canadian homes.
            </p>
          )}

          <div className="mt-auto pt-4 text-sm font-medium text-cyan-600">
            View details →
          </div>
        </div>
      </div>
    </Link>
  );
}
