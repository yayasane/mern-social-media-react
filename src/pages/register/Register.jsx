import axios from 'axios'
import { useContext, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { registerCall } from '../../apiCalls'
import { AuthContext } from '../../contexts/auth/AuthContext'
import './register.css'
const Register = () => {
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const passwordAgain = useRef()
  const history = useHistory()
  const { user, requestState, error, dispatchAuth } = useContext(AuthContext)

  const API_URL = process.env.REACT_APP_API

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(password.current.value, passwordAgain.current.value)
    if (password.current.value !== passwordAgain.current.value) {
      // passwordAgain.current.setCustomValidity("Passwords don't match!")
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      ;(await registerCall(user, dispatchAuth)) && history.push('/login')
    }
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Scinsocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Scinsocial.
          </span>
        </div>
        <form className="loginRight" onSubmit={handleSubmit}>
          <div className="loginBox">
            <input
              required
              type="text"
              placeholder="Username"
              className="loginInput"
              ref={username}
            />
            <input
              required
              type="email"
              placeholder="Email"
              className="loginInput"
              ref={email}
            />
            <input
              required
              type="password"
              placeholder="Mot de Passe"
              className="loginInput"
              ref={password}
              minLength="6"
            />
            <input
              required
              type="password"
              placeholder="Confirmation de Mot de Passe"
              className="loginInput"
              ref={passwordAgain}
            />
            <button className="loginButton" type="submit">
              S'inscrire
            </button>
          </div>
          <Link to="/login">
            <button className="loginRegisterButton">Se connecter</button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Register
