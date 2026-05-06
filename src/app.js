import { artists, artworks } from "./data.js";

const app = document.querySelector("#app");
const header = document.querySelector("[data-header]");
const modal = document.querySelector("[data-visualizer-modal]");
const artistById = Object.fromEntries(artists.map((artist) => [artist.id, artist]));

const state = {
  filters: {
    style: "Todos",
    colors: "Todos",
    artist: "Todos",
    roomType: "Todos",
    size: "Todos",
    orientation: "Todos",
  },
  selectedArtworkId: artworks[0].id,
};

const unique = (key) => ["Todos", ...new Set(artworks.map((artwork) => artwork[key]))];

function svgArtwork(artwork) {
  const [a, b, c, d] = artwork.palette;
  const vertical = artwork.orientation === "Vertical";
  const square = artwork.orientation === "Cuadrada";
  const width = square ? 900 : vertical ? 760 : 1100;
  const height = square ? 900 : vertical ? 1100 : 760;
  const seed = artwork.id.length * 31;

  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${a}"/>
          <stop offset=".48" stop-color="${b}"/>
          <stop offset="1" stop-color="${c}"/>
        </linearGradient>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 .16"/>
          </feComponentTransfer>
        </filter>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#g)"/>
      <rect width="${width}" height="${height}" filter="url(#grain)" opacity=".5"/>
      <circle cx="${width * 0.18}" cy="${height * 0.22}" r="${120 + seed}" fill="${d}" opacity=".18"/>
      <circle cx="${width * 0.78}" cy="${height * 0.7}" r="${150 + seed / 2}" fill="${a}" opacity=".22"/>
      <path d="M-80 ${height * 0.62} C ${width * 0.22} ${height * 0.26}, ${width * 0.52} ${height * 0.88}, ${width + 90} ${height * 0.42}" fill="none" stroke="${d}" stroke-width="${vertical ? 42 : 56}" stroke-linecap="round" opacity=".34"/>
      <path d="M${width * 0.1} ${height * 0.82} C ${width * 0.35} ${height * 0.58}, ${width * 0.68} ${height * 0.9}, ${width * 0.92} ${height * 0.64}" fill="none" stroke="#fffdf9" stroke-width="18" stroke-linecap="round" opacity=".34"/>
      <rect x="${width * 0.08}" y="${height * 0.08}" width="${width * 0.84}" height="${height * 0.84}" fill="none" stroke="#fffdf9" stroke-width="2" opacity=".24"/>
    </svg>
  `)}`;
}

const imageOf = (artwork) => svgArtwork(artwork);

