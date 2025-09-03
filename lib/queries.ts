import { groq } from "next-sanity";
import { client } from "./sanity.client";

export const allProductsGroq = groq`*[_type == "product"]{
  _id,
  title,
  "slug": slug.current,
  brand-> { _id, title, "slug": slug.current },
  category-> { _id, title, "slug": slug.current },
  heroImage,
  gallery,
  features,
  specs,
  brochure,      // <-- added
  downloads,
  sellable,
  sku,
  price,
  currency,
  inStock,
  variantOptions
} | order(title asc)`;

export const productBySlugGroq = groq`*[_type == "product" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  brand-> { _id, title, "slug": slug.current },
  category-> { _id, title, "slug": slug.current },
  heroImage,
  gallery,
  features,
  specs,
  brochure,      // <-- added
  downloads,
  sellable,
  sku,
  price,
  currency,
  inStock,
  variantOptions
}`;

export const brandBySlugGroq = groq`*[_type == "brand" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  description,
  logo,
  website
}`;

export const productsByBrandSlugGroq = groq`*[_type == "product" && defined(brand->slug.current) && brand->slug.current == $slug]{
  _id,
  title,
  "slug": slug.current,
  brand-> { _id, title, "slug": slug.current },
  category-> { _id, title, "slug": slug.current },
  heroImage,
  gallery,
  features,
  specs,
  brochure,      // <-- added
  downloads
} | order(title asc)`;

export async function getAllProducts() {
  return client.fetch(allProductsGroq);
}

export async function getProductBySlug(slug: string) {
  return client.fetch(productBySlugGroq, { slug });
}

export async function getBrandBySlug(slug: string) {
  return client.fetch(brandBySlugGroq, { slug });
}

export async function getProductsByBrandSlug(slug: string) {
  return client.fetch(productsByBrandSlugGroq, { slug });
}
