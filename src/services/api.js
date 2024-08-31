import axios from 'axios';  

//Base da URL:https://api.themoviedb.org/3/
//URL da API: movie/now_playing?api_key=d47dcf6ddb90e7d03cd1a6dd8239d966&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;