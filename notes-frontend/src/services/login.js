import axios from 'axios'
const baseUrl = '/api/login'

/* const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
} */

const logIn = credentialsJson => {
  const request = axios.post(baseUrl, credentialsJson)
  return request.then(response => response.data)
}

/* const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
} */

export default { 
  logIn
}