// src/components/FilmeCard.tsx

import type { Filme } from "../types/filme";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useFavorites } from "../contexts/FavoritesContext";

interface FilmeCardProps {
  filme: Filme;
}

function FilmeCard({ filme }: FilmeCardProps) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = favorites.some((favFilme) => favFilme.id === filme.id);

  const handleToggleFavrite = () => {
    if (isFavorite) {
      removeFavorite(filme.id);
    } else {
      addFavorite(filme);
    }
  };

  return (
    <Card style={{ width: "18rem", height: "100%" }}>
      <Card.Img variant="top" src={filme.thumbnailUrl} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{filme.title}</Card.Title>
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
