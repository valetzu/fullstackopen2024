import { useSelector, useDispatch } from 'react-redux'
import { notificationChange } from '../reducers/notificationReducer.js'
const Notification = () => {
  
  const message = useSelector(state => state.notification.toString())
  

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: message === '' ? 'none' : 'block'
  }
  
  return (
    <>
      <div style={style}>
        {message}
      </div>
    </>
  )
}

export default Notification