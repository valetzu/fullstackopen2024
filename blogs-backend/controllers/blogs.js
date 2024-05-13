const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const { requestLogger } = require('../utils/middleware')
const User = require('../models/user')

  // GET, get all blogs as json array
  blogRouter.get('/', async(request, response) => {
      const blogs = await Blog
      .find({}).populate('user', { username: 1, name: 1 })
      response.json(blogs)
  })
  // GET, get specific blog by id as json
  blogRouter.get('/:id', async(request, response, next) => {
    try{
      const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
        if(blog) {
          response.json(blog)
        } else {
          response.status(404).json({error:'resource not found'})
        }
      } catch(error) {
        next(error);
      }
    })
  
    // GET, get info page
  blogRouter.get('/info', async(request, response) => {
      const currentDate = new Date();
      blogs = await Blog.find({})
        response.send(`
        <p>
        Blog has total ${blogs.length} posts
        </p>
        <p>
        ${currentDate}
        <p>
        `)
    })
  
    // PUT, update blogpost
    blogRouter.put('/:id', async(request, response) => {
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
      ).populate('user', { username: 1, name: 1 })  
      response.json(updatedBlog)
    })
  
  // DELETE, delete a blog
    blogRouter.delete('/:id', async(request, response) => {
      const result = await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    })
  
    //POST, add blog
    blogRouter.post('/', async(request, response) => {
      const body = request.body

      

      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
      }
      const user = await User.findById(decodedToken.id)

      //url check missing for quick testing purpose
      if(!request.body.title){
        response.status(400).end()
      } else {
        const blog = new Blog({
        title: body.title,
        author: body.author || '',
        url: body.url || '',
        likes: body.likes || 0,
        user: user._id
      })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        
        response.status(201).json(savedBlog)
      }
  })

  module.exports = blogRouter
  