const Person = require('../models/person')

const initialPersons = [
  {
    name: 'Harry Potter',
    number: '0401234567'
  },
  {
    name: 'Kalle Konttila',
    number: '+3584098765'
  }
]

const nonExistingId = async () => {
  const person = new Person({ name: 'willremovethissoon' })
  await person.save()
  await person.deleteOne()

  return person._id.toString()
}

const personsInDb = async () => {
  const persons = await Person.find({})
  return persons.map(person => person.toJSON())
}

module.exports = {
  initialPersons, nonExistingId, personsInDb
}