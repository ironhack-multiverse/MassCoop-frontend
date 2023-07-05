import axios from "axios";

class ReviewsService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  createReview = (id, requestBody) => {
    return this.api.post(`/api/reviews/${id}`, requestBody);
  };

  getReview = (id) => {
    return this.api.get(`/api/reviews/${id}`);
  };

  updateReview = (id, requestBody) => {
    return this.api.put(`/api/reviews/${id}`, requestBody);
  };

  deleteReview = (id) => {
    return this.api.delete(`/api/reviews/${id}`);
  };
}

const reviewsService = new ReviewsService();

export default reviewsService;
