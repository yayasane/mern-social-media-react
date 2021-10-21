import { createContext, useReducer } from 'react'
import { authReducer } from './auth.reducer'

const INITIAL_STATE = {
  user: {
    _id: '616da60e2e0a2413fe8278e9',
    username: 'mom',
    email: 'mom@mom.com',
    password: '$2b$10$/nX6mFgSMmePvGnZKYAP/.z7tdIovTVamDZssmwhJ8fUtMCYCltbm',
    profilePicture: 'person/1.jpeg',
    coverPicture: '',
    followers: [],
    followings: [],
  },
  isFetching: false,
  error: false,
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE)
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
