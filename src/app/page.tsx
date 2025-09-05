import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Link from "next/link";

export const revalidate = 60;

export default async function HomePage() {
  return (
    <>
      <Section className="bg-white">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div>
              <span className="inline-block rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
                Water Treatment, Modernized
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight" style={{fontFamily:"var(--font-dm-sans)"}}>
                Engineered water treatment for every home
              </h1>
              <p className="mt-3 text-gray-600">
                Explore softeners, reverse osmosis, UV, and chemical removal—built for reliability and performance.
              </p>
              <div className="mt-6">
                <Link href="/products" className="inline-flex rounded-full bg-[#0D1B2A] px-5 py-3 text-sm text-white">
                  Browse Products
                </Link>
              </div>
            </div>
            <div className="h-56 rounded-2xl bg-gradient-to-br from-cyan-100 to-white border" />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="text-2xl font-bold" style={{fontFamily:"var(--font-dm-sans)"}}>Top Categories</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {["Water Softeners","Reverse Osmosis","UV","Chemical Removal","Iron/Sulfur","Tannin"].map((c)=>(
              <Link key={c} href={`/products/${encodeURIComponent(c.toLowerCase().replace(/\s+/g,'-'))}`}
                    className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">
                <div className="text-lg font-semibold">{c}</div>
                <div className="mt-1 text-sm text-gray-600">Explore {c}</div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <h2 className="text-2xl font-bold" style={{fontFamily:"var(--font-dm-sans)"}}>Why choose us</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              {t:"Health", d:"Great-tasting water with reduced contaminants."},
              {t:"Protection", d:"Scale, iron, and sulfur solutions to protect fixtures."},
              {t:"Efficiency", d:"Smart designs for performance and longevity."},
            ].map((x)=>(
              <div key={x.t} className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="text-lg font-semibold">{x.t}</div>
                <p className="mt-2 text-sm text-gray-600">{x.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="text-center">
          <Link href="/products" className="inline-flex rounded-full bg-cyan-600 px-6 py-3 text-sm text-white">
            Explore all products →
          </Link>
        </Container>
      </Section>
    </>
  );
}
