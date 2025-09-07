import { groq } from "next-sanity";
import { createClient } from "@sanity/client";

const client = createClient({
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
*[_type == "product" && category->slug.current == $category]{
  ${productProjection}
} | order(title asc)
`;

export async function getAllCategories() {
  return client.fetch(categoriesQuery, { titles: CATEGORY_TITLES });
}

export async function getProductsByCategory(category: string) {
  return client.fetch(productsByCategoryGroq, { category });
}

export async function getAllProducts() {
  return client.fetch(groq`*[_type=="product"]{${productProjection}} | order(title asc)`);
}

// Get a single product by slug with common fields used on the PDP
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
      longDescription[]    // <-- add this
    }`,
    { slug }
  );
}



// Siblings in the same category (for the scroller)
export async function getRelatedProducts(categorySlug: string, excludeId: string) {
  const query = `*[_type == "product" 
    && defined(category.slug.current) 
    && category.slug.current == $cat
    && _id != $id][0...12]{
      _id, title, "slug": slug.current,
      // small image for the card
      heroImage, mainImage, image, images[0], gallery[0],
      category->{title, "slug": slug.current}
  }`;
  return client.fetch(query, { cat: categorySlug, id: excludeId });
}




export async function getAllBrands() {
  return client.fetch(groq`*[_type=="brand"]{_id, title, "slug": slug.current} | order(title asc)`);
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

// Already mentioned in your backend notes; adding here for the frontend:
export const productsByBrandSlugGroq = groq`
*[_type == "product" && brand->slug.current == $slug]{
  ${productProjection}
} | order(title asc)
`;

export async function getProductsByBrandSlug(slug: string) {
  return client.fetch(productsByBrandSlugGroq, { slug });
}

