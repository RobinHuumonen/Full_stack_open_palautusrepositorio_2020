import React from 'react'
import { useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { SortAnecdotes } from './SortAnecdotes'

const AnecdoteList = () => {
  const anecdotes = SortAnecdotes()
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
  }

  return (
    <div>
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
    </div>
  )
}

export default AnecdoteList