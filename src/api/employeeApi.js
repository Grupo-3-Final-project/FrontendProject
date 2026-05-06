import apiClient from './apiClient'

export async function getEmployees() {
  const response = await apiClient.get('/api/employees')
  return response.data
}

export async function createEmployee(payload) {
  const response = await apiClient.post('/api/employees', payload)
  return response.data
}

export async function updateEmployee(id, payload) {
  const response = await apiClient.put(`/api/employees/${id}`, payload)
  return response.data
}

export async function deleteEmployee(id) {
  await apiClient.delete(`/api/employees/${id}`)
}
