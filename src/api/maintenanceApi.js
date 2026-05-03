import apiClient from './apiClient'

export const getMaintenanceTasks = async () => {
  const { data } = await apiClient.get('/maintenance')
  return data
}

export const generateMaintenanceSchedule = async (maintenanceWindow) => {
  const { data } = await apiClient.post('/maintenance/generate', maintenanceWindow)
  return data
}
