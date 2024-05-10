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
 
  
  useEffect(() => {
    noteService
      .getAll()
        .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

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

  const handleLogin = (e) => {
    e.preventDefault()
    logInService
      .logIn({username: userName, password: password})
        .then(res => { console.log(res)

        })
    
    //setErrorMessage(')
    //setTimeout(() => { setErrorMessage(null)}, 5000)

  }


  return (
    <div>
      <h1>Notes App</h1>
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
      
      <Notification message ={errorMessage} />
      <div>
      <button onClick={() => {setShowAll(!showAll)}}>
        show {showAll ? 'important' : 'all'}
      </button>
      </div>
      {notesToShow.map(note => {
        return <Note key={note.id} note={note} toggleImportance={() => handleImportantButton(note.id)} />})}
      <form onSubmit={addNote}>
        <input 
          value={newNote} 
          onChange={({ target }) => { target.value}}/>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
