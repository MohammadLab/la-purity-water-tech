// components/product/SearchBar.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchBar({ className = "" }: { className?: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const sp = useSearchParams();

    // Pull "q" from URL on mount
    const initial = useMemo(() => sp?.get("q") ?? "", [sp]);
    const [value, setValue] = useState(initial);

    // Keep local state in sync if user uses back/forward
    useEffect(() => {
        setValue(initial);
    }, [initial]);

    // Push new URL with debounce
    useEffect(() => {
        const t = setTimeout(() => {
            const params = new URLSearchParams(sp?.toString());
            const v = value.trim();
            if (v) params.set("q", v);
            else params.delete("q");
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        }, 250); // debounce
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    function clear() {
        setValue("");
        const params = new URLSearchParams(sp?.toString());
        params.delete("q");
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return (
        <div className={`relative ${className}`}>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search products..."
                className="
          w-full rounded-full border border-gray-300 bg-white/95
        px-5 py-3 text-base outline-none shadow-sm
        focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400
        "
                aria-label="Search products"
            />

        </div>
    );
}
