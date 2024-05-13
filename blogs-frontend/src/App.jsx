import { useState, useEffect } from 'react'
import blogService from './services/blogs.js'
import logInService from './services/login.js'
import Notification from './components/Notification.jsx'
import LoginForm from './components/LoginForm.jsx'
import Togglable from './components/Togglable.jsx'
import BlogForm from './components/BlogForm.jsx'
import Blog from './components/Blog.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])

  //const [showAll, setShowAll] = useState(true)
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
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) { 
      const user = JSON.parse(loggedUserJSON) 
      setUser(user) 
      blogService.setToken(user.token)
    }}, [])

/*   const blogsToShow = showAll 
  ? blogs.concat() 
  : blogs.filter (note => {
    return blog.important === true})  */

console.log('hello')

  const createBlog = (blogObject) => {
    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
      })
  
  }

  const handleDeleteNote = (id) => {
      console.log('delete button click:', id)
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

  const loginForm = () => {
    return (
      <div>  
        <Togglable buttonLabel="log in">
          <Notification message={errorMessage} type="error"/>
          <LoginForm
          handleLogin={handleLogin} 
          handleUsernameChange={( { target }) => {setUserName(target.value)}} 
          handlePasswordChange={({ target }) => {setPassword(target.value)}}
          userName={userName}
          password={password}
          />
          </Togglable>
      </div>
    )
  }

  const blogForm = () => (
    <>
    <button onClick={handleLogOut}>Log out</button>
    <Notification message={errorMessage} type="success" />
    <BlogForm createBlog={createBlog}/>
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

      {blogs.map(blog => {
        return <Blog key={blog.id} blog={blog} deleteHandler={() => {handleDeleteNote(blog.id)}}/>
      })
      }
    </div>
  )
}

export default App
