import apiClient from './apiClient'

export async function getHotels() {
  const response = await apiClient.get('/api/hotels')
  return response.data
}

export async function createHotel(payload) {
  const response = await apiClient.post('/api/hotels', payload)
  return response.data
}

export async function updateHotel(id, payload) {
  const response = await apiClient.put(`/api/hotels/${id}`, payload)
  return response.data
}

export async function deleteHotel(id) {
  await apiClient.delete(`/api/hotels/${id}`)
}
