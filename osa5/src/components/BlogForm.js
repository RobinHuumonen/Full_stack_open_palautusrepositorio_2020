import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [createNoteVisible, setCreateNoteVisible] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const toggleVisibility = () => {
    setCreateNoteVisible(!createNoteVisible)
  }

  const handleTitleChange = event => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = event => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = event => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
  }


  const hideWhenVisible = { display: createNoteVisible ? 'none' : '' }
  const showWhenVisible = { display: createNoteVisible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button id="create_blog_button" onClick={toggleVisibility}>create blog</button>
      </div>
      <div style={showWhenVisible}>
        <h2>Create new</h2>
        <form onSubmit={addBlog}>
          <div>
          Title:
            <input
              id="title"
              value={newTitle}
              onChange={handleTitleChange}
            />
          </div>
          <div>
          Author:
            <input
              id="author"
              value={newAuthor}
              onChange={handleAuthorChange}
            />
          </div>
          <div>
          Url:
            <input
              id="url"
              value={newUrl}
              onChange={handleUrlChange}
            />
          </div>
          <button id="create_button" type="submit" onClick={toggleVisibility}>create</button>
          <button onClick={toggleVisibility}>cancel</button>
        </form>
      </div>
    </div>
  )
}

export default BlogForm