import apiClient from './apiClient'

export async function getGranadaWeather() {
  const response = await apiClient.get('/api/weather/granada')
  return response.data
}
