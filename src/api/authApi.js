import apiClient from './apiClient'

export async function loginInternalUser(credentials) {
  const response = await apiClient.post('/api/auth/login', credentials)
  return response.data
}
