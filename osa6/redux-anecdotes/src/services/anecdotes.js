import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVotes = async (anecdoteObject) => {
  const updatedObject = {...anecdoteObject, votes: + 1 }
  const url = `${baseUrl}/${anecdoteObject.id}`
  const response = await axios.put(url, updatedObject)
  return response.data
}

export default {
  getAll,
  createNew,
  updateVotes
}