// Merge a duplicate category into a keeper:
// - Repoint product references from --dupeId to --keepId
// - Supports either a single "category" reference field OR an array "categories"
// - Optional: --delete-dupe to delete the old category after moving
// - Optional: --dry-run to preview changes
//
// Run (dry-run first!):
// npx sanity@latest exec scripts/merge-category.js --with-user-token -- --dupeId=<oldCatId> --keepId=<newCatId> --dry-run
// npx sanity@latest exec scripts/merge-category.js --with-user-token -- --dupeId=<oldCatId> --keepId=<newCatId> --delete-dupe

import { createClient } from "@sanity/client";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)=(.*)$/);
    return m ? [m[1], m[2]] : [a.replace(/^--/, ""), true];
  })
);
const { dupeId, keepId, ["dry-run"]: dryRun, ["delete-dupe"]: deleteDupe } = args;

if (!dupeId || !keepId) {
  console.error("Usage: --dupeId=<oldCatId> --keepId=<newCatId> [--dry-run] [--delete-dupe]");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID || process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_API_DATASET || process.env.SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

const ref = (id) => ({ _type: "reference", _ref: id });

async function main() {
  // sanity check
  const [dupe, keep] = await Promise.all([
    client.getDocument(dupeId),
    client.getDocument(keepId),
  ]);
  if (!dupe) throw new Error(`No category found for dupeId=${dupeId}`);
  if (!keep) throw new Error(`No category found for keepId=${keepId}`);

  // Find all products pointing at dupeId
  const products = await client.fetch(
    `*[_type == "product" && (
        references($dupeId) ||
        (defined(categories) && count((categories[]->._id)[@ == $dupeId]) > 0)
      )]{ _id, category, categories }`,
    { dupeId }
  );

  console.log(`Found ${products.length} product(s) referencing dupe ${dupeId}.`);
  if (dryRun) {
    products.slice(0, 10).forEach((p) => console.log("  ·", p._id));
    if (products.length > 10) console.log("  …");
    console.log("(dry-run) No changes written.");
    return;
  }

  // Patch in batches
  const batchSize = 50;
  for (let i = 0; i < products.length; i += batchSize) {
    const slice = products.slice(i, i + batchSize);
    const tx = client.transaction();

    slice.forEach((p) => {
      // If single "category" ref exists and equals dupe, set to keep
      const patches = [];

      if (p.category && p.category._ref === dupeId) {
        patches.push({ set: { category: ref(keepId) } });
      }

      // If array "categories" exists, replace dupe ref with keep and dedupe
      if (Array.isArray(p.categories)) {
        const replaced = p.categories.map((r) => (r?._ref === dupeId ? ref(keepId) : r));
        // de-duplicate by _ref
        const seen = new Set();
        const deduped = [];
        for (const r of replaced) {
          const k = r?._ref || JSON.stringify(r);
          if (k && !seen.has(k)) {
            seen.add(k);
            deduped.push(r);
          }
        }
        patches.push({ set: { categories: deduped } });
      }

      if (patches.length) {
        let patch = client.patch(p._id);
        patches.forEach((op) => (patch = patch.set(op.set)));
        tx.patch(p._id, patch._operations[0]);
      }
    });

    await tx.commit();
    console.log(`Patched ${Math.min(batchSize, slice.length)} product(s) [${i + slice.length}/${products.length}]`);
  }

  if (deleteDupe) {
    await client.delete(dupeId);
    console.log(`Deleted duplicate category ${dupeId}`);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
