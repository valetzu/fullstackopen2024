const Blog = ({note}) => {
    return (
      <li key={note.id}>
        {note.title}
      </li>
    )
  }
  
  export default Blog
  