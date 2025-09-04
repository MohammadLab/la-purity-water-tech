// scripts/importProducts.js
// Usage: pnpm dlx sanity@latest exec scripts\importProducts.js --with-user-token
/* eslint-disable no-console */
const { getCliClient } = require("sanity/cli");
const apiVersion = process.env.SANITY_API_VERSION || "2025-01-01";
const client = getCliClient({ apiVersion });

// One product per brochure, no images/description, sellable=false
const products = [
  {
    _id: "product-pfas-filtration-solutions",
    _type: "product",
    title: "PFAS Filtration Solutions",
    slug: { _type: "slug", current: "pfas-filtration-solutions" },
    features: [
      "Multiple PFAS strategies: whole-home RO/NF, ion-exchange, and carbon filtration",
      "Ion-exchange option can achieve non-detect PFAS results (municipal or well setups)",
      "Engineered pre/post filtration to protect membranes and extend media life",
      "Configurable for home applications with warranty coverage on core components"
    ],
    specs: [
      { label: "Approach", value: "Whole-home RO/NF, ion-exchange, or carbon (application-specific)" },
      { label: "PFAS Claim", value: "Non-detect achievable with ion-exchange designs" },
      { label: "Use Case", value: "Municipal or well water, customized after water analysis" }
    ],
    sellable: false
  },
  {
    _id: "product-premium-reverse-osmosis",
    _type: "product",
    title: "Premium Reverse Osmosis System",
    slug: { _type: "slug", current: "premium-reverse-osmosis" },
    features: [
      "High-pressure RO with boosted performance for fast production",
      "Removes chemicals and heavy metals with high rejection",
      "Comes complete with designer faucet, storage tank, and install kit",
      "Optional add-ons: neutralizing, ceramic, alkaline filters"
    ],
    specs: [
      { label: "Rated Output", value: "100 GPD (high-pressure design)" },
      { label: "Rejection", value: "Up to ~99.5% (contaminant rejection)" },
      { label: "Warranty", value: "7-year unlimited (excludes consumables)" }
    ],
    sellable: false
  },
  {
    _id: "product-superior-reverse-osmosis",
    _type: "product",
    title: "Superior Reverse Osmosis System",
    slug: { _type: "slug", current: "superior-reverse-osmosis" },
    features: [
      "High-purity drinking water with ~99.5% contaminant reduction",
      "Includes faucet, tank, fittings; straightforward install",
      "Options available for alkaline and neutralizing post-treatment",
      "Designed to operate from typical household pressures"
    ],
    specs: [
      { label: "Stages", value: "5–6 stage configurations" },
      { label: "Min. Inlet Pressure", value: "≈30 psi required" },
      { label: "Warranty", value: "5-year unlimited (excludes consumables)" }
    ],
    sellable: false
  },
  {
    _id: "product-superior-reverse-osmosis-plus",
    _type: "product",
    title: "Superior Reverse Osmosis System PLUS",
    slug: { _type: "slug", current: "superior-reverse-osmosis-plus" },
    features: [
      "Adds pressure-reducing valve and auto-flush to the Superior RO platform",
      "Comprehensive kit: designer faucet, storage tank, install fittings",
      "High contaminant rejection with carbon stages and membrane",
      "Optional alkaline or neutralizing post-filtration"
    ],
    specs: [
      { label: "Enhancements", value: "PRV + auto-flush; leak detection noted" },
      { label: "Stages", value: "5–6 stage configurations" },
      { label: "Warranty", value: "5-year unlimited (excludes consumables)" }
    ],
    sellable: false
  },
  {
    _id: "product-sureflo-smart-purifier-plus",
    _type: "product",
    title: "Sureflo Smart Purifier PLUS",
    slug: { _type: "slug", current: "sureflo-smart-purifier-plus" },
    features: [
      "Tankless RO with continuous flow and on-demand production",
      "Faucet + system display shows outgoing TDS reading",
      "Quick-connect filter and membrane for easy maintenance",
      "Internal booster pump for steady, low-noise operation"
    ],
    specs: [
      { label: "Form Factor", value: "Under-sink, tankless" },
      { label: "Display", value: "TDS readout on faucet and system" },
      { label: "Warranty", value: "2-year unlimited (excludes consumables)" }
    ],
    sellable: false
  },
  {
    _id: "product-sureflo-whole-home-nanofiltration",
    _type: "product",
    title: "Sureflo Whole-Home Nanofiltration System",
    slug: { _type: "slug", current: "sureflo-whole-home-nanofiltration" },
    features: [
      "High-flux NF membranes for whole-home purification",
      "Substantial reduction of chemicals, heavy metals, and organics",
      "Pre/post filtration tailored from water analysis to protect membranes",
      "Provides soft, purified water benefits throughout the home"
    ],
    specs: [
      { label: "Removal Rate", value: "Up to ~95% reduction of contaminants" },
      { label: "Integration", value: "Pre-treatment and neutralizing filter options" },
      { label: "Household Benefits", value: "Helps protect plumbing; supports appliance life" }
    ],
    sellable: false
  },
  {
    _id: "product-sureflo-whole-home-ro",
    _type: "product",
    title: "Sureflo Whole-Home Reverse Osmosis System",
    slug: { _type: "slug", current: "sureflo-whole-home-ro" },
    features: [
      "Whole-home RO delivering very high purity water at point of entry",
      "Engineered pre-filters protect RO membranes; neutralizing post-filter",
      "Optional Series 150 controller for monitoring and alarms",
      "Home & health benefits from reduced dissolved solids and contaminants"
    ],
    specs: [
      { label: "Removal Rate", value: "Up to ~99% of contaminants" },
      { label: "Controller Option", value: "Series 150 (TDS/Conductivity, alarms, set-points)" },
      { label: "Home Benefits", value: "Recycled wastewater proportion; potential energy savings" }
    ],
    sellable: false
  },
  {
    _id: "product-ultrafiltration-system",
    _type: "product",
    title: "Ultrafiltration System",
    slug: { _type: "slug", current: "ultrafiltration-system" },
    features: [
      "3-stage cartridge path targets sediment, chlorine/organics, and fine contaminants",
      "No electricity required; quick-connect change-outs",
      "Tankless, compact format for easy under-sink placement",
      "Provides clean, great-tasting water with simple upkeep"
    ],
    specs: [
      { label: "Flow Rate", value: "≈1.4 GPM (FH TH10UF)" },
      { label: "Operating Range", value: "≈30–100 psi; ~40–100 °F" },
      { label: "Warranty", value: "5-year unlimited (excludes consumables)" }
    ],
    sellable: false
  },
  {
    _id: "product-value-reverse-osmosis",
    _type: "product",
    title: "Value Reverse Osmosis System",
    slug: { _type: "slug", current: "value-reverse-osmosis" },
    features: [
      "Compact RO package for high-purity drinking water",
      "Multi-stage carbon + membrane path reduces TDS and contaminants",
      "Includes faucet, tank, and install fittings",
      "Quiet, fast auto shut-off integrated into head"
    ],
    specs: [
      { label: "Rated Output", value: "≈35 GPD" },
      { label: "Rejection", value: "≈97.5% contaminant rejection" },
      { label: "Warranty", value: "3-year unlimited (excludes consumables)" }
    ],
    sellable: false
  }
];

async function main() {
  for (const p of products) {
    console.log(`Importing: ${p.title}`);
    await client.createOrReplace(p);
  }
  console.log("✅ Import finished: " + products.length + " product(s).");
}

main().catch((err) => {
  console.error("❌ Import failed:", err);
  process.exit(1);
});
