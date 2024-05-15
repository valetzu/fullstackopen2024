const Notification = ({ message, type }) => {
  let cssClassName = "notification"
  switch(type){
    case "success":
      cssClassName += " notification-success"
      break
    case "error":
      cssClassName += " notification-error"
      break
    default:
      cssClassName = " notification"
      break
  }
  if (message === null) {
    return null
  }

  return (
    <div className={"notification" + cssClassName}>
      {message}
    </div>
  )
}

export default Notification
