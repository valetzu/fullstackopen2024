import { useSelector, useDispatch } from 'react-redux'
import { notificationChange } from '../reducers/notificationReducer.js'
const Notification = () => {
  
  const message = useSelector(state => state.notification.toString())
  const dispatch = useDispatch()
  dispatch(notificationChange('This is a test notification'))

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
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