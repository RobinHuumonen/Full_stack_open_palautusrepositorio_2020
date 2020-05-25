import React from 'react'

const Course = ({ course }) => {

  const Total = () => {
    const reducer = (a, b) => {
      return a + b.exercises
    }
    const sum = course.parts.reduce(reducer, 0)
    return (
      <b>
        total of <span></span>
        {sum} <span></span>
        exercises
      </b>
    )
  }

  const Header = () => {
    return (
        <h2>{course.name}</h2>
    )
  }

  const Content = () => {
    
    const Part = () => {
      
      return (
          <>
            {course.parts.map(part => 
              <p key={part.id}>
                {part.name} {part.exercises}
              </p>
            )}
          </>
      )
    }
  
    return (
      <Part/>
    )
  }
  
  return (
    <> 
      <Header/>
      <Content/>
      <Total/>
    </>
  )
}

export default Course