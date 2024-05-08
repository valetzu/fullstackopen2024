const blogRouter = require('express').Router()
const Blog = require('../models/blog')

  // GET, get all blogs as json array
  blogRouter.get('/', (request, response) => {
      Blog.find({}).then(blogs => {
        response.json(blogs)
      })
  })
  // GET, get specific blog by id as json
  blogRouter.get('/:id', (request, response) => {
      Blog.findById(request.params.id).then(blog => {
        if(blog) {
          response.json(blog)
        } else {
          response.status(404).end
        }
      })
      .catch(error => next(error))
    })
  
    // GET, get info page
  blogRouter.get('/info', (request, response) => {
      const currentDate = new Date();
      Blog.find({}).then(blogs => {
        response.send(`
        <p>
        Phonebook has info for ${blogs.length} people
        </p>
        <p>
        ${currentDate}
        <p>
        `)
      })
    })
  
    blogRouter.put('/:id', (request, response, next) => {
      const body = request.body
    
      const blog = {
        title: body.title,
        author: body.author || '',
        url: body.url || '',
        likes: body.likes || 0
      }
    
      Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
          response.json(updatedBlog)
        })
        .catch(error => next(error))
    })
  
  // DELETE, delete a blog
    blogRouter.delete('/:id', (request, response) => {
      Blog.findByIdAndDelete(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
    })
  
    //POST, add blog
    blogRouter.post('/', (request, response) => {
      const body = request.body
  
      const blog = new Blog({
        title: body.title,
        author: body.author || '',
        url: body.url || '',
        likes: body.likes || 0
      })

      blog.save().then(savedBlog => {
        response.json(savedBlog)
      }).catch(error => {
        if (error.name === 'CastError') {
          return response.status(400).send({ error: 'malformatted id' })
        } else if (error.name === 'ValidationError'){
          return response.status(400).json({ errorDesc: error.message })  
        }
      }
      )
  
  })

  module.exports = blogRouter
  