import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

/** Fancy, legible, lightweight value-prop section (no extra deps)
 * - Subtle radial background
 * - Glass cards with gradient ring + hover lift
 * - Inline SVG icons (no external icon lib)
 */
export default function ValueProps() {
  return (
    <Section className="relative overflow-hidden py-14 md:py-18">
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_400px_at_50%_-10%,rgba(0,194,255,0.10),transparent_60%)]"
      />

      <Container>
        {/* Title + sub */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0D1B2A]">
            LaPurity Water Tech solves all your water treatment problems…
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Softer water, fewer contaminants, longer-lasting fixtures, and better taste — engineered solutions for municipal and well water.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            icon={
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 7h16M4 12h10M4 17h7" />
              </svg>
            }
            title="Premium Components"
            text="High-quality tanks, valves, and media chosen for reliability and performance."
          />

          <Card
            icon={
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 11l9-8 9 8v9H3z" />
              </svg>
            }
            title="Engineered for Canada"
            text="Systems sized and configured for Canadian homes and water profiles."
          />

          <Card
            icon={
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            }
            title="Service & Support"
            text="Friendly expertise before and after install — parts, media, and maintenance."
          />
        </div>
      </Container>
    </Section>
  );
}

function Card({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="group relative rounded-2xl border bg-white/80 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Gradient ring on hover */}
      <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-cyan-400/50 transition" />

      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D1B2A] text-white/95 ring-1 ring-black/5">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-[#0D1B2A]">{title}</h3>
          <p className="mt-2 text-sm text-gray-600">{text}</p>
        </div>
      </div>

      {/* tiny accent underline that animates in */}
      <div className="mt-4 h-0.5 w-10 origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#00C2FF] to-transparent transition group-hover:scale-x-100" />
    </div>
  );
}
