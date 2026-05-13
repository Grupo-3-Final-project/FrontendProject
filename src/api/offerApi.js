import apiClient from './apiClient'

export async function getOffers() {
  const response = await apiClient.get('/api/offers')
  return response.data
}

export async function createOffer(offer) {
  const response = await apiClient.post('/api/offers', offer)
  return response.data
}

export async function updateOffer(id, offer) {
  const response = await apiClient.put(`/api/offers/${id}`, offer)
  return response.data
}

export async function deleteOffer(id) {
  await apiClient.delete(`/api/offers/${id}`)
}
