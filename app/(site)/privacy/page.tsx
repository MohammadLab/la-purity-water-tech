// app/(site)/privacy/page.tsx
import Link from "next/link";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

export const metadata = {
  title: "Privacy Policy | LaPurity",
  description:
    "Learn how LaPurity collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  const updated = "2025-01-01";

  const Chip = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      className="inline-block rounded-full border bg-white px-3 py-1 text-sm text-[#0D1B2A] shadow-sm hover:bg-gray-50"
    >
      {children}
    </Link>
  );

  return (
    <Section className="py-12">
      <Container className="max-w-5xl">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-[#0D1B2A]">Privacy Policy</h1>
          <p className="mt-2 text-sm text-gray-500">Last updated: {updated}</p>
        </header>

        {/* Quick nav */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Chip href="#scope">Scope</Chip>
          <Chip href="#collection">Information We Collect</Chip>
          <Chip href="#use">How We Use Information</Chip>
          <Chip href="#legal">Legal Bases</Chip>
          <Chip href="#sharing">Sharing</Chip>
          <Chip href="#retention">Retention</Chip>
          <Chip href="#security">Security</Chip>
          <Chip href="#cookies">Cookies</Chip>
          <Chip href="#rights">Your Rights</Chip>
          <Chip href="#children">Children</Chip>
          <Chip href="#intl">International Transfers</Chip>
          <Chip href="#changes">Changes</Chip>
          <Chip href="#contact">Contact</Chip>
        </div>

        <article className="space-y-8 leading-relaxed">
          <section id="scope" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">1) Scope</h2>
            <p>
              This Privacy Policy explains how LaPurity collects, uses, discloses, and safeguards
              personal information when you visit our website, contact us, or purchase our products
              and services.
            </p>
          </section>

          <section id="collection" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">2) Information We Collect</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <span className="font-medium">Contact & Order Info:</span> name, phone number, billing/shipping
                address, order details, and messages you send us (e.g., via the{" "}
                <Link href="/contact" className="text-cyan-700 underline hover:text-cyan-800">
                  contact page
                </Link>
                ).
              </li>
              <li>
                <span className="font-medium">Device & Usage Data:</span> IP address, device/browser, pages viewed,
                and interactions; collected via logs and analytics to improve our site.
              </li>
              <li>
                <span className="font-medium">Cookies & Similar Tech:</span> used for essential site features,
                analytics, and remembering preferences. See “Cookies” below.
              </li>
            </ul>
          </section>

          <section id="use" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">3) How We Use Information</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>Process orders, provide support, and fulfill requests.</li>
              <li>Operate, maintain, secure, and improve our website and Services.</li>
              <li>Communicate about orders, service updates, and relevant product information.</li>
              <li>Comply with legal obligations and enforce our Terms.</li>
            </ul>
          </section>

          <section id="legal" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">4) Legal Bases</h2>
            <p>
              Where required, we rely on one or more of the following legal bases: (a) your consent;
              (b) performance of a contract or steps prior to entering a contract; (c) legitimate
              interests such as securing and improving our Services; and (d) compliance with legal
              obligations.
            </p>
          </section>

          <section id="sharing" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">5) How We Share Information</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <span className="font-medium">Service Providers:</span> shipping carriers, payment processors,
                analytics, IT and customer-support tools—only as necessary to provide the Services.
              </li>
              <li>
                <span className="font-medium">Legal & Safety:</span> to comply with law, enforce our Terms, or
                protect rights, safety, and property.
              </li>
              <li>
                <span className="font-medium">Business Transfers:</span> in connection with a merger, acquisition, or
                asset sale, subject to continued protection of personal information.
              </li>
            </ul>
          </section>

          <section id="retention" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">6) Data Retention</h2>
            <p>
              We keep personal information only as long as needed for the purposes described in this
              Policy or as required by law, then securely delete or anonymize it.
            </p>
          </section>

          <section id="security" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">7) Security</h2>
            <p>
              We use reasonable administrative, technical, and physical safeguards designed to
              protect personal information. However, no method of transmission or storage is 100%
              secure.
            </p>
          </section>

          <section id="cookies" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">8) Cookies & Preferences</h2>
            <p>
              Cookies help our site function and improve. You can control cookies via your browser
              settings; disabling some cookies may affect site functionality.
            </p>
          </section>

          <section id="rights" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">9) Your Rights</h2>
            <p>
              Depending on your region, you may have rights to access, correct, delete, or restrict
              certain processing of your personal information, and to withdraw consent where
              applicable. To make a request, use the{" "}
              <Link href="/contact" className="text-cyan-700 underline hover:text-cyan-800">
                contact page
              </Link>
              .
            </p>
          </section>

          <section id="children" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">10) Children’s Privacy</h2>
            <p>
              Our Services are not directed to children under the age of 13 (or the age required by
              local law). We do not knowingly collect personal information from children.
            </p>
          </section>

          <section id="intl" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">11) International Transfers</h2>
            <p>
              We may process and store information in countries other than your own. Where required,
              we implement appropriate safeguards for such transfers.
            </p>
          </section>

          <section id="changes" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">12) Changes to This Policy</h2>
            <p>
              We may modify this Policy from time to time. The “Last updated” date above reflects
              the latest version. Continued use of the Services after changes means you accept the
              revised Policy.
            </p>
          </section>

          <section id="contact" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">13) Contact</h2>
            <p>
              Privacy questions or requests? Reach us via the{" "}
              <Link href="/contact" className="text-cyan-700 underline hover:text-cyan-800">
                contact page
              </Link>
              .
            </p>
          </section>
        </article>
      </Container>
    </Section>
  );
}
