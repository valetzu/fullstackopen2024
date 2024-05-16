import { useEffect } from 'react'
import NoteForm from './components/NoteForm.jsx'
import Notes from './components/Notes.jsx'
import VisibilityFilter from './components/VisibilityFilter.jsx'
import { useDispatch } from 'react-redux'
import { initializeNotes } from './reducers/noteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes())
  }, [])

  return (
    <div>
      <h2>Notes</h2>
      <NoteForm />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App