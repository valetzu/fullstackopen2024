const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('When there is initially some blogs saved', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')


    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    assert(titles.includes('Harry Potter'))
  })

  describe('viewing a specific note', () => {

    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultBlog.body, blogToView)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })
  })

  describe('addition of a new note', () => {

    test('succeeds with valid data', async () => {
      const newBlog = {
        title: 'The Lord of the Rings',
        author: 'JRR Tolkien',
        url: 'lotr.com',
        likes: 24
      }
  
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  
  
      const titles = blogsAtEnd.map(n => n.title)
      assert(titles.includes('The Lord of the Rings'))
    })

    test('blog without title is not added', async () => {
      const newBlog = {
        author: 'JRR Tolkien',
        url: 'lotr.com',
        likes: 12
      }
  
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
  
  
      const blogsAtEnd = await helper.blogsInDb()
  
  
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  
    test('blog without url is not added', async () => {
      const newBlog = {
        title: 'The Lord of the Rings',
        author: 'JRR Tolkien',
        likes: 5
      }
  
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
  
  
      const blogsAtEnd = await helper.blogsInDb()
  
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('formatting the blog object', () => {

    test.only('blog id property name is correctly formatted without underscore', async () => {
      const blogsAtStart = await helper.blogsInDb()
  
      const blogToView = blogsAtStart[0]
  
      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      assert(!resultBlog.body._id)
    })

    test.only('if added blog is missing likes, set it as 0 by default ', async () => {
      const newBlog = {
        title: 'The Lord of the Rings',
        author: 'JRR Tolkien',
        url: 'lotr.com'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const addedBlog = blogsAtEnd.filter(blog => blog.title === newBlog.title)[0]
      assert.strictEqual(addedBlog.likes, 0)
    })
  })

  describe('deletion of a note', () => {
    test('a blog can be deleted', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      const titles = blogsAtEnd.map(r => r.title)
      assert(!titles.includes(blogToDelete.title))

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })
  })

})

after(async () => {
  await mongoose.connection.close()
})

