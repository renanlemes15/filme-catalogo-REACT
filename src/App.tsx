//src/App.tsx
import "./App.css";
import ListaFilmes from "./pages/ListaFilmes";
import CadastroFilme from "./pages/CadastroFilme";
import { Link, Route, Routes } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function App() {
  return (
    <div className="app">
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Catálogo de Filmes
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic=navbar=nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Listagem
              </Nav.Link>
              <Nav.Link as={Link} to="/cadastro">
                Cadastrar
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main>
        <Container>
          <Routes>
            <Route path="/" element={<ListaFilmes />} />
            <Route path="/cadastro" element={<CadastroFilme />} />
          </Routes>
        </Container>
      </main>
    </div>
  );
}

export default App;
