// app/(site)/about/page.tsx
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import QuoteForm from "@/components/forms/QuoteForm";
import {
  ShieldCheck,
  Wrench,
  Droplets,
  Clock3,
  MapPin,
  Award,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "About LaPurity | Windsor, Ontario",
  description:
    "LaPurity Water Tech is a Windsor-based vendor of Excalibur Water Systems. We help homeowners in Southwestern Ontario specify, size, and support whole-home water treatment systems.",
};

export const revalidate = 60;

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <Section className="py-16">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-[#e6f6fb] via-white to-[#f1f5f9] ring-1 ring-black/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(13,27,42,0.08),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(2,132,199,0.08),transparent_35%)]" />
            <div className="relative grid gap-8 p-8 md:grid-cols-12 md:p-12">
              <div className="md:col-span-7 lg:col-span-8">
                <p className="text-xs font-medium uppercase tracking-wider text-cyan-700">
                  Your Trusted Partner for Residential, Commercial, and Industrial Water Treatment
                </p>
                <h1 className="mt-2 text-3xl font-semibold leading-tight text-[#0D1B2A] md:text-4xl">
                  LaPurity Water Tech
                </h1>
                <p className="mt-3 max-w-2xl text-gray-700">
                  LaPurity Water Tech is your local partner and stocking source for{" "}
                  <span className="font-medium">Excalibur Water Systems</span>, a leading
                  manufacturer of premium water treatment solutions. We proudly serve all cities
                  across Southern Ontario — and even extend our expertise to the eastern regions
                  of Michigan. Our team helps you solve water problems with the right solution plan,
                  provides professional on-site installation and maintenance, ensures fast and
                  reliable delivery, and supports your system for years to come.
                </p>
                <p className="mt-3 max-w-2xl font-medium text-gray-800">
                  Take the first step toward cleaner, safer water today.
                </p>


                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link
                    href="/products"
                    className="inline-flex items-center rounded-full bg-[#0D1B2A] px-4 py-2 text-white shadow-sm hover:bg-[#0b1420]"
                  >
                    Browse Products
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-full border bg-white px-4 py-2 text-[#0D1B2A] shadow-sm ring-1 ring-black/5 hover:bg-gray-50"
                  >
                    Contact Us
                  </Link>
                </div>

                <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-700">
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={16} className="text-cyan-700" />
                    Windsor–Essex, Chatham-Kent, Sarnia-Lambton
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <ShieldCheck size={16} className="text-cyan-700" />
                    Genuine Excalibur equipment
                  </span>
                </div>
              </div>

              <div className="md:col-span-5 lg:col-span-4">
                <div className="relative mx-auto w-full max-w-[360px] overflow-hidden rounded-2xl border bg-white p-4 text-center shadow-sm ring-1 ring-black/5">
                  <Image
                    src="/logo-lapurity-circle.png"
                    alt="LaPurity Water Tech"
                    width={900}
                    height={900}
                    className="mx-auto h-auto w-full object-contain"
                    priority
                  />
                  <div className="mt-3 text-xs text-gray-500">
                    Local vendor of Excalibur Water Systems
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* WHO WE ARE */}
      <Section className="py-10">
        <Container className="max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-7">
              <h2 className="text-3xl font-semibold text-[#1E3A8A]">Our Company</h2>
              <p className="leading-relaxed text-gray-700">
                We’re a Windsor-based team with one job: help you get the right Excalibur system
                for your home and water. That means reviewing test data, sizing to real flow
                rates, selecting the correct media/resins, and making sure everything is
                understandable for your installer. After installation, we remain your first call for
                maintenance schedules, performance checks, and warranty guidance.
              </p>
              <p className="leading-relaxed text-gray-700">
                Excalibur systems cover softening, iron/sulphur/manganese reduction, pH
                neutralization, tannin filtration, whole-home carbon, and point-of-use purification.
                Their designs are robust and serviceable — parts and media are available, and
                many models carry strong limited warranties (often 7, 10, 12, or 20 years; see
                product literature for details). We help you keep those systems in spec so you
                actually benefit from that coverage.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <Feature
                  icon={<Droplets className="h-5 w-5 text-cyan-700" />}
                  title="Right-sized systems"
                  text="We size to fixture count, peak flow, and water chemistry — not guesswork."
                />
                <Feature
                  icon={<Wrench className="h-5 w-5 text-cyan-700" />}
                  title="Serviceable by design"
                  text="Media and parts you can maintain over decades. No disposable gimmicks."
                />
                <Feature
                  icon={<ShieldCheck className="h-5 w-5 text-cyan-700" />}
                  title="Backed by warranties"
                  text="Strong limited coverage from Excalibur; we help you understand it."
                />
                <Feature
                  icon={<Clock3 className="h-5 w-5 text-cyan-700" />}
                  title="Long-term support"
                  text="Filter schedules, tune-ups, and performance checks when you need them."
                />
              </div>
            </div>

            {/* Partner / visual */}
            <aside className="lg:col-span-5">
              <div className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
                <h3 className="text-lg font-semibold text-[#0D1B2A]">
                  Partnered with Excalibur Water Systems
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  We source and support genuine Excalibur equipment. You get the reliability of a
                  proven manufacturer with the responsiveness of a local vendor.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-center text-sm text-gray-700">
                  <Stat k="20+" v="product families" />
                  <Stat k="7–20 yr" v="limited warranties*" />
                  <Stat k="5,000+" v="rated flows (L/h)" />
                  <Stat k="100%" v="genuine parts" />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  *Warranty terms vary by model; see individual product pages.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* HOW WE WORK */}
      <Section className="py-10">
        <Container className="max-w-6xl">
          <h2 className="mb-6 text-3xl font-semibold text-[#1E3A8A]">How We Work</h2>
          <ol className="grid gap-4 md:grid-cols-2">
            <Step
              n={1}
              title="Discuss your water & goals"
              text="Well vs municipal, staining/odour, fixture count, family size, budget, and any constraints."
            />
            <Step
              n={2}
              title="Review test data"
              text="Hardness, iron, manganese, pH, TDS, chlorine/chloramine, tannins as applicable."
            />
            <Step
              n={3}
              title="Specify a system"
              text="We select specific Excalibur models, media/resin, and any pre- or post-filtration."
            />
            <Step
              n={4}
              title="Coordinate install"
              text="Use your preferred licensed installer or ask us to recommend local trades."
            />
            <Step
              n={5}
              title="Support for the long run"
              text="Filter schedules, media replacement windows, tune-ups, and warranty guidance."
            />
          </ol>
        </Container>
      </Section>

      {/* SERVICE AREA + BADGES */}
      <Section className="py-10">
        <Container className="max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            <Card title="Service Area" icon={<MapPin className="h-5 w-5 text-cyan-700" />}>
              Windsor–Essex, Lakeshore, Tecumseh, LaSalle, Amherstburg, Kingsville, Leamington,
              Essex, Belle River, Chatham-Kent, and Sarnia–Lambton. Outside this area?{" "}
              <Link href="/contact" className="text-cyan-700 underline">
                Contact us
              </Link>{" "}
              — we’ll confirm shipping and support options.
            </Card>
            <Card title="Why LaPurity" icon={<Award className="h-5 w-5 text-cyan-700" />}>
              Local, reachable, and focused on long-term ownership. We specify conservatively,
              document clearly, and support you after install.
            </Card>
            <Card title="What You Get" icon={<CheckCircle2 className="h-5 w-5 text-cyan-700" />}>
              Clear system plan, genuine equipment, delivery coordination, and ongoing help with
              maintenance and performance.
            </Card>
          </div>
        </Container>
      </Section>

      {/* QUOTE FORM CTA */}
      <Section className="py-14">
        <Container className="max-w-5xl">
          <div className="rounded-3xl border bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-10">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-semibold text-[#0D1B2A]">Request a Quote</h2>
              <p className="mt-2 text-gray-700">
                Tell us about your water and your home. We’ll reply with a clear system plan —
                model recommendations, sizing notes, and next steps.
              </p>
            </div>
            <QuoteForm />
          </div>
        </Container>
      </Section>
    </>
  );
}

