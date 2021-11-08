import axios from 'axios'
import {
  LoginFaillure,
  LoginStart,
  LoginSuccess,
  RegisterFaillure,
  RegisterStart,
  RegisterSuccess,
} from './contexts/auth/auth.actions'

export const loginCall = async (userCredentials, dispatchAuth) => {
  dispatchAuth(LoginStart())
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/auth/login`,
      userCredentials,
    )
    // Je stock le token dans le localStorage
    window.localStorage.setItem('user', JSON.stringify(data))
    dispatchAuth(LoginSuccess(data))
    return true
  } catch (err) {
    dispatchAuth(LoginFaillure(err.message))
    return false
  }
}

export const registerCall = async (userCredentials, dispatchAuth) => {
  dispatchAuth(RegisterStart())
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/auth/register`,
      userCredentials,
    )
    dispatchAuth(RegisterSuccess(data))
    return true
  } catch (err) {
    dispatchAuth(RegisterFaillure(err.message))
    return false
  }
}
