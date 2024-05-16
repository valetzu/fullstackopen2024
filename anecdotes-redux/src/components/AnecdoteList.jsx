import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

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
    const handleVote = (id) => {
        dispatch(voteAnecdote(id))
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
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
        </>
    )
}

export default AnecdoteList