// src/pages/ListaFilmes.tsx

import FilmeCard from "../components/FilmeCard";
import type { Filme } from "../types/filme";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ListaFilmes() {
  const [filmes, setFilmes] = useState<Filme[]>([]);

  useEffect(() => {
    buscarFilmes();
  }, []);

  const buscarFilmes = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/photos?_limit=12"
      );

      setFilmes(response.data);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };

  if (filmes.length === 0) {
    return <div>Carregando filmes...</div>;
  }

  return (
    <Container>
      <Row>
        {filmes.map((filme) => (
          <Col md={3} className="mb-a" key={filme.id}>
            <FilmeCard filme={filme} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ListaFilmes;
