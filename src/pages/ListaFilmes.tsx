// src/pages/ListaFilmes.tsx

import FilmeCard from "../components/FilmeCard";
import type { Filme } from "../types/filme";
import { useState, useEffect } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function ListaFilmes() {
  const [filmes, setFilmes] = useState<Filme[]>([]);

  useEffect(() => {
    buscarFilmes();
  }, []);

  const buscarFilmes = async () => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`;

    try {
      const response = await axios.get(url);

      const apiFilmes = response.data.results;

      const filmesFormatados: Filme[] = apiFilmes.map((filme: any) => ({
        id: filme.id,
        title: filme.title,
        poster_path: filme.poster_path,
        overview: filme.overview,
        vote_average: filme.vote_average,
      }));

      setFilmes(filmesFormatados);
    } catch (error) {
      console.error("Erro ao buscar filmes do TMDb", error);
    }
  };

  if (filmes.length === 0) {
    return <div>Carregando filmes...</div>;
  }

  return (
    <>
      <h2 className="mb-4"></h2>
      <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
        {filmes.map((filme) => (
          <Col key={filme.id}>
            <FilmeCard filme={filme} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default ListaFilmes;
