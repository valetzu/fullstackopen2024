const Notification = ({message}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: message === '' ? 'none' : 'block'
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}



export default Notification
