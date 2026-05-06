import apiClient from './apiClient'

export async function getBookings() {
  const response = await apiClient.get('/api/bookings')
  return response.data
}

export async function createBooking(payload) {
  const response = await apiClient.post('/api/bookings', payload)
  return response.data
}
