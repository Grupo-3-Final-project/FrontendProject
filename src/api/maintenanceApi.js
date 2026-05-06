import apiClient from './apiClient'

export async function getMaintenanceTasks() {
  const response = await apiClient.get('/api/maintenance')
  return response.data
}

export async function generateMaintenanceTasks(payload) {
  const response = await apiClient.post('/api/maintenance/generate', payload)
  return response.data
}
