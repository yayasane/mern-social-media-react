export function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        isFetching: true,
        error: false,
      }
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      }

    case 'LOGIN_FAILLURE':
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      }

    default:
      return state
  }
}
