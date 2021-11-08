import {
  REQUEST_STATE_ERROR,
  REQUEST_STATE_LOADING,
  REQUEST_STATE_NONE,
} from '../../constantes/constantes'

export function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        isLoggedIn: false,
        user: null,
        requestState: REQUEST_STATE_LOADING,
        errorMessage: '',
      }
    case 'LOGIN_SUCCESS':
      return {
        isLoggedIn: true,
        user: action.payload,
        requestState: REQUEST_STATE_NONE,
        errorMessage: '',
      }

    case 'LOGIN_FAILLURE':
      return {
        isLoggedIn: false,
        user: null,
        requestState: REQUEST_STATE_ERROR,
        errorMessage: '',
      }
    case 'REGISTER_START':
      return {
        isLoggedIn: false,
        user: null,
        requestState: REQUEST_STATE_LOADING,
        errorMessage: '',
      }
    case 'REGISTER_SUCCESS':
      return {
        isLoggedIn: true,
        user: null,
        requestState: REQUEST_STATE_NONE,
        errorMessage: '',
      }

    case 'REGISTER_FAILLURE':
      return {
        isLoggedIn: false,
        user: null,
        requestState: REQUEST_STATE_ERROR,
        errorMessage: '',
      }
    case 'FOLLOW':
      const user = {
        ...state.user,
        followings: [...state.user.followings, action.payload],
      }
      // Je stock le token dans le localStorage
      window.localStorage.setItem('user', JSON.stringify(user))

      return {
        ...state,
        user,
      }
    case 'UNFOLLOW': {
      const user = {
        ...state.user,
        followings: [
          ...state.user.followings.filter((f) => f !== action.payload),
        ],
      }
      // Je stock le token dans le localStorage
      window.localStorage.setItem('user', JSON.stringify(user))

      return {
        ...state,
        user,
      }
    }

    default:
      return state
  }
}
