import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Head = props => <h1> {props.headline} </h1>

const Display = props => {
  return (
    <p> {props.text} {props.value} </p>
  )
} 

const Button = ({ onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const average = (props.good * 1 + props.neutral * 0 + props.bad * -1) / total
  const positive = props.good * 100 / total
  return(
    <table>
      <tbody>
        <tr>
          <td>good {props.good}</td>
        </tr>
        <tr>
          <td>neutral {props.neutral}</td>
        </tr>
        <tr>
          <td>bad {props.bad}</td>
        </tr>
        <tr>
          <td>all {total}</td>
        </tr>
        <tr>
          <td>average {average}</td>
        </tr>
        <tr>
          <td>positive {positive} %</td>
        </tr>
      </tbody>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleSetGoodClick = () => {
    setAll(allClicks.concat("g"))
    setGood(good + 1)
  }
  const handleSetNeutral = () => {
    setAll(allClicks.concat("n"))
    setNeutral(neutral + 1)
  } 

  const handleSetBad = () => { 
    setAll(allClicks.concat("b"))
    setBad(bad + 1)
  }

  if (allClicks.length === 0)
    return (
      <>
      <Head headline="give feedback"/>
      <Button onClick={handleSetGoodClick} text="good"/>
      <Button onClick={handleSetNeutral} text="neutral"/>
      <Button onClick={handleSetBad} text="bad"/>
      <Head headline="statistics"/>
      <Display text="no feedback given"/>
      </>
    )
  
  return (
    <>
      <Head headline="give feedback"/>
      <Button onClick={handleSetGoodClick} text="good"/>
      <Button onClick={handleSetNeutral} text="neutral"/>
      <Button onClick={handleSetBad} text="bad"/>
      <Head headline="statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)