import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm.jsx'
import AnecdoteList from './components/AnecdoteList.jsx'
import Filter from './components/Filter.jsx'
import Notification from './components/Notification.jsx'
import anecdotesService from './services/anecdotes.js'
import { useDispatch } from 'react-redux'
import { setAnecdotes } from './reducers/anecdoteReducer.js'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdotesService.getAll().then(anecdotes => 
      dispatch(setAnecdotes(anecdotes))
    )
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>

      <Filter />
      <AnecdoteList />
      <Notification/>
      <AnecdoteForm />

    </div>
  )
}

export default App