function renderHome() {
  const filtered = getFilteredArtworks();

  app.innerHTML = `
    <section class="hero" id="home">
      <div class="hero__inner">
        <p class="eyebrow">GranFormato</p>
        <h1>Arte en gran formato para transformar espacios.</h1>
        <p class="hero__copy">Obras curatoriales, formatos personalizados, visualizacion AI e instalacion profesional para hogares, hoteles, restaurantes y arquitectura interior.</p>
        <div class="actions">
          <a class="button button--light" href="#gallery">Explorar obras</a>
          <button class="button" type="button" data-open-visualizer>Visualizar en mi espacio</button>
        </div>
      </div>
    </section>

    <section class="section section--white" id="gallery">
      <div class="section__head">
        <div>
          <p class="eyebrow">Coleccion</p>
          <h2>Obras pensadas para dialogar con escala, luz y arquitectura.</h2>
        </div>
        <p>Explora piezas de gran formato para salas, suites, lobbies, restaurantes y oficinas. Cada obra puede producirse en medidas especiales y diferentes acabados.</p>
      </div>
      <div class="filters" data-filters>
        ${filterTemplate("style", "Style", unique("style"))}
        ${filterTemplate("colors", "Color palette", unique("colors"))}
        ${filterTemplate("artist", "Artist", ["Todos", ...artists.map((artist) => artist.name)])}
        ${filterTemplate("roomType", "Room type", unique("roomType"))}
        ${filterTemplate("size", "Size", ["Todos", "120-170 cm", "180-240 cm", "250+ cm"])}
        ${filterTemplate("orientation", "Orientation", unique("orientation"))}
      </div>
      <div class="gallery" data-gallery>
        ${filtered.map(artworkCard).join("")}
      </div>
    </section>

    <section class="section" id="services">
      <div class="story-grid">
        ${story("Arte para interiores", "Seleccionamos obras por proporcion, distancia de lectura, luz natural y estilo del espacio.")}
        ${story("Medidas a proyecto", "Adaptamos formato, bastidor y acabado para muros residenciales, hoteleros y contract.")}
        ${story("Instalacion profesional", "Coordinamos produccion, embalaje, entrega, nivelacion y montaje en sitio.")}
        ${story("Visualizacion AI", "Previsualiza escala y posicion con una foto de tu habitacion antes de cotizar.")}
      </div>
    </section>

    <section class="section section--white">
      <div class="services">
        <div class="service-image" style="--artwork-url: url('${imageOf(artworks[5])}')"></div>
        <div>
          <p class="eyebrow">Servicio integral</p>
          <h2>De la curaduria al muro terminado.</h2>
          <div class="service-list">
            ${service("Asesoria curatorial", "Recomendamos obras segun estilo interior, escala del muro, paleta, mobiliario y presupuesto.")}
            ${service("Produccion premium", "Canvas, fine art print, marco flotante o panel acustico con control de color y acabados durables.")}
            ${service("Instalacion y logistica", "Planeamos entrega, maniobra, herrajes y montaje para hogares, hoteles, restaurantes y oficinas.")}
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="studio">
      <div class="section__head">
        <div>
          <p class="eyebrow">Artistas</p>
          <h2>Una coleccion breve, curada y adaptable.</h2>
        </div>
        <p>Cada artista aporta una mirada distinta: atmosfera, geometria, materia y gestos organicos para proyectos de interiorismo contemporaneo.</p>
      </div>
      <div class="artists">
        ${artists.map(artistCard).join("")}
      </div>
    </section>

    ${quoteSection()}
    ${footer()}
  `;

  bindHomeEvents();
  setupQuoteSelects();
  setupVisualizerSelects();
}

function filterTemplate(key, label, options) {
  return `
    <label>
      ${label}
      <select data-filter="${key}">
        ${options.map((option) => `<option ${state.filters[key] === option ? "selected" : ""}>${option}</option>`).join("")}
      </select>
    </label>
  `;
}

function artworkCard(artwork, index) {
  const artist = artistById[artwork.artistId];
  return `
    <article class="art-card" data-artwork-id="${artwork.id}" style="animation-delay: ${index * 45}ms">
      <div class="art-card__image">
        <img src="${imageOf(artwork)}" alt="${artwork.title} de ${artist.name}">
      </div>
      <div class="art-card__meta">
        <div>
          <h3>${artwork.title}</h3>
          <p>${artist.name} · ${artwork.mainSize}</p>
        </div>
        <span class="price">${artwork.price}</span>
      </div>
    </article>
  `;
}

function story(title, copy) {
  return `
    <article class="story">
      <h3>${title}</h3>
      <p>${copy}</p>
    </article>
  `;
}

function service(title, copy) {
  return `
    <article class="service">
      <h3>${title}</h3>
      <p>${copy}</p>
    </article>
  `;
}

function artistCard(artist) {
  return `
    <article class="artist-card">
      <p class="eyebrow">${artist.specialty}</p>
      <h3>${artist.name}</h3>
      <p>${artist.bio}</p>
    </article>
  `;
}

function quoteSection(selectedId = state.selectedArtworkId) {
  const selected = artworks.find((artwork) => artwork.id === selectedId) || artworks[0];
  return `
    <section class="section section--white" id="contact">
      <div class="quote">
        <div>
          <p class="eyebrow">Cotizacion</p>
          <h2>Un proceso consultivo, hecho a medida.</h2>
          <p>Cuentanos sobre tu espacio y la obra que te interesa. El equipo prepara recomendacion de medida, material, logistica e instalacion.</p>
        </div>
        <form class="quote-form" data-quote-form>
          <div class="form-grid">
            <label>Nombre<input name="name" required></label>
            <label>Email<input name="email" type="email" required></label>
            <label>Telefono / WhatsApp<input name="phone"></label>
            <label>Ciudad<input name="city"></label>
            <label>Obra seleccionada<select name="artwork" data-quote-artwork></select></label>
            <label>Medida preferida<select name="size" data-quote-size></select></label>
            <label class="full">Foto del espacio opcional<input name="photo" type="file" accept="image/*"></label>
            <label class="full">Mensaje<textarea name="message" placeholder="Cuentanos medidas del muro, tipo de espacio, estilo y fecha estimada."></textarea></label>
          </div>
          <button class="button button--dark" type="submit">Solicitar asesoria y cotizacion</button>
          <p data-form-note>Seleccion actual: ${selected.title}</p>
        </form>
      </div>
    </section>
  `;
}

