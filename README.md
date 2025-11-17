# Catálogo de Filmes

## Autor

* **Renan Manoel Lemes**

Projeto final da disciplina de Desenvolvimento Web da UEPG.

Esta é uma aplicação web interativa, construída com React e TypeScript, que permite aos usuários navegar por seções de filmes populares, lançamentos e futuros lançamentos. Os usuários podem clicar em um filme para ver detalhes e adicioná-los a uma lista de favoritos persistente.

---

## Tecnologias Utilizadas

* **React:** Biblioteca principal para a construção da interface de usuário.
* **TypeScript:** Para garantir a segurança de tipos (type-safety) e robustez do código.
* **Vite:** Ambiente de desenvolvimento rápido e otimizado.
* **React Router (`react-router-dom`):** Para o gerenciamento de rotas e navegação entre páginas (Home, Detalhes, Favoritos).
* **React-Bootstrap:** Biblioteca de componentes de UI para um design responsivo e moderno.
* **Axios:** Para realizar as requisições HTTP (chamadas de API).
* **`json-server`:** Utilizado para simular um backend de persistência para os favoritos.

---

## Descrição das APIs

Este projeto utiliza duas fontes de API distintas:

### 1. TMDb (The Movie Database)

API externa principal, consumida para buscar todos os dados e imagens dos filmes.

* **Endpoint Principal:** `https://api.themoviedb.org/3`
* **Autenticação:** Requer uma API Key (v3 auth) enviada como parâmetro de query (`?api_key=...`).
* **Endpoints Utilizados:**
    * `GET /movie/popular`: Retorna a lista de filmes populares (usado na Home).
    * `GET /movie/now_playing`: Retorna a lista de filmes em cartaz (usado na Home).
    * `GET /movie/upcoming`: Retorna a lista de filmes que serão lançados (usado na Home).
    * `GET /movie/{id}`: Retorna os detalhes completos de um filme específico (usado na página de Detalhes).

### 2. `json-server` (Backend Simulado)

Utilizado para simular um backend de persistência, cumprindo o requisito de "cadastro" da atividade através da funcionalidade de "Favoritos".

* **Endpoint Principal:** `http://localhost:3001`
* **Recurso:** `/favoritos`
* **Endpoints Utilizados:**
    * `GET /favoritos`: Retorna a lista de todos os filmes salvos como favoritos.
    * `POST /favoritos`: "Cadastra" (adiciona) um novo filme à lista de favoritos.
    * `DELETE /favoritos/:id`: Remove um filme específico da lista de favoritos, usando o ID do `json-server`.
