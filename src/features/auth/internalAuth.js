const internalSessionStorageKey = 'parque-internal-session'
export const internalAuthEventName = 'parque:internal-auth-changed'

function notifyInternalAuthChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(internalAuthEventName))
  }
}

function isExpired(session) {
  if (!session?.expiresAt) {
    return false
  }

  const expirationDate = new Date(session.expiresAt)
  return Number.isNaN(expirationDate.getTime()) || expirationDate <= new Date()
}

export function readInternalSession() {
  if (typeof window === 'undefined') {
    return null
  }

  const rawSession = window.localStorage.getItem(internalSessionStorageKey)

  if (!rawSession) {
    return null
  }

  try {
    const parsedSession = JSON.parse(rawSession)

    if (!parsedSession?.token || isExpired(parsedSession)) {
      clearInternalSession()
      return null
    }

    return parsedSession
  } catch {
    clearInternalSession()
    return null
  }
}

export function getInternalToken() {
  return readInternalSession()?.token ?? null
}

export function saveInternalSession(session) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(internalSessionStorageKey, JSON.stringify(session))
  notifyInternalAuthChange()
}

export function clearInternalSession() {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(internalSessionStorageKey)
  notifyInternalAuthChange()
}
