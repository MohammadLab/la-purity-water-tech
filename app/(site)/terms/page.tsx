// app/(site)/terms/page.tsx
import Link from "next/link";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

export const metadata = {
  title: "Terms & Conditions | LaPurity",
  description:
    "Read the Terms & Conditions for using LaPurity’s website, products, and services.",
};

export default function TermsPage() {
  const updated = "2025-01-01";

  const Anchor = ({ href, children }: { href: string; children: React.ReactNode }) => (
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
          <h1 className="text-3xl font-semibold text-[#0D1B2A]">Terms & Conditions</h1>
          <p className="mt-2 text-sm text-gray-500">Last updated: {updated}</p>
        </header>

        {/* Quick nav */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Anchor href="#acceptance">Acceptance</Anchor>
          <Anchor href="#changes">Changes</Anchor>
          <Anchor href="#use">Permitted Use</Anchor>
          <Anchor href="#accounts">Accounts</Anchor>
          <Anchor href="#orders">Orders & Pricing</Anchor>
          <Anchor href="#shipping">Shipping & Delivery</Anchor>
          <Anchor href="#returns">Returns</Anchor>
          <Anchor href="#warranty">Warranties</Anchor>
          <Anchor href="#ip">Intellectual Property</Anchor>
          <Anchor href="#thirdparty">Third-Party Links</Anchor>
          <Anchor href="#disclaimers">Disclaimers</Anchor>
          <Anchor href="#liability">Limitation of Liability</Anchor>
          <Anchor href="#indemnity">Indemnification</Anchor>
          <Anchor href="#law">Governing Law</Anchor>
          <Anchor href="#contact">Contact</Anchor>
        </div>

        <article className="space-y-8 leading-relaxed">
          <section id="acceptance" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">1) Acceptance of Terms</h2>
            <p>
              By accessing or using the LaPurity website, products, or services (collectively, the
              “Services”), you agree to these Terms & Conditions. If you do not agree, do not use
              the Services.
            </p>
          </section>

          <section id="changes" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">2) Changes to These Terms</h2>
            <p>
              We may update these Terms at any time. The “Last updated” date reflects the most
              recent changes. Continued use of the Services after changes means you accept the
              revised Terms.
            </p>
          </section>

          <section id="use" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">3) Permitted Use</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>Use the Services only for lawful purposes.</li>
              <li>No reverse engineering, scraping, automated harvesting, or misuse.</li>
              <li>No posting of unlawful, misleading, or infringing content.</li>
            </ul>
          </section>

          <section id="accounts" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">4) Accounts & Security</h2>
            <p>
              You are responsible for maintaining the confidentiality of any credentials and for all
              activities under your account. Notify us promptly of any suspected unauthorized use.
            </p>
          </section>

          <section id="orders" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">5) Orders, Pricing & Taxes</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>All orders are subject to acceptance and availability.</li>
              <li>Prices may change without notice. Taxes, fees, and shipping may apply.</li>
              <li>We may cancel or refuse any order (e.g., errors, suspected fraud).</li>
            </ul>
          </section>

          <section id="shipping" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">6) Shipping & Delivery</h2>
            <p>
              Delivery estimates are not guarantees and may vary due to carrier or regional
              constraints. Title and risk of loss transfer upon delivery to the carrier unless
              otherwise required by law.
            </p>
          </section>

          <section id="returns" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">7) Returns & Exchanges</h2>
            <p>
              We want you to be satisfied. See any return instructions that accompany your product
              or contact us via the{" "}
              <Link href="/contact" className="text-cyan-700 underline hover:text-cyan-800">
                contact page
              </Link>
              .
            </p>
          </section>

          <section id="warranty" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">8) Warranties</h2>
            <p>
              Product literature may reference specific warranties. Any such warranties apply only
              as expressly stated in the documentation provided with the product. Otherwise, the
              Services are provided “as is” and “as available.”
            </p>
          </section>

          <section id="ip" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">9) Intellectual Property</h2>
            <p>
              All content, logos, trademarks, graphics, photographs, text, and software on the site
              are owned by or licensed to LaPurity and protected by applicable laws. You may not use
              them without our prior written permission.
            </p>
          </section>

          <section id="thirdparty" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">10) Third-Party Links</h2>
            <p>
              Our site may link to third-party websites. We are not responsible for their content,
              privacy practices, or terms. Access them at your own risk.
            </p>
          </section>

          <section id="disclaimers" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">11) Disclaimers</h2>
            <p>
              To the fullest extent permitted by law, we disclaim all warranties, express or
              implied, including merchantability, fitness for a particular purpose, and
              non-infringement. We do not warrant that the Services will be uninterrupted or error
              free.
            </p>
          </section>

          <section id="liability" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">12) Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, LaPurity is not liable for indirect,
              incidental, special, consequential, or punitive damages, or any loss of profits,
              revenue, data, or goodwill arising from or related to your use of the Services.
            </p>
          </section>

          <section id="indemnity" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">13) Indemnification</h2>
            <p>
              You agree to indemnify and hold LaPurity and its affiliates harmless from any claims,
              liabilities, damages, losses, and expenses (including legal fees) arising from your
              use of the Services or violation of these Terms.
            </p>
          </section>

          <section id="law" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">14) Governing Law & Jurisdiction</h2>
            <p>
              These Terms are governed by the laws of the province of Ontario and the federal laws
              of Canada applicable therein, without regard to conflict-of-law rules. You consent to
              the exclusive jurisdiction of courts located in Ontario, Canada.
            </p>
          </section>

          <section id="contact" className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-xl font-semibold text-[#0D1B2A]">15) Contact</h2>
            <p>
              Questions about these Terms? Reach us through the{" "}
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
