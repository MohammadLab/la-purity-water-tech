// scripts/bulkSetDescriptions.js
// Usage: pnpm dlx sanity@latest exec scripts\bulkSetDescriptions.js --with-user-token
/* eslint-disable no-console */
const path = require("path");
const fs = require("fs");
const { getCliClient } = require("sanity/cli");

const apiVersion = process.env.SANITY_API_VERSION || "2025-01-01";
const client = getCliClient({ apiVersion });

function loadTemplates() {
  const tplPath = path.join(process.cwd(), "descTemplates.json");
  const raw = fs.readFileSync(tplPath, "utf8");
  return JSON.parse(raw);
}

function interpolate(tpl, vars) {
  return tpl.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => (vars[k] ?? ""));
}

async function main() {
  const templates = loadTemplates();

  // Fetch products + category slug
  const products = await client.fetch(
    `*[_type == "product"]{_id, title, "categorySlug": coalesce(category->slug.current, ""), description}`
  );

  const toPatch = [];
  for (const p of products) {
    const current = (p.description || "").trim();
    if (current) continue; // do not overwrite

    const key = templates[p.categorySlug] ? p.categorySlug : "default";
    const tpl = templates[key] || "";
    const value = interpolate(tpl, { title: p.title });
    if (!value.trim()) continue;

    toPatch.push({ _id: p._id, description: value });
  }

  if (toPatch.length === 0) {
    console.log("No products needed description. Nothing to do.");
    return;
  }

  // Patch in small batches to be safe
  let patched = 0;
  const batchSize = 50;
  for (let i = 0; i < toPatch.length; i += batchSize) {
    const slice = toPatch.slice(i, i + batchSize);
    let tx = client.transaction();
    for (const doc of slice) {
      tx = tx.patch(doc._id, { set: { description: doc.description } });
    }
    await tx.commit({ visibility: "async" });
    patched += slice.length;
    console.log(`Patched ${patched}/${toPatch.length} products...`);
  }

  console.log(`✅ Done. Patched ${patched} product(s).`);
}

main().catch((err) => {
  console.error("Bulk set descriptions failed:", err);
  process.exit(1);
});
