require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(express.static('dist'))
app.use(express.json())
const Note = require('./models/note')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

morgan.token('content', function(req, res) {
    return JSON.stringify(req.body);
});

const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
.then(result => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})


// GET, root
app.get('/', (request, response) => {
  response.send('<h1>Hello Bru!</h1>')
})
// GET, get all notes as json array
app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })
})
// GET, get specific note by id as json
app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
      if(note) {
        response.json(note)
      } else {
        response.status(404).end
      }
    })
      .catch(error => next(error))
  })

  // GET, get info page
app.get('/info', (request, response) => {
    const currentDate = new Date();
    Note.find({}).then(notes => {
      response.send(`
      <p>
      Notes have ${notes.length} notes
      </p>
      <p>
      ${currentDate}
      <p>
      `)
    })
  })

  app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body
  
    const note = {
      content: body.content,
      important: body.important,
    }
  
    Note.findByIdAndUpdate(
      request.params.id,
      { content, important },
      { new: true, runValidators: true, context: 'query'}
    )
      .then(updatedNote => {
        response.json(updatedNote)
      })
        .catch(error => next(error))
  })

// DELETE, delete a note
  app.delete('/api/notes/:id', (request, response) => {
    Note.findByIdAndDelete(request.params.id)
      .then(result => {
        response.status(204).end()
    })
      .catch(error => next(error))
  })

  //POST, add note
  app.post('/api/notes', (request, response) => {
    const body = request.body 

    const note = new Note({
    content: body.content,
    important: body.important || false
    })
    
    note.save()
      .then(savedNote => {
        response.json(savedNote)
    })
      .catch(error => {console.log('error occured while trying to save a note')})
})

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