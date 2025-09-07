import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-center">
        <Link href="/" className="font-semibold hover:text-cyan-600">
          LaPurity Water Tech
        </Link>
      </div>
    </nav>
  );
}
