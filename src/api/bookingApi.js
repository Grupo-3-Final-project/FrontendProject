import apiClient from './apiClient'

export const createBooking = async (bookingData) => {
  const { data } = await apiClient.post('/bookings', bookingData)
  return data
}

export const getBookings = async () => {
  const { data } = await apiClient.get('/bookings')
  return data
}

export const getBookingById = async (bookingId) => {
  const { data } = await apiClient.get(`/bookings/${bookingId}`)
  return data
}
