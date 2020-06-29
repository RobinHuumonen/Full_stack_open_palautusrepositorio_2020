import React, { useState, useEffect } from 'react'

const Blog = ({ blog, addLike, removeBlog, user }) => {
  const [showAllFields, setShowAllFields] = useState(false)
  const [isUsersBlog, setIsUsersBlog] = useState(false)

  useEffect(() => {
    if (blog.user.username === user.username) {
      setIsUsersBlog(true)
    } else {
      setIsUsersBlog(false)
    }
  }, [])

  const toggleVisibility = () => {
    setShowAllFields(!showAllFields)
  }
  
  const handleLikeClick = () => {
    addLike({
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    })
  }

  const handleRemoveClick = () => {
    const confirm = window.confirm(`Remove blog: ${blog.title} by: ${blog.author}`)
    if (!confirm) {
      return
    } else {
      removeBlog(blog.id)
    }
  }

  const showMore = { display: showAllFields ? 'none' : ''}
  const showLess = { display: showAllFields ? '' : 'none'}
  const showRemoveButton = { display: isUsersBlog ? '' : 'none'}

  return (
    <div className="blog">
      <div style={showMore}>
        {blog.title}
        &nbsp;
        {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showLess}>
        {blog.title}
        <button onClick={toggleVisibility}>hide</button>
        <br/>
        {blog.url}
        <br/>
        {blog.likes}
        <button onClick={handleLikeClick}>like</button>
        <br/>
        {blog.author}
        <br/>
        <b style={showRemoveButton}> <button onClick={handleRemoveClick}>remove</button></b>
       
      </div>
    </div>

  )
}


export default Blog
