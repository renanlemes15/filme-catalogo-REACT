// src/pages/Favoritos.tsx
import { useFavorites } from "../contexts/FavoritesContext";
import FilmeCard from "../components/FilmeCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import type { Filme } from "../types/filme";
import type { FilmeFavorito } from "../types/favorito";

function Favoritos() {
  const { favorites } = useFavorites();

  const filmesFormatados: Filme[] = favorites.map((fav: FilmeFavorito) => ({
    id: fav.tmdbId,
    title: fav.title,
    poster_path: fav.poster_path,
    overview: fav.overview,
    vote_average: fav.vote_average,
    release_date: fav.release_date,
  }));

  if (favorites.length === 0) {
    return (
      <>
        <h2 className="mb-4 text-light">Meus Favoritos</h2>
        <p className="text-light">
          Você ainda não adicionou nenhum filme aos favoritos
        </p>
      </>
    );
  }

  return (
    <>
      <h2 className="mb-4 text-light">Meus Favoritos</h2>
      <Row xs={2} sm={2} md={3} lg={6} xl={6} className="g-4">
        {filmesFormatados.map((filme) => (
          <Col key={filme.id}>
            <FilmeCard filme={filme} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Favoritos;
