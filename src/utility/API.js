// a utility for API requests

import axios from "axios";

const API_BASE_URL = "http://localhost:8080"; // Spring Boot backend URL

const api = axios.create({
    baseURL: API_BASE_URL,
});

export default api;
