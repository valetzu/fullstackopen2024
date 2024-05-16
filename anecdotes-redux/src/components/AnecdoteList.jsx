import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({anecdotes, filter}) => {
      const anecdotesToShow = anecdotes.concat()

      return filter === '' 
      ? anecdotesToShow.sort((a, b) => b.votes - a.votes)
      : anecdotesToShow.filter(anecdote => 
        anecdote.content.toLowerCase()
        .includes(filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
      
    })
    const handleVote = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
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
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
        </>
    )
}

export default AnecdoteList