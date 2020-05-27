import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Display from './components/Display'
import AddNewPerson from './components/AddNewPerson'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response.data)
        setPersons(response.data)
        //setPersons(persons.concat(response.data))
      })
  }, [])
console.log(persons);
console.log(newSearch);


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
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
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
      <Display persons={persons} newSearch={newSearch}/>
    </div>
  )

}

export default App