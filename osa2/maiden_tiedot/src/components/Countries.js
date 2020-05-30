import React from 'react'

const Countries = ({ countries, handleClick }) => {
  return (
    <div>
      {countries.map(country => 
      <p 
        key={country.name}>{country.name}
        <button onClick={() => handleClick([country])}>
            show
        </button>
      </p>)}
  </div>
  )
}

export default Countries