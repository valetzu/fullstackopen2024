import { useState } from 'react'

const BlogForm = ({createBlog}) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    createBlog(blogObject)
    setNewTitle('')
    
  }   
  return(
        <form onSubmit={addBlog}>
        <input 
        value={newTitle} 
        onChange={({ target }) => { setNewTitle(target.value)}}/>
      <button type="submit">save</button>
    </form>
    )
}

export default BlogForm