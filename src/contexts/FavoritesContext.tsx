// src/contexts/FavoritesContext.tsx
import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import type { Filme } from "../types/filme";
import type { FilmeFavorito } from "../types/favorito";

type ApiFilme = Filme | { [key: string]: any; id: number };

const API_URL = "http://localhost:3001/favoritos";

interface IFavoritesContext {
  favorites: FilmeFavorito[];
  addFavorite: (filme: ApiFilme) => void;
  removeFavorite: (jsonServerId: number) => void;
}

const FavoritesContext = createContext<IFavoritesContext>(null!);

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

interface ProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: ProviderProps) => {
  const [favorites, setFavorites] = useState<FilmeFavorito[]>([]);

  useEffect(() => {
    axios
      .get<FilmeFavorito[]>(API_URL)
      .then((response) => {
        setFavorites(response.data);
      })
      .catch((error) => console.error("Erro ao carregar favoritos:", error));
  }, []);

  const addFavorite = async (filme: ApiFilme) => {
    try {
      const novoFavorito = {
        tmdbId: filme.id,
        title: filme.title,
        poster_path: filme.poster_path,
        overview: filme.overview,
        vote_average: filme.vote_average,
        release_date: filme.release_date,
      };

      const response = await axios.post<FilmeFavorito>(API_URL, novoFavorito);

      setFavorites((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Erro ao adicionar favorito:", error);
    }
  };

  const removeFavorite = async (jsonServerId: number) => {
    try {
      await axios.delete(`${API_URL}/${jsonServerId}`);

      setFavorites((prev) => prev.filter((filme) => filme.id !== jsonServerId));
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
