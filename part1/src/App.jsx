import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Display from './Display.jsx'
import Button from './Button.jsx'

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]


  const [ goodCounter, setGood ] = useState(0)
  const [ neutralCounter, setNeutral] = useState(0)
  const [ badCounter, setBad] = useState(0)
  const [totalCounter, setTotal] = useState(0)
  const [ averageCounter, setAverage ] = useState(0)
  const [goodPercent, setGoodPercent] = useState(0)

  const [randomIndex, setRandomIndex] = useState(0)

  const randomizeIndex = () => {
    const temp = Math.floor(Math.random() * (anecdotes.length))
    setRandomIndex(temp)
    console.log('actual random ', temp)
    return temp
  }

  const [anecdote, setAnecdote] = useState('')
  //setAnecdote(anecdotes[randomIndex]) 

  const emptyArray = Array(anecdotes.length).fill(0)
  const [votes, setVotes] = useState(emptyArray.concat())




  const increaseGood = () => {
    const updatedGood = goodCounter + 1
    const updatedTotal = totalCounter + 1
    setGood(updatedGood)
    setTotal(updatedTotal)
    setAverage(calculateAverage(updatedGood, badCounter))
    setGoodPercent(calculateGoodPercentage(updatedGood, updatedTotal))
  }
  const increaseNeutral = () => {
    const updatedNeutral = neutralCounter + 1
    const updatedTotal = totalCounter + 1
    setNeutral(updatedNeutral)
    setTotal(updatedTotal)
    setAverage(calculateAverage(goodCounter, badCounter))
    setGoodPercent(calculateGoodPercentage(goodCounter, updatedTotal))
  }
  const increaseBad = () => {
    const updatedBad = badCounter + 1
    const updatedTotal = totalCounter + 1
    setBad(updatedBad)
    setTotal(updatedTotal)
    setAverage(calculateAverage(goodCounter, updatedBad))
    setGoodPercent(calculateGoodPercentage(goodCounter, updatedTotal))

  }

  const resetCounters = () => {
    setGood(0)
    setBad(0)
    setNeutral(0)
  }

  const calculateAverage = (goodCount, badCount) => ((goodCount - badCount) / 3)
  const calculateGoodPercentage = (goodCount, totalCount) => (goodCount / totalCount) * 100
  
   const randomizeAnecdote = () => {
      const temp = randomizeIndex
      setAnecdote(anecdotes[randomIndex]) 
    
  } 

  const voteAnecdote = () => {
    const newVoteCount = votes[randomIndex] + 1
    const copy = [...votes]
    copy[randomIndex] = newVoteCount
    setVotes(copy.concat())
    
  }

  const VoteLeader = () => {
    const votesArray = votes.concat()
    //console.log(votesArray)
    const anecdoteArray = anecdotes.concat()
    //console.log(anecdoteArray)
    const leaderVoteCount = Math.max(...votesArray)
     
    console.log('random index is' ,randomIndex)
    
    const leaderIndex = votesArray.indexOf(leaderVoteCount)
    let result = 'not decided'
    if(leaderIndex >= 0 && leaderVoteCount > 0){
      result = (anecdoteArray[leaderIndex])
    } 
    console.log('leader index is: ',  leaderIndex)
 
    console.log('leader is ', anecdoteArray[leaderIndex])
    
    console.log('leaderVoteCount is ', leaderVoteCount)

   
    return (<>{result}</>)
  }
    
    return (
        <div>
          <Button handleClick={voteAnecdote} text='vote' />
          
          <p>{anecdote}</p>
          <p>Votes: </p>
          <Display counter={votes[randomIndex]} />
        <Button handleClick={randomizeAnecdote} text='Next Anecdote'></Button>
        <Display counter={goodCounter}/>
        <Button handleClick={increaseGood} text='good'/>
        <Display counter={neutralCounter}/>
        <Button handleClick={increaseNeutral} text='neutral'/>
        <Display counter={badCounter}/>
        <Button handleClick={increaseBad} text='bad'/>
        <Button handleClick={resetCounters} text='reset'/>
        <p>Total count:</p>
        <Display counter={totalCounter} />

        <p></p>
        <p>Average: </p>
        <Display counter={averageCounter}/>
        <div>
          <p>Good Percentage:
            
          </p>
          <Display counter={goodPercent}/>
          %

          <p>Current leader in votes: </p>
        <VoteLeader></VoteLeader>
        </div>
        </div>
    )
}


export default App
