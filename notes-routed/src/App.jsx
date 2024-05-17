import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import About from './components/About'
import Footer from './components/Footer'
import NoteList from './components/NoteList'
import Note from './components/Note'
import NoteForm from './components/NoteForm'
import Notification from './components/Notification'

const Menu = (props) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <Router>
    <div>
      <Link style={padding} to="/notes">notes</Link>
      <Link style={padding} to="/create">create a new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>

    <Routes>
        <Route path="/" element={<NoteList notes={props.notes} />} />
        <Route path="/notes" element={<NoteList notes={props.notes} />} />
        <Route path="/notes/:id" element={<Note notes={props.notes}/>} />
        <Route path="/create" element={<NoteForm notes={props.notes} addNew={props.addNew}/>} />
        <Route path="/about" element={<About />} />
      </Routes>

    </Router>
  )
}

const App = () => {
  const [notes, setNotes] = useState([
    {
      content: 'If it hurts, do it more often',
      important: true,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      important: false,
      id: 2
    }
  ])


  const [notification, setNotification] = useState('')
 
  const addNew = (note) => {
    note.id = Math.round(Math.random() * 10000)
    setNotes(notes.concat(note))
    setNotification(`a new note '${note.content}' created!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const noteById = (id) =>
    notes.find(a => a.id === id)

  const changeImportance = (id) => {
    const note = noteById(id)

    const changedNote = {
      ...note,
      important: !note.important
    }

    setNotes(notes.map(a => a.id === id ? changedNote : a))
  }

  return (
    <div className="container">
      <h1>Software notes</h1>
      <Notification message={notification} />
      <Menu notes={notes} addNew={addNew}/>
      <i><Footer /></i>
    </div>
  )
}



export default App
