import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const getId = () => (100000 * Math.random()).toFixed(0)

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
  }



  anecdotes.sort((a, b) => a.votes > b.votes ? -1 : 1)

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <AnecdoteForm/>
    </div>
  )
}

export default App