import apiClient from './apiClient'

export const getShifts = async () => {
  const { data } = await apiClient.get('/shifts')
  return data
}

export const generateShifts = async (shiftWindow) => {
  const { data } = await apiClient.post('/shifts/generate', shiftWindow)
  return data
}
