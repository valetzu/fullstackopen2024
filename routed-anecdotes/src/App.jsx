import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import About from './components/About'
import Footer from './components/Footer'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const Menu = (props) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <Router>
    <div>
      <Link style={padding} to="/anecdotes">anecdotes</Link>
      <Link style={padding} to="/create">create a new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>

    <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={props.anecdotes} />} />
        <Route path="/anecdotes" element={<AnecdoteList anecdotes={props.anecdotes} />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdotes={props.anecdotes}/>} />
        <Route path="/create" element={<AnecdoteForm anecdotes={props.anecdotes} addNew={props.addNew}/>} />
        <Route path="/about" element={<About />} />
      </Routes>

    </Router>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])


  const [notification, setNotification] = useState('')
 
  const addNew = (anecdote) => {
    console.log('does this run')
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote '${anecdote.content}' created!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Notification message={notification} />
      <Menu anecdotes={anecdotes} addNew={addNew}/>
      <i><Footer /></i>
    </div>
  )
}



export default App
