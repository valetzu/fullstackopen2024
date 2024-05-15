import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { filterChange } from '../reducers/filterReducer'

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

      /* const contactsToShow  = filterContacts
  ? persons.filter (person => person.name.toLowerCase().includes(currentFilterName.toLocaleLowerCase()))
  : persons  */

    return (
        <>
        <div>
          <input name="searchbar" onChange={event => dispatch(filterChange(event.target.value))}></input>
        </div>
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