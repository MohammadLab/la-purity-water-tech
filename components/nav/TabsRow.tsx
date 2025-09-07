// components/nav/TabsRow.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export default function TabsRow() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="inline-flex">
      <ul
        className="
          inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1
          text-sm shadow-sm ring-1 ring-black/5 backdrop-blur
        "
      >
        {tabs.map((t) => {
          const isActive =
            t.href === "/"
              ? pathname === "/"
              : pathname === t.href || pathname.startsWith(`${t.href}/`);

          return (
            <li key={t.href}>
              <Link
                href={t.href}
                className={[
                  "inline-flex items-center rounded-full px-3 py-1.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500",
                  isActive
                    ? "bg-[#0D1B2A] text-white"
                    : "text-[#0D1B2A] hover:bg-cyan-50",
                ].join(" ")}
              >
                {t.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
