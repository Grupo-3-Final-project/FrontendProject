import apiClient from './apiClient'

export const getHotels = async () => {
  const { data } = await apiClient.get('/hotels')
  return data
}

export const getHotelById = async (hotelId) => {
  const { data } = await apiClient.get(`/hotels/${hotelId}`)
  return data
}

export const createHotel = async (hotelData) => {
  const { data } = await apiClient.post('/hotels', hotelData)
  return data
}

export const updateHotel = async (hotelId, hotelData) => {
  const { data } = await apiClient.put(`/hotels/${hotelId}`, hotelData)
  return data
}

export const deleteHotel = async (hotelId) => {
  await apiClient.delete(`/hotels/${hotelId}`)
}
