require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.static('dist'))
app.use(express.json())
const morgan = require('morgan')
const Person = require('./models/person')



// 
          
// GET, root
app.get('/', (request, response) => {
  response.send('<h1>Hello Bru!</h1>')
})
// GET, get all persons as json array
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
})
// GET, get specific person by id as json
app.get('/api/persons/:id', (request, response) => {
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
app.get('/info', (request, response) => {
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

  app.put('/api/persons/:id', (request, response, next) => {
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
  app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  })

  //POST, add person
  app.post('/api/persons', (request, response) => {
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

app.use(morgan('tiny'))
 // app.use(morgan(':method :url :status :res[name-length] - :response-time ms :name'))

/* morgan.token('name', function(req, res) {
    return JSON.stringify(req.body);
});   */

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
  app.use(unknownEndpoint)

//ERROR HANDLER
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })  
  }

  next(error)
}

app.use(errorHandler)

//UTILITY FUNCTIONS
const generateId = () => {
    const maxId = Math.floor(Math.random() * 9999999)
    return maxId
  }
//

//SERVER START
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})