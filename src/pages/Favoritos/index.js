import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function Favoritos() {
  const [filmeFavoritado, setFilmesFavoritados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const minhaLista = localStorage.getItem("@primeFlix");
    let filmesSalvos = JSON.parse(minhaLista) || [];
    setFilmesFavoritados(filmesSalvos); 
    setLoading(false);       
  }, []);

  function removerDosFavoritos(id) {
    console.log(id);
    const filmeRemovido = filmeFavoritado.filter(item => item.id !== id);

    setFilmesFavoritados(filmeRemovido);
    localStorage.setItem("@primeFlix", JSON.stringify(filmeRemovido));    
    toast.success("Filme removido dos favoritos com sucesso!");
  }

  if(loading) {
    return (
      <div>
        <h1>Carregando filmes...</h1>
      </div>
    );
  }

  return ( 
      <div>
        <h1 className="tituloFavoritos">Meus Filmes Favoritos</h1>

        {filmeFavoritado.length === 0 && <h1 className="tituloFavoritos">Você não possui filmes favoritados!</h1>}

        {
            filmeFavoritado.map((filme) => {
                return (
                    <div className="filme-info">
                        <h1>{filme.title}</h1>
                        <img
                            src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
                            alt={filme.title}
                        />

                        <h3>Sinopse</h3>
                        <span>{filme.overview}</span>
                        <strong>Avaliação: {filme.vote_average.toFixed(1)} / 10</strong>

                        <div className="area-buttons">
                            <button onClick={() => removerDosFavoritos(filme.id)}>Remover dos Favoritos</button>
                            <button><a href={`https://www.youtube.com/results?search_query=${filme.title}+Trailer`} target="blank" rel="noreferrer">Trailer</a></button>
                        </div>
                    </div>
                );
            })
        }                      
      </div>    
  );
}

export default Favoritos;
