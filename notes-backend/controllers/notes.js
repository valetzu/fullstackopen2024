const notesRouter = require('express').Router()
const Note = require('../models/note')

  // GET, get all notes as json array
notesRouter.get('/', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})
// GET, get specific note by id as json
notesRouter.get('/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    if(note) {
      response.json(note)
    } else {
      response.status(404).end
    }
  })
    .catch(error => console.log(error))
})

// GET, get info page
notesRouter.get('/info', (request, response) => {
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

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const content = body.content
  const important = body.important
  

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
notesRouter.delete('/:id', (request, response) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
  })
    .catch(error => next(error))
})

//POST, add note
notesRouter.post('/notes', (request, response) => {
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


  module.exports = notesRouter
  