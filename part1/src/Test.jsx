import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Test.css'

function Test(props) {
  const [ counter, setCounter ] = useState(0)

  
/*   setTimeout(
    () => setCounter(counter + 1),
    1000
  ) */

  const increaseByOne = () => {
    setCounter(counter + 1)
  }

  const resetValue = () => {
    setCounter(0)
  }

  return (
      <div>

       <div>{counter}</div>
       <button onClick={increaseByOne}>
        plus
       </button>


       <button onClick={resetValue}>
        reset
       </button>
      </div>
  )
}

export default Test
