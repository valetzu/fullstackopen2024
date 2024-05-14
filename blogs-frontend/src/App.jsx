import { useState, useEffect, useRef } from 'react'
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
  const blogFormRef = useRef()
  
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

   const blogsToShow = blogs.sort((a, b) => b.likes - a.likes).concat()
  


  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
      })
  
  }

  const handleDeleteBlog = (id) => {
    if (window.confirm("Do you really want to delete the blog post?"))  {
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

    } else return;
  }

  const handleLike = (id) => {
    const blog = blogs.find(n => n.id === id)
    const changedNote = { ...blog, likes: (blog.likes + 1) }
    blogService
      .update(id, changedNote)
        .then(returnedBlog => {
          setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
        })
        .catch(error => {
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
        <Togglable buttonLabel='log in' >
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
    <p>{user.username} is logged in</p>
    <button onClick={handleLogOut}>Log out</button>
    <Notification message={errorMessage} type="success" />
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={createBlog}/>
    </Togglable>
    </>
  )

  const deleteBlogButton = (id) => {
    return (
      <button data-testid='delete' onClick={() => {handleDeleteBlog(id)}}>Delete Blog post</button>
    )
  }

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
        return (
          <div key={blog.id}>
            <Blog 
              blog={blog} 
              handleLike={() => {handleLike(blog.id)}}
            />
            { user === null ?
            null
            :
              user.name === blog.user.name ?
              deleteBlogButton(blog.id)
              :
              null
            }
          </div>
        )
      }
      )}
       
    </div>
  )
}

export default App
