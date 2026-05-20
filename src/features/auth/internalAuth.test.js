import {
  clearInternalSession,
  getInternalToken,
  internalAuthEventName,
  readInternalSession,
  saveInternalSession,
} from './internalAuth'

describe('internalAuth', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('saves and reads a valid internal session', () => {
    const listener = vi.fn()
    window.addEventListener(internalAuthEventName, listener)

    saveInternalSession({
      token: 'jwt-token',
      username: 'admin',
      expiresAt: new Date(Date.now() + 60_000).toISOString(),
    })

    expect(readInternalSession()).toMatchObject({
      token: 'jwt-token',
      username: 'admin',
    })
    expect(getInternalToken()).toBe('jwt-token')
    expect(listener).toHaveBeenCalledTimes(1)

    window.removeEventListener(internalAuthEventName, listener)
  })

  it('clears malformed or expired sessions', () => {
    localStorage.setItem('parque-internal-session', '{broken')
    expect(readInternalSession()).toBeNull()
    expect(localStorage.getItem('parque-internal-session')).toBeNull()

    localStorage.setItem(
      'parque-internal-session',
      JSON.stringify({
        token: 'jwt-token',
        expiresAt: new Date(Date.now() - 60_000).toISOString(),
      }),
    )

    expect(readInternalSession()).toBeNull()
    expect(localStorage.getItem('parque-internal-session')).toBeNull()
  })

  it('returns null when there is no session or the stored session has no token', () => {
    expect(readInternalSession()).toBeNull()
    expect(getInternalToken()).toBeNull()

    localStorage.setItem(
      'parque-internal-session',
      JSON.stringify({
        username: 'admin',
        expiresAt: new Date(Date.now() + 60_000).toISOString(),
      }),
    )

    expect(readInternalSession()).toBeNull()
    expect(localStorage.getItem('parque-internal-session')).toBeNull()
  })

  it('clears sessions with invalid expiration dates', () => {
    localStorage.setItem(
      'parque-internal-session',
      JSON.stringify({
        token: 'jwt-token',
        expiresAt: 'not-a-date',
      }),
    )

    expect(readInternalSession()).toBeNull()
    expect(localStorage.getItem('parque-internal-session')).toBeNull()
  })

  it('clears the session and emits the auth event', () => {
    const listener = vi.fn()
    window.addEventListener(internalAuthEventName, listener)
    localStorage.setItem('parque-internal-session', JSON.stringify({ token: 'jwt-token' }))

    clearInternalSession()

    expect(localStorage.getItem('parque-internal-session')).toBeNull()
    expect(listener).toHaveBeenCalledTimes(1)

    window.removeEventListener(internalAuthEventName, listener)
  })

  it('keeps valid sessions without expiration date', () => {
    localStorage.setItem(
      'parque-internal-session',
      JSON.stringify({
        token: 'jwt-token',
        username: 'admin',
      }),
    )

    expect(readInternalSession()).toMatchObject({
      token: 'jwt-token',
      username: 'admin',
    })
  })

  it('returns early when window is not available', () => {
    const originalWindow = global.window

    Reflect.deleteProperty(global, 'window')

    try {
      expect(readInternalSession()).toBeNull()
      expect(getInternalToken()).toBeNull()
      expect(() => saveInternalSession({ token: 'jwt-token' })).not.toThrow()
      expect(() => clearInternalSession()).not.toThrow()
    } finally {
      global.window = originalWindow
    }
  })
})
