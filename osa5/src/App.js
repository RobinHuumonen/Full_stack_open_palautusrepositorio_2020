import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LoggedInUser from './components/LoggedInUser'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogService'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const addBlog = async (newBlog) => {
    blogService.setToken(user.token)
    const blog = await blogService.create(newBlog)
    setBlogs(blogs.concat(blog))
    setNotification(`A new blog ${blog.title} by ${blog.author} added`)
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }

  const addLike = async (newBlog) => {
    const id = blogs.findIndex(blog => blog.title === newBlog.title && blog.likes === newBlog.likes - 1)
    blogService.setToken(user.token)
    const blog = await blogService.put(newBlog)
    setBlogs(blogs.splice(id, 1, blog))
    setNotification(`Added like to ${blog.title}`)
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }

  const removeBlog = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    console.log(blog)
    blogService.setToken(user.token)
    await blogService.remove(id)
    setBlogs(blogs.splice(
      blogs.findIndex(blog =>
        blog.id === id), 1))
    setNotification(`Removed ${blog.title}`)
    setTimeout(() => {
      setNotification(null)
    }, 4000)

  }

  const handleLogin = async (event) => {

    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('Wrong username or password')
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    }

  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteAppUser')
    setUser(null)
  }

  const sortedBlogs = blogs.sort((prev, curr) => (prev.likes < curr.likes) ? 1 : -1)

  return (
    <div>
      {user === null
        ? <div>
          <h1>Log in to application</h1>
          <Notification notification={notification}/>
          <LoginForm
            handleLogin = {handleLogin}
            username = {username}
            setUsername = {setUsername}
            password = {password}
            setPassword = {setPassword}
          />
        </div>
        : <div>
          <h2>Blogs</h2>
          <Notification notification={notification}/>
          <LoggedInUser
            user={user}
            handleLogout={handleLogout}
            blogs={blogs}
          />
          <BlogForm
            createBlog={addBlog}
          />
          {sortedBlogs.map(blog =>
            <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} user={user} />
          )}
        </div>


      }
    </div>
  )
}

export default App

