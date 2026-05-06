import type { Artist, Artwork } from "./types";

export const artists: Artist[] = [
  {
    id: "ines-alarcon",
    name: "Ines Alarcon",
    slug: "ines-alarcon",
    specialty: "Abstraccion mineral y gesto organico",
    bio:
      "Artista visual enfocada en capas translucidas, pigmentos minerales y composiciones silenciosas para espacios residenciales y hospitality.",
  },
  {
    id: "marco-soler",
    name: "Marco Soler",
    slug: "marco-soler",
    specialty: "Geometria arquitectonica",
    bio:
      "Su obra estudia proporciones, ritmos de fachada y color sobrio, con piezas pensadas para dialogar con arquitectura contemporanea.",
  },
  {
    id: "lucia-vidal",
    name: "Lucia Vidal",
    slug: "lucia-vidal",
    specialty: "Paisaje abstracto y atmosfera",
    bio:
      "Trabaja grandes campos cromaticos inspirados en horizonte, luz y memoria; ideal para interiores calmos y envolventes.",
  },
  {
    id: "nadir-reyes",
    name: "Nadir Reyes",
    slug: "nadir-reyes",
    specialty: "Textura, sombra y materia",
    bio:
      "Explora superficies tactiles, negros suaves y contraste material para hoteles, restaurantes y proyectos de autor.",
  },
];

const materials = [
  "Canvas",
  "Fine art print",
  "Framed canvas",
  "Optional acoustic panel version",
];

const artistById = Object.fromEntries(artists.map((artist) => [artist.id, artist]));

const rawArtworks = [
  ["arena-suspendida", "Arena suspendida", "ines-alarcon", "180 x 120 cm", "Horizontal", "Organico", "Neutros", "Living room", ["#efe6d8", "#c9ad8d", "#f7f2e8", "#8f7b67"]],
  ["nocturno-claro", "Nocturno claro", "nadir-reyes", "200 x 140 cm", "Horizontal", "Textural", "Oscuros", "Restaurant", ["#1d1c1b", "#3a3836", "#9d9489", "#d8d0c4"]],
  ["trazo-de-luz", "Trazo de luz", "lucia-vidal", "150 x 210 cm", "Vertical", "Atmosferico", "Calidos", "Hotel lobby", ["#f0c979", "#f6ead2", "#b97c50", "#fffaf0"]],
  ["modulo-ix", "Modulo IX", "marco-soler", "220 x 150 cm", "Horizontal", "Geometrico", "Neutros", "Office", ["#eeeae1", "#242424", "#a59b8e", "#d1c5b7"]],
  ["jardin-en-calma", "Jardin en calma", "ines-alarcon", "180 x 180 cm", "Cuadrada", "Organico", "Verdes", "Bedroom", ["#dfe7dc", "#7d8b6f", "#304339", "#b8b497"]],
  ["umbral-terracota", "Umbral terracota", "lucia-vidal", "240 x 160 cm", "Horizontal", "Atmosferico", "Terracota", "Restaurant", ["#b85f43", "#e9c7a3", "#fff4e4", "#6f4637"]],
  ["ritmo-de-piedra", "Ritmo de piedra", "marco-soler", "160 x 220 cm", "Vertical", "Geometrico", "Grises", "Office", ["#eeeeea", "#bbb6ad", "#696865", "#282828"]],
  ["marea-blanca", "Marea blanca", "ines-alarcon", "260 x 170 cm", "Horizontal", "Minimal", "Blancos", "Living room", ["#fffdf8", "#f0ede6", "#d5d0c7", "#b5aa9e"]],
  ["azul-profundo", "Azul profundo", "nadir-reyes", "190 x 130 cm", "Horizontal", "Textural", "Azules", "Bedroom", ["#172332", "#2e5366", "#8aa1a9", "#e7e4dc"]],
  ["linea-habitable", "Linea habitable", "marco-soler", "210 x 210 cm", "Cuadrada", "Geometrico", "Calidos", "Hotel lobby", ["#f5eee2", "#d0aa78", "#7d6b58", "#201f1d"]],
  ["silencio-dorado", "Silencio dorado", "lucia-vidal", "170 x 240 cm", "Vertical", "Minimal", "Dorados", "Living room", ["#f5dfaa", "#fff6de", "#aa7f3c", "#77634a"]],
  ["sombra-vegetal", "Sombra vegetal", "nadir-reyes", "230 x 150 cm", "Horizontal", "Organico", "Verdes", "Restaurant", ["#22372c", "#5c765f", "#d9d0bd", "#111614"]],
] as const;

export const artworks: Artwork[] = rawArtworks.map((item, index) => {
  const [id, title, artistId, mainSize, orientation, style, colors, roomType, palette] = item;
  const artist = artistById[artistId];

  return {
    id,
    title,
    slug: id,
    artistId,
    artistName: artist.name,
    artistBio: artist.bio,
    mainSize,
    price: "Cotizar",
    orientation,
    style,
    colors,
    roomType,
    sizes: index % 3 === 0 ? ["140 x 100 cm", mainSize, "240 x 160 cm"] : ["120 x 170 cm", mainSize, "260 x 180 cm"],
    materials,
    description:
      "Obra de gran formato pensada para dialogar con escala, luz y arquitectura interior contemporanea.",
    suggestedRooms: ["Living room", "Bedroom", "Hotel lobby", "Restaurant", "Office"].filter((_, roomIndex) => roomIndex !== index % 5),
    finish: "Mate satinado",
    printing: "Pigmentos de archivo sobre soporte premium",
    installation: "Bastidor oculto con nivelacion profesional",
    palette: [...palette],
    featured: index < 4,
  };
});
