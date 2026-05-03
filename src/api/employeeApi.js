import apiClient from './apiClient'

export const getEmployees = async () => {
  const { data } = await apiClient.get('/employees')
  return data
}

export const getEmployeeById = async (employeeId) => {
  const { data } = await apiClient.get(`/employees/${employeeId}`)
  return data
}

export const createEmployee = async (employeeData) => {
  const { data } = await apiClient.post('/employees', employeeData)
  return data
}

export const updateEmployee = async (employeeId, employeeData) => {
  const { data } = await apiClient.put(`/employees/${employeeId}`, employeeData)
  return data
}

export const deleteEmployee = async (employeeId) => {
  await apiClient.delete(`/employees/${employeeId}`)
}
