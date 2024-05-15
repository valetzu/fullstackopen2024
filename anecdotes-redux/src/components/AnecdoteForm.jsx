import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotes.js'
const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
       const newAnecdote = await anecdotesService.createNew(content)
        dispatch(createAnecdote(newAnecdote))
        dispatch(notificationChange('Anecdote created!'))
        setTimeout(() => {
            dispatch(notificationChange(''))
        }, 5000)
    }
    return (
        <>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div>
            <input name="anecdote" />
            </div>
            <button type="submit">create</button>
        </form>
        </>
      )
}

export default AnecdoteForm