import axios from 'axios'
import { createContext, useEffect, useLayoutEffect, useReducer } from 'react'
import { REQUEST_STATE_NONE } from '../../constantes/constantes'
import { LoginSuccess } from './auth.actions'
import { authReducer } from './auth.reducer'

function getUser(userId) {
  return axios
    .get(`${process.env.REACT_APP_API}/users?userId=${userId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err)
    })
}
const user = JSON.parse(localStorage.getItem('user'))

const INITIAL_STATE = user
  ? {
      isLoggedIn: true,
      user,
      requestState: REQUEST_STATE_NONE,
      errorMessage: '',
    }
  : {
      isLoggedIn: false,
      user: null,
      requestState: REQUEST_STATE_NONE,
      errorMessage: '',
    }

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE)

  console.log(user)
  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatchAuth: dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
