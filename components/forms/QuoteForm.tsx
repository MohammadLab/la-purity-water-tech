'use client';

import { useState } from "react";

export default function QuoteForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<boolean | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    const res = await fetch("/api/contact", { method: "POST" });
    setOk(res.ok);
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Your message</label>
        <textarea className="mt-1 w-full border rounded p-2" rows={4} />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 rounded bg-black text-white"
      >
        {loading ? "Sending..." : "Request a Quote"}
      </button>
      {ok !== null && (
        <p className="text-sm">{ok ? "Sent!" : "Failed to send."}</p>
      )}
    </form>
  );
}
