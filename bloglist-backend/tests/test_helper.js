const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Goofy",
    author: "Walt Disney",
    url: "disney.com",
    likes: 8
  },
  {
    title: "Donald Duck",
    author: "Walt Disney",
    url: "disney.com",
    likes: 12
  },
  {
    title: "Harry Potter",
    author: "JK Rowling",
    url: "harrypotter.com",
    likes: 25
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}