//src/App.tsx
import "./App.css";
import Home from "./pages/Home";
import { Link, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Favoritos from "./pages/Favoritos";
import DetalhesFilme from "./pages/DetalhesFilme";

function App() {
  return (
    <div className="app">
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container fluid px-4>
          <Navbar.Brand as={Link} to="/">
            Catálogo de Filmes
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic=navbar=nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">
                Listagem
              </Nav.Link>
              <Nav.Link as={Link} to="/favoritos">
                Meus Favoritos
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main>
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/filme/:id" element={<DetalhesFilme />} />
          </Routes>
        </Container>
      </main>
    </div>
  );
}

export default App;
