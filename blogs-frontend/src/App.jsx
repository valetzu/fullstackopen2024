import { useState, useEffect } from 'react'
import Note from './components/Note.jsx'
import blogService from './services/blogs.js'
import logInService from './services/login.js'
import Notification from './components/Notification.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)
 
  
  useEffect(() => {
    blogService
      .getAll()
        .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => { 
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) { 
      const user = JSON.parse(loggedUserJSON) 
      setUser(user) 
      blogService.setToken(user.token)
    }}, [])

  const blogsToShow = showAll 
  ? blogs.concat() 
  : blogs.filter (note => {
    return note.important === true}) 

  const addBlog = (e) => {
    e.preventDefault()
    const noteObject = {
      content: newBlog,
      important: Math.random() > 0.5
    }
    
    blogService
      .create(noteObject)
        .then(returnedNote => {
          setBlogs(blogs.concat(returnedNote))
          setNewBlog('')
      })
  
  }

  const handleDeleteNote = (id) => {
    
      blogService.remove(id).then(res => {
        setBlogs(blogs.filter(note => note.id !== id))
      }).catch(error => {
        setErrorMessage(
          error.response.data
        )
        setTimeout(() => {
        setErrorMessage(null)
        }, 5000)
      })
    

  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await logInService.logIn({
      username: userName,
      password: password
    })

    window.localStorage.setItem( 
      'loggedNoteappUser', JSON.stringify(user)
    )
    
      blogService.setToken(user.token)
      setUser(user)
      setUserName('')
      setPassword('')
    
    } catch(exception)  {
      setErrorMessage(
      'Wrong Credentials'
    )
      setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  }

  const handleLogOut = () => {
    setUser(null);
    window.localStorage.removeItem('loggedNoteappUser')
  }

  const loginForm = () => (
    <>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
        <div>
          Username <input 
          type="text"
          value={userName}
          onChange={({ target }) => setUserName(target.value)}
          />
        </div>

        <div>
         Password <input 
          type="text"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      </>
  )

  const blogForm = () => (
    <>
    <button onClick={handleLogOut}>Log out</button>
    <form onSubmit={addBlog}>
      <input 
        value={newBlog} 
        onChange={({ target }) => { setNewBlog(target.value)}}/>
      <button type="submit">save</button>
    </form>
    </>
  )


  return (
    <div>
      <h1>Blogs App</h1>
      
      <Notification message={errorMessage} />
      {user === null ? 
      loginForm() :
      blogForm()}
      {blogsToShow.map(blog => {
        return <li key={blog.title}>{blog.title}</li>
      })
      }
    </div>
  )
}

export default App
