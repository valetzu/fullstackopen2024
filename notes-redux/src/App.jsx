import NoteForm from './components/NoteForm.jsx'
import Notes from './components/Notes.jsx'
import VisibilityFilter from './components/VisibilityFilter.jsx'

const App = () => {
  

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