import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
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
    <></>
  )
}

const Users = () => (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
)

const LoginPage = ({submitHandler}) => {
  return (
    <>
      <form onSubmit={(event) => submitHandler(event)}>
        <div>
        <input name="username" placeholder='username'/>
        </div>
        <div>
        <input name="password" placeholder='password' />
        </div>
        <button type="submit">Login</button>
        
      </form>
    </>
  )
}

const App = () => {
  const [user, setUser] = useState(null)
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

  const navigate = useNavigate()

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

  const handleLogin = (event) => {
    event.preventDefault()
    const newUser = event.target.username.value
    setUser(event.target.username.value)
    setNotification(`welcome ${newUser}`)
    setTimeout(() => {
      setNotification(null)
    }, 10000)

    navigate('/notes')

  }

  const padding = {
    paddingRight: 5
  }

  return (
    <div className="container">
      <h1>Software notes</h1>
      <Notification message={notification} />
      
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/create">create a new</Link>
        <Link style={padding} to="/users">users</Link>
        <Link style={padding} to="/about">about</Link>
          {user !== undefined && user !==null
            ? <em>{user} logged in </em>
            : <Link to="/login">login </Link>
          }
        
      </div>

        <Routes>
          
          <Route path="/" element={<NoteList notes={notes} />} />
          <Route path="/notes" element={<NoteList notes={notes} changeImportance={changeImportance} />} />
          <Route path="/notes/:id" element={<Note notes={notes} changeImportance={changeImportance}/>} />
          <Route path="/create" element={<NoteForm notes={notes} addNew={addNew}/>} />
          <Route path="/login" element={<LoginPage submitHandler={handleLogin} />} />
          <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
          <Route path="/about" element={<About />} />
        </Routes>

      
      <i><Footer /></i>
    </div>
    
  )
}



export default App
