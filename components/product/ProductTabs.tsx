// components/product/ProductTabs.tsx
"use client";

import { useState } from "react";

type Spec = { label: string; value: string };
type Doc = { title?: string; href: string };

export default function ProductTabs({
  description,
  features = [],
  specs = [],
  documents = [],
}: {
  description?: string;
  features?: string[];
  specs?: Spec[];
  documents?: Doc[];
}) {
  const tabs = [
    { id: "desc", label: "Description" },
    { id: "feat", label: "Features" },
    { id: "spec", label: "Specs" },
    { id: "docs", label: "Documents" },
  ] as const;

  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("desc");

  return (
    <section className="rounded-2xl border bg-white/70 ring-1 ring-black/5 overflow-hidden">
      <div className="flex gap-6 border-b px-4 sm:px-6 pt-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={[
              "relative -mb-px pb-3 text-sm font-medium transition",
              active === t.id
                ? "text-[#0D1B2A]"
                : "text-gray-500 hover:text-gray-800",
            ].join(" ")}
          >
            {t.label}
            {active === t.id && (
              <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-[#0D1B2A]" />
            )}
          </button>
        ))}
      </div>

      <div className="p-4 sm:p-6">
        {active === "desc" && (
          <div className="prose max-w-none text-gray-700">
            {description ? <p>{description}</p> : <p>No description.</p>}
          </div>
        )}

        {active === "feat" && (
          <div>
            {features.length ? (
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            ) : (
              <p className="text-gray-500">No features listed.</p>
            )}
          </div>
        )}

        {active === "spec" && (
          <div>
            {specs.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {specs.map((s, i) => (
                  <div key={i} className="flex justify-between rounded border p-2 bg-white/80">
                    <span className="font-medium">{s.label}</span>
                    <span className="text-gray-700">{s.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No specifications listed.</p>
            )}
          </div>
        )}

        {active === "docs" && (
          <div>
            {documents.length ? (
              <ul className="space-y-2">
                {documents.map((d, i) => (
                  <li key={i}>
                    <a
                      className="text-[#0D1B2A] underline hover:no-underline"
                      href={d.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {d.title || "Download"}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No documents available.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
