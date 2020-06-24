import React from 'react'

const BlogForm = (props) => {
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={props.addBlog}>
        <p>
          title:
            <input
              value={props.newTitle}
              onChange={props.handleTitleChange}
            />
        </p>
        <p>
          Author:
            <input
              value={props.newAuthor}
              onChange={props.handleAuthorChange}
            />
        </p>
        <p>
          Url:
            <input
              value={props.newUrl}
              onChange={props.handleUrlChange}
            />
        </p>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm