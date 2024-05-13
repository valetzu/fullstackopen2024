const Blog = ({blog, deleteHandler}) => {
    return (
      <li key={blog.id}>
        {
        <div>
          
          <h2>{blog.title}</h2>
          
          <span>
            <p>{`Author: ${blog.author}, URL: ${blog.url}`}
            <button onClick={deleteHandler}>Delete Blog post</button>
            </p>
          </span>
        </div>
         }
      </li>
    )
  }
  
  export default Blog
  