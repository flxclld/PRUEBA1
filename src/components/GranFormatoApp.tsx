"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { artworkImage } from "@/lib/artwork-image";
import type { Artist, Artwork } from "@/lib/types";

type Filters = {
  style: string;
  colors: string;
  artist: string;
  roomType: string;
  size: string;
  orientation: string;
};

const initialFilters: Filters = {
  style: "Todos",
  colors: "Todos",
  artist: "Todos",
  roomType: "Todos",
  size: "Todos",
  orientation: "Todos",
};

export function GranFormatoApp({
  artworks,
  artists,
}: {
  artworks: Artwork[];
  artists: Artist[];
}) {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArtworkId, setSelectedArtworkId] = useState(artworks[0]?.id || "");

  const filtered = useMemo(() => {
    return artworks.filter((artwork) => {
      const width = parseInt(artwork.mainSize, 10);
      const sizeMatch =
        filters.size === "Todos" ||
        (filters.size === "120-170 cm" && width < 180) ||
        (filters.size === "180-240 cm" && width >= 180 && width < 250) ||
        (filters.size === "250+ cm" && width >= 250);

      return (
        (filters.style === "Todos" || artwork.style === filters.style) &&
        (filters.colors === "Todos" || artwork.colors === filters.colors) &&
        (filters.artist === "Todos" || artwork.artistName === filters.artist) &&
        (filters.roomType === "Todos" || artwork.roomType === filters.roomType) &&
        (filters.orientation === "Todos" || artwork.orientation === filters.orientation) &&
        sizeMatch
      );
    });
  }, [artworks, filters]);

  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  return (
    <>
      <SiteHeader onOpenVisualizer={() => setModalOpen(true)} />
      <main>
        <section className="hero" id="home">
          <div className="hero__inner">
            <p className="eyebrow">GranFormato</p>
            <h1>Arte en gran formato para transformar espacios.</h1>
            <p className="hero__copy">
              Obras curatoriales, formatos personalizados, visualizacion AI e instalacion profesional para hogares,
              hoteles, restaurantes y arquitectura interior.
            </p>
            <div className="actions">
              <a className="button button--light" href="#gallery">
                Explorar obras
              </a>
              <button className="button" type="button" onClick={() => setModalOpen(true)}>
                Visualizar en mi espacio
              </button>
            </div>
          </div>
        </section>

        <section className="section section--white" id="gallery">
          <div className="section__head">
            <div>
              <p className="eyebrow">Coleccion</p>
              <h2>Obras pensadas para dialogar con escala, luz y arquitectura.</h2>
            </div>
            <p>
              Explora piezas de gran formato para salas, suites, lobbies, restaurantes y oficinas. Cada obra puede
              producirse en medidas especiales y diferentes acabados.
            </p>
          </div>
          <div className="filters">
            <Filter label="Style" value={filters.style} options={unique(artworks, "style")} onChange={(value) => updateFilter("style", value)} />
            <Filter label="Color palette" value={filters.colors} options={unique(artworks, "colors")} onChange={(value) => updateFilter("colors", value)} />
            <Filter label="Artist" value={filters.artist} options={["Todos", ...artists.map((artist) => artist.name)]} onChange={(value) => updateFilter("artist", value)} />
            <Filter label="Room type" value={filters.roomType} options={unique(artworks, "roomType")} onChange={(value) => updateFilter("roomType", value)} />
            <Filter label="Size" value={filters.size} options={["Todos", "120-170 cm", "180-240 cm", "250+ cm"]} onChange={(value) => updateFilter("size", value)} />
            <Filter label="Orientation" value={filters.orientation} options={unique(artworks, "orientation")} onChange={(value) => updateFilter("orientation", value)} />
          </div>
          <div className="gallery">
            {filtered.map((artwork, index) => (
              <ArtworkCard
                artwork={artwork}
                index={index}
                key={artwork.id}
                onSelect={() => setSelectedArtworkId(artwork.id)}
              />
            ))}
          </div>
        </section>

        <section className="section" id="services">
          <div className="story-grid">
            <Story title="Arte para interiores" copy="Seleccionamos obras por proporcion, distancia de lectura, luz natural y estilo del espacio." />
            <Story title="Medidas a proyecto" copy="Adaptamos formato, bastidor y acabado para muros residenciales, hoteleros y contract." />
            <Story title="Instalacion profesional" copy="Coordinamos produccion, embalaje, entrega, nivelacion y montaje en sitio." />
            <Story title="Visualizacion AI" copy="Previsualiza escala y posicion con una foto de tu habitacion antes de cotizar." />
          </div>
        </section>

        <section className="section section--white">
          <div className="services">
            <div className="service-image" style={{ "--artwork-url": `url('${artworkImage(artworks[5] || artworks[0])}')` } as CSSProperties} />
            <div>
              <p className="eyebrow">Servicio integral</p>
              <h2>De la curaduria al muro terminado.</h2>
              <div className="service-list">
                <Story title="Asesoria curatorial" copy="Recomendamos obras segun estilo interior, escala del muro, paleta, mobiliario y presupuesto." />
                <Story title="Produccion premium" copy="Canvas, fine art print, marco flotante o panel acustico con control de color y acabados durables." />
                <Story title="Instalacion y logistica" copy="Planeamos entrega, maniobra, herrajes y montaje para hogares, hoteles, restaurantes y oficinas." />
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="studio">
          <div className="section__head">
            <div>
              <p className="eyebrow">Artistas</p>
              <h2>Una coleccion breve, curada y adaptable.</h2>
            </div>
            <p>
              Cada artista aporta una mirada distinta: atmosfera, geometria, materia y gestos organicos para proyectos
              de interiorismo contemporaneo.
            </p>
          </div>
          <div className="artists">
            {artists.map((artist) => (
              <article className="artist-card" key={artist.id}>
                <p className="eyebrow">{artist.specialty}</p>
                <h3>{artist.name}</h3>
                <p>{artist.bio}</p>
              </article>
            ))}
          </div>
        </section>

        <QuoteSection artworks={artworks} selectedArtworkId={selectedArtworkId} />
      </main>
      <Footer />
      <VisualizerModal
        artworks={artworks}
        open={modalOpen}
        selectedArtworkId={selectedArtworkId}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

export function SiteHeader({ onOpenVisualizer }: { onOpenVisualizer?: () => void }) {
  return (
    <header className="site-header is-scrolled">
      <Link className="brand" href="/">
        <span>Gran</span>Formato
      </Link>
      <nav className="nav" aria-label="Navegacion principal">
        <Link href="/#gallery">Obras</Link>
        <Link href="/#services">Servicios</Link>
        <Link href="/#studio">Estudio</Link>
        <Link href="/#contact">Cotizar</Link>
      </nav>
      <button className="icon-button" type="button" onClick={onOpenVisualizer} aria-label="Abrir visualizador AI">
        AI
      </button>
    </header>
  );
}

function Filter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label>
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function ArtworkCard({ artwork, index, onSelect }: { artwork: Artwork; index: number; onSelect: () => void }) {
  return (
    <Link
      className="art-card"
      href={`/obras/${artwork.slug}`}
      onClick={onSelect}
      style={{ animationDelay: `${index * 45}ms` }}
    >
      <div className="art-card__image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={artworkImage(artwork)} alt={`${artwork.title} de ${artwork.artistName}`} />
      </div>
      <div className="art-card__meta">
        <div>
          <h3>{artwork.title}</h3>
          <p>
            {artwork.artistName} · {artwork.mainSize}
          </p>
        </div>
        <span className="price">{artwork.price}</span>
      </div>
    </Link>
  );
}

function Story({ title, copy }: { title: string; copy: string }) {
  return (
    <article className="story service">
      <h3>{title}</h3>
      <p>{copy}</p>
    </article>
  );
}

export function QuoteSection({ artworks, selectedArtworkId }: { artworks: Artwork[]; selectedArtworkId: string }) {
  const [artworkId, setArtworkId] = useState(selectedArtworkId || artworks[0]?.id);
  const selected = artworks.find((artwork) => artwork.id === artworkId) || artworks[0];

  return (
    <section className="section section--white" id="contact">
      <div className="quote">
        <div>
          <p className="eyebrow">Cotizacion</p>
          <h2>Un proceso consultivo, hecho a medida.</h2>
          <p>
            Cuentanos sobre tu espacio y la obra que te interesa. El equipo prepara recomendacion de medida, material,
            logistica e instalacion.
          </p>
        </div>
        <form
          className="quote-form"
          onSubmit={(event) => {
            event.preventDefault();
            alert("Solicitud preparada. Luego conectaremos este formulario a Sanity o a tu CRM.");
          }}
        >
          <div className="form-grid">
            <label>Nombre<input name="name" required /></label>
            <label>Email<input name="email" type="email" required /></label>
            <label>Telefono / WhatsApp<input name="phone" /></label>
            <label>Ciudad<input name="city" /></label>
            <label>
              Obra seleccionada
              <select name="artwork" value={artworkId} onChange={(event) => setArtworkId(event.target.value)}>
                {artworks.map((artwork) => (
                  <option value={artwork.id} key={artwork.id}>
                    {artwork.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Medida preferida
              <select name="size">
                {selected?.sizes.map((size) => (
                  <option key={size}>{size}</option>
                ))}
              </select>
            </label>
            <label className="full">Foto del espacio opcional<input name="photo" type="file" accept="image/*" /></label>
            <label className="full">Mensaje<textarea name="message" placeholder="Cuentanos medidas del muro, tipo de espacio, estilo y fecha estimada." /></label>
          </div>
          <button className="button button--dark" type="submit">
            Solicitar asesoria y cotizacion
          </button>
          <p>Seleccion actual: {selected?.title}</p>
        </form>
      </div>
    </section>
  );
}

export function VisualizerModal({
  artworks,
  open,
  selectedArtworkId,
  onClose,
}: {
  artworks: Artwork[];
  open: boolean;
  selectedArtworkId: string;
  onClose: () => void;
}) {
  const [artworkId, setArtworkId] = useState(selectedArtworkId || artworks[0]?.id);
  const [position, setPosition] = useState("center");
  const [ready, setReady] = useState(false);
  const selected = artworks.find((artwork) => artwork.id === artworkId) || artworks[0];

  if (!open) return null;

  return (
    <div className="modal is-active" aria-hidden="false">
      <button className="modal__backdrop" type="button" onClick={onClose} aria-label="Cerrar visualizador" />
      <section className="modal__panel" role="dialog" aria-modal="true" aria-labelledby="visualizer-title">
        <div className="modal__header">
          <div>
            <p className="eyebrow">Visualizacion AI</p>
            <h2 id="visualizer-title">Ver la obra en tu propio espacio.</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Cerrar visualizador">
            x
          </button>
        </div>
        <form
          className="visualizer"
          onSubmit={(event) => {
            event.preventDefault();
            setReady(true);
          }}
        >
          <label className="upload-zone">
            <input type="file" accept="image/*" />
            <span>Sube una foto de tu sala, lobby o restaurante</span>
            <small>JPG o PNG. En este prototipo se genera una vista simulada.</small>
          </label>
          <div className="form-grid">
            <label>
              Obra
              <select value={artworkId} onChange={(event) => setArtworkId(event.target.value)}>
                {artworks.map((artwork) => (
                  <option value={artwork.id} key={artwork.id}>
                    {artwork.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Tamano aproximado
              <select>
                {selected?.sizes.map((size) => (
                  <option key={size}>{size}</option>
                ))}
              </select>
            </label>
            <label>
              Posicion en muro
              <select value={position} onChange={(event) => setPosition(event.target.value)}>
                <option value="center">Centro del muro</option>
                <option value="left">Lado izquierdo</option>
                <option value="right">Lado derecho</option>
                <option value="low">Sobre mobiliario bajo</option>
              </select>
            </label>
          </div>
          <button className="button button--dark" type="submit">
            Generar visualizacion
          </button>
        </form>
        <div className={`mockup ${ready ? "is-ready" : ""}`}>
          <div className="mockup__room">
            <div
              className="mockup__art"
              data-position={position}
              style={{ "--artwork-url": `url('${artworkImage(selected)}')` } as CSSProperties}
            />
            <div className="mockup__sofa" />
          </div>
          <p>Preview conceptual listo para conectar con una API de generacion de imagen.</p>
        </div>
      </section>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <Link className="brand" href="/">
        <span>Gran</span>Formato
      </Link>
      <p>Arte, escala, visualizacion e instalacion para interiores contemporaneos.</p>
    </footer>
  );
}

function unique<T extends keyof Artwork>(artworks: Artwork[], key: T) {
  return ["Todos", ...Array.from(new Set(artworks.map((artwork) => String(artwork[key]))))];
}
