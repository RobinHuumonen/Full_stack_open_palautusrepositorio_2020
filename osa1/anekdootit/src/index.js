import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(
    new Uint8Array(props.anecdotes.length)
  )
  
  const handleRandomSelection = () => {
    let randomIndex = Math.floor(Math.random() * props.anecdotes.length)
    return setSelected(randomIndex)
  }
  
  const handleVote = () => {
    const pointsCopy = [...points]
    pointsCopy[selected] += 1
    setPoints(pointsCopy)
  }

  const max = points.reduce((a, b) => Math.max(a, b))
  const indexOfMax = points.indexOf(Math.max(...points))
  return (
    <>
      <Head head="Anecdote of the day"/>
      <Display selected={selected} votes={points[selected]}/>
      <Button text="vote" onClick={handleVote}/>
      <Button text="next anecdote" onClick={handleRandomSelection}/>
      <Head head="Anecdote with most votes"/>
      <Display selected={indexOfMax} votes={max}/>
    </>
  )
}

const Display = (props) => {
  return (
    <>
    <h3>{anecdotes[props.selected]}</h3>
    <h4>has {props.votes} votes</h4>
    </>
  ) 
}

const Head = props => <h2>{props.head}</h2>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)