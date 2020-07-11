import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initAnecdotes} from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initAnecdotes())
  }, [dispatch])
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <br/>
      <Filter/>
      <br/>
      <AnecdoteList/>
      <br/>
      <AnecdoteForm/>
    </div>
  )
}

export default App