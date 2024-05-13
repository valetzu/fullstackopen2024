import { useState } from 'react'
const Blog = ({blog, handleLike}) => {

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
      <p>Likes: {blog.likes} <button onClick={handleLike}>Like</button></p>
      <p>Creator: {blog.user.name}</p>
    </div>
  )} 
  return (
      <div style={blogStyle}>
        {
        <div>
          
          <h2>{`${blog.title} - ${blog.author}`}</h2>
          
          <div>
            <button onClick={() => {setShowMoreInfo(!showMoreInfo)}}>More info</button>
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
  