import './login.css'
const Login = () => {
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
          <div className="loginBox">
            <input placeholder="Email" className="loginInput" />
            <input placeholder="Mot de Passe" className="loginInput" />
            <button className="loginButton">Se connecter</button>
            <span className="loginForgot">Mot de passe oublié?</span>
            <button className="loginRegisterButton">
              Créer un nouveau compte
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
