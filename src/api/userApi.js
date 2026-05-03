import apiClient from './apiClient'

export const getUsers = async () => {
  const { data } = await apiClient.get('/users')
  return data
}

export const getUserById = async (userId) => {
  const { data } = await apiClient.get(`/users/${userId}`)
  return data
}

export const createUser = async (userData) => {
  const { data } = await apiClient.post('/users', userData)
  return data
}

export const updateUser = async (userId, userData) => {
  const { data } = await apiClient.put(`/users/${userId}`, userData)
  return data
}

export const deleteUser = async (userId) => {
  await apiClient.delete(`/users/${userId}`)
}
