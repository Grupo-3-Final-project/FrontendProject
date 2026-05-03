import apiClient from './apiClient'

export const getTicketsByAgeRange = async (year) => {
  const { data } = await apiClient.get('/dashboard/tickets-by-age-range', {
    params: { year },
  })
  return data
}

export const getCurrentYearRevenue = async () => {
  const { data } = await apiClient.get('/dashboard/current-year-revenue')
  return data
}

export const getTopHotels = async (year) => {
  const { data } = await apiClient.get('/dashboard/top-hotels', {
    params: { year },
  })
  return data
}

export const getDashboardSummary = async (year) => {
  const { data } = await apiClient.get('/dashboard/summary', {
    params: { year },
  })
  return data
}
