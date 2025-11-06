// src/contesxts/FavoriteContext.tsx

import {
  createContext,
  useState,
  useContext,
  useEffect,
  Children,
} from "react";
import type { ReactNode } from "react";
import axios from "axios";
import type { Filme } from "../types/filme";

interface IFavoritesContext {
  favorites: Filme[];
  addFavorite: (filme: Filme) => void;
  removeFavorite: (filmeId: number) => void;
}

const FavoritesContext = createContext<IFavoritesContext>(null!);

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

interface ProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: ProviderProps) => {
  const [favorites, setFavorites] = useState<Filme[]>(() => {
    const localData = localStorage.getItem("filmesFavoritos");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("filmesFavoritos", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = async (filme: Filme) => {
    setFavorites((prevFavorites) => [...prevFavorites, filme]);

    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title: filme.title,
          userId: 1,
        }
      );
      console.log("Simulacao de cadastro (POST) bem-sucedida: ", response.data);
    } catch (error) {
      console.error("Erro ao simular cadastro (POST): ", error);
    }
  };

  const removeFavorite = (filmeId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((filme) => filme.id !== filmeId)
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
