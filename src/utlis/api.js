import axios from "axios";

const api = axios.create({
  baseURL: "https://employee-api-eight-lemon.vercel.app/api",
});

export default api;
