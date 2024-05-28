export interface Comic {
  id: number;
  title: string;
  text: string;
  thumbnail: Thumbnail;
  creators: string[];
  characters: Character[];
  favorito: boolean;
}

export interface Thumbnail {
  path: string;
  extension: string;
  fullurl?: string;
}

export interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: Thumbnail;
  comics: Comic[];
}

export interface Lista {
  id: number;
  nombre: string;
  personajes: Character[];
  comics: Comic[];
}