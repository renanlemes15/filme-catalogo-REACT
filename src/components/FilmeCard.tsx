// src/components/FilmeCard.tsx

import type { Filme } from "../types/filme";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";

interface FilmeCardProps {
  filme: Filme;
}

function FilmeCard({ filme }: FilmeCardProps) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${filme.poster_path}`;

  const formatarData = (dataString: string) => {
    if (!dataString) return "";
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Link to={`/filme/${filme.id}`} className="text-decoration-none">
      <Card
        style={{ width: "180px", flex: "0 0 180px" }}
        className="h-100"
        bg="dark"
        text="white"
      >
        <Card.Img variant="top" src={imageUrl} alt={filme.title} />

        <Badge
          bg="warning"
          text="dark"
          className="position-absolute top-0 end-0 m-2"
        >
          {filme.vote_average.toFixed(1)}
        </Badge>

        <div className="p-2">
          <strong className="d-block text-white">{filme.title}</strong>
          <small className="text=muted">
            {formatarData(filme.release_date)}
          </small>
        </div>
      </Card>
    </Link>
  );
}

export default FilmeCard;
