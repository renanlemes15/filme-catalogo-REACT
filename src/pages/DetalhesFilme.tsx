// src/pages/DetalhesFilme.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { useFavorites } from "../contexts/FavoritesContext";

interface FilmeDetalhado {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  runtime: number;
  release_date: string;
}

function DetalhesFilme() {
  const { id } = useParams();

  const [filme, setFilme] = useState<FilmeDetalhado | null>(null);

  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`;

    const buscarDetalhes = async () => {
      try {
        const response = await axios.get(url);
        setFilme(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
      }
    };

    buscarDetalhes();
  }, [id]);

  if (!filme) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </div>
    );
  }

  const favoritoEncontrado = favorites.find((fav) => fav.tmdbId === filme.id);

  const handleToggleFavorite = () => {
    if (favoritoEncontrado) {
      removeFavorite(favoritoEncontrado.id);
    } else {
      addFavorite(filme);
    }
  };

  const imageUrl = `https://image.tmdb.org/t/p/w500${filme.poster_path}`;
  const anoLancamento = new Date(filme.release_date).getFullYear();
  const generos = filme.genres.map((genre) => genre.name).join(", ");

  return (
    <Row>
      <Col md={4}>
        <Image src={imageUrl} alt={filme.title} fluid rounded />
      </Col>

      <Col md={8}>
        <h2 className="text-light">
          {filme.title} ({anoLancamento})
        </h2>
        <p className="lead text-light">{filme.overview}</p>
        <hr className="border-light opacity-25" />

        <h5>
          <Badge bg="warning" text="dark" className="me-2">
            Nota: {filme.vote_average.toFixed(1)}
          </Badge>
        </h5>

        <p className="text-light">
          <strong>Gêneros:</strong> {generos}
        </p>
        <p className="text-light">
          <strong>Duração:</strong> {filme.runtime} minutos
        </p>

        <Button
          variant={favoritoEncontrado ? "danger" : "primary"}
          onClick={handleToggleFavorite}
          className="mt-3"
        >
          {favoritoEncontrado
            ? "Remover dos favoritos"
            : "Adicionar aos favoritos"}
        </Button>
      </Col>
    </Row>
  );
}

export default DetalhesFilme;
