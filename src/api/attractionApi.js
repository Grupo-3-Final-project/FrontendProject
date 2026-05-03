import apiClient from './apiClient'

export const getAttractions = async () => {
  const { data } = await apiClient.get('/attractions')
  return data
}

export const getAttractionById = async (attractionId) => {
  const { data } = await apiClient.get(`/attractions/${attractionId}`)
  return data
}

export const createAttraction = async (attractionData) => {
  const { data } = await apiClient.post('/attractions', attractionData)
  return data
}

export const updateAttraction = async (attractionId, attractionData) => {
  const { data } = await apiClient.put(`/attractions/${attractionId}`, attractionData)
  return data
}

export const deleteAttraction = async (attractionId) => {
  await apiClient.delete(`/attractions/${attractionId}`)
}
