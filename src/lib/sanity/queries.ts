import { defineQuery } from "next-sanity";

export const ARTWORKS_QUERY = defineQuery(`*[_type == "artwork" && published == true] | order(featured desc, title asc) {
  "id": _id,
  title,
  "slug": slug.current,
  "artistId": artist->_id,
  "artistName": artist->name,
  "artistBio": artist->bio,
  "mainSize": mainSize,
  "price": priceLabel,
  orientation,
  style,
  colors,
  roomType,
  sizes,
  materials,
  description,
  suggestedRooms,
  finish,
  printing,
  installation,
  palette,
  featured,
  "imageUrl": mainImage.asset->url
}`);

export const ARTWORK_QUERY = defineQuery(`*[_type == "artwork" && slug.current == $slug][0] {
  "id": _id,
  title,
  "slug": slug.current,
  "artistId": artist->_id,
  "artistName": artist->name,
  "artistBio": artist->bio,
  "mainSize": mainSize,
  "price": priceLabel,
  orientation,
  style,
  colors,
  roomType,
  sizes,
  materials,
  description,
  suggestedRooms,
  finish,
  printing,
  installation,
  palette,
  featured,
  "imageUrl": mainImage.asset->url
}`);

export const ARTISTS_QUERY = defineQuery(`*[_type == "artist"] | order(name asc) {
  "id": _id,
  name,
  "slug": slug.current,
  specialty,
  bio
}`);
