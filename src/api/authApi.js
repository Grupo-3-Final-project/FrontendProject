import apiClient, { clearAuthSession, getAuthSession, getAuthToken, setAuthSession } from './apiClient'

export const login = async (credentials) => {
  const { data } = await apiClient.post('/auth/login', credentials)
  return setAuthSession(data)
}

export const logout = () => {
  clearAuthSession()
}

export const getStoredSession = () => getAuthSession()

export const isAuthenticated = () => Boolean(getAuthToken())
