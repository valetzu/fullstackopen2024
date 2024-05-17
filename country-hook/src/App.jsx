import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = ([name, setName]) => {
  const [country, setCountry] = useState(null)
  useEffect(() => {
    
    const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
    
    const request = axios.get(url)
    const response = request.then(response => {
      setCountry(response)
    }).catch(err => {
      console.log('could not find resource')
      setCountry(response)
    })

    
  }, [name, setName])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (country.status !== 200) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.flag} height='100' alt={`flag of ${country.data.name.common}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry([name, setName])

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App