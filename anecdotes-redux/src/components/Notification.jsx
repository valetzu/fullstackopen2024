import { useSelector } from 'react-redux'
const Notification = () => {
  
  const message = useSelector(state => state.notification.toString())
  

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: message === '' ? 'none' : 'inline'
  }
  
  return (
      <div style={style}>
        {message}
      </div>
  )
}

export default Notification