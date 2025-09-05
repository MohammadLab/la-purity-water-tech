"use client";
import { useState } from "react";

export default function ProductFilters({ products, categories, brands, onChange }: any) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [brand, setBrand] = useState("");

  function apply() {
    onChange({ q, cat, brand });
  }

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <input className="rounded-xl border p-2" placeholder="Search…" value={q} onChange={(e)=>setQ(e.target.value)} />
      <select className="rounded-xl border p-2" value={cat} onChange={(e)=>setCat(e.target.value)}>
        <option value="">All Categories</option>
        {categories?.map((c:any)=> <option key={c.slug} value={c.slug}>{c.title}</option>)}
      </select>
      <select className="rounded-xl border p-2" value={brand} onChange={(e)=>setBrand(e.target.value)}>
        <option value="">All Brands</option>
        {brands?.map((b:any)=> <option key={b.slug} value={b.slug}>{b.title}</option>)}
      </select>
      <button className="sm:col-span-3 rounded-xl bg-cyan-600 text-white py-2" onClick={apply}>Apply Filters</button>
    </div>
  );
}
