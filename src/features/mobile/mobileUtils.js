export const getStatusLabel = (status) => {
  if (status === 'OPEN') {
    return 'Abierta'
  }

  if (status === 'MAINTENANCE') {
    return 'Mantenimiento'
  }

  if (status === 'CLOSED') {
    return 'Cerrada'
  }

  return status
}

export const getSizeLabel = (size) => {
  if (size === 'LARGE') {
    return 'Grande'
  }

  if (size === 'MEDIUM') {
    return 'Media'
  }

  if (size === 'SMALL') {
    return 'Pequena'
  }

  return size
}

const statusOrder = {
  OPEN: 0,
  MAINTENANCE: 1,
  CLOSED: 2,
}

const sizeOrder = {
  LARGE: 0,
  MEDIUM: 1,
  SMALL: 2,
}

export const buildSuggestedRoute = (attractions, completedIds) =>
  attractions
    .filter((attraction) => attraction.status === 'OPEN')
    .sort((left, right) => {
      const leftCompleted = completedIds.includes(left.id) ? 1 : 0
      const rightCompleted = completedIds.includes(right.id) ? 1 : 0

      if (leftCompleted !== rightCompleted) {
        return leftCompleted - rightCompleted
      }

      const leftStatus = statusOrder[left.status] ?? 99
      const rightStatus = statusOrder[right.status] ?? 99

      if (leftStatus !== rightStatus) {
        return leftStatus - rightStatus
      }

      const leftSize = sizeOrder[left.size] ?? 99
      const rightSize = sizeOrder[right.size] ?? 99

      if (leftSize !== rightSize) {
        return leftSize - rightSize
      }

      return right.availableSeats - left.availableSeats
    })

export const getProgressMetrics = (attractions, completedIds) => {
  const openAttractions = attractions.filter((attraction) => attraction.status === 'OPEN')
  const completedOpenAttractions = openAttractions.filter((attraction) => completedIds.includes(attraction.id))

  return {
    totalAttractions: attractions.length,
    openAttractions: openAttractions.length,
    completedAttractions: completedOpenAttractions.length,
    completionRate:
      openAttractions.length > 0
        ? Math.round((completedOpenAttractions.length / openAttractions.length) * 100)
        : 0,
  }
}
