import QuoteForm from "@/components/forms/QuoteForm";

export const revalidate = 0;

export default function ContactPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-semibold">Request a Quote</h1>
      <p className="text-gray-700">
        Tell us about your project or water treatment needs. We’ll get back to you shortly.
      </p>
      <QuoteForm />
    </div>
  );
}
