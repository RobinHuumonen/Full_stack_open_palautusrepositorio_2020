import React, {useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {

  return (
    <>
    <h1>{country.name}</h1>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <h2>Spoken languages</h2>
    <ul>
      {country.languages.map(language =>
        <li key={language.iso639_1}>{language.name}</li>)}
    </ul>
    <img src={country.flag} alt="Missing flag"
    width="10%" height="10%" />
    </>
  )
}

const Display = (props) => {
  const regex = new RegExp(`^${props.newSearch}`, 'i')
  const filter = props.countries.filter(country =>
    country.name.match(regex)
  )

  if (filter.length === props.countries.length)
    return null

  else if (filter.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )

  } else if (filter.length > 1 && filter.length <= 10) {
      return (
        <div>
          {filter.map(country => <p key={country.capital}>{country.name}
          <button onClick=''>
            show
          </button>
          </p>)}
        </div>
      )
  } else if (filter.length === 1) {
    return (
      <div>
      {filter.map((country, i) =>
        <Country key={i} country={country}/>
      )}
      </div>
    )
  } else return null


}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')


  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <>
    <div>
      find countries
      <input
         value={newSearch}
         onChange={handleSearch}
      />
    </div>
    <Display countries={countries} newSearch={newSearch}/>
    </>
  )
}

export default App
