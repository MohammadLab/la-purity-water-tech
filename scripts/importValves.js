// scripts/importValves.js
// Run with: pnpm dlx sanity@latest exec scripts\importValves.js --with-user-token
/* eslint-disable no-console */
const { getCliClient } = require("sanity/cli");
const apiVersion = process.env.SANITY_API_VERSION || "2025-01-01";
const client = getCliClient({ apiVersion });

const products = [
  // 1) Metered Demand — 5 Button
  {
    _id: "product-clk-v1dme",
    _type: "product",
    title: 'Control Valve 1" Electronic Metered Demand — 5 Button',
    slug: { _type: "slug", current: "control-valve-1in-electronic-metered-demand-5-button" },
    features: [
      "Electronic metered-demand control for efficient regeneration",
      "5-button user interface with digital display",
      '1" valve connection',
      "Ideal for water softeners (demand-initiated regeneration)",
      "Service/bypass ready (bypass sold separately)"
    ],
    specs: [
      { label: "Part Number", value: "CLK V1DME" },
      { label: "Valve Type", value: "Electronic Metered Demand" },
      { label: "Control Interface", value: "5 Button" },
      { label: "Connection Size", value: '1"' },
      { label: "Application", value: "Softener (Demand)" },
      { label: "Bypass", value: "Not included" },
      { label: "Brass Adapter Kit", value: "Not included" }
    ],
    description:
      'Electronic 1" metered-demand control valve with a 5-button interface for precise, salt-efficient operation on softeners. Demand-initiated regeneration based on actual water usage.'
  },
  {
    _id: "product-clk-v1dmec",
    _type: "product",
    title: 'Control Valve 1" Electronic Metered Demand — 5 Button (Complete)',
    slug: { _type: "slug", current: "control-valve-1in-electronic-metered-demand-5-button-complete" },
    features: [
      "Same features as V1DME plus included accessories",
      "Includes bypass valve",
      'Includes 3/4" brass adapter kit',
      "Ready-to-install kit"
    ],
    specs: [
      { label: "Part Number", value: "CLK V1DMEC" },
      { label: "Valve Type", value: "Electronic Metered Demand" },
      { label: "Control Interface", value: "5 Button" },
      { label: "Connection Size", value: '1"' },
      { label: "Bypass", value: "Included" },
      { label: "Adapter Kit", value: '3/4" brass — Included' }
    ],
    description:
      'Complete package version of the 1" electronic metered-demand 5-button valve. Comes with bypass and 3/4" brass adapter kit for quicker installs.'
  },

  // 2) Demand Filter Valve (not softener)
  {
    _id: "product-clk-v1dmz",
    _type: "product",
    title: 'Control Valve 1" Electronic Demand Filter Valve',
    slug: { _type: "slug", current: "control-valve-1in-electronic-demand-filter-valve" },
    features: [
      "Electronic demand control suited for backwashing filters",
      "Programmable cycles for media filters",
      '1" valve body',
      "Digital interface for simple setup"
    ],
    specs: [
      { label: "Part Number", value: "CLK V1DMZ" },
      { label: "Application", value: "Filter (demand/backwash control)" },
      { label: "Connection Size", value: '1"' },
      { label: "Bypass", value: "Not included" }
    ],
    description:
      'Electronic demand control valve configured for filters rather than softeners. Designed to manage backwash/rinse cycles with a simple digital interface.'
  },

  // 3) Metered Demand — 4 Button
  {
    _id: "product-clk-v1edme",
    _type: "product",
    title: 'Control Valve 1" Electronic Metered Demand — 4 Button',
    slug: { _type: "slug", current: "control-valve-1in-electronic-metered-demand-4-button" },
    features: [
      "Electronic metered-demand control",
      "4-button user interface",
      '1" valve connection',
      "Efficient, usage-based regeneration for softeners"
    ],
    specs: [
      { label: "Part Number", value: "CLK V1EDME" },
      { label: "Valve Type", value: "Electronic Metered Demand" },
      { label: "Control Interface", value: "4 Button" },
      { label: "Connection Size", value: '1"' },
      { label: "Bypass", value: "Not included" },
      { label: "Adapter Kit", value: "Not included" }
    ],
    description:
      '1" electronic metered-demand control valve with a streamlined 4-button interface for softener applications.'
  },
  {
    _id: "product-clk-v1edmec",
    _type: "product",
    title: 'Control Valve 1" Electronic Metered Demand — 4 Button (Complete)',
    slug: { _type: "slug", current: "control-valve-1in-electronic-metered-demand-4-button-complete" },
    features: [
      "Same valve as V1EDME with included accessories",
      "Includes bypass valve",
      'Includes 3/4" brass adapter kit'
    ],
    specs: [
      { label: "Part Number", value: "CLK V1EDMEC" },
      { label: "Valve Type", value: "Electronic Metered Demand" },
      { label: "Control Interface", value: "4 Button" },
      { label: "Connection Size", value: '1"' },
      { label: "Bypass", value: "Included" },
      { label: "Adapter Kit", value: '3/4" brass — Included' }
    ],
    description:
      'Complete package for the 1" electronic metered-demand 4-button valve. Includes bypass and 3/4" brass adapter kit.'
  },

  // 4) Timer — Softener (3 Button)
  {
    _id: "product-clk-v1tcdte",
    _type: "product",
    title: 'Control Valve 1" Electronic Timer Softener — 3 Button',
    slug: { _type: "slug", current: "control-valve-1in-electronic-timer-softener-3-button" },
    features: [
      "Time-clock based regeneration for softeners",
      "3-button interface with digital display",
      '1" valve body',
      "Simple programming for scheduled regen"
    ],
    specs: [
      { label: "Part Number", value: "CLK V1TCDTE" },
      { label: "Valve Type", value: "Electronic Timer" },
      { label: "Application", value: "Softener (time-clock)" },
      { label: "Control Interface", value: "3 Button" },
      { label: "Connection Size", value: '1"' }
    ],
    description:
      'Time-clock electronic control valve for softeners. Uses scheduled (timer-based) regeneration with a straightforward 3-button control panel.'
  },
  {
    _id: "product-clk-v1tcdtec",
    _type: "product",
    title: 'Control Valve 1" Electronic Timer Softener — 3 Button (Complete)',
    slug: { _type: "slug", current: "control-valve-1in-electronic-timer-softener-3-button-complete" },
    features: [
      "Same as V1TCDTE with included accessories",
      "Includes bypass valve",
      "Complete install kit"
    ],
    specs: [
      { label: "Part Number", value: "CLK V1TCDTEC" },
      { label: "Valve Type", value: "Electronic Timer" },
      { label: "Application", value: "Softener (time-clock)" },
      { label: "Control Interface", value: "3 Button" },
      { label: "Connection Size", value: '1"' },
      { label: "Bypass", value: "Included" }
    ],
    description:
      'Complete time-clock softener valve package including bypass for quick installation.'
  },

  // 5) Timer — Filter (3 Button)
  {
    _id: "product-clk-v1tcdbtz",
    _type: "product",
    title: 'Control Valve 1" Electronic Timer Filter — 3 Button',
    slug: { _type: "slug", current: "control-valve-1in-electronic-timer-filter-3-button" },
    features: [
      "Timer-based control optimized for backwashing filters",
      "3-button digital interface",
      '1" connection',
      "Programmable backwash/rinse cycles"
    ],
    specs: [
      { label: "Part Number", value: "CLK V1TCDBTZ" },
      { label: "Valve Type", value: "Electronic Timer" },
      { label: "Application", value: "Filter (time-clock backwash)" },
      { label: "Control Interface", value: "3 Button" },
      { label: "Connection Size", value: '1"' }
    ],
    description:
      'Electronic timer control valve for media filters with simple 3-button programming of backwash and rinse cycles.'
  },

  // 6) Bypass Valve (Plastic) — 1"
  {
    _id: "product-clk-v3006",
    _type: "product",
    title: 'Bypass Valve — 1" Plastic',
    slug: { _type: "slug", current: "bypass-valve-1in-plastic" },
    features: [
      '1" plastic bypass for quick service isolation',
      "Compact, service-friendly design",
      "Corrosion-resistant construction"
    ],
    specs: [
      { label: "Part Number", value: "CLK V3006" },
      { label: "Connection Size", value: '1"' },
      { label: "Material", value: "Plastic" }
    ],
    description:
      'Lightweight corrosion-resistant 1" plastic bypass valve for isolating equipment during service.'
  },

  // 7) External Inline Mixing Valve
  {
    _id: "product-clk-v4099",
    _type: "product",
    title: "External Inline Mixing Valve",
    slug: { _type: "slug", current: "external-inline-mixing-valve" },
    features: [
      "In-line blending/mixing of hot/cold or hard/soft streams",
      "External mount with simple adjustment",
      "Improves control over delivered water quality/temperature"
    ],
    specs: [
      { label: "Part Number", value: "CLK V4099" },
      { label: "Mounting", value: "External inline" }
    ],
    description:
      "External inline mixing valve for blending two water streams to a target mix—useful for dialing in temperature or hardness at the point of delivery."
  }
];

async function main() {
  for (const p of products) {
    console.log(`Importing: ${p.title}`);
    await client.createOrReplace(p);
  }
  console.log("✅ Control valves import finished:", products.length, "product(s).");
}

main().catch((err) => {
  console.error("❌ Control valves import failed:", err);
  process.exit(1);
});
