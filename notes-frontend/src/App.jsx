import { useState, useEffect } from 'react'
import Note from './components/Note.jsx'
import noteService from './services/notes.js'
import logInService from './services/login.js'
import Notification from './components/Notification.jsx'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)
 
  
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

  const addNote = (e) => {
    e.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }
    
    noteService
      .create(noteObject)
        .then(returnedNote => {
          setNotes(notes.concat(returnedNote))
          setNewNote('')
      })
  
  }

  const handleImportantButton = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    noteService
      .update(id, changedNote)
        .then(returnedNote => {
          console.log('returned note', returnedNote)
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

  const noteForm = () => (
    <>
    <button onClick={handleLogOut}>Log out</button>
    <form onSubmit={addNote}>
      <input 
        value={newNote} 
        onChange={({ target }) => { setNewNote(target.value)}}/>
      <button type="submit">save</button>
    </form>
    </>
  )


  return (
    <div>
      <h1>Notes App</h1>
      
      <Notification message={errorMessage} />
      {user === null ? 
      loginForm() :
      noteForm()}
      <div>
        <button onClick={() => {setShowAll(!showAll)}}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      {notesToShow.map(note => {
        return <Note key={note.id}
          note={note}
          toggleImportance={() => handleImportantButton(note.id)}
          deleteNote={() => handleDeleteNote(note.id)} 
        />
      })
      }
    </div>
  )
}

export default App
