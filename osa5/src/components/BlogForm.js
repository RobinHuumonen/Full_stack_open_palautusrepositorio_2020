import React, { useState } from 'react'

const BlogForm = ({
  addBlog,
  newTitle,
  handleTitleChange,
  newAuthor,
  handleAuthorChange,
  newUrl,
  handleUrlChange
}) => {
  
  const [createNoteVisible, setCreateNoteVisible] = useState(false)

  const toggleVisibility = () => {
    setCreateNoteVisible(!createNoteVisible)
  }

  const hideWhenVisible = { display: createNoteVisible ? 'none' : ''}
  const showWhenVisible = { display: createNoteVisible ? '' : 'none'}

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>create blog</button>
      </div>
      <div style={showWhenVisible}>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
            <input
              value={newTitle}
              onChange={handleTitleChange}
            />
        </div>
        <div>
          Author:
            <input
              value={newAuthor}
              onChange={handleAuthorChange}
            />
        </div>
        <div>
          Url:
            <input
              value={newUrl}
              onChange={handleUrlChange}
            />
        </div>
        <button type="submit" onClick={toggleVisibility}>create</button>
        <button onClick={toggleVisibility}>cancel</button>
      </form>
    </div>
    </div>
  )
}

export default BlogForm