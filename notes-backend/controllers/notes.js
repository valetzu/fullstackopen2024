const notesRouter = require('express').Router()
const Note = require('../models/note')

  // GET, get all notes as json array
notesRouter.get('/', async(request, response) => {
  const notes = await Note.find({})
  response.json(notes)
  
})

// GET, get specific note by id as json
notesRouter.get('/:id', async(request, response) => {
  const note = await Note.findById(request.params.id)
    if(note) {
      response.json(note)
    } else {
      response.status(404).end
    }
  
   
})

// GET, get info page
notesRouter.get('/info', async(request, response) => {
  const currentDate = new Date();
  const notes = await Note.find({})
  response.send(`
  <p>
  Notes have ${notes.length} notes
  </p>
  <p>
  ${currentDate}
  <p>
  `)
  
})

notesRouter.put('/:id', async(request, response) => {
  const body = request.body

  const content = body.content
  const important = body.important
  

  const updatedNote = await Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query'}
  )
    
  response.json(updatedNote)
    
     
})

// DELETE, delete a note
notesRouter.delete('/:id', async(request, response) => {
  const result = await Note.findByIdAndDelete(request.params.id)
  response.status(204).end()
    
})

//POST, add note
notesRouter.post('/', async(request, response, next) => {
  const body = request.body 

  const note = new Note({
  content: body.content,
  important: body.important || false
  })

  const savedNote = await note.save()
  response.status(201).json(savedNote)
})


  module.exports = notesRouter
  