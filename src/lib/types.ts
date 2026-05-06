export type Artist = {
  id: string;
  name: string;
  slug: string;
  specialty: string;
  bio: string;
};

export type Artwork = {
  id: string;
  title: string;
  slug: string;
  artistId: string;
  artistName: string;
  artistBio: string;
  mainSize: string;
  price: string;
  orientation: string;
  style: string;
  colors: string;
  roomType: string;
  sizes: string[];
  materials: string[];
  description: string;
  suggestedRooms: string[];
  finish: string;
  printing: string;
  installation: string;
  palette: string[];
  imageUrl?: string;
  featured?: boolean;
};
