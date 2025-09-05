"use client";
import { useState } from "react";
import clsx from "classnames";

type Tab = { key: string; label: string; content: React.ReactNode };

export default function Tabs({ tabs, initial = 0 }: { tabs: Tab[]; initial?: number }) {
  const [active, setActive] = useState(initial);
  return (
    <div className="w-full">
      <div
        role="tablist"
        aria-label="Product details"
        className="inline-flex rounded-2xl border bg-white p-1 shadow-sm"
      >
        {tabs.map((t, i) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={active === i}
            className={clsx(
              "px-4 py-2 text-sm rounded-xl transition",
              active === i ? "bg-[#0D1B2A] text-white" : "text-gray-700 hover:bg-gray-100"
            )}
            onClick={() => setActive(i)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="mt-6">
        {tabs[active]?.content}
      </div>
    </div>
  );
}
