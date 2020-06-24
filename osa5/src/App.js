import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  const handleLogin = async (event) => {
    
    event.preventDefault()

      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
         <div>
           username
             <input
             type="text"
             value={username}
             name="Username"
             onChange={({ target }) => setUsername(target.value)}
           />
         </div>
         <div>
           password
             <input
             type="password"
             value={password}
             name="Password"
             onChange={({ target }) => setPassword(target.value)}
           />
         </div>
         <button type="submit">login</button>
       </form>      
     )

  const handleLogout = () => {

    window.localStorage.removeItem('loggedNoteAppUser')
    setUser(null)
  }

  return (
    <div>  
      {user === null
      ? <div>
        <h1>Log ig to application</h1>
        {loginForm()}
      </div> 
      
      : <div>
        <h2>Blogs</h2>
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
    }
    </div>
  )
}

export default App