import apiClient, { getApiErrorMessage } from './apiClient'
import { clearInternalSession, getInternalToken } from '../features/auth/internalAuth'

vi.mock('../features/auth/internalAuth', () => ({
  clearInternalSession: vi.fn(),
  getInternalToken: vi.fn(),
}))

describe('apiClient', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('adds json content type and bearer token when auth is required', async () => {
    getInternalToken.mockReturnValue('jwt-token')

    const config = await apiClient.interceptors.request.handlers[0].fulfilled({
      headers: {},
      data: { id: 1 },
    })

    expect(config.headers['Content-Type']).toBe('application/json')
    expect(config.headers.Authorization).toBe('Bearer jwt-token')
  })

  it('does not override form data or auth when the request skips authentication', async () => {
    const config = await apiClient.interceptors.request.handlers[0].fulfilled({
      skipAuth: true,
      data: new FormData(),
      headers: {},
    })

    expect(config.headers.Authorization).toBeUndefined()
    expect(config.headers['Content-Type']).toBeUndefined()
  })

  it('clears the internal session when backend returns 401', async () => {
    const error = { response: { status: 401 } }

    await expect(apiClient.interceptors.response.handlers[0].rejected(error)).rejects.toBe(error)
    expect(clearInternalSession).toHaveBeenCalledTimes(1)
  })

  it('translates backend error messages and falls back by status code', () => {
    expect(getApiErrorMessage({ response: { data: { message: 'Weather service unavailable' } } }))
      .toBe('No se ha podido consultar el tiempo de Granada.')
    expect(getApiErrorMessage({ response: { status: 401 } }))
      .toBe('No tienes permiso para realizar esta operacion.')
    expect(getApiErrorMessage({ response: { status: 500 } }))
      .toBe('Se ha producido un error interno. Intentalo de nuevo.')
    expect(getApiErrorMessage({}, 'Fallo generico'))
      .toBe('Fallo generico')
  })
})
