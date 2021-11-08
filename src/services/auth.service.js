export function isAuthenticated() {
  // 1. Voir si on a un token?
  const token = window.localStorage.getItem('authToken')
  // 2. Si le token est encore valide
  if (token) {
    return true
  }
  return false
}
