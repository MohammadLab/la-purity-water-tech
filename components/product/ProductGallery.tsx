"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanityImage";

/** Build a URL for Sanity images and gracefully support SVGs on the files API */
function imgUrl(img: any, w = 1200, h = 1200) {
  // SVGs unchanged
  if (img?.asset?.extension === "svg" || img?.asset?._ref?.includes("svg")) {
    if (img?.asset?.url) return img.asset.url;
    const ref = img?.asset?._ref || "";
    const [_, id] = ref.split("file-");
    const [fileId] = (id || "").split("-");
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "znbgi3bm";
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
    return `https://cdn.sanity.io/files/${projectId}/${dataset}/${fileId}.svg`;
  }

  // ⬇️ Use the ASSET, not the image object => ignores crop/hotspot
  const source = img?.asset || img;
  return urlFor(source).width(w).height(h).fit("max").url();
}


type Props = {
  images: any[];          // heroImage first if you want, then gallery[]
  title: string;
};

export default function ProductGallery({ images, title }: Props) {
  const safeImages = useMemo(
    () => (Array.isArray(images) ? images.filter(Boolean) : []),
    [images]
  );

  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  if (safeImages.length === 0) {
    return (
      <div className="rounded-xl border bg-gray-50 p-10 text-center text-sm text-gray-500">
        No image
      </div>
    );
  }

  const main = safeImages[active];
  const mainUrl = imgUrl(main);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setActive((i) => Math.min(i + 1, safeImages.length - 1));
      if (e.key === "ArrowLeft") setActive((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, safeImages.length]);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  return (
    <>
      <div className="flex gap-4">
        {/* Thumbnails (rail on the left) */}
        {safeImages.length > 1 && (
          <div
            className="
              flex flex-col gap-3 items-center
              max-h-[560px] overflow--y-auto
            "
          >
            {safeImages.map((img, idx) => (
              <button
  key={img._key || img._id || idx}
  className={[
    "box-border rounded-xl border bg-white shadow-sm",
    "flex items-center justify-center",
    "focus:outline-none focus-visible:outline-none",
    // Highlight styles
    idx === active
      ? "ring-2 ring-inset ring-[#0D1B2A] border-[#0D1B2A]"
      : "hover:border-gray-300",
  ].join(" ")}
  style={{
    width: 84,       // give the thumbnail a comfortable box
    height: 84,
    padding: 10,
    flex: "0 0 auto",
    overflow: "visible", // ensure nothing gets clipped
  }}
  onClick={() => setActive(idx)}
  aria-label={`Show image ${idx + 1}`}
>
  <Image
    src={imgUrl(img, 200, 200)}
    alt={`${title} thumbnail ${idx + 1}`}
    width={64}
    height={64}
    className="object-contain pointer-events-none select-none"
  />
</button>

            ))}
          </div>
        )}

        {/* Main image (right) */}
        <div
          ref={mainRef}
          className="relative flex aspect-[4/5] w-full max-w-[620px] items-center justify-center overflow-hidden rounded-xl border bg-white"
        >
          {/* Click target to open lightbox */}
          <button
            onClick={openModal}
            className="absolute inset-0 z-10 cursor-zoom-in"
            aria-label="Open image preview"
            title="Click to preview"
          />
          {mainUrl.endsWith(".svg") ? (
            <img
              src={mainUrl}
              alt={title}
              className="max-h-[95%] max-w-[95%] object-contain"
            />
          ) : (
            <Image
              src={mainUrl}
              alt={title}
              width={1400}
              height={1400}
              priority
              className="max-h-[95%] max-w-[95%] object-contain"
            />
          )}
        </div>
      </div>

      {/* LIGHTBOX / MODAL */}
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/80"
          aria-modal="true"
          role="dialog"
          onClick={closeModal}
        >
          <div
            className="absolute inset-0 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-sm font-semibold text-gray-800 shadow hover:bg-white"
              aria-label="Close preview"
            >
              ✕
            </button>

            {/* Prev / Next */}
            {safeImages.length > 1 && (
              <>
                <button
                  onClick={() => setActive((i) => Math.max(i - 1, 0))}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-gray-800 shadow hover:bg-white"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  onClick={() => setActive((i) => Math.min(i + 1, safeImages.length - 1))}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-gray-800 shadow hover:bg-white"
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            )}

            {/* Big image */}
            <div className="relative max-h-[90vh] max-w-[90vw]">
              {imgUrl(safeImages[active]).endsWith(".svg") ? (
                <img
                  src={imgUrl(safeImages[active])}
                  alt={title}
                  className="h-auto w-auto max-h-[90vh] max-w-[90vw] object-contain"
                />
              ) : (
                <Image
                  src={imgUrl(safeImages[active], 2400, 2400)}
                  alt={title}
                  width={2400}
                  height={2400}
                  className="h-auto w-auto max-h-[90vh] max-w-[90vw] object-contain"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
