const contactRouter = require('express').Router()
const Person = require('../models/person')

  // GET, get all persons as json array
  contactRouter.get('/', async(request, response) => {
      const persons = await Person.find({})
        response.json(persons)
  })
  // GET, get specific person by id as json
  contactRouter.get('/:id', async(request, response) => {
      const person = await Person.findById(request.params.id)
        if(person) {
          response.json(person)
        } else {
          response.status(404).end
        }
    })
  
    // GET, get info page
  contactRouter.get('/info', async (request, response) => {
      const currentDate = new Date();
      const persons = await Person.find({}).
        response.send(`
        <p>
        Phonebook has info for ${persons.length} people
        </p>
        <p>
        ${currentDate}
        <p>
        `)
    })
  
    contactRouter.put('/:id', async (request, response) => {
      const body = request.body
    
      const person = {
        name: body.name,
        number: body.number || 'placeholderNumber',
      }
    
      const updatedPerson = await Person.findByIdAndUpdate(
        request.params.id,
         person,
        { new: true }
      )
      response.json(updatedPerson)
    })
  
  // DELETE, delete a person
    contactRouter.delete('/:id', async(request, response) => {
      const result = await Person.findByIdAndDelete(request.params.id)
        response.status(204).end()
    })
  
    //POST, add person
    contactRouter.post('/', async(request, response) => {
      const body = request.body
  
      const person = new Person({
        name: body.name,
        number: body.number || 'placeholderNumber'
      })
      const savedPerson = await person.save()
      response.status(201).json(savedPerson)
  
  })

  module.exports = contactRouter
  