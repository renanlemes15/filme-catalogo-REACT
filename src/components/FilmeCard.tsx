// src/components/FilmeCard.tsx

import type { Filme } from "../types/filme";
import Card from "react-bootstrap/Card";

interface FilmeCardProps {
  filme: Filme;
}

function FilmeCard({ filme }: FilmeCardProps) {
  return (
    <Card style={{ width: "18rem", height: "100%" }}>
      <Card.Img variant="top" src={filme.thumbnailUrl} />
      <Card.Body>
        <Card.Title>{filme.title}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default FilmeCard;
