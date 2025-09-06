// Assign category + brand (Excalibur) to products using existing docs only.
// DRY RUN by default. Flip DRY_RUN=false to write changes.
//
// Run:
// npx sanity@latest exec scripts/assign-product-taxonomy.js --with-user-token
//
// What it does (SAFE):
// - Looks up existing categories by title (no creation).
// - Looks up existing brand "Excalibur" (no creation).
// - Infers the correct category from product.title using keyword rules.
// - Patches product.category and product.categories (deduping).
// - Logs every change; fails loudly if any required category/brand is missing.

import { createClient } from "@sanity/client";

const DRY_RUN = false; // <- set to false to apply changes

const client = createClient({
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID || process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_API_DATASET || process.env.SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

// ----- Category titles that EXIST in your Studio (must match exactly) -----
const CATEGORY_TITLES = [
  "Chemical Removal",
  "Hybrid / Multi-contaminant",
  "Iron / Sulphur / Manganese",
  "pH / Neutralizing",
  "Scale Control Systems",
  "Smart Connect Ecosystem",
  "Tannin",
  "Ultraviolet (UV)",
  "Water Softeners",
  "Whole Home Filtration",
];

// ----- Brand to use (must already exist) -----
const BRAND_TITLE = "Excalibur";

// ----- Keyword rules (ordered; first match wins) -----
const RULES = [
  { title: "Smart Connect Ecosystem", includes: ["smart connect", "drop ecosystem", "sureflo smart"] },
  { title: "Scale Control Systems", includes: ["soft-tec", "scale control"] },
  { title: "Water Softeners", includes: ["softener"], excludes: ["soft-tec"] },
  { title: "Chemical Removal", includes: ["chemical removal"] },
  { title: "Whole Home Filtration", includes: ["reverse osmosis", "ro ", " nanofiltration", "ultrafiltration", "whole home filtration"] },
  { title: "Iron / Sulphur / Manganese", includes: ["iron", "sulphur", "manganese", "ozone iron"] },
  { title: "Tannin", includes: ["tannin"] },
  { title: "pH / Neutralizing", includes: ["neutralizing", "pH " , " pH/"] },
  { title: "Ultraviolet (UV)", includes: [" ultraviolet", " uv "] },
  { title: "Hybrid / Multi-contaminant", includes: ["hybrid"] },
];

// --------------- helpers ---------------
const ref = (id) => ({ _type: "reference", _ref: id });

function chooseCategoryTitle(productTitle) {
  const t = (productTitle || "").toLowerCase();
  for (const r of RULES) {
    const hit = r.includes.some((kw) => t.includes(kw));
    const excluded = r.excludes ? r.excludes.some((kw) => t.includes(kw)) : false;
    if (hit && !excluded) return r.title;
  }
  return null;
}

async function fetchLookups() {
  // categories by exact title
  const categories = await client.fetch(
    `*[_type=="category" && title in $titles]{_id,title}`,
    { titles: CATEGORY_TITLES }
  );
  const catByTitle = new Map(categories.map((c) => [c.title, c._id]));
  // brand Excalibur
  const brand = await client.fetch(
    `*[_type=="brand" && title==$t][0]{_id,title}`,
    { t: BRAND_TITLE }
  );
  return { catByTitle, brand };
}

function ensureId(v, name) {
  if (!v || !v._id) {
    throw new Error(`Missing required ${name}. Aborting to avoid creating duplicates.`);
  }
  return v._id;
}

function setDedupCategoryPatch(p, catId) {
  // set product.category and ensure categories[] contains catId (deduped)
  let nextCats = Array.isArray(p.categories) ? [...p.categories] : [];
  const already = nextCats.some((r) => r?._ref === catId);
  if (!already) nextCats.push(ref(catId));
  // dedupe by _ref
  const seen = new Set();
  nextCats = nextCats.filter((r) => {
    const k = r?._ref;
    if (!k || seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  const patch = {};
  patch.category = ref(catId);
  patch.categories = nextCats;
  return patch;
}

(async () => {
  console.log(`Assign taxonomy (DRY_RUN=${DRY_RUN})`);
  const { catByTitle, brand } = await fetchLookups();

  // safety: ensure all configured category titles exist
  for (const t of CATEGORY_TITLES) {
    if (!catByTitle.get(t)) {
      throw new Error(
        `Category titled "${t}" not found in dataset. Fix titles in Studio or adjust CATEGORY_TITLES.`
      );
    }
  }
  const brandId = ensureId(brand, "brand 'Excalibur'");

  // fetch products (id, title, slug, existing refs)
  const products = await client.fetch(
    `*[_type=="product"]{_id,title,"slug":slug.current,category,categories,brand}`
  );

  const tx = client.transaction();
  let planned = 0;
  let skipped = 0;

  for (const p of products) {
    const chosenTitle = chooseCategoryTitle(p.title);
    if (!chosenTitle) {
      // no rule matched → skip (we don't guess)
      skipped++;
      console.log(`SKIP (no rule): ${p.title} (${p._id})`);
      continue;
    }
    const catId = catByTitle.get(chosenTitle);
    if (!catId) {
      throw new Error(`Category "${chosenTitle}" not found. Will not create it; aborting.`);
    }

    const patchSet = setDedupCategoryPatch(p, catId);
    // always set brand to Excalibur
    patchSet.brand = ref(brandId);

    console.log(
      `SET: "${p.title}" → category="${chosenTitle}" | brand="Excalibur"`
    );

    if (!DRY_RUN) {
      tx.patch(p._id, { set: patchSet });
    }
    planned++;
  }

  if (!DRY_RUN && planned) {
    await tx.commit();
    console.log(`Committed ${planned} product(s). Skipped ${skipped}.`);
  } else {
    console.log(`Planned ${planned} product(s). Skipped ${skipped}. (dry-run)`);
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
