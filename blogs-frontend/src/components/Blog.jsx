import { useState } from 'react'
const Blog = ({blog, handleLike}) => {

  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    
  } 
  const additionalInfoStyle = {
    display: showMoreInfo ? 'block' : 'none'
  }


  const moreInfo = () => {return (
    <div id="moreInfoParent" className="testing" style={additionalInfoStyle}>
      <p>{`${blog.url}`}</p>
      <p>Likes:{blog.likes} <button onClick={handleLike}>Like</button></p>
      <p>Creator: {blog.user.name}</p>
    </div>
  )} 
  return (
      <div style={blogStyle}>
        {
        <div>
          
          <h2>{`${blog.title}`}</h2>
          <h3>{`${blog.author}`}</h3>
          
          <div>
            <button onClick={() => {setShowMoreInfo(!showMoreInfo)}}>More info</button>
            
            {moreInfo()}
            
            
          </div>
        </div>
         }
      </div>
    )
  }
  
  export default Blog
  