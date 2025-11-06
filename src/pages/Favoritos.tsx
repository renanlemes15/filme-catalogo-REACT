// src/pages/Favoritos.tsx
import { useFavorites } from "../contexts/FavoritesContext";
import FilmeCard from "../components/FilmeCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Favoritos() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <Container>
        <h2>Meus Favoritos</h2>
        <p>Você ainda não adicionou nenhum filme aos favoritos</p>
      </Container>
    );
  }

  return (
    <Container>
      <h2>Meus Favoritos</h2>
      <Row>
        {favorites.map((filme) => (
          <Col md={3} className="mb-4" key={filme.id}>
            <FilmeCard filme={filme} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Favoritos;
