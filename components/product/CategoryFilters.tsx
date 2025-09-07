// components/product/CategoryFilters.tsx
"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CategoryFilters({
  categories,
  selected,
}: {
  categories: { title: string; slug?: string }[];
  selected: string[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const sp = useSearchParams();

  const active = useMemo(() => new Set(selected), [selected]);

  function toggle(slug?: string) {
    if (!slug) return;
    const next = new Set(active);
    if (next.has(slug)) next.delete(slug);
    else next.add(slug);

    const params = new URLSearchParams(sp?.toString());
    if (next.size === 0) params.delete("categories");
    else params.set("categories", Array.from(next).join(","));

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function clearAll() {
    const params = new URLSearchParams(sp?.toString());
    params.delete("categories");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((c) => {
        const isOn = c.slug && active.has(c.slug);
        return (
          <button
            key={c.slug || c.title}
            onClick={() => toggle(c.slug)}
            className={[
              "rounded-full border px-3 py-1.5 text-sm transition",
              isOn
                ? "bg-[#0D1B2A] text-white border-[#0D1B2A]"
                : "bg-white text-gray-700 border-gray-300 hover:border-cyan-300 hover:text-cyan-700",
            ].join(" ")}
            aria-pressed={isOn ? "true" : "false"}
          >
            {c.title}
          </button>
        );
      })}
      <button
        onClick={clearAll}
        className="ml-2 rounded-full border border-transparent px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:border-gray-300"
      >
        Clear
      </button>
    </div>
  );
}
