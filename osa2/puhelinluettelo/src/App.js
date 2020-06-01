import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Display from './components/Display'
import AddNewPerson from './components/AddNewPerson'
import ReactDOM from 'react-dom';
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [addedNotification, setAddedNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState (null)

  const refresh = () => {
    ReactDOM.render(<App/>,
    document.getElementById('root'))
  }

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

    let confirm = false
    let id
    let returnPerson

    if (persons.some(e => e.name === person.name)) {
      id = persons.find(e => e.name === person.name)
      id = id.id
      confirm = window.confirm(`${person.name} is already added to phone book, replace old number with a new one?`)
    }
    
    if (!confirm && !persons.some(e => e.name === person.name)) {
      
      personService
        .create(person) 
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setAddedNotification(`Added ${returnedPerson.name} to the phone book`)
          setTimeout(() => {
            setAddedNotification(null)
          }, 3000)
        })

    } else if (confirm) {
      const url = `http://localhost:3001/persons/${id}`
      returnPerson = persons.find(e => e.id === id)
      personService
        .put(url, person)
        .then(
        personService
          .getAll()
          .then(persons => {
            setPersons(persons)
            setAddedNotification(`Changed ${returnPerson.name}'s number`)
          }
          )
        )
        .catch(error => {
          setErrorMessage(`Information of ${returnPerson.name} has already been removed from the server`)
        })
      
      setTimeout(() => {
        setAddedNotification(null)
        setErrorMessage(null)
        refresh()
      }, 3000)
    }
  }

  const deletePerson = (id) => {
    const url = `http://localhost:3001/persons/${id}`
    const person = persons.find(p => p.id === id)
    const returnPerson = person
    const proceed = window.confirm(`Delete ${person.name} ?`)
    if (proceed) {
      personService
        .remove(url, person)
        .then(
          personService
            .getAll()
            .then(persons => {
              setPersons(persons)
            })
        )
    }

    setAddedNotification(`Removed ${returnPerson.name} from the phone book`)
    setTimeout(() => {
      setAddedNotification(null)
      refresh()
    }, 3000)
  }

  return (
    <div>
      <h2>Phone Book</h2>
      <Notification message={addedNotification} error={errorMessage}/>
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

/*
      setAddedNotification(`Changed ${returnPerson.name}'s number`)
*/