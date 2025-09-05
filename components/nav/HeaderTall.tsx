import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";

type Tab = { href: string; label: string };

export default function HeaderTall({
  logoSrc = "/logo-lapurity-circle.png",      // put your PNG here
  tabs = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/products/water-softeners", label: "Water Softeners" },
    { href: "/products/uv", label: "UV" },
    { href: "/products/chemical-removal", label: "Chemical Removal" },
    { href: "/resources", label: "Resources" },
    { href: "/contact", label: "Contact" },
  ],
}: {
  logoSrc?: string;
  tabs?: Tab[];
}) {
  return (
    <header className="relative isolate">
      {/* soft blue vibe background */}
      <div className="absolute inset-0 -z-10">
        {/* swap this for a wide hero: /public/images/hero-blue.jpg */}
        <div className="h-[280px] sm:h-[340px] md:h-[400px] w-full bg-[url('/images/hero-blue.jpg')] bg-cover bg-center opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/70 via-[#0D1B2A]/40 to-[#00C2FF]/10" />
      </div>

      {/* tall head with BIG circular logo */}
      <Container className="flex h-[280px] sm:h-[340px] md:h-[400px] items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <div
            className="
              relative
              w-[180px] h-[180px]
              sm:w-[220px] sm:h-[220px]
              md:w-[260px] md:h-[260px]
              rounded-full bg-white/95 p-4 shadow-xl ring-1 ring-black/5
            "
          >
            <Image
              src={logoSrc}
              alt="LaPurity Water Tech Inc."
              fill
              sizes="(max-width: 768px) 220px, 260px"
              className="object-contain"
              priority
            />
          </div>

          <p className="mt-5 text-sm sm:text-base text-white/85 max-w-2xl">
            Residential Water Softening, Filtration &amp; Purification Solutions
          </p>
        </div>
      </Container>

      {/* tabs bar (like the screenshot, sits under the banner) */}
      <nav className="sticky top-0 z-40 w-full border-t border-white/10 bg-[#0D1B2A] text-white">
        <Container className="flex h-12 items-center justify-center gap-6 text-sm font-medium">
          {tabs.map((t) => (
            <Link key={t.href} href={t.href} className="hover:text-cyan-300">
              {t.label}
            </Link>
          ))}
        </Container>
      </nav>
    </header>
  );
}
