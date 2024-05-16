import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'


const App = () => {
  let currentNotification = ''

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
    currentNotification = 'anecdote service not available due to problems in server'
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
      <h3>Anecdote app</h3>
      
      <Notification message={currentNotification} />
      
      { anecdotes === undefined ? null : pageContent()}
    </div>
  )
}

export default App