function footer() {
  return `
    <footer class="footer">
      <a class="brand" href="#home"><span>Gran</span>Formato</a>
      <p>Arte, escala, visualizacion e instalacion para interiores contemporaneos.</p>
    </footer>
  `;
}

function getFilteredArtworks() {
  return artworks.filter((artwork) => {
    const artistName = artistById[artwork.artistId].name;
    const width = parseInt(artwork.mainSize, 10);
    const sizeMatch =
      state.filters.size === "Todos" ||
      (state.filters.size === "120-170 cm" && width < 180) ||
      (state.filters.size === "180-240 cm" && width >= 180 && width < 250) ||
      (state.filters.size === "250+ cm" && width >= 250);

    return (
      (state.filters.style === "Todos" || artwork.style === state.filters.style) &&
      (state.filters.colors === "Todos" || artwork.colors === state.filters.colors) &&
      (state.filters.artist === "Todos" || artistName === state.filters.artist) &&
      (state.filters.roomType === "Todos" || artwork.roomType === state.filters.roomType) &&
      (state.filters.orientation === "Todos" || artwork.orientation === state.filters.orientation) &&
      sizeMatch
    );
  });
}

function renderDetail(id) {
  const artwork = artworks.find((item) => item.id === id) || artworks[0];
  const artist = artistById[artwork.artistId];
  const related = artworks.filter((item) => item.artistId === artwork.artistId && item.id !== artwork.id).slice(0, 3);
  state.selectedArtworkId = artwork.id;

  app.innerHTML = `
    <section class="detail is-active">
      <div class="detail-shell">
        <div class="detail-media">
          <img src="${imageOf(artwork)}" alt="${artwork.title} de ${artist.name}">
        </div>
        <div>
          <button class="back-link" type="button" data-back-gallery>Volver a obras</button>
          <p class="eyebrow">${artwork.style} · ${artwork.orientation}</p>
          <h1 class="detail-title">${artwork.title}</h1>
          <p class="detail-artist">${artist.name}</p>
          <p class="detail-copy">${artwork.description}</p>
          <div class="actions">
            <a class="button button--dark" href="#contact" data-detail-quote>Solicitar cotizacion</a>
            <button class="button" type="button" data-open-visualizer>Visualizar esta obra en mi espacio</button>
          </div>

          <div class="detail-panel">
            <h3>Artista</h3>
            <p class="detail-copy">${artist.bio}</p>
          </div>

          <div class="detail-panel">
            <h3>Medidas disponibles</h3>
            <div class="chips">${artwork.sizes.map((size) => `<span class="chip">${size}</span>`).join("")}</div>
          </div>

          <div class="detail-panel">
            <h3>Materiales</h3>
            <div class="chips">${artwork.materials.map((material) => `<span class="chip">${material}</span>`).join("")}</div>
          </div>

          <div class="detail-panel">
            <h3>Informacion tecnica</h3>
            <div class="specs">
              ${spec("Dimensiones", artwork.sizes.join(" / "))}
              ${spec("Orientacion", artwork.orientation)}
              ${spec("Acabado", artwork.finish)}
              ${spec("Calidad", artwork.printing)}
              ${spec("Instalacion", artwork.installation)}
              ${spec("Material base", artwork.materials[0])}
            </div>
          </div>

          <div class="detail-panel">
            <h3>Espacios sugeridos</h3>
            <div class="chips">${artwork.suggestedRooms.map((room) => `<span class="chip">${room}</span>`).join("")}</div>
          </div>

          <div class="detail-panel">
            <h3>Mas obras de ${artist.name}</h3>
            <div class="related">
              ${related.map((item) => `
                <button type="button" data-related-id="${item.id}">
                  <img src="${imageOf(item)}" alt="${item.title}">
                  <span>${item.title}</span>
                </button>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    </section>
    ${quoteSection(artwork.id)}
    ${footer()}
  `;

  window.scrollTo({ top: 0, behavior: "smooth" });
  setupQuoteSelects(artwork.id);
  setupVisualizerSelects(artwork.id);
  bindDetailEvents();
}

function spec(label, value) {
  return `<div class="spec"><span>${label}</span>${value}</div>`;
}

function bindHomeEvents() {
  document.querySelectorAll("[data-filter]").forEach((select) => {
    select.addEventListener("change", () => {
      state.filters[select.dataset.filter] = select.value;
      document.querySelector("[data-gallery]").innerHTML = getFilteredArtworks().map(artworkCard).join("");
      bindArtworkCards();
    });
  });

  bindArtworkCards();
  bindForms();
  bindVisualizerButtons();
}

function bindArtworkCards() {
  document.querySelectorAll("[data-artwork-id]").forEach((card) => {
    card.addEventListener("click", () => renderDetail(card.dataset.artworkId));
  });
}

function bindDetailEvents() {
  document.querySelector("[data-back-gallery]").addEventListener("click", () => {
    renderHome();
    location.hash = "#gallery";
  });

  document.querySelectorAll("[data-related-id]").forEach((button) => {
    button.addEventListener("click", () => renderDetail(button.dataset.relatedId));
  });

  document.querySelector("[data-detail-quote]").addEventListener("click", () => {
    setTimeout(() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }), 0);
  });

  bindForms();
  bindVisualizerButtons();
}

function setupQuoteSelects(selectedId = state.selectedArtworkId) {
  const artworkSelect = document.querySelector("[data-quote-artwork]");
  const sizeSelect = document.querySelector("[data-quote-size]");
  if (!artworkSelect || !sizeSelect) return;

  artworkSelect.innerHTML = artworks
    .map((artwork) => `<option value="${artwork.id}" ${artwork.id === selectedId ? "selected" : ""}>${artwork.title}</option>`)
    .join("");

  const fillSizes = () => {
    const artwork = artworks.find((item) => item.id === artworkSelect.value) || artworks[0];
    sizeSelect.innerHTML = artwork.sizes.map((size) => `<option>${size}</option>`).join("");
    document.querySelector("[data-form-note]").textContent = `Seleccion actual: ${artwork.title}`;
  };

  artworkSelect.addEventListener("change", fillSizes);
  fillSizes();
}

function setupVisualizerSelects(selectedId = state.selectedArtworkId) {
  const artworkSelect = document.querySelector("[data-visualizer-artwork]");
  const sizeSelect = document.querySelector("[data-visualizer-size]");
  if (!artworkSelect || !sizeSelect) return;

  artworkSelect.innerHTML = artworks
    .map((artwork) => `<option value="${artwork.id}" ${artwork.id === selectedId ? "selected" : ""}>${artwork.title}</option>`)
    .join("");

  const fillSizes = () => {
    const artwork = artworks.find((item) => item.id === artworkSelect.value) || artworks[0];
    sizeSelect.innerHTML = artwork.sizes.map((size) => `<option>${size}</option>`).join("");
  };

  artworkSelect.addEventListener("change", fillSizes);
  fillSizes();
}

function bindForms() {
  document.querySelector("[data-quote-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    toast("Solicitud preparada. En una integracion real se enviaria al equipo comercial.");
  });
}

function bindVisualizerButtons() {
  document.querySelectorAll("[data-open-visualizer]").forEach((button) => {
    button.addEventListener("click", openModal);
  });
}

function openModal() {
  setupVisualizerSelects(state.selectedArtworkId);
  modal.classList.add("is-active");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal() {
  modal.classList.remove("is-active");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", closeModal);
});

document.querySelector("[data-visualizer-form]").addEventListener("submit", (event) => {
  event.preventDefault();
  const artworkId = document.querySelector("[data-visualizer-artwork]").value;
  const position = document.querySelector("[data-visualizer-position]").value;
  const artwork = artworks.find((item) => item.id === artworkId) || artworks[0];
  const preview = document.querySelector("[data-visualizer-preview]");
  const previewArt = document.querySelector("[data-preview-art]");
  previewArt.style.setProperty("--artwork-url", `url('${imageOf(artwork)}')`);
  previewArt.dataset.position = position;
  preview.classList.add("is-ready");
});

document.querySelector("[data-room-upload]").addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  event.target.closest(".upload-zone").querySelector("span").textContent = file.name;
});

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 40);
});

function toast(message) {
  document.querySelector(".toast")?.remove();
  const element = document.createElement("div");
  element.className = "toast";
  element.textContent = message;
  document.body.append(element);
  setTimeout(() => element.remove(), 3600);
}

renderHome();
