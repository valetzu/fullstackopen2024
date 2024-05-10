const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
    

    response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

  // GET, get specific blog by id as json
  usersRouter.get('/:id', async(request, response, next) => {
    try{
      const user = await User
        .findById(request.params.id)
        .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
        if(user) {
          response.json(user)
        } else {
          response.status(404).json({error:'resource not found'})
        }
      } catch(error) {
        next(error);
      }
    })

// DELETE, delete a user
usersRouter.delete('/:id', async(request, response) => {
  const result = await User.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = usersRouter