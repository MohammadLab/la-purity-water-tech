// components/hero/HeroSlideshow.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];          // e.g., ['/images/hero/1.jpg', ...]
  intervalMs?: number;       // time each slide stays visible
  fadeMs?: number;           // fade duration
  className?: string;        // extra classes for the wrapper
};

export default function HeroSlideshow({
  images,
  intervalMs = 5000,
  fadeMs = 800,
  className = "",
}: Props) {
  const [idx, setIdx] = useState(0);
  const mounted = useRef(false);

  // ensure no empty array issues
  const slides = useMemo(() => (images?.length ? images : ["/images/hero/placeholder.png"]), [images]);

  useEffect(() => {
    mounted.current = true;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => {
      mounted.current = false;
      clearInterval(id);
    };
  }, [intervalMs, slides.length]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {slides.map((src, i) => {
        const active = i === idx;
        return (
          <div
            key={src + i}
            className="absolute inset-0"
            style={{
              transition: `opacity ${fadeMs}ms ease`,
              opacity: active ? 1 : 0,
            }}
            aria-hidden={!active}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="100vw"
              priority={i === 0}
              className="object-cover object-center"
            />
          </div>
        );
      })}
      {/* subtle blur/white veil like before */}
      
    </div>
  );
}
