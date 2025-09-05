import { groq } from "next-sanity";
import { client } from "./sanity.client";

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
  return client.fetch(allCategoriesGroq);
}

export async function getProductsByCategory(category: string) {
  return client.fetch(productsByCategoryGroq, { category });
}

export async function getAllProducts() {
  return client.fetch(groq`*[_type=="product"]{${productProjection}} | order(title asc)`);
}

export async function getProductBySlug(slug: string) {
  return client.fetch(groq`*[_type=="product" && slug.current==$slug][0]{${productProjection}}`, { slug });
}

export async function getAllBrands() {
  return client.fetch(groq`*[_type=="brand"]{_id, title, "slug": slug.current} | order(title asc)`);
}
