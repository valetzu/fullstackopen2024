import { useState, useEffect } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Persons from './components/Persons.jsx'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import phonebookService from './services/phonebook.js'

function App() {
  const [persons, setPersons] = useState([]) 
  const [filterContacts, setFilterContacts] = useState(false)
  const [currentFilterName, setCurrentFilterName] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


   const contactsToShow  = filterContacts
  ? persons.filter (person => person.name.toLowerCase().includes(currentFilterName.toLocaleLowerCase()))
  : persons 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    if(persons.find((person) => person.name === newName)){
      alert(newName + ' is already on the list!')
    } else {
      const personToAdd = {
        name: newName,
        number: newPhone
      }

      phonebookService
        .create(personToAdd)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewPhone('')
          })
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value)
  }

    const handleSearchBarInput = (e) => {
      if(e.target.value === '')
        setFilterContacts(false)
      else
        setFilterContacts(true)
      setCurrentFilterName(e.target.value)
    }
    
  
  return (
    <div>
      <div>debug: {newName}</div>
    <h2>Phonebook</h2>
   
    <Filter 
    filterName={currentFilterName} 
    handler={handleSearchBarInput}
    />
    
    <PersonForm 
    newName={newName} 
    newPhone={newPhone}
    nameChangeHandler={handleNameChange} 
    submitHandler={handleSubmit} 
    phoneChangeHandler={handlePhoneChange}
    />

    <h2>Numbers</h2>
    
    <Persons persons={contactsToShow}/>
    
  </div>
  )
}

export default App
