import { artworks as fallbackArtworks, artists as fallbackArtists } from "./fallback-data";
import type { Artist, Artwork } from "./types";
import { client, hasSanityConfig } from "./sanity/client";
import { ARTISTS_QUERY, ARTWORK_QUERY, ARTWORKS_QUERY } from "./sanity/queries";

const options = { next: { revalidate: 60 } };

export async function getArtworks(): Promise<Artwork[]> {
  if (!hasSanityConfig) return fallbackArtworks;

  try {
    const results = await client.fetch<Artwork[]>(ARTWORKS_QUERY, {}, options);
    return results.length ? results : fallbackArtworks;
  } catch {
    return fallbackArtworks;
  }
}

export async function getArtists(): Promise<Artist[]> {
  if (!hasSanityConfig) return fallbackArtists;

  try {
    const results = await client.fetch<Artist[]>(ARTISTS_QUERY, {}, options);
    return results.length ? results : fallbackArtists;
  } catch {
    return fallbackArtists;
  }
}

export async function getArtwork(slug: string): Promise<Artwork | null> {
  if (!hasSanityConfig) {
    return fallbackArtworks.find((artwork) => artwork.slug === slug) || null;
  }

  try {
    const result = await client.fetch<Artwork | null>(ARTWORK_QUERY, { slug }, options);
    return result || fallbackArtworks.find((artwork) => artwork.slug === slug) || null;
  } catch {
    return fallbackArtworks.find((artwork) => artwork.slug === slug) || null;
  }
}
