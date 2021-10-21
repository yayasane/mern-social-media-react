export const LoginStart = () => ({
  type: 'LOGIN_START',
})
export const LoginSuccess = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: user,
})
export const LoginFaillure = (error) => ({
  type: 'LOGIN_FAILLURE',
  payload: error,
})

export const Follow = (userId) => ({
  type: 'FOLLOW',
  payload: userId,
})

export const Unfollow = (userId) => ({
  type: 'UNFOLLOW',
  payload: userId,
})
