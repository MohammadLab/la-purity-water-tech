// app/components/product/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/image";

// One knob to control height everywhere
const CARD_HEIGHT = 260; // px — change to 220/300/etc.

export default function ProductCard({ product }: { product: any }) {
  const img = product?.heroImage ?? product?.gallery?.[0];

  // Non-cropping URL (fit:max). We set only a reasonable width bound.
  const imageUrl = img
    ? urlFor(img).width(800).fit("max").auto("format").url()
    : null;

  return (
    <Link href={`/product/${product?.slug}`} className="group block">
      {/* Grid makes the first column auto width (image) and the second fill the rest */}
      <div
        className="grid overflow-hidden rounded-2xl border bg-white ring-1 ring-black/5 shadow-sm transition hover:shadow-lg"
        style={{
          gridTemplateColumns: "auto 1fr",
          height: CARD_HEIGHT,
        }}
      >
        {/* LEFT: image column = shrink to image's rendered width */}
        <div className="relative bg-white md:rounded-l-2xl flex items-center">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product?.title || "Product image"}
              // Make the image exactly CARD_HEIGHT tall; width auto so column shrink-wraps
              height={CARD_HEIGHT}
              width={CARD_HEIGHT} // required by Next; overridden by style width:auto
              style={{ height: CARD_HEIGHT, width: "auto" }}
              className="object-contain object-left"
              sizes={`${CARD_HEIGHT}px`}
            />
          ) : (
            <div
              className="flex items-center justify-center bg-gray-100 text-gray-400"
              style={{ height: CARD_HEIGHT, width: CARD_HEIGHT }}
            >
              No image
            </div>
          )}
        </div>

        {/* RIGHT: text fills remaining width */}
        <div className="min-w-0 flex flex-col p-5" style={{ height: CARD_HEIGHT }}>
          {product?.category?.title && (
            <div className="text-xs text-gray-500">{product.category.title}</div>
          )}

          <h3 className="mt-1 line-clamp-2 min-h-[44px] text-lg font-semibold leading-tight text-[#0D1B2A]">
            {product?.title}
          </h3>

          {product?.description ? (
            <p className="mt-2 line-clamp-5 text-sm text-gray-700">{product.description}</p>
          ) : (
            <p className="mt-2 text-sm text-gray-500">Premium systems sized for Canadian homes.</p>
          )}

          <div className="mt-auto pt-4 text-sm font-medium text-cyan-600">View details →</div>
        </div>
      </div>
    </Link>
  );
}
