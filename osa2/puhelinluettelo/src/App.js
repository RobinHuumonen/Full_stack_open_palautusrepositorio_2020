import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Display from './components/Display'
import AddNewPerson from './components/AddNewPerson'
import ReactDOM from 'react-dom';

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const refresh = () => {
    ReactDOM.render(<App/>,
    document.getElementById('root'))
  }

  console.log(persons);


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
     setNewNumber(event.target.value)
   }

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }

    if ((persons.some(e => e.name === person.name)))
      window.alert(`${person.name} is already added to phone book`)
    else if ((persons.some(e => e.number === person.number)))
      window.alert(`${person.number} is already added to phone book`)
    else {
      personService
        .create(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (id) => {
    const url = `http://localhost:3001/persons/${id}`
    const person = persons.find(p => p.id === id)
    const proceed = window.confirm(`Delete ${person.name} ?`)
    if (proceed) {
      personService
        .remove(url, person)
        .then(
          personService
            .getAll()
            .then(initialPersons => {
              setPersons(initialPersons)
              setTimeout(refresh(), 0)
            })
        )
    }
  }

  return (
    <div>
      <h2>Phone Book</h2>
      filter shown with
      <input
        value={newSearch}
        onChange={handleSearch}
      />
      <h2>add a new</h2>
      <AddNewPerson
      addPerson={addPerson}
      newName={newName}
      handleNewName={handleNewName}
      newNumber={newNumber}
      handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Display persons={persons} newSearch={newSearch} deletePerson={deletePerson}/>
    </div>
  )

}

export default App
