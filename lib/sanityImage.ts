// lib/sanityImage.ts
import imageUrlBuilder from "@sanity/image-url";
import { client } from "./sanity.client"; // <= use your existing sanity client

const builder = imageUrlBuilder(client);
export const urlFor = (src: any) => builder.image(src);
