import axios from 'axios'


const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
})

const placeTokenInRequestHeaders = req => {
  const token = localStorage.getItem('authToken')
  if (token) {
    req.headers['Authorization'] = `Bearer ${token}`
  }
  return req
}

API.interceptors.request.use(placeTokenInRequestHeaders);

const logoutIfUnauthorizedOrForbidden = error => {
  if (error.response.status === 401 || error.response.status === 403) {
    console.log('redirecting to /login', error.response)
    localStorage.setItem('authToken', '')
    window.location.replace('/login')
  } else {
    return Promise.reject(error);
  }
}

API.interceptors.response.use(res => res, logoutIfUnauthorizedOrForbidden);

export default API