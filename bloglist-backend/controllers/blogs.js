const blogRouter = require('express').Router()
const Blog = require('../models/blog')

  // GET, get all blogs as json array
  blogRouter.get('/', async(request, response) => {
      const blogs = await Blog.find({})
      response.json(blogs)
  })
  // GET, get specific blog by id as json
  blogRouter.get('/:id', async(request, response) => {
      const blog = await Blog.findById(request.params.id)
        if(blog) {
          response.json(blog)
        } else {
          response.status(404).end
        }
    })
  
    // GET, get info page
  blogRouter.get('/info', async(request, response) => {
      const currentDate = new Date();
      blogs = await Blog.find({})
        response.send(`
        <p>
        Phonebook has info for ${blogs.length} people
        </p>
        <p>
        ${currentDate}
        <p>
        `)
    })
  
    blogRouter.put('/:id', async(request, response, next) => {
      const body = request.body
    
      const blog = {
        title: body.title,
        author: body.author || '',
        url: body.url || '',
        likes: body.likes || 0
      }
    
      const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
         blog,
        { new: true }
      )  
      response.json(updatedBlog)
    })
  
  // DELETE, delete a blog
    blogRouter.delete('/:id', async(request, response) => {
      const result = await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    })
  
    //POST, add blog
    blogRouter.post('/', async(request, response, next) => {
      const body = request.body
  
      const blog = new Blog({
        title: body.title,
        author: body.author || '',
        url: body.url || '',
        likes: body.likes || 0
      })

      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
  })

  module.exports = blogRouter
  