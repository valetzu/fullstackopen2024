const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

morgan.token('content', function(req, res) {
    return JSON.stringify(req.body);
});

let notes = [
              {
                "id": 1,
                "content": "HTML is easy",
                "important": true
              },
              {
                "id": 2,
                "content": "Browser can execute only JavaScript",
                "important": false
              },
              {
                "id": 3,
                "content": "GET and POST are the most important methods of HTTP protocol",
                "important": false
              }  
            ]
          
    
  

// GET, root
app.get('/', (request, response) => {
  response.send('<h1>Hello Bru!</h1>')
})
// GET, get all notes as json array
app.get('/api/notes', (request, response) => {
    response.json([notes])
})
// GET, get specific note by id as json
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => {
        console.log('id', typeof(id), typeof(note.id))
        return note.id === id} )
    if(note){
        response.json(note)
    } else {
        response.status(404).end()
    }
  })

  // GET, get info page
app.get('/info', (request, response) => {
    const currentDate = new Date();
    response.send(`
    <p>
    Phonebook has info for ${notes.length} people
    </p>
    <p>
    ${currentDate}
    <p>
    `)
  })

// DELETE, delete a note
  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  //POST, add note
  app.post('/api/notes', (request, response) => {
    const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  } 



  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
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