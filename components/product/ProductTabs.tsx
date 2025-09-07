"use client";

import { useState } from "react";

type DocLink = { title: string; url: string | null };

export default function ProductTabs({
  description,
  features,
  specs,
  documents,
}: {
  description?: string;
  features?: string[];
  specs?: { label: string; value: string }[];
  documents?: DocLink[];
}) {
  const [active, setActive] = useState("desc");

  const tabs = [
    { id: "desc", label: "Description" },
    { id: "feat", label: "Features" },
    { id: "specs", label: "Specs" },
    { id: "docs", label: "Documents" },
  ];

  return (
    <div>
      {/* Tab headers */}
      <div className="flex gap-4 border-b">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`px-4 py-2 ${
              active === t.id
                ? "border-b-2 border-[#0D1B2A] text-[#0D1B2A]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Panels */}
      <div className="mt-4">
        {active === "desc" && <p>{description || "No description"}</p>}
        {active === "feat" && (
          <ul className="list-disc pl-5">
            {features?.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        )}
        {active === "specs" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {specs?.map((s, i) => (
              <div key={i} className="flex justify-between border p-2 rounded">
                <span className="font-medium">{s.label}</span>
                <span>{s.value}</span>
              </div>
            ))}
          </div>
        )}
        {active === "docs" && (
          <ul className="list-disc pl-5">
            {documents?.map((d, i) =>
              d.url ? (
                <li key={i}>
                  <a href={d.url} target="_blank" rel="noopener noreferrer" className="underline">
                    {d.title}
                  </a>
                </li>
              ) : (
                <li key={i}>{d.title}</li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
