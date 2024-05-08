const contactRouter = require('express').Router()
const Person = require('../models/person')

  // GET, get all persons as json array
  contactRouter.get('/', (request, response) => {
      Person.find({}).then(persons => {
        response.json(persons)
      })
  })
  // GET, get specific person by id as json
  contactRouter.get('/:id', (request, response) => {
      Person.findById(request.params.id).then(person => {
        if(person) {
          response.json(person)
        } else {
          response.status(404).end
        }
      })
      .catch(error => next(error))
    })
  
    // GET, get info page
  contactRouter.get('/info', (request, response) => {
      const currentDate = new Date();
      Person.find({}).then(persons => {
        response.send(`
        <p>
        Phonebook has info for ${persons.length} people
        </p>
        <p>
        ${currentDate}
        <p>
        `)
      })
    })
  
    contactRouter.put('/:id', (request, response, next) => {
      const body = request.body
    
      const person = {
        name: body.name,
        number: body.number || 'placeholderNumber',
      }
    
      Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
          response.json(updatedPerson)
        })
        .catch(error => next(error))
    })
  
  // DELETE, delete a person
    contactRouter.delete('/:id', (request, response) => {
      Person.findByIdAndDelete(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
    })
  
    //POST, add person
    contactRouter.post('/', (request, response) => {
      const body = request.body
  
      const person = new Person({
        name: body.name,
        number: body.number || 'placeholderNumber'
      })
      person.save().then(savedPerson => {
        response.json(savedPerson)
      }).catch(error => {
        if (error.name === 'CastError') {
          return response.status(400).send({ error: 'malformatted id' })
        } else if (error.name === 'ValidationError'){
          return response.status(400).json({ errorDesc: error.message })  
        }
      }
      )
  
  })

  module.exports = contactRouter
  