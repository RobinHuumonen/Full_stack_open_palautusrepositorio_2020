import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const remove = (url ,person) => {
  const request = axios.delete(url, person)
  return request.then(response => response.data)
}

const put = (url, person) => {
  const request = axios.put(url, person)
  return request.then(response => response.data)
}

export default {getAll, create, remove, put}