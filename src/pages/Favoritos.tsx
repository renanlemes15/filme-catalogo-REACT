// src/pages/Favoritos.tsx
import { useFavorites } from "../contexts/FavoritesContext";
import FilmeCard from "../components/FilmeCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Favoritos() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <>
        <h2 className="mb-4">Meus Favoritos</h2>
        <p>Você ainda não adicionou nenhum filme aos favoritos</p>
      </>
    );
  }

  return (
    <>
      <h2 className="mb-4">Meus Favoritos</h2>
      <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
        {favorites.map((filme) => (
          <Col key={filme.id}>
            <FilmeCard filme={filme} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Favoritos;
