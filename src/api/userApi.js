import apiClient from './apiClient'

export async function getUsers() {
  const response = await apiClient.get('/api/users')
  return response.data
}

export async function createUser(payload) {
  const response = await apiClient.post('/api/users', payload)
  return response.data
}

export async function updateUser(id, payload) {
  const response = await apiClient.put(`/api/users/${id}`, payload)
  return response.data
}

export async function deleteUser(id) {
  await apiClient.delete(`/api/users/${id}`)
}
