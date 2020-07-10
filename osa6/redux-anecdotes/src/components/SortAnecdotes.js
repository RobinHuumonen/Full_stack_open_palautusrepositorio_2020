import { useSelector } from 'react-redux'

export const SortAnecdotes = () => {
  const anecdotes = useSelector(state => state)
  return (
    anecdotes.sort((a, b) => a.votes > b.votes ? -1 : 1)
  )
}
