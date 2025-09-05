// components/nav/TabsRow.tsx
import Link from "next/link";

export default function TabsRow({ className = "" }: { className?: string }) {
  return (
    <nav
      aria-label="Primary"
      className={`
        inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-3
        rounded-2xl bg-[#0D1B2A] px-4 py-3 text-sm font-medium text-white
        ring-1 ring-black/5 shadow
        ${className}
      `}
    >
      <Link href="/" className="hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">Home</Link>
      <Link href="/products" className="hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">Products</Link>
      <Link href="/products/water-softeners" className="hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">Water Softeners</Link>
      <Link href="/products/uv" className="hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">UV</Link>
      <Link href="/products/chemical-removal" className="hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">Chemical Removal</Link>
      <Link href="/resources" className="hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">Resources</Link>
      <Link href="/contact" className="hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">Contact</Link>
    </nav>
  );
}
