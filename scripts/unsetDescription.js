// scripts/unsetDescriptions.js
// Usage: pnpm dlx sanity@latest exec scripts\unsetDescriptions.js --with-user-token
/* eslint-disable no-console */
const { getCliClient } = require("sanity/cli");

const apiVersion = process.env.SANITY_API_VERSION || "2025-01-01";
const client = getCliClient({ apiVersion });

async function main() {
  const docs = await client.fetch(`*[_type == "product" && defined(description)]._id`);
  if (!docs || docs.length === 0) {
    console.log("No products have description. Nothing to undo.");
    return;
  }

  // Patch in small batches
  let processed = 0;
  const batchSize = 100;
  for (let i = 0; i < docs.length; i += batchSize) {
    const slice = docs.slice(i, i + batchSize);
    let tx = client.transaction();
    for (const id of slice) {
      tx = tx.patch(id, { unset: ["description"] });
    }
    await tx.commit({ visibility: "async" });
    processed += slice.length;
    console.log(`Unset ${processed}/${docs.length} descriptions...`);
  }

  console.log(`✅ Done. Cleared description on ${docs.length} product(s).`);
}

main().catch((err) => {
  console.error("Unset descriptions failed:", err);
  process.exit(1);
});
