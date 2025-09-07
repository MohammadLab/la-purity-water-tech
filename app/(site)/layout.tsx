// app/(site)/layout.tsx
"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import "@/styles/globals.css";
import GlobalHeader from "@/components/nav/GlobalHeader";
import Footer from "@/components/layout/Footer";


export default function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();


  return (
    <div className="min-h-screen flex flex-col">
      <GlobalHeader />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}
