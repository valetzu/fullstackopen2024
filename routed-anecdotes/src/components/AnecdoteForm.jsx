import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/customHooks'
const AnecdoteForm = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
            props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        navigate('/anecdotes')    
  }

  const handleReset = () => {
    content.onReset()
    author.onReset()
    info.onReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>  
        <button type="submit">create</button> 
      </form>
      <button onClick={handleReset}>reset</button>
    </div>
  )
}

export default AnecdoteForm