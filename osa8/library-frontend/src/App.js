import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import { ALL_AUTHORS, ALL_BOOKS, WHO_AM_I, BOOK_ADDED } from './queries'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const { loading, error, data, refetch } = useQuery(WHO_AM_I)

  useEffect(() => {
    if (localStorage.getItem('user-token')) {
      setToken(localStorage.getItem('user-token'))
    }
  }, [])

  const updateCache = (addedBook) => {
    const includeIn = (set, object) => {
      set.map(b => b.title).includes(object.title)
    }

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includeIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(addedBook.title + " added")
      updateCache(addedBook)
    }
  })

  if (authors.loading || books.loading || loading) {
    return <div>loading...</div>
  }
  
  function logOutOnClick() {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("login")
  }

  function recommendedOnClick() {
    setPage('recommended')
  }

  const genre = data.me === null ? null : data.me.favoriteGenre

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => token !== null ? setPage('add') : setPage('login')}>{token !== null ? "add book" : "login"}</button>
        {token !== null ?
        <button onClick={recommendedOnClick}>recommended</button>
        : null}
        {token !== null ?
        <button onClick={logOutOnClick}>logout</button>
        : null}
      </div>

      <Authors
        show={page === 'authors'}
        authors={authors.data.allAuthors}
      />

      <Books
        show={page === 'books'}
        books={books.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
        books={books}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
        refetch={refetch}
      />

      <Recommended
        show={page === 'recommended'}
        genre={genre}
      />

    </div>
  )
}

export default App

