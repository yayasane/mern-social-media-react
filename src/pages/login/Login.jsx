import { CircularProgress } from '@mui/material'
import { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { loginCall } from '../../apiCalls'
import { REQUEST_STATE_LOADING } from '../../constantes/constantes'
import { AuthContext } from '../../contexts/auth/AuthContext'
import './login.css'
const Login = () => {
  const { user, requestState, error, dispatchAuth } = useContext(AuthContext)
  const email = useRef()
  const password = useRef()
  const handleClick = (e) => {
    e.preventDefault()
    /* const isAuth = await */ loginCall(
      { email: email.current.value, password: password.current.value },
      dispatchAuth,
    )
    // isAuth && setIsAuthenticated(true)
  }
  console.log(user)
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Scinsocial</h3>
          <span className="loginDesc">
            Connectez-vous avec vos amis et le monde qui vous entoure sur
            Scinsocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              required
              ref={email}
            />
            <input
              type="password"
              placeholder="Mot de Passe"
              required
              min={6}
              className="loginInput"
              ref={password}
            />
            <button
              className="loginButton"
              type="submit"
              disabled={requestState === REQUEST_STATE_LOADING}
            >
              {requestState === REQUEST_STATE_LOADING ? (
                <CircularProgress color="inherit" size="15px" />
              ) : (
                'Se connecter'
              )}
            </button>
            <span className="loginForgot">Mot de passe oublié?</span>
          </form>
          <Link to="/register">
            <button
              className="loginRegisterButton"
              disabled={requestState === REQUEST_STATE_LOADING}
            >
              {requestState === REQUEST_STATE_LOADING ? (
                <CircularProgress color="inherit" size="15px" />
              ) : (
                'Créer un nouveau compte'
              )}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
