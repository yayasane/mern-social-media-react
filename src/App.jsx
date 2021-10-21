import { useContext } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import { AuthContext } from './contexts/auth/AuthContext'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'
import Register from './pages/register/Register'

function App() {
  const { user } = useContext(AuthContext)
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={user ? Home : Register} />
        <Route path="/login" component={user ? Home : Login} />
        <Route path="/register" component={user ? Home : Register} />
        <Route path="/profile/:username" component={user ? Profile : Login} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default App
