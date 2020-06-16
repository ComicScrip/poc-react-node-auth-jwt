import axios from 'axios'

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
})

const placeTokenInRequestHeaders = req => {
  /* 
  const token = localStorage.getItem('authToken')
  if (token) {
    req.headers['Authorization'] = `Bearer ${token}`
  }
  return req
  */
}

API.interceptors.request.use(placeTokenInRequestHeaders);

export default API