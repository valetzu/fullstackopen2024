import { useState } from 'react'
const Blog = ({blog, deleteHandler, handleLike}) => {

  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  } 


  const moreInfo = () => {return (
    <div>
      <p>{`URL: ${blog.url}`}</p>
      <p>{blog.user.name}</p>
      <p>Likes: {blog.likes} <button onClick={handleLike}>Like</button></p>
      
    </div>
  )} 
  return (
      <div style={blogStyle}>
        {
        <div>
          
          <h2>{`${blog.title} - ${blog.author}`}</h2>
          
          <div>
            <button onClick={() => {setShowMoreInfo(!showMoreInfo)}}>More info</button>
            <button onClick={deleteHandler}>Delete Blog post</button>
            {showMoreInfo ?
            moreInfo()
            :
            null
            }
            
          </div>
        </div>
         }
      </div>
    )
  }
  
  export default Blog
  