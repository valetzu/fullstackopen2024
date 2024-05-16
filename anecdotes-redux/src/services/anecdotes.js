import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const createNew = async (content) => {
  const object = { content, votes: 0}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const voteAnecdote = async (id) => {
  const objects = await axios.get(baseUrl)
  const objectToChange = objects.data.find(obj => obj.id === id)
  const modifiedObject = {...objectToChange, votes: objectToChange.votes + 1 }
  const response = await axios.put(`${baseUrl}/${id}`, modifiedObject)
  
  return response.data
}
export default { getAll, getById, createNew, voteAnecdote }