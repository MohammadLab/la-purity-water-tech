"use client";

import { useState } from "react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

type Spec = { label?: string; value?: string };
type DocLink = { title: string; url: string | null };

export default function ProductTabs({
  descriptionBlocks,
  features = [],
  specs = [],
  documents = [],
}: {
  descriptionBlocks?: any;           // Portable Text blocks
  features?: string[];               // simple bullet strings
  specs?: Spec[];                    // {label, value}
  documents?: DocLink[];             // {title, url}
}) {
  // Compute which tabs we actually have content for
  const hasDescription = true;
  const hasFeatures = Array.isArray(features) && features.length > 0;
  const hasSpecs = Array.isArray(specs) && specs.length > 0;
  const hasDocs = true;

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
        {tabs.map(t => (
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
          <div className="prose max-w-none">
            <PortableText value={descriptionBlocks} />
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
            {documents.filter(d => d?.url).map((d, i) => (
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
