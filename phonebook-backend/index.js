const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

app.use(morgan('tiny'))
 /* app.use(morgan(':method :url :status :res[name-length] - :response-time ms :name'))

morgan.token('name', function(req, res) {
    return JSON.stringify(req.body);
});  */

let persons = [
  { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
  },
  { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
  },
  { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
  },
  { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
  }
]
          
    
  

// GET, root
app.get('/', (request, response) => {
  response.send('<h1>Hello Bru!</h1>')
})
// GET, get all persons as json array
app.get('/api/persons', (request, response) => {
    response.json(persons)
})
// GET, get specific person by id as json
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => {
        console.log('id', typeof(id), typeof(person.id))
        return person.id === id} )
    if(person){
        response.json(person)
    } else {
        response.status(404).end()
    }
  })

  // GET, get info page
app.get('/info', (request, response) => {
    const currentDate = new Date();
    response.send(`
    <p>
    Phonebook has info for ${persons.length} people
    </p>
    <p>
    ${currentDate}
    <p>
    `)
  })

// DELETE, delete a person
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  //POST, add person
  app.post('/api/persons', (request, response) => {
    const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  } 



  const person = {
    name: body.name,
    number: body.number || 'placeholderNumber',
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
  app.use(unknownEndpoint)

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