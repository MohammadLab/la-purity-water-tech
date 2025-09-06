// List duplicate categories by slug and by case-insensitive title
// Run: npx sanity@latest exec scripts/find-duplicate-categories.js --with-user-token

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID || process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_API_DATASET || process.env.SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

function groupBy(arr, keyFn) {
  const m = new Map();
  for (const x of arr) {
    const k = keyFn(x);
    if (!k) continue;
    if (!m.has(k)) m.set(k, []);
    m.get(k).push(x);
  }
  return m;
}

function printGroups(title, groups) {
  const dups = [...groups.entries()].filter(([, items]) => items.length > 1);
  if (!dups.length) {
    console.log(`No duplicates by ${title}.`);
    return;
  }
  console.log(`\nDuplicates by ${title}:`);
  for (const [k, items] of dups) {
    console.log(`- "${k}"  (count: ${items.length})`);
    for (const it of items) {
      console.log(
        `   · _id=${it._id} | slug=${it.slug || "—"} | title="${it.title}" | createdAt=${it._createdAt}`
      );
    }
  }
}

(async () => {
  const cats = await client.fetch(
    `*[_type == "category"]{
      _id,_createdAt,title,"slug":slug.current
    } | order(lower(title) asc)`
  );

  const bySlug = groupBy(cats, (c) => c.slug);
  const byLowerTitle = groupBy(cats, (c) => (c.title ? c.title.toLowerCase().trim() : null));

  printGroups("slug", bySlug);
  printGroups("case-insensitive title", byLowerTitle);
})();
