import React from 'react'

const Weather = ({ weather }) => {
  if (weather) {
    return (
      <div>
        <p>
          <b>temperature: </b>
          {weather.current.temperature}
        </p>
        <img src={weather.current.weather_icons} alt="Missing weather icon"
        width="7%" height="7%"/>
        <p>
          <b>wind: </b>
          {weather.current.wind_speed} <span></span>
          mph direction <span></span>
          {weather.current.wind_dir}
        </p>
      </div>
    )
  } else 
      return(
        <div>
          <p>No weather information</p>
        </div>
      )
}

export default Weather