import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Button.css'

const Button = ({ handleClick, text}) => {

  
    return (
        <div>
          <button onClick={handleClick}>
          {text}
         </button>
        </div>
    )
}


export default Button
