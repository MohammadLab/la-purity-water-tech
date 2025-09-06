// Bulk-merge duplicate categories into their keepers.
// RUN: npx sanity@latest exec scripts/bulk-merge-categories.js --with-user-token
//
// Safety: starts as a DRY RUN. After you check the console output, set DRY_RUN=false below and run again.

import { createClient } from "@sanity/client";

const DRY_RUN = true; // <- flip to false after you review the preview output

const client = createClient({
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID || process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_API_DATASET || process.env.SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

// helper to build a Sanity reference
const ref = (id) => ({ _type: "reference", _ref: id });

// ***** YOUR PAIRS (dupe -> keeper) *****
// Based on your CLI output; “best move” chosen for each:
const PAIRS = [
  { dupeId: "cat-hybrid", keepId: "b7029790-e668-4fc1-b98a-fe2bee5486e5" },
  { dupeId: "cat-iron-sulphur", keepId: "ed8560c1-b638-4bf8-b552-02ee968dd198" },
  { dupeId: "cat-ph-neutralizing", keepId: "228fb4e0-c603-4b75-8cb1-73a8ede6e3d0" },
  { dupeId: "cat-tannin", keepId: "2b7f4952-318c-4f84-8f69-40cce36aa5a8" },
  { dupeId: "cat-ultraviolet-uv", keepId: "2331d8ed-fbe4-4aa9-b81d-4440d8c44215" },
  { dupeId: "cat-whole-home-filtration", keepId: "5e7fae51-4a80-4029-a158-beb4c1913d6f" },
  // Special case: keep shorter slug "scale-control"
  { dupeId: "2dd8e1ff-3abb-44aa-ae64-47c165df5694", keepId: "cat-scale-control" },
];

async function repointProducts(dupeId, keepId) {
  const products = await client.fetch(
    `*[_type == "product" && (
        references($dupeId) ||
        (defined(categories) && count((categories[]->._id)[@ == $dupeId]) > 0)
      )]{ _id, category, categories }`,
    { dupeId }
  );

  if (!products.length) {
    console.log(`  - No products reference ${dupeId}`);
    return;
  }

  console.log(`  - Found ${products.length} product(s) to repoint`);

  if (DRY_RUN) {
    products.slice(0, 12).forEach((p) => console.log(`    · ${p._id}`));
    if (products.length > 12) console.log(`    · … (+${products.length - 12} more)`);
    return;
  }

  const batchSize = 50;
  for (let i = 0; i < products.length; i += batchSize) {
    const slice = products.slice(i, i + batchSize);
    const tx = client.transaction();

    slice.forEach((p) => {
      let patch = client.patch(p._id);

      // single "category"
      if (p.category?. _ref === dupeId) {
        patch = patch.set({ category: ref(keepId) });
      }

      // array "categories"
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
        patch = patch.set({ categories: deduped });
      }

      tx.patch(p._id, patch._operations[0]);
    });

    await tx.commit();
    console.log(`    Patched ${Math.min(batchSize, slice.length)} [${i + slice.length}/${products.length}]`);
  }
}

async function deleteDupe(dupeId) {
  if (DRY_RUN) return;
  try {
    await client.delete(dupeId);
    console.log(`  - Deleted dupe ${dupeId}`);
  } catch (e) {
    console.warn(`  - Could not delete ${dupeId}:`, e.message);
  }
}

(async () => {
  console.log(`Bulk merge starting. DRY_RUN=${DRY_RUN}\n`);
  for (const { dupeId, keepId } of PAIRS) {
    console.log(`Merging ${dupeId}  →  ${keepId}`);
    const [dupe, keep] = await Promise.all([client.getDocument(dupeId), client.getDocument(keepId)]);
    if (!dupe) {
      console.log(`  - Skip: dupe not found`);
      continue;
    }
    if (!keep) {
      console.log(`  - Skip: keeper not found`);
      continue;
    }

    await repointProducts(dupeId, keepId);
    await deleteDupe(dupeId);
    console.log("");
  }
  console.log("Done.");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
