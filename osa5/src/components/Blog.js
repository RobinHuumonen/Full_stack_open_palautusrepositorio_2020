import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [showAll, setShowAll] = useState(false)

  const toggleVisibility = () => {
    setShowAll(!showAll)
  }

  const hideWhenVisible = { display: showAll ? 'none' : ''}
  const showWhenVisible = { display: showAll ? '' : 'none'}

  return (
    <div className="blog">
      <div style={hideWhenVisible}>
        {blog.title} 
        {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title}
        <button onClick={toggleVisibility}>hide</button>
        <br/>
        {blog.url}
        <br/>
        {blog.likes}
        <button>likes</button>
        <br/>
        {blog.author}
      </div>
    </div>

  )
}


export default Blog
