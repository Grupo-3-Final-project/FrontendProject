import apiClient from './apiClient'

export async function getDashboardSummary(year) {
  const response = await apiClient.get('/api/dashboard/summary', {
    params: { year },
  })
  return response.data
}
