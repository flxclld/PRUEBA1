import type { Artwork } from "./types";

export function artworkImage(artwork: Artwork) {
  if (artwork.imageUrl) return artwork.imageUrl;

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
