import apiClient from './apiClient'

export async function getOffers() {
  const response = await apiClient.get('/api/offers')
  return response.data
}
