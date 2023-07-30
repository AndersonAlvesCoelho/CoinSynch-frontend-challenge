import axios from 'axios'

const api = axios.create({
  baseURL: 'https://rest.coinapi.io/v1/',
})

export default api
