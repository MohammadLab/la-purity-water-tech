"use client";

import { useRef } from "react";
import ProductCard from "@/components/product/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  items: any[];
  title?: string;
  containerClassName?: string;
  railClassName?: string;
  /** fixed card width (px) so snapping feels right */
  cardWidth?: number;
  /** height of the ProductCard image box (px) */
  cardImageHeight?: number;
  /** show a thin ribbon under the title */
  showRibbon?: boolean;
  ribbonHeight?: number;
};

export default function RelatedProductsRail({
  items,
  title = "More in this category",
  containerClassName,
  railClassName,
  cardWidth = 360,
  cardImageHeight = 200,
  showRibbon = false,
  ribbonHeight = 3,
}: Props) {
  if (!items || items.length === 0) return null;

  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const delta = dir === "left" ? -(cardWidth + 16) : cardWidth + 16; // include gap
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className={`mt-12 ${containerClassName || ""}`}>
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-[#0D1B2A]">
          {title}
        </h2>
        <div className="hidden gap-2 md:flex">
          <button
            onClick={() => scrollBy("left")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white shadow-sm hover:bg-gray-50"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollBy("right")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white shadow-sm hover:bg-gray-50"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Optional ribbon */}
      {showRibbon && (
        <div
          className="w-full rounded-full bg-[#0D1B2A] mb-4"
          style={{ height: ribbonHeight }}
          aria-hidden
        />
      )}

      {/* Rail */}
      <div
        ref={scrollerRef}
        className={`
          -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2
          scroll-smooth
          [scrollbar-width:thin]
          [&::-webkit-scrollbar]:h-2
          [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300
          ${railClassName || ""}
        `}
        role="list"
        aria-label="Related products scroller"
      >
        {items.map((product) => (
          <div key={product._id} className="flex-shrink-0 snap-start" style={{ width: cardWidth }}>
            <ProductCard product={product}  />
          </div>
        ))}
      </div>
    </section>
  );
}
