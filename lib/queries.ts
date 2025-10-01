// lib/queries.ts
import { groq } from "next-sanity";
import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  useCdn: true,
});

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
  // NEW
  "Reverse Osmosis System",
];

export const categoriesQuery = groq`
  *[_type == "category" && title in $titles]{
    _id,
    title,
    slug,
    thumbnail,
    blurb
  } | order(title asc)
`;

export const productProjection = `
  _id,
  title,
  "slug": slug.current,
  "brand": brand->{title, "slug": slug.current},
  "category": category->{title, "slug": slug.current},
  "secondaryCategory": secondaryCategory->{title, "slug": slug.current},
  description,
  features,
  specs,
  heroImage,
  gallery,
  brochure,
  downloads
`;


export const allCategoriesGroq = groq`
  *[_type == "category"]{ _id, title, "slug": slug.current } | order(title asc)
`;

export const productsByCategoryGroq = groq`
  *[_type == "product" && (
    category->slug.current == $category ||
    secondaryCategory->slug.current == $category
  )]{
    ${productProjection}
  } | order(title asc)
`;


// lib/queries.ts
export async function getAllCategories() {
  return client.fetch(`
    *[_type == "category"] 
      | order(coalesce(order, 9999) asc, title asc) {
        _id,
        title,
        "slug": slug.current,
        thumbnail,
        blurb
      }
  `);
}


export async function getProductsByCategory(category: string) {
  return client.fetch(productsByCategoryGroq, { category });
}

export async function getAllProducts() {
  return client.fetch(
    groq`*[_type=="product"]{${productProjection}} | order(title asc)`
  );
}

// One product (detail page)
export async function getProductBySlug(slug: string) {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      category->{title, slug},
      heroImage,
      mainImage,
      image,
      images[],
      gallery[],
      brochure,
      downloads[]{title, file},
      features[],
      specs[]{label, value},
      description
    }`,
    { slug }
  );
}

// Siblings in the same category (for the scroller)
export async function getRelatedProducts(opts: {
  currentSlug: string;
  categorySlug?: string;
  limit?: number;
}) {
  const { currentSlug, categorySlug, limit = 12 } = opts;

  // Fast path if we already know the category slug
  if (categorySlug) {
    return client.fetch(
      `*[
        _type == "product" &&
        slug.current != $currentSlug &&
        defined(category->slug.current) &&
        category->slug.current == $cat
      ] | order(title asc)[0...$limit]{
        _id,
        title,
        "slug": slug.current,
        category->{title, "slug": slug.current},
        heroImage,
        gallery,
        description
      }`,
      { currentSlug, cat: categorySlug, limit }
    );
  }

  // Fallback: resolve the category ref of the current product, then match by that ref
  const catRef = await client.fetch<string | null>(
    `*[_type == "product" && slug.current == $slug][0].category._ref`,
    { slug: currentSlug }
  );

  if (!catRef) return [];

  return client.fetch(
    `*[
      _type == "product" &&
      slug.current != $currentSlug &&
      category._ref == $catRef
    ] | order(title asc)[0...$limit]{
      _id,
      title,
      "slug": slug.current,
      category->{title, "slug": slug.current},
      heroImage,
      gallery,
      description
    }`,
    { currentSlug, catRef, limit }
  );
}

export async function getAllBrands() {
  return client.fetch(
    groq`*[_type=="brand"]{_id, title, "slug": slug.current} | order(title asc)`
  );
}

// --- Brand lookups ---
export const brandBySlugGroq = groq`
  *[_type == "brand" && slug.current == $slug][0]{
    _id, title, "slug": slug.current, description, logo
  }
`;

export async function getBrandBySlug(slug: string) {
  return client.fetch(brandBySlugGroq, { slug });
}

export const productsByBrandSlugGroq = groq`
  *[_type == "product" && brand->slug.current == $slug]{
    ${productProjection}
  } | order(title asc)
`;

export async function getProductsByBrandSlug(slug: string) {
  return client.fetch(productsByBrandSlugGroq, { slug });
}
