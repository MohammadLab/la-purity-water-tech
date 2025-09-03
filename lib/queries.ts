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
  downloads
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
  downloads,
  sellable,
  sku,
  price,
  currency,
  inStock,
  variantOptions
}`;

export async function getAllProducts() {
  return client.fetch(allProductsGroq);
}

export async function getProductBySlug(slug: string) {
  return client.fetch(productBySlugGroq, { slug });
}
