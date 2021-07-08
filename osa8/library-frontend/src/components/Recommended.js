import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'


const Recommended = (props) => {
  const { loading, error, data, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre: props.genre }
  })

  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{props.genre}</b></p>
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
          {data.allBooks.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default Recommended