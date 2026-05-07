import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";
import type { SanityImage } from "./queries";

const builder = imageUrlBuilder(client);

export const urlFor = (src: SanityImage) => builder.image(src);
