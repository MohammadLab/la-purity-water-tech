// scripts/importAccessories.js
// Run with: pnpm dlx sanity@latest exec scripts\importAccessories.js --with-user-token
/* eslint-disable no-console */
const { getCliClient } = require("sanity/cli");
const apiVersion = process.env.SANITY_API_VERSION || "2025-01-01";
const client = getCliClient({ apiVersion });

// NOTE: If your schema stores brand/category as references instead of strings,
// change the fields below accordingly. For simple string fields, this works as-is.

const BRAND = "Excalibur";
const CATEGORY = "Parts & Accessories";

const products = [
  // In / Out Point of Entry Head
  {
    _id: "product-clk-di220",
    _type: "product",
    title: 'In/Out Head 1" — Standard 2.5" Tank Thread',
    slug: { _type: "slug", current: "in-out-head-1in-standard-2-5in-tank-thread" },
    brand: BRAND,
    category: CATEGORY,
    features: [
      'In/Out point-of-entry head, 1" connection',
      'Fits standard 2.5" tank thread',
      "Durable construction for residential/commercial installs",
      "Simple service and replacement"
    ],
    specs: [
      { label: "Part Number", value: "CLK DI220" },
      { label: "Connection Size", value: '1"' },
      { label: "Tank Thread", value: '2.5" standard' }
    ],
    description:
      'Compact 1" In/Out head for point-of-entry applications. Threads onto standard 2.5" tank necks for quick setup and service.'
  },

  // Chemical Solution Tanks
  {
    _id: "product-clk-cs1415g",
    _type: "product",
    title: 'Chemical Solution Tank — 15 Gallon (14"×24")',
    slug: { _type: "slug", current: "chemical-solution-tank-15-gallon-14x24" },
    brand: BRAND,
    category: CATEGORY,
    features: [
      "Heavy-duty solution tank for chemical feed systems",
      'Approx. 14" × 24" footprint (15 gal)',
      "Compatible with common feed pumps",
      "Rugged, easy-to-clean construction"
    ],
    specs: [
      { label: "Part Number", value: "CLK CS1415G" },
      { label: "Capacity", value: "15 gallon" },
      { label: "Dimensions", value: '≈14" × 24"' }
    ],
    description:
      "15-gallon chemical solution tank for chlorine, peroxide, and other feed applications. Sized for tight installs and straightforward maintenance."
  },
  {
    _id: "product-clk-cs1835g",
    _type: "product",
    title: 'Chemical Solution Tank — 35 Gallon (18"×32")',
    slug: { _type: "slug", current: "chemical-solution-tank-35-gallon-18x32" },
    brand: BRAND,
    category: CATEGORY,
    features: [
      "Large-capacity tank for longer run-time between refills",
      'Approx. 18" × 32" footprint (35 gal)',
      "Compatible with common chemical feed systems",
      "Durable, easy-service design"
    ],
    specs: [
      { label: "Part Number", value: "CLK CS1835G" },
      { label: "Capacity", value: "35 gallon" },
      { label: "Dimensions", value: '≈18" × 32"' }
    ],
    description:
      "35-gallon chemical solution tank providing extended capacity for high-demand dosing applications."
  },

  // Res Up Feeders & Replacement Wicks
  {
    _id: "product-clk-s6304",
    _type: "product",
    title: "Res Up Feeder — Yellow, 0.4 oz/day (14 cc)",
    slug: { _type: "slug", current: "res-up-feeder-yellow-0-4oz-14cc-per-day" },
    brand: BRAND,
    category: CATEGORY,
    features: [
      "Constant-feed “Res Up” dispenser",
      "Yellow wick: ~0.4 oz (14 cc) per day",
      "Helps control iron fouling/odours in softeners",
      "Simple install and replacement"
    ],
    specs: [
      { label: "Part Number", value: "CLK S6304" },
      { label: "Feed Rate", value: "0.4 oz/day (≈14 cc)" },
      { label: "Color", value: "Yellow" }
    ],
    description:
      "Yellow Res Up feeder delivering ~0.4 oz/day for continuous dosing to help keep softener resin clean."
  },
  {
    _id: "product-clk-s6305",
    _type: "product",
    title: "Res Up Feeder — Clear, 1.0 oz/day (30 cc)",
    slug: { _type: "slug", current: "res-up-feeder-clear-1-0oz-30cc-per-day" },
    brand: BRAND,
    category: CATEGORY,
    features: [
      "Higher-rate Res Up dispenser",
      "Clear wick: ~1.0 oz (30 cc) per day",
      "Supports tougher iron/organics conditions",
      "Easy swap replacement"
    ],
    specs: [
      { label: "Part Number", value: "CLK S6305" },
      { label: "Feed Rate", value: "1.0 oz/day (≈30 cc)" },
      { label: "Color", value: "Clear" }
    ],
    description:
      "Clear Res Up feeder delivering ~1.0 oz/day for more aggressive continuous dosing in challenging water conditions."
  },

  // Air Pump & Installation Kit
  {
    _id: "product-1-5-airgap-soft",
    _type: "product",
    title: 'Air Gap — 1.5" Drain (Softener/Filter Backwash)',
    slug: { _type: "slug", current: "air-gap-1-5in-drain-softener-filter-backwash" },
    brand: BRAND,
    category: CATEGORY,
    features: [
      'Air-gap fitting for 1.5" drain line',
      "Compatible with softener or filter backwash discharge",
      "Prevents cross-connection and meets plumbing best practices",
      "Simple installation kit"
    ],
    specs: [
      { label: "Part Number", value: "1.5 AIRGAP SOFT" },
      { label: "Drain Size", value: '1.5"' },
      { label: "Application", value: "Softener or filter backwash" }
    ],
    description:
      'Air-gap fitting for 1.5" drain lines, used on softener or filter backwash to protect against cross-contamination.'
  },

  // Silicone Lubricant Grease (NSF)
  {
    _id: "product-chm-3005",
    _type: "product",
    title: "Silicone NSF Food Grade Lubricant — 5.3 oz Tube",
    slug: { _type: "slug", current: "silicone-nsf-food-grade-lubricant-5-3oz-tube" },
    brand: BRAND,
    category: CATEGORY,
    features: [
      "NSF-listed food-grade silicone grease",
      "Ideal for o-rings, seals, and threads",
      "Protects and eases assembly",
      "5.3 oz tube"
    ],
    specs: [
      { label: "Part Number", value: "CHM 3005" },
      { label: "Size", value: "5.3 oz (tube)" },
      { label: "Rating", value: "NSF food grade" }
    ],
    description:
      "Food-grade silicone lubricant for o-rings and seals in water treatment equipment. Eases assembly and helps extend seal life."
  },

  // Res Up Resin Cleaner
  {
    _id: "product-chm-t600104",
    _type: "product",
    title: "Res Up Solution Cleaner — 1 Quart",
    slug: { _type: "slug", current: "res-up-solution-cleaner-1-quart" },
    brand: BRAND,
    category: CATEGORY,
    features: [
      "Liquid resin cleaner for iron/organics",
      "Keeps softener resin performing at peak",
      "Convenient 1-quart bottle"
    ],
    specs: [
      { label: "Part Number", value: "CHM T600104" },
      { label: "Size", value: "1 Quart" }
    ],
    description:
      "Res Up resin cleaner (1 qt) helps dissolve iron and organic fouling to restore ion-exchange performance."
  },
  {
    _id: "product-chm-t600204",
    _type: "product",
    title: "Res Up Solution Cleaner — 1 Gallon",
    slug: { _type: "slug", current: "res-up-solution-cleaner-1-gallon" },
    brand: BRAND,
    category: CATEGORY,
    features: [
      "Liquid resin cleaner for iron/organics",
      "Economical 1-gallon size for service routes",
      "Restores exchange capacity and flow"
    ],
    specs: [
      { label: "Part Number", value: "CHM T600204" },
      { label: "Size", value: "1 Gallon" }
    ],
    description:
      "Res Up resin cleaner (1 gal) for periodic maintenance on softeners exposed to iron and organic contamination."
  },

  // Spin Touch Disks / Meter
  {
    _id: "product-chm-4337h",
    _type: "product",
    title: "Spin Disk Reagent — Well Water (50 Discs)",
    slug: { _type: "slug", current: "spin-disk-reagent-well-water-50-discs" },
    brand: BRAND,
    category: CATEGORY,
    features: [
      "Reagent discs for LaMotte Spin Touch",
      "Formulated for WELL WATER testing panels",
      "Box of 50 discs"
    ],
    specs: [
      { label: "Part Number", value: "CHM 4337H" },
      { label: "Quantity", value: "50 discs" },
      { label: "Panel", value: "Well water" }
    ],
    description:
      "Spin Touch reagent discs for well water test parameters. Pack of 50 for rapid on-site analysis."
  },
  {
    _id: "product-chm-4336h",
    _type: "product",
    title: "Spin Disk Reagent — Treated Water (50 Discs)",
    slug: { _type: "slug", current: "spin-disk-reagent-treated-water-50-discs" },
    brand: BRAND,
    category: CATEGORY,
    features: [
      "Reagent discs for LaMotte Spin Touch",
      "Formulated for TREATED WATER testing panels",
      "Box of 50 discs"
    ],
    specs: [
      { label: "Part Number", value: "CHM 4336H" },
      { label: "Quantity", value: "50 discs" },
      { label: "Panel", value: "Treated water" }
    ],
    description:
      "Spin Touch reagent discs tuned for treated water tests. Pack of 50 for fast, repeatable results."
  },
  {
    _id: "product-chm-3585",
    _type: "product",
    title: "WaterLink Spin Touch DW",
    slug: { _type: "slug", current: "waterlink-spin-touch-dw" },
    brand: BRAND,
    category: CATEGORY,
    features: [
      "LaMotte WaterLink Spin Touch DW photometer",
      "Ultra-fast multi-parameter water testing with reagent discs",
      "Ideal for service professionals and shops"
    ],
    specs: [
      { label: "Part Number", value: "CHM 3585" },
      { label: "Use", value: "Drinking water lab/field testing" }
    ],
    description:
      "WaterLink Spin Touch DW instrument for rapid multi-parameter testing using reagent discs—perfect for accurate field diagnostics."
  }
];

async function main() {
  for (const p of products) {
    console.log(`Importing: ${p.title}`);
    await client.createOrReplace(p);
  }
  console.log("✅ Accessories & Components import finished:", products.length, "product(s).");
}

main().catch((err) => {
  console.error("❌ Accessories import failed:", err);
  process.exit(1);
});
