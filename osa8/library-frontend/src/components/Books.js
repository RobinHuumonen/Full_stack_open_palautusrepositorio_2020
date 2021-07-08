
import React, { useState } from 'react'
import Select from 'react-select'

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState('')

  if (!props.show) {
    return null
  }

  const uniqueGenres = []
  for (const b in props.books) {
    const genres = props.books[b].genres
    if (genres.length > 0) {
      for (const g in genres) {
        if (!uniqueGenres.includes(genres[g])) {
          uniqueGenres.push(genres[g])
        }
      }
    }
  }
  const options = []
  for (const u in uniqueGenres) {
    options.push({
      label: uniqueGenres[u],
      value: uniqueGenres[u]
    })
  }

  const filteredByGenre = props.books.filter(b => {
    return b.genres.includes(selectedGenre.value)
  })
  
  return (
    <div>
      <h2>books</h2>

      <Select
        defaultValue={selectedGenre}
        onChange={setSelectedGenre}
        options={options}
      />

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredByGenre.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books