import axios from 'axios'
import router from '@/router'

const baseURL = process.env.NODE_ENV === 'development' ? 'http://app.local:8000' : 'https://obscure-plateau-79291.herokuapp.com'

const instance = axios.create({
	baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(
  request => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) request.headers['Authorization'] = `Bearer ${jwt}`
    return request
  }
)

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem('jwt')
      router.push({ name: 'login' })
    }
    return Promise.reject(error)
  }
)

export default instance