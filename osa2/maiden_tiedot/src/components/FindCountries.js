import React from 'react'

const FindCountries = ({newSearch, handleSearch}) => {
  return (
    <>
      find countries
      <input
        value={newSearch}
        onChange={handleSearch}
      />
    </>
  )
}

export default FindCountries