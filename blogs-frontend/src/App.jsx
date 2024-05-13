import { useState, useEffect } from 'react'
import blogService from './services/blogs.js'
import logInService from './services/login.js'
import Notification from './components/Notification.jsx'
import LoginForm from './components/LoginForm.jsx'
import Togglable from './components/Togglable.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  

  const [user, setUser] = useState(null)
 
  
  useEffect(() => {
    blogService
      .getAll()
        .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => { 
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) { 
      const user = JSON.parse(loggedUserJSON) 
      setUser(user) 
      blogService.setToken(user.token)
    }}, [])

  const blogsToShow = blogs.concat()
/*   const blogsToShow = showAll 
  ? blogs.concat() 
  : blogs.filter (note => {
    return blog.important === true})  */

  const addBlog = (e) => {
    e.preventDefault()
    const blogObject = {
      title: newBlog,
      author: 'testi'
    }
    
    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setNewBlog('')
      })
  
  }

  const handleDeleteNote = (id) => {
    
      blogService.remove(id).then(res => {
        setBlogs(blogs.filter(blog => blog.id !== id))
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
      'loggedBlogAppUser', JSON.stringify(user)
    )
    
      blogService.setToken(user.token)
      setUser(user)
      setUserName('')
      setPassword('')
      setErrorMessage('Login succesfull!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    
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
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const handleUsernameChange = (e) => {
    setUserName(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' } 
    return (
      <div>
        
        <Togglable buttonLabel="log in">
          <LoginForm
          handleLogin={handleLogin} 
          handleUsernameChange={handleUsernameChange} 
          handlePasswordChange={handlePasswordChange}
          userName={userName}
          password={password}
          errorMessage={errorMessage}
          />
          </Togglable>
      </div>
    )
  }

  const blogForm = () => (
    <>
    <button onClick={handleLogOut}>Log out</button>
    <Notification message={errorMessage} type="success" />
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
      <div>
        {user === null ?
      loginForm()
      :
      blogForm() 
      }

      </div>

      {blogsToShow.map(blog => {
        return <li key={blog.title}>{blog.title}</li>
      })
      }
    </div>
  )
}

export default App
