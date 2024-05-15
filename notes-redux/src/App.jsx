import { useEffect } from 'react'
import NoteForm from './components/NoteForm.jsx'
import Notes from './components/Notes.jsx'
import VisibilityFilter from './components/VisibilityFilter.jsx'
import noteService from './services/notes.js'
import { setNotes } from './reducers/noteReducer.js'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    noteService.getAll().then(notes =>  
      dispatch(setNotes(notes))
    )
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