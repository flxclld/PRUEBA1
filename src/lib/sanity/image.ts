import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { client, hasSanityConfig } from "./client";

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  if (!hasSanityConfig) return null;
  return builder.image(source);
}
