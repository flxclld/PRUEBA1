import { GranFormatoApp } from "@/components/GranFormatoApp";
import { getArtists, getArtworks } from "@/lib/content";

export default async function Home() {
  const [artworks, artists] = await Promise.all([getArtworks(), getArtists()]);

  return <GranFormatoApp artworks={artworks} artists={artists} />;
}
