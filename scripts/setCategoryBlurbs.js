// scripts/setCategoryBlurbs.js
const {createClient} = require("@sanity/client");

const client = createClient({
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_API_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_TOKEN, // --with-user-token sets SANITY_AUTH_TOKEN
  useCdn: false,
});

const blurbsByTitle = {
  "Chemical Removal": "Chlorine, VOCs, PFAS reduction.",
  "Hybrid / Multi-contaminant": "All-in-one contaminant removal.",
  "Iron / Sulphur / Manganese": "Clear staining and odour.",
  "pH / Neutralizing": "Raise pH, protect plumbing.",
  "Scale Control Systems": "Minimize limescale formation.",
  "Smart Connect Ecosystem": "App-enabled monitoring & alerts.",
  "Tannin": "Remove tea-colored tint.",
  "Ultraviolet (UV)": "Disinfection without chemicals.",
  "Water Softeners": "Stop hardness, protect fixtures.",
  "Whole Home Filtration": "Cleaner water throughout home.",
};

async function run() {
  const titles = Object.keys(blurbsByTitle);
  const cats = await client.fetch(
    `*[_type == "category" && title in $titles]{_id, title, blurb}`,
    {titles}
  );

  for (const c of cats) {
    const blurb = blurbsByTitle[c.title];
    if (!blurb || c.blurb) continue; // only fill missing blurbs
    await client.patch(c._id).set({blurb}).commit();
    console.log(`✓ Set blurb for ${c.title}`);
  }

  console.log("Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
