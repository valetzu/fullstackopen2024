import { useState, useEffect } from 'react'
import Note from './components/Note.jsx'
import noteService from './services/notes.js'
import Notification from './components/Notification.jsx'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [isImportant, setIsImportant] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
 
  
  useEffect(() => {
    noteService
      .getAll()
        .then(initialNotes => {
        setNotes(initialNotes[0])
      })
  }, [])

  const notesToShow = showAll 
  ? notes.concat() 
  : notes.filter (note => {
    return note.important === true}) 

  const handleNoteChange = (e) => {
    setNewNote(e.target.value)
  }
  const addNote = (event) => {
    event.preventDefault()
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
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        
      })
  }


  return (
    <div>
      <h1>Notes</h1>
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
          onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
