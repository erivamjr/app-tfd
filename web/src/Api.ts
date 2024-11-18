import axios from 'axios'
const prod = 'https://app-tfd.onrender.com/'
const dev = 'http://localhost:3000'
const api = axios.create({
  baseURL: dev,
})

// 'http://localhost:3000'
// 'https://app-tfd.onrender.com/'

export default api
