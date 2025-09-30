// scripts/importResins.js
// Run with: pnpm dlx sanity@latest exec scripts\importResins.js --with-user-token
/* eslint-disable no-console */
const { getCliClient } = require("sanity/cli");
const apiVersion = process.env.SANITY_API_VERSION || "2025-01-01";
const client = getCliClient({ apiVersion });

// Only the fields you asked for: title, features, specs, description.
// (slug is required by your schema, so we include it too. No brand/category/hero set here.)

const products = [
    {
        _id: "product-tds-meter-pen-type",
        _type: "product",
        title: "TDS Meter Pen Type",
        slug: { _type: "slug", current: "tds-meter-pen-type" },
        features: [
            "Simple one-button operation—dip and read",
            "Fast, accurate digital readings on large LCD",
            "Hold/Lock function freezes reading for recording",
            "Auto-Off after 5 minutes to conserve battery",
            "Wide 0–9990 ppm measuring range",
            "Pen-type portable design fits in pocket or bag",
            "Durable ABS body with water-resistant design",
            "Great for drinking water, hydroponics, aquariums, pools/spas, labs, and more"
        ],
        specs: [
            { label: "Model", value: "TSDS-M2 Mini TDS Meter" },
            { label: "Measurement Range", value: "0–9990 ppm (mg/L)" },
            { label: "Display", value: "Large LCD" },
            { label: "Hold Function", value: "Yes (locks stabilized reading)" },
            { label: "Auto-Off", value: "After 5 minutes of inactivity" },
            { label: "Form Factor", value: "Pen-type handheld" },
            { label: "Material", value: "ABS plastic" },
            { label: "Water Resistance", value: "Waterproof design" },
            { label: "Applications", value: "Drinking water, hydroponics, aquariums, pools & hot tubs, spa, food & beverage, coffee, kombucha, labs, ecology testing" },
            { label: "Brand", value: "No Brand" },
            { label: "SKU", value: "646343754_PK-3015515162" }
        ],
        description:
            "Compact digital TDS meter for quick, reliable checks of total dissolved solids (ppm) in water. Turn it on, immerse the probe, wait for a stable value, press HOLD to lock the reading, then remove and record. Ideal for household drinking water, aquariums, hydroponic nutrients, pools/spas, and more. Includes auto-off to save battery and a clear LCD for easy reading.\n\nPPM guide:\n• 0–50 ppm — High-purity water\n• 50–100 ppm — Pure water\n• 100–300 ppm — General pure water\n• 300–600 ppm — Water may form scale\n• 600–1000 ppm — Poor taste water\n• >1000 ppm — Not suitable for drinking"
    }

];

async function main() {
    for (const p of products) {
        console.log(`Importing: ${p.title}`);
        await client.createOrReplace(p);
    }
    console.log("✅ Resin import finished:", products.length, "product(s).");
}

main().catch((err) => {
    console.error("❌ Resin import failed:", err);
    process.exit(1);
});
