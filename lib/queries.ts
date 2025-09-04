import { groq } from "next-sanity";
import { client } from "./sanity.client";

// Centralized projection so pages/components stay in sync
export const productProjection = groq`
  _id,
  title,
  "slug": slug.current,
  brand->{ _id, title, "slug": slug.current },
  category->{ _id, title, "slug": slug.current },
  heroImage,
  gallery,
  features,
  specs,
  description,
  brochure,
  downloads,
  sellable,
  sku,
  price,
  currency,
  options
`;

export const allProductsGroq = groq`*[_type == "product"]{ ${productProjection} } | order(title asc)`;

export const productBySlugGroq = groq`*[_type == "product" && slug.current == $slug][0]{ ${productProjection} }`;

export const productsByBrandSlugGroq = groq`*[_type == "product" && brand->slug.current == $slug]{ ${productProjection} } | order(title asc)`;

export const brandBySlugGroq = groq`*[_type == "brand" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  description,
  "products": *[_type == "product" && references(^._id)]{ ${productProjection} } | order(title asc)
}`;

export async function getAllProducts() {
  return client.fetch(allProductsGroq);
}

export async function getProductBySlug(slug: string) {
  return client.fetch(productBySlugGroq, { slug });
}

export async function getProductsByBrandSlug(slug: string) {
  return client.fetch(productsByBrandSlugGroq, { slug });
}

export async function getBrandBySlug(slug: string) {
  return client.fetch(brandBySlugGroq, { slug });
}
