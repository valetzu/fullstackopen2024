import { useContext } from 'react'
import NotificationContext from '../NotificationContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAnecdote } from '../requests'
const AnecdoteList = ({ anecdotes }) => {

    const [notification, notificationDispatch] = useContext(NotificationContext)
    const queryClient = useQueryClient()

    const updateAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        }
    })

    const handleVote = (anecdote) => {
        updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
        notificationDispatch({payload: `you voted '${anecdote.content}'`})
        setTimeout(() => {
            notificationDispatch('')
        }, 5000)
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