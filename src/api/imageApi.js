import apiClient from './apiClient'

export const uploadImage = async (file, folder) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('folder', folder)

  const { data } = await apiClient.post('/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return data
}
