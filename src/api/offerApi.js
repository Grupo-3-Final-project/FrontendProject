import apiClient from './apiClient'

export const getOffers = async () => {
  const { data } = await apiClient.get('/offers')
  return data
}

export const getOfferById = async (offerId) => {
  const { data } = await apiClient.get(`/offers/${offerId}`)
  return data
}

export const createOffer = async (offerData) => {
  const { data } = await apiClient.post('/offers', offerData)
  return data
}
