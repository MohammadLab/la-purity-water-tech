import Link from "next/link";
import Container from "@/components/ui/Container";

export default function MainNav() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <Container className="flex h-14 items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight">LaPurity</Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/products" className="hover:text-gray-900">Products</Link>
          <Link href="/resources" className="hover:text-gray-900">Resources</Link>
          <Link href="/contact" className="hover:text-gray-900">Contact</Link>
        </nav>
      </Container>
    </header>
  );
}
