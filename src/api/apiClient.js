import axios from 'axios'

const AUTH_STORAGE_KEY = 'parqueInternalSession'

const getDefaultBaseUrl = () => import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

const parseStoredSession = () => {
  if (typeof window === 'undefined') {
    return null
  }

  const rawSession = window.localStorage.getItem(AUTH_STORAGE_KEY)

  if (!rawSession) {
    return null
  }

  try {
    return JSON.parse(rawSession)
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

export const getAuthSession = () => parseStoredSession()

export const getAuthToken = () => parseStoredSession()?.token || null

export const setAuthSession = (session) => {
  if (typeof window === 'undefined') {
    return session
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
  return session
}

export const clearAuthSession = () => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY)
}

const getUserMessage = (status, message) => {
  if (status === 400) {
    return 'Revisa los datos e inténtalo de nuevo.'
  }

  if (status === 401) {
    return message === 'Invalid credentials'
      ? 'Las credenciales no son válidas.'
      : 'Necesitas iniciar sesión para continuar.'
  }

  if (status === 404) {
    return 'No se ha encontrado la información solicitada.'
  }

  if (status === 409) {
    return 'La operación entra en conflicto con una regla del sistema.'
  }

  if (status >= 500) {
    return 'Se ha producido un error interno del servidor.'
  }

  return 'No se ha podido completar la operación.'
}

export const normalizeApiError = (error) => {
  if (error?.isApiError) {
    return error
  }

  if (!error?.response) {
    return {
      isApiError: true,
      status: 0,
      error: 'Network Error',
      message: 'Network error',
      userMessage: 'No se ha podido conectar con el servidor.',
      path: null,
      timestamp: null,
      details: null,
      originalError: error,
    }
  }

  const { status, data } = error.response
  const message = data?.message || error.message || 'Unexpected error'

  return {
    isApiError: true,
    status,
    error: data?.error || 'Error',
    message,
    userMessage: getUserMessage(status, message),
    path: data?.path || null,
    timestamp: data?.timestamp || null,
    details: data || null,
    originalError: error,
  }
}

const apiClient = axios.create({
  baseURL: getDefaultBaseUrl(),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalizedError = normalizeApiError(error)

    if (normalizedError.status === 401) {
      clearAuthSession()
    }

    return Promise.reject(normalizedError)
  },
)

export default apiClient
