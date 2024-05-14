import { useState, useEffect, useRef } from 'react'
import Note from './components/Note.jsx'
import noteService from './services/notes.js'
import logInService from './services/login.js'
import Notification from './components/Notification.jsx'
import LoginForm from './components/LoginForm.jsx'
import Togglable from './components/Togglable.jsx'
import NoteForm from './components/NoteForm.jsx'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()


  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }}, [])

  const notesToShow = showAll
    ? notes.concat()
    : notes.filter (note => {
      return note.important === true})

  const createNote = (note) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(note)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })

  }

  const handleImportantButton = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
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

  const handleDeleteNote = (id) => {

    noteService.remove(id).then(res => {
      setNotes(notes.filter(note => note.id !== id))
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

      noteService.setToken(user.token)
      setUser(user)
      setUserName('')
      setPassword('')
      setErrorMessage('Login Succesfull!')
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
    window.localStorage.removeItem('loggedNoteappUser')
  }

  const loginForm = () => {
    return (
      <div>
        <Notification message={errorMessage}/>
        <Togglable buttonLabel="log in">

          <LoginForm
            handleLogin={handleLogin}
            handleUsernameChange={( { target }) => {setUserName(target.value)}}
            handlePasswordChange={( { target }) => {setPassword(target.value)}}
            userName={userName}
            password={password}
          />
        </Togglable>
      </div>
    )
  }

  const noteForm = () => (
    <>
      <p>{user.username} is logged in</p>
      <button onClick={handleLogOut}>Log out</button>
      <Notification message={errorMessage}/>
      <Togglable buttonLabel='new note' ref={noteFormRef}>
        <NoteForm createNote={createNote}/>
      </Togglable>
    </>
  )

  const deleteNoteButton = (id) => {
    return (
      <button onClick={() => handleDeleteNote(id)}>Delete</button>
    )
  }

  return (
    <div>
      <h1>Notes App</h1>
      Notes App
      <Notification message={errorMessage} />
      {user === null ?
        loginForm() :
        noteForm()
      }
      <div>
        <button onClick={() => {setShowAll(!showAll)}}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      {notesToShow.map(note => {
        return (
          <div key={note.id}>
            <Note key={note.id}
              note={note}
              toggleImportance={() => handleImportantButton(note.id)}
            />
            { (user === null || note.user === null) ?
              null
              :
              user.name === note.user.name ?
                deleteNoteButton(note.id)
                :
                null
            }
          </div>
        )
      })
      }
    </div>
  )
}

export default App
