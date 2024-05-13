import Notification from "./Notification"


const LoginForm = ({handleLogin, handleUsernameChange, handlePasswordChange, userName, password, errorMessage}) => {
    return (
    <div>
    <h2>Login</h2>
    <Notification message={errorMessage} type="error"/>
    <form onSubmit={(event) => handleLogin(event)}>
        <div>
          Username <input 
          type="text"
          value={userName}
          onChange={ (event) => handleUsernameChange(event) }
          />
        </div>

        <div>
         Password <input 
          type="text"
          value={password}
          onChange={ (event) => handlePasswordChange(event) }
          />
        </div>
        <button type="submit">login</button>
      </form>
      </div>
  )
}

export default LoginForm