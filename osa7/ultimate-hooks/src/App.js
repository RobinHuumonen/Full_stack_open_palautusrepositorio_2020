  
import React, { useState, useEffect } from 'react'
import axios from 'axios'

// TEST
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    async function fetch() {
      await getAll(baseUrl)
    }
    fetch()

  }, [baseUrl])

  const getAll = async (baseUrl) => {
    const req = await axios.get(baseUrl)
    setResources(req.data)
  }

  const create = async (resource) => {
    const res = await axios.post(baseUrl, resource)
    resources.concat(res.data)
    console.log(resources);
    return res.data
  }

  const service = {
    create,
    getAll
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const notesUrl = 'http://localhost:3005/notes'
  const personsUrl = 'http://localhost:3005/persons'

  const [notes, noteService] = useResource(notesUrl)
  const [persons, personService] = useResource(personsUrl)

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    console.log(noteService.getAll);
    noteService.getAll(notesUrl)
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    personService.getAll(personsUrl)
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App