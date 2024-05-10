const notesRouter = require('express').Router()
const Note = require('../models/note')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

// Extract the token from the authorization header
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

  // GET, get all notes as json array
notesRouter.get('/', async(request, response) => {
  const notes = await Note
  .find({}).populate('user', { username: 1, name: 1 })

  response.json(notes)
  
})

// GET, get specific note by id as json
notesRouter.get('/:id', async(request, response) => {
  const note = await Note.findById(request.params.id)
    if(note) {
      response.json(note)
    } else {
      response.status(404).json({error:'resource not found'})
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


//POST, add a note
notesRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid xd' })
  }
  const user = await User.findById(decodedToken.id)

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    user: user._id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.status(201).json(savedNote)


})


  module.exports = notesRouter
  