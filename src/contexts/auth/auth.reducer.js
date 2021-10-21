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
    case 'FOLLOW':
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      }
    case 'UNFOLLOW':
      return {
        ...state,
        user: {
          ...state.user,
          followings: [
            ...state.user.followings.filter((f) => f !== action.payload),
          ],
        },
      }

    default:
      return state
  }
}
