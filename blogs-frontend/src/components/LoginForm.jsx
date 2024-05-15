const LoginForm = ({handleLogin, handleUsernameChange, handlePasswordChange, userName, password}) => {
    return (
    <div>
    <h2>Login</h2>
    <form onSubmit={(event) => handleLogin(event)}>
        <div>
          Username <input
          data-testid='username'
          type="text"
          value={userName}
          onChange={ (event) => handleUsernameChange(event) }
          />
        </div>

        <div>
         Password <input
         data-testid='password'
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