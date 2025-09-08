"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type Spec = { label?: string; value?: string };
type DocLink = { title: string; url: string | null };

export default function ProductTabs({
  descriptionBlocks,
  features = [],
  specs = [],
  documents = [],
}: {
  descriptionBlocks?: string | any;  // can be string; fallback stays permissive
  features?: string[];
  specs?: Spec[];
  documents?: DocLink[];
}) {
  // Prefer a “brochure” title when same URL shows twice
  function prefer(a?: DocLink, b?: DocLink) {
    const hasBrochure = (t?: string) => (t || "").toLowerCase().includes("brochure");
    if (hasBrochure(a?.title) && !hasBrochure(b?.title)) return a!;
    if (!hasBrochure(a?.title) && hasBrochure(b?.title)) return b!;
    return (a && b && (a.title || "").length >= (b.title || "").length) ? a! : (b || a)!;
  }

  const uniqueDocs = useMemo(() => {
    const byUrl = new Map<string, DocLink>();
    for (const d of documents || []) {
      if (!d?.url) continue;
      const key = d.url.split("?")[0]; // normalize
      byUrl.set(key, byUrl.has(key) ? prefer(byUrl.get(key), d) : d);
    }
    return Array.from(byUrl.values());
  }, [documents]);

  // Description: treat string as the primary case; allow fallback for legacy shapes
  const hasDescription =
    (typeof descriptionBlocks === "string" && descriptionBlocks.trim().length > 0) ||
    (Array.isArray(descriptionBlocks) && descriptionBlocks.length > 0);

  const hasFeatures = Array.isArray(features) && features.length > 0;
  const hasSpecs = Array.isArray(specs) && specs.length > 0;
  const hasDocs = uniqueDocs.length > 0;

  const tabs = [
    hasDescription && { key: "desc", label: "Description" },
    hasFeatures && { key: "features", label: "Features" },
    hasSpecs && { key: "specs", label: "Specs" },
    hasDocs && { key: "docs", label: "Documents" },
  ].filter(Boolean) as { key: string; label: string }[];

  const [active, setActive] = useState(tabs[0]?.key ?? "desc");

  if (tabs.length === 0) return null;

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      {/* Tabs */}
      <div className="flex gap-6 border-b px-5 pt-4">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`-mb-px border-b-2 pb-3 text-sm font-medium transition
              ${active === t.key
                ? "border-[#0D1B2A] text-[#0D1B2A]"
                : "border-transparent text-gray-500 hover:text-[#0D1B2A] hover:border-[#0D1B2A]/40"
              }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Panels */}
      <div className="p-5">
        {active === "desc" && hasDescription && (
          <div className="prose max-w-none text-gray-800">
            {typeof descriptionBlocks === "string" ? (
              <p>{descriptionBlocks}</p>
            ) : (
              // fallback for unexpected shapes (so it never silently disappears)
              <pre className="text-xs bg-gray-50 rounded p-3 overflow-auto">
                {JSON.stringify(descriptionBlocks, null, 2)}
              </pre>
            )}
          </div>
        )}

        {active === "features" && hasFeatures && (
          <ul className="list-disc pl-5 space-y-1 text-gray-800">
            {features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        )}

        {active === "specs" && hasSpecs && (
          <div className="grid gap-3 sm:grid-cols-2">
            {specs.map((s, i) => (
              <div key={i} className="flex justify-between rounded border px-3 py-2">
                <span className="font-medium">{s.label}</span>
                <span className="text-gray-700">{s.value}</span>
              </div>
            ))}
          </div>
        )}

        {active === "docs" && hasDocs && (
          <ul className="space-y-2">
            {uniqueDocs.map((d, i) => (
              <li key={i}>
                <Link
                  href={d.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded bg-[#0D1B2A] px-3 py-1.5 text-sm text-white hover:bg-[#0b1420]"
                >
                  {d.title || "Download"}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