/* ---------- Small presentational helpers ---------- */

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border bg-white p-4 shadow-sm ring-1 ring-black/5">
      <div className="mt-0.5">{icon}</div>
      <div>
        <div className="font-medium text-[#0D1B2A]">{title}</div>
        <p className="text-sm text-gray-700">{text}</p>
      </div>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border bg-gray-50 p-3 ring-1 ring-black/5">
      <div className="text-xl font-semibold text-[#0D1B2A]">{v}</div>
      <div className="text-xs text-gray-600">{k}</div>
    </div>
  );
}

function Step({ n, title, text }: { n: number; title: string; text: string }) {
  return (
    <li className="relative rounded-2xl border bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-600 text-sm font-semibold text-white shadow">
        {n}
      </div>
      <div className="pl-1">
        <div className="font-semibold text-[#0D1B2A]">{title}</div>
        <p className="mt-1 text-sm text-gray-700">{text}</p>
      </div>
    </li>
  );
}

function Card({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <h3 className="text-lg font-semibold text-[#0D1B2A]">{title}</h3>
      </div>
      <div className="text-sm leading-relaxed text-gray-700">{children}</div>
    </div>
  );
}

function Quote({ text, who }: { text: string; who: string }) {
  return (
    <blockquote className="rounded-xl border bg-gray-50 p-4 text-sm text-gray-800 ring-1 ring-black/5">
      <p>“{text}”</p>
      <footer className="mt-2 text-xs text-gray-600">— {who}</footer>
    </blockquote>
  );
}
