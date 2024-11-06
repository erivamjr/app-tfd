import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000",
});

// 'https://app-tfd.onrender.com/'

export default api;
