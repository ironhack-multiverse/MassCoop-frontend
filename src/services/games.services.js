import axios from 'axios';

class GamesService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005"
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  creategame = (requestBody) => {
    return this.api.post('/api/games', requestBody);
  }


 getAllGames = () => {
  return this.api.get('/api/games');
}

  updateGame = (id, requestBody) => {
    return this.api.put(`/api/games/${id}`, requestBody);
  }

  deleteGame = (id) => {
    return this.api.delete(`/api/games/${id}`);
  } 

}

const gamesService = new gamesService();

export default gamesService;