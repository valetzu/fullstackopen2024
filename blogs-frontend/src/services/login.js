import axios from 'axios'
const baseUrl = '/api/login'

const logIn = credentialsJson => {
  const request = axios.post(baseUrl, credentialsJson)
  return request.then(response => response.data)
}

export default { 
  logIn
}