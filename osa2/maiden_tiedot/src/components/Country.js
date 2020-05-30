import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './Weather'

const Country = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState()

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
        if (response.data.success)
          setWeather(response.data)
        else
          setWeather(0)
      })
  })

  const numberWithSpaces = (x) =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {numberWithSpaces(country.population)}</p>
      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map(language =>
          <li key={language.iso639_1}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt="Missing flag"
      width="10%" height="10%"/>
      <h2>Weather in {country.capital}</h2>
      <Weather weather={weather} />
    </div>
  )
}

export default Country