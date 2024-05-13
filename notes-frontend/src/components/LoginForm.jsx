
import PropTypes from 'prop-types'
const LoginForm = ({ handleLogin, handleUsernameChange, handlePasswordChange, userName, password }) => {
  return (
    <div>
      <h2>Login</h2>
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

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm