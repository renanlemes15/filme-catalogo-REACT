// src/pages/ListaFilmes.tsx

import type { Filme } from "../types/filme";
import { useState, useEffect } from "react";
import axios from "axios";
import SecaoFilmes from "../components/SecaoFilmes";
import Spinner from "react-bootstrap/Spinner";

const formatarFilmes = (filmesApi: any[]): Filme[] => {
  return filmesApi.map((filme: any) => ({
    id: filme.id,
    title: filme.title,
    poster_path: filme.poster_path,
    overview: filme.overview,
    vote_average: filme.vote_average,
    release_date: filme.release_date,
  }));
};

function Home() {
  const [populares, setPopulares] = useState<Filme[]>([]);
  const [lancamentos, setLancamentos] = useState<Filme[]>([]);
  const [emBreve, setEmBreve] = useState<Filme[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    const urlPopulares = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`;
    const urlLancamentos = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=pt-BR&page=1`;
    const urlEmBreve = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=pt-BR&page=1`;

    const buscarTodasSecoes = async () => {
      try {
        const [respPopulares, respLancamentos, respEmBreve] = await Promise.all(
          [
            axios.get(urlPopulares),
            axios.get(urlLancamentos),
            axios.get(urlEmBreve),
          ]
        );

        setPopulares(formatarFilmes(respPopulares.data.results));
        setLancamentos(formatarFilmes(respLancamentos.data.results));
        setEmBreve(formatarFilmes(respEmBreve.data.results));
      } catch (error) {
        console.error("Erro ao buscar seções de filmes:", error);
      } finally {
        setCarregando(false);
      }
    };

    buscarTodasSecoes();
  }, []);

  if (carregando) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <SecaoFilmes titulo="Populares" filmes={populares} />
      <SecaoFilmes titulo="Últimos lançamentos" filmes={lancamentos} />
      <SecaoFilmes titulo="Em Breve" filmes={emBreve} />
    </>
  );
}

export default Home;
