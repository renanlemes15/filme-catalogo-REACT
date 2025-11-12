// src/components/SecaoFilmes.tsx
import FilmeCard from "./FilmeCard";
import type { Filme } from "../types/filme";

interface SecaoFilmesProps {
  titulo: string;
  filmes: Filme[];
}

function SecaoFilmes({ titulo, filmes }: SecaoFilmesProps) {
  if (filmes.length === 0) {
    return null;
  }

  return (
    <>
      <hr className="my-5 border-3 border-secondary opacity-75" />
      <h2 className="mb-4 display-5 fw-bold">{titulo}</h2>

      <div className="d-flex flex-nowrap overflow-x-auto gap-3 pb-3">
        {filmes.map((filme) => (
          <FilmeCard key={filme.id} filme={filme} />
        ))}
      </div>
    </>
  );
}

export default SecaoFilmes;
