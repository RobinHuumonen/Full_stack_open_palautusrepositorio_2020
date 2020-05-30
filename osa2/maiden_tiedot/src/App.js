import React, {useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import Countries from './components/Countries'
import FindCountries from './components/FindCountries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [filter, setFilter] = useState([])
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
    const regex = new RegExp(`^${event.target.value}`, 'i')
    setFilter(
      countries.filter(country =>
        country.name.match(regex)))
  }

  if (filter.length === countries.length)
    return (
      <>
      <FindCountries newSearch={newSearch} handleSearch={handleSearch}/>
    </>
    )
  
  else if (filter.length > 10) {
    return (
      <>
        <FindCountries newSearch={newSearch} handleSearch={handleSearch}/>
        <p>Too many matches, specify another filter</p>
      </>
    )

  } else if (filter.length > 1 && filter.length <= 10) {
    return (
      <>
        <FindCountries newSearch={newSearch} handleSearch={handleSearch}/>
        <Countries countries={filter} handleClick={setFilter}/>
      </>
    )
  } else if (filter.length === 1) {
    return (
      <>
      <FindCountries newSearch={newSearch} handleSearch={handleSearch}/>
      <Country country={filter[0]}/>
    </>
    )
  } else return (
    <>
      <FindCountries newSearch={newSearch} handleSearch={handleSearch}/>
    </>
  )
}

export default App
