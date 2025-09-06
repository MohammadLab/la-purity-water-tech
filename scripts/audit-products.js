// Audit products → categories & brands
// Run (preview to console + CSV file):
// npx sanity@latest exec scripts/audit-products.js --with-user-token
//
// Optional flags:
//   --csv=./audit-products.csv   (default)
//   --json=./audit-products.json (adds a JSON dump too)

import { createClient } from "@sanity/client";
import fs from "node:fs";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)=(.*)$/);
    return m ? [m[1], m[2]] : [a.replace(/^--/, ""), true];
  })
);

const CSV_PATH = String(args.csv || "./audit-products.csv");
const JSON_PATH = args.json ? String(args.json) : null;

const client = createClient({
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID || process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_API_DATASET || process.env.SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

const q = `
*[_type == "product"]{
  _id,
  _createdAt,
  title,
  "slug": slug.current,
  // single category ref (if schema uses it)
  category->{ _id, title, "slug": slug.current },
  // multi category refs (if schema uses it)
  categories[]->{ _id, title, "slug": slug.current },
  // brand ref (if schema uses it)
  brand->{ _id, title, "slug": slug.current }
} | order(title asc)
`;

function toCSV(rows) {
  const esc = (v) =>
    v == null
      ? ""
      : String(v).includes(",") || String(v).includes('"') || String(v).includes("\n")
      ? `"${String(v).replace(/"/g, '""')}"`
      : String(v);
  const headers = Object.keys(rows[0] || {});
  return [headers.join(","), ...rows.map((r) => headers.map((h) => esc(r[h])).join(","))].join("\n");
}

function summarize(products) {
  const rows = [];
  let missingCat = 0;
  let missingBrand = 0;
  let multiCat = 0;

  for (const p of products) {
    const cats = [
      ...(Array.isArray(p.categories) ? p.categories : []),
      ...(p.category ? [p.category] : []),
    ].filter(Boolean);

    // de-dupe categories by id
    const seen = new Set();
    const finalCats = [];
    for (const c of cats) {
      const k = c?._id;
      if (k && !seen.has(k)) {
        seen.add(k);
        finalCats.push(c);
      }
    }

    const catTitles = finalCats.map((c) => c.title).join(" | ");
    const catSlugs = finalCats.map((c) => c.slug).join(" | ");

    const hasBrand = !!p.brand;
    const issues = [];
    if (finalCats.length === 0) {
      issues.push("NO_CATEGORY");
      missingCat++;
    }
    if (!hasBrand) {
      issues.push("NO_BRAND");
      missingBrand++;
    }
    if (finalCats.length > 1) {
      issues.push("MULTI_CATEGORY");
      multiCat++;
    }

    rows.push({
      productTitle: p.title || "(untitled)",
      productId: p._id,
      productSlug: p.slug || "",
      categories: catTitles || "",
      categorySlugs: catSlugs || "",
      brand: p.brand?.title || "",
      brandSlug: p.brand?.slug || "",
      issues: issues.join(" "),
    });
  }

  return {
    rows,
    counts: {
      totalProducts: products.length,
      missingCategory: missingCat,
      missingBrand,
      multiCategory: multiCat,
    },
  };
}

(async () => {
  const products = await client.fetch(q);
  const { rows, counts } = summarize(products);

  // Pretty console table (trimmed for width)
  console.log("\nPRODUCT → CATEGORY(IES) & BRAND (flags in 'issues')\n");
  console.table(
    rows.map((r) => ({
      title: r.productTitle,
      id: r.productId,
      cats: r.categories,
      brand: r.brand,
      issues: r.issues,
    }))
  );

  console.log(
    `\nSummary: total=${counts.totalProducts} | no category=${counts.missingCategory} | no brand=${counts.missingBrand} | multi-category=${counts.multiCategory}\n`
  );

  // CSV
  if (rows.length) {
    const csv = toCSV(rows);
    fs.writeFileSync(CSV_PATH, csv, "utf8");
    console.log(`CSV saved → ${CSV_PATH}`);
  }

  // JSON (optional)
  if (JSON_PATH) {
    fs.writeFileSync(JSON_PATH, JSON.stringify({ counts, rows }, null, 2), "utf8");
    console.log(`JSON saved → ${JSON_PATH}`);
  }

  console.log("\nShare the CSV (or JSON) and I’ll tell you which products belong in a category but aren’t there, and which are missing brand/category.\n");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
