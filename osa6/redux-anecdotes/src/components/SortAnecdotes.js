import { useSelector } from 'react-redux'

export const SortAnecdotes = () => {
  const searchCondition = useSelector(state => state.filter)
  let anecdotes = useSelector(state => state.anecdotes)
  if (searchCondition) {
    const regex = new RegExp(`^${searchCondition}`, 'i')
    anecdotes = anecdotes.filter(anecdote => anecdote.content.match(regex))
  }

  return (
    anecdotes.sort((a, b) => a.votes > b.votes ? -1 : 1)
  )
}