import React from 'react'
import { useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
import { SortAnecdotes } from './SortAnecdotes'

const AnecdoteList = () => {
  const anecdotes = SortAnecdotes()
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(addVote(anecdote))
    dispatch(createNotification(`you voted '${anecdote.content}'`, 10))
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
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdoteList