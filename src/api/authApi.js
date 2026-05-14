import apiClient from './apiClient'

export async function loginInternal(payload) {
  const response = await apiClient.post('/api/auth/login', payload, {
    skipAuth: true,
  })

  return response.data
}
