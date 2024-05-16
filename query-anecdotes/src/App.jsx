import { useReducer } from 'react'
import NotificationContext from './NotificationContext'
import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'

const notificationReducer = (state, action) => {
  return action.payload
}

const App = () => {

  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  const result = useQuery({    
    queryKey: ['anecdotes'],    
    queryFn: getAnecdotes,
    refetchOnWindowFocus: true,
    retry: false
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {   
    return <div>loading data...</div>  
  }

  if(result.isError){
    notificationDispatch({payload: 'anecdote service not available due to problems in server'})
  }

  const anecdotes = result.data

  const pageContent = () => {
    return(
      <>
      <AnecdoteForm />
      <AnecdoteList anecdotes={anecdotes}/>
      </>
    )
  }

  return (
    <div>
      <NotificationContext.Provider value={[notification, notificationDispatch]}>
        <h3>Anecdote app</h3>
        <Notification />
        
        { anecdotes === undefined ? null : pageContent()}
      </NotificationContext.Provider>
    </div>
  )
}

export default App
