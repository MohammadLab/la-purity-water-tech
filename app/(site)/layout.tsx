// app/(site)/layout.tsx
"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showHeader = pathname !== "/";

  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && <Navbar />}
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
}
