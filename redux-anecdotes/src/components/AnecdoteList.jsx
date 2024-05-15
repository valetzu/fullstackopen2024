import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

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