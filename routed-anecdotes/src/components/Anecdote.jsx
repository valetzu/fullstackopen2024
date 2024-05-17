import { useParams } from 'react-router-dom'
const Anecdote = ({ anecdotes }) => {
    const id = useParams().id

    const anecdote = anecdotes.find(n => n.id === Number(id))
    console.log(anecdote)
    return (
        <>
            <h2>{anecdote.content}</h2>
            <div>Votes: {anecdote.votes}</div>
        </>
    )
}
export default Anecdote