import apiClient from './apiClient'

export async function getShifts() {
  const response = await apiClient.get('/api/shifts')
  return response.data
}

export async function generateShifts(payload) {
  const response = await apiClient.post('/api/shifts/generate', payload)
  return response.data
}
