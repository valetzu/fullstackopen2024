import { useState } from 'react'


const Persons = ({persons}) => {
  const personList = persons.concat()
  return (
    <div>
     <ul>
    {personList.map((person) => <li key={person.name}>{person.name} {person.number}</li>)
    }
    </ul>
    </div>
  )
}

export default Persons
