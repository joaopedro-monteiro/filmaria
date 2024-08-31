import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css";

//URL da API: movie/now_playing?api_key=d47dcf6ddb90e7d03cd1a6dd8239d966&language=pt-BR

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "d47dcf6ddb90e7d03cd1a6dd8239d966",
          language: "pt-BR",
          page: 1,
        },
      });
      //console.log(response.data.results.slice(0,10));
      setFilmes(response.data.results.slice(0, 10));
    }

    loadFilmes();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h1>Carregando filmes...</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="titulo-principal">Filmes mais assistidos em cartaz no cinema</h1>
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img
                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                alt="Imagem dos filmes"
              />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
