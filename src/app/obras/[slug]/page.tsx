import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Footer, QuoteSection, SiteHeader } from "@/components/GranFormatoApp";
import { artworkImage } from "@/lib/artwork-image";
import { getArtwork, getArtworks } from "@/lib/content";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const artwork = await getArtwork(slug);

  return {
    title: artwork ? `${artwork.title} | GranFormato` : "Obra | GranFormato",
    description: artwork?.description,
  };
}

export default async function ArtworkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [artwork, artworks] = await Promise.all([getArtwork(slug), getArtworks()]);

  if (!artwork) notFound();

  const related = artworks.filter((item) => item.artistId === artwork.artistId && item.id !== artwork.id).slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="detail is-active">
          <div className="detail-shell">
            <div className="detail-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={artworkImage(artwork)} alt={`${artwork.title} de ${artwork.artistName}`} />
            </div>
            <div>
              <Link className="back-link" href="/#gallery">
                Volver a obras
              </Link>
              <p className="eyebrow">
                {artwork.style} · {artwork.orientation}
              </p>
              <h1 className="detail-title">{artwork.title}</h1>
              <p className="detail-artist">{artwork.artistName}</p>
              <p className="detail-copy">{artwork.description}</p>
              <div className="actions">
                <a className="button button--dark" href="#contact">
                  Solicitar cotizacion
                </a>
                <Link className="button" href="/#home">
                  Visualizar esta obra en mi espacio
                </Link>
              </div>

              <DetailPanel title="Artista">
                <p className="detail-copy">{artwork.artistBio}</p>
              </DetailPanel>
              <DetailPanel title="Medidas disponibles">
                <Chips items={artwork.sizes} />
              </DetailPanel>
              <DetailPanel title="Materiales">
                <Chips items={artwork.materials} />
              </DetailPanel>
              <DetailPanel title="Informacion tecnica">
                <div className="specs">
                  <Spec label="Dimensiones" value={artwork.sizes.join(" / ")} />
                  <Spec label="Orientacion" value={artwork.orientation} />
                  <Spec label="Acabado" value={artwork.finish} />
                  <Spec label="Calidad" value={artwork.printing} />
                  <Spec label="Instalacion" value={artwork.installation} />
                  <Spec label="Material base" value={artwork.materials[0]} />
                </div>
              </DetailPanel>
              <DetailPanel title="Espacios sugeridos">
                <Chips items={artwork.suggestedRooms} />
              </DetailPanel>
              <DetailPanel title={`Mas obras de ${artwork.artistName}`}>
                <div className="related">
                  {related.map((item) => (
                    <Link href={`/obras/${item.slug}`} key={item.id}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={artworkImage(item)} alt={item.title} />
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              </DetailPanel>
            </div>
          </div>
        </section>
        <QuoteSection artworks={artworks} selectedArtworkId={artwork.id} />
      </main>
      <Footer />
    </>
  );
}

function DetailPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="detail-panel">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="chips">
      {items.map((item) => (
        <span className="chip" key={item}>
          {item}
        </span>
      ))}
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="spec">
      <span>{label}</span>
      {value}
    </div>
  );
}
