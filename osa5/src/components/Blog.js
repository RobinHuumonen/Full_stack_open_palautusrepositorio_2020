import React, { useState } from 'react'

const Blog = ({ blog, addLike }) => {
  const [showAll, setShowAll] = useState(false)

  const toggleVisibility = () => {
    setShowAll(!showAll)
  }
  
  const handleLikeClick = (event) => {
    event.preventDefault()
    addLike({
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    })
  }

  const hideWhenVisible = { display: showAll ? 'none' : ''}
  const showWhenVisible = { display: showAll ? '' : 'none'}

  return (
    <div className="blog">
      <div style={hideWhenVisible}>
        {blog.title}
        &nbsp;
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
        <button onClick={handleLikeClick}>like</button>
        <br/>
        {blog.author}
      </div>
    </div>

  )
}


export default Blog
