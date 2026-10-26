import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  timeout: 12000,
});

export default api;
