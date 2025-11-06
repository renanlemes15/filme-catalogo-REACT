// src/components/FilmeCard.tsx

import type { Filme } from "../types/filme";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useFavorites } from "../contexts/FavoritesContext";
import Badge from "react-bootstrap/Badge";

interface FilmeCardProps {
  filme: Filme;
}

function FilmeCard({ filme }: FilmeCardProps) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some((favFilme) => favFilme.id === filme.id);

  const imgUrl = `https://image.tmdb.org/t/p/w500${filme.poster_path}`;

  const handleToggleFavrite = () => {
    if (isFavorite) {
      removeFavorite(filme.id);
    } else {
      addFavorite(filme);
    }
  };

  return (
    <Card style={{ width: "18rem", height: "100%" }}>
      <Card.Img variant="top" src={imgUrl} alt={filme.title} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{filme.title}</Card.Title>
        <h5 className="mb-2">
          <Badge bg="warning" text="dark">
            Nota: {filme.vote_average.toFixed(1)}
          </Badge>
        </h5>
        <Card.Text style={{ fontSize: "0.85rem" }}>
          {filme.overview.substring(0, 100)}...
        </Card.Text>
        <Button
          variant={isFavorite ? "danger" : "primary"}
          onClick={handleToggleFavrite}
          className="mt-auto"
        >
          {isFavorite ? "Remover dos Favoritos" : "Adicionar aos favoritos"}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default FilmeCard;
