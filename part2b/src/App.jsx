import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Persons from './components/Persons.jsx'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [filterContacts, setFilterContacts] = useState(false)
  const [currentFilterName, setCurrentFilterName] = useState('')

   const contactsToShow  = filterContacts
  ? persons.filter (person => person.name.toLowerCase().includes(currentFilterName.toLocaleLowerCase()))
  : persons 
  //console.log('initial filtered' , contactsToShow)
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const addContact = (e) => {
    e.preventDefault();
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value)
  }

  const handleClick = () => {
    if(persons.find((person) => person.name === newName)){
        alert(newName + ' is already on the list!')
        //console.log('duplicate ' , contactsToShow)
      } else {
        setPersons(persons.concat({name: newName, number: newPhone}))
        //console.log('filtered ', contactsToShow)
      }
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
    submitHandler={addContact} 
    phoneChangeHandler={handlePhoneChange}
    clickHandler={handleClick}
    />

    <h2>Numbers</h2>
    
    <Persons persons={contactsToShow}/>
    
  </div>
  )
}

export default App
