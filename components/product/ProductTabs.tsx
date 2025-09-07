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
  descriptionBlocks?: any[];
  features?: string[];
  specs?: Spec[];
  documents?: DocLink[];
}) {
  const tabs = ["Description", "Features", "Specs", "Documents"] as const;
  const [active, setActive] = useState<(typeof tabs)[number]>("Description");

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      {/* Tabs */}
      <div className="flex gap-6 px-4 pt-3">
        {tabs.map((t) => {
          const on = t === active;
          return (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={[
                "relative pb-3 text-sm font-medium transition-colors",
                on ? "text-[#0D1B2A]" : "text-gray-500 hover:text-gray-800",
              ].join(" ")}
            >
              {t}
              <span
                className={[
                  "absolute left-0 right-0 -bottom-px h-[3px] rounded-full",
                  on ? "bg-[#0D1B2A]" : "bg-transparent",
                ].join(" ")}
              />
            </button>
          );
        })}
      </div>

      <div className="h-px w-full bg-gray-200" />

      {/* Panels */}
      <div className="p-5">
        {active === "Description" && (
          <div className="prose max-w-none prose-p:my-2 prose-li:my-1 text-gray-800">
            {descriptionBlocks?.length ? (
              <PortableText value={descriptionBlocks} />
            ) : (
              <p>No description available.</p>
            )}
          </div>
        )}

        {active === "Features" && (
          <ul className="list-disc pl-5 space-y-1 text-gray-800">
            {features?.length ? (
              features.map((f, i) => <li key={i}>{f}</li>)
            ) : (
              <li>No features listed.</li>
            )}
          </ul>
        )}

        {active === "Specs" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {specs?.length ? (
              specs.map((s, i) => (
                <div key={i} className="flex justify-between rounded-lg border p-2 text-sm">
                  <span className="font-medium text-gray-700">{s.label}</span>
                  <span className="text-gray-900">{s.value}</span>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-600">No specs available.</div>
            )}
          </div>
        )}

        {active === "Documents" && (
          <ul className="space-y-2">
            {documents?.length ? (
              documents.map((d, i) =>
                d.url ? (
                  <li key={i}>
                    <Link
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-lg border px-3 py-2 text-sm font-medium text-[#0D1B2A] hover:bg-gray-50"
                    >
                      {d.title}
                    </Link>
                  </li>
                ) : (
                  <li key={i} className="text-sm text-gray-500">
                    {d.title}
                  </li>
                )
              )
            ) : (
              <li className="text-sm text-gray-600">No documents available.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
