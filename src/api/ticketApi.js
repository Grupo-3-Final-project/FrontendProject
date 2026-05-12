import apiClient from './apiClient'

export async function getMobileAccess(mobileAccessToken) {
  const response = await apiClient.get(`/api/tickets/mobile/${mobileAccessToken}`)
  return response.data
}

export async function validateEntry(entryToken) {
  const response = await apiClient.post(`/api/tickets/entry/${entryToken}/validate`)
  return response.data
}
