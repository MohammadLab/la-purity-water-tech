import imageUrlBuilder from "@sanity/image-url";
import { client } from "./sanity.client";

export const urlFor = (src: any) => imageUrlBuilder(client as any).image(src);
