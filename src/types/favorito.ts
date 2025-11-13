// src/types/favorito.ts
import type { Filme } from "./filme";

export interface FilmeFavorito extends Omit<Filme, "id"> {
  id: number;
  tmdbId: number;
}
