import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/customHooks'
const NoteForm = (props) => {
    const content = useField('text')
/*  const author = useField('text')
    const info = useField('text') */

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
            props.addNew({
            content: content.value,
            important: true
        })
        navigate('/notes')    
  }

  const handleReset = () => {
    content.onReset()
/*    author.onReset()
    info.onReset() */
  }

  return (
    <div>
      <h2>create a new note</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <button type="submit">create</button> 
      </form>
      <button onClick={handleReset}>reset</button>
    </div>
  )
}

export default NoteForm