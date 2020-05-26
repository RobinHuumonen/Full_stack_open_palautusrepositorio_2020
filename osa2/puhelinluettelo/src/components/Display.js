
import React from 'react'
import Person from './Person'

const Display = (props) => {
  const filter = props.persons.filter(person => 
    person.name.toUpperCase() === props.newSearch.toUpperCase()
    )
  if (props.newSearch.length === 0) {
    return (
      <div>
      {props.persons.map((person, i) =>
        <Person key={i} person={person}/>
      )}
      </div>
    )
  }
  else {
    return (
      <div>
      {filter.map((person, i) =>
        <Person key={i} person={person}/>
      )}
      </div>
      )
  }
}

export default Display