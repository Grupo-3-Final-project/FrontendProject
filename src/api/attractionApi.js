import apiClient from './apiClient'

export async function getAttractions() {
  const response = await apiClient.get('/api/attractions')
  return response.data
}

export async function createAttraction(payload) {
  const response = await apiClient.post('/api/attractions', payload)
  return response.data
}

export async function updateAttraction(id, payload) {
  const response = await apiClient.put(`/api/attractions/${id}`, payload)
  return response.data
}

export async function deleteAttraction(id) {
  await apiClient.delete(`/api/attractions/${id}`)
}
