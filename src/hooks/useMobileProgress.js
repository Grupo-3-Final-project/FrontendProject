import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'parqueCompletedAttractions'

const readStoredIds = () => {
  if (typeof window === 'undefined') {
    return []
  }

  const rawValue = window.localStorage.getItem(STORAGE_KEY)

  if (!rawValue) {
    return []
  }

  try {
    const parsedValue = JSON.parse(rawValue)
    return Array.isArray(parsedValue) ? parsedValue : []
  } catch {
    window.localStorage.removeItem(STORAGE_KEY)
    return []
  }
}

function useMobileProgress() {
  const [completedIds, setCompletedIds] = useState(readStoredIds)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completedIds))
  }, [completedIds])

  const completedSet = useMemo(() => new Set(completedIds), [completedIds])

  return {
    completedIds,
    completedSet,
    isCompleted: (attractionId) => completedSet.has(attractionId),
    toggleCompleted: (attractionId) =>
      setCompletedIds((currentValue) =>
        currentValue.includes(attractionId)
          ? currentValue.filter((currentId) => currentId !== attractionId)
          : [...currentValue, attractionId],
      ),
    clearCompleted: () => setCompletedIds([]),
  }
}

export default useMobileProgress
