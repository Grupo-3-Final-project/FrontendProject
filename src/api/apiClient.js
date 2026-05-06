import axios from 'axios'

const defaultBaseUrl = 'http://localhost:8080'
const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL ?? defaultBaseUrl
const normalizedBaseUrl = configuredBaseUrl.endsWith('/api')
  ? configuredBaseUrl.slice(0, -4)
  : configuredBaseUrl

const adminSessionStorageKey = 'parqueAdminSession'

const apiClient = axios.create({
  baseURL: normalizedBaseUrl,
})

apiClient.interceptors.request.use((config) => {
  const session = getStoredAdminSession()

  if (session?.token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${session.token}`
  }

  if (!(config.data instanceof FormData) && !config.headers?.['Content-Type']) {
    config.headers = config.headers ?? {}
    config.headers['Content-Type'] = 'application/json'
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
)

export function getStoredAdminSession() {
  if (typeof window === 'undefined') {
    return null
  }

  const rawSession = window.localStorage.getItem(adminSessionStorageKey)

  if (!rawSession) {
    return null
  }

  try {
    return JSON.parse(rawSession)
  } catch {
    window.localStorage.removeItem(adminSessionStorageKey)
    return null
  }
}

export function storeAdminSession(session) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(adminSessionStorageKey, JSON.stringify(session))
}

export function clearAdminSession() {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(adminSessionStorageKey)
}

const translatedMessages = {
  'Invalid credentials': 'Credenciales invalidas.',
  'Invalid user data': 'Los datos del usuario no son validos.',
  'Invalid hotel data': 'Los datos del hotel no son validos.',
  'Invalid attraction data': 'Los datos de la atraccion no son validos.',
  'Invalid employee data': 'Los datos del empleado no son validos.',
  'Invalid booking data': 'Los datos de la reserva no son validos.',
  'Invalid login data': 'Debes indicar usuario y contrasena.',
  'Invalid request data': 'La solicitud no es valida.',
  'User not found': 'No se ha encontrado el usuario solicitado.',
  'Hotel not found': 'No se ha encontrado el hotel solicitado.',
  'Attraction not found': 'No se ha encontrado la atraccion solicitada.',
  'Employee not found': 'No se ha encontrado el empleado solicitado.',
  'Offer not found': 'No se ha encontrado la oferta solicitada.',
  'Booking not found': 'No se ha encontrado la reserva solicitada.',
  'Email already exists': 'Ya existe un registro con ese email.',
  'DNI already exists': 'Ya existe un registro con ese DNI.',
  'Hotel is full': 'El hotel seleccionado no tiene plazas disponibles.',
  'A minor cannot travel without an adult': 'Un menor no puede viajar sin un adulto.',
  'Not enough employees to cover required shifts':
    'No hay suficientes empleados activos para cubrir los turnos.',
  'Not enough technicians available':
    'No hay suficientes tecnicos disponibles para generar mantenimiento.',
  'Authentication is required': 'Necesitas iniciar sesion para acceder a esta seccion.',
  Conflict: 'La operacion entra en conflicto con los datos actuales.',
  'Unexpected error': 'Se ha producido un error inesperado.',
}

export function getApiErrorMessage(error, fallbackMessage = 'No se ha podido completar la operacion.') {
  const responseMessage = error?.response?.data?.message

  if (responseMessage && translatedMessages[responseMessage]) {
    return translatedMessages[responseMessage]
  }

  if (responseMessage) {
    return responseMessage
  }

  if (error?.response?.status === 401) {
    return 'Necesitas iniciar sesion para continuar.'
  }

  if (error?.response?.status === 500) {
    return 'Se ha producido un error interno. Intentalo de nuevo.'
  }

  return fallbackMessage
}

export function isUnauthorizedError(error) {
  return error?.response?.status === 401
}

export default apiClient
