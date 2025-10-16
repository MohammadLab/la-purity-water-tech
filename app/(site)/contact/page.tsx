// app/(site)/contact/page.tsx
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import QuoteForm from "@/components/forms/QuoteForm";
import { MapPin, Phone, Mail, User } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Contact LaPurity | Request a Quote",
  description: "Ask a question or request a quote for whole-home water treatment in Windsor–Essex.",
};

export const revalidate = 60;

export default function ContactPage() {
  return (
    <>
      <Section className="py-12">
        <Container className="max-w-5xl">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-[#0D1B2A]">Request a Quote</h1>
            <p className="mx-auto mt-2 max-w-2xl text-gray-700">
              Your water deserves better. Share your water concerns for your home or business with us,
              and we’ll provide the right solution — with clear recommendations, fair pricing, and expert guidance.
              We’ll deliver a customized plan.
            </p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
                <QuoteForm />
              </div>
            </div>

            <aside className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border bg-white p-5 shadow-sm ring-1 ring-black/5">
                <h2 className="text-lg font-semibold text-[#0D1B2A]">Contact</h2>
                <ul className="mt-2 space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <Phone size={16} className="text-cyan-700" />
                    <span>Windsor, Ontario • Mon–Fri</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin size={16} className="text-cyan-700" />
                    <span>
                      3395 Howard Ave Unit #10
                      <br />
                      N9E 3N6 Windsor, ON, Canada
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <User size={16} className="text-cyan-700 mt-[2px]" />
                    <span>
                      Ousama Labak — Partner & Executive Manager
                      <br />
                      <a
                        href="tel:+12263407900"
                        className="underline text-cyan-700"
                      >
                        +1 (226) 340-7900
                      </a>
                    </span>
                  </li>
                </ul>

                <div className="mt-4 text-sm text-gray-600">
                  Prefer email? We respond within two business days.
                  <br />
                  <a
                    href="mailto:olabak.lapurity@gmail.com"
                    className="underline text-cyan-700"
                  >
                    olabak.lapurity@gmail.com
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border bg-white p-5 text-sm shadow-sm ring-1 ring-black/5">
                Looking for a specific product?{" "}
                <Link href="/products" className="text-cyan-700 underline">
                  Browse all products
                </Link>.
              </div>
            </aside>


          </div>
        </Container>
      </Section>
    </>
  );
}
