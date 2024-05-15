import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({anecdotes, filter}) => {
      return filter === '' 
      ? anecdotes
      : anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))  
    })
    const voteAnecdote = (id) => {
        dispatch(vote(id))
      }

    return (
        <>   
            {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
        </>
    )
}

export default AnecdoteList