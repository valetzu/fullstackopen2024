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
    setNewAuthor('')
    setNewUrl('')
    
  }   
  return(
        <form onSubmit={addBlog}>
        <h3>Title</h3>
        <input 
        data-testid='titlebox'
        id="titleTextBox"
        value={newTitle} 
        onChange={({ target }) => { setNewTitle(target.value)}}/>
        <h3>Author</h3>
        <input
        data-testid='authorbox'
        value={newAuthor} 
        onChange={({ target }) => { setNewAuthor(target.value)}}/>
        <h3>URL</h3>
        <input 
        data-testid='urlbox'
        value={newUrl} 
        onChange={({ target }) => { setNewUrl(target.value)}}/>
      <button type="submit">save</button>
    </form>
    )
}

export default BlogForm