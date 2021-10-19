import './register.css'
const Register = () => {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Scinsocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Scinsocial.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="Username" className="loginInput" />
            <input placeholder="Email" className="loginInput" />
            <input placeholder="Mot de Passe" className="loginInput" />
            <input
              placeholder="Confirmation de Mot de Passe"
              className="loginInput"
            />
            <button className="loginButton">S'inscrire</button>
            <button className="loginRegisterButton">Se connecter</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
