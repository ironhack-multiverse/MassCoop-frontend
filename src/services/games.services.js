import axios from 'axios';

class GamesService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005"
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/games
  creategame = (requestBody) => {
    return this.api.post('/api/games', requestBody);
  }


  // PUT /api/games/:id
  updateGame = (id, requestBody) => {
    return this.api.put(`/api/games/${id}`, requestBody);
  }

  // DELETE /api/games/:id
  deleteGame = (id) => {
    return this.api.delete(`/api/games/${id}`);
  } 

}

// Create one instance (object) of the service
const gamesService = new gamesService();

export default gamesService;