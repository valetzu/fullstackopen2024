import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import About from './components/About'
import Footer from './components/Footer'
import NoteList from './components/NoteList'
import Note from './components/Note'
import NoteForm from './components/NoteForm'
import Notification from './components/Notification'
import {
  Container,
  TextField,
  Button,
  Alert,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material'


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
    <div>
      
      <h2>login page</h2>
      <form onSubmit={submitHandler}>
        <div>
          <TextField label="username" />
        </div>
        <div>
          <TextField label="password" type='password' />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            login
          </Button>
        </div>
      </form>
    </div>
  )
}

const App = () => {
  const [user, setUser] = useState(null)
  const [notes, setNotes] = useState([
    {
      content: 'If it hurts, do it more often',
      important: true,
      user: 'default',
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      important: false,
      user: 'default',
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
    //const newUser = event.target.username.value
    const newUser = 'test'
    //setUser(event.target.username.value)
    setUser('test')
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
    <div >
      <Container>
      <h1>Software notes</h1>
      <div>
      {(notification &&
        <Alert severity="success"> 
          {notification}    
        </Alert>  
      )}
      </div>
      
      <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            home
          </Button>
          <Button color="inherit" component={Link} to="/notes">
            notes
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>   
          {user
            ? <em>{user} logged in</em>
            : <Button color="inherit" component={Link} to="/login">
                login
              </Button>
          }                              
        </Toolbar>
      </AppBar>
        
      </div>

        <Routes>
          
          <Route path="/" element={<NoteList notes={notes} />} />
          <Route path="/notes" element={<NoteList notes={notes} changeImportance={changeImportance} />} />
          <Route path="/notes/:id" element={<Note notes={notes} changeImportance={changeImportance}/>} />
          <Route path="/create" element={<NoteForm notes={notes} addNew={addNew} user={user}/>} />
          <Route path="/login" element={<LoginPage submitHandler={handleLogin} />} />
          <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
          <Route path="/about" element={<About />} />
        </Routes>

      
      <i><Footer /></i>
      </Container>
    </div>
    
  )
}



export default App
