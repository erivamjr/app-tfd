import axios from 'axios'
const api = axios.create({
  baseURL: 'https://app-tfd.onrender.com/',
})

export default api
