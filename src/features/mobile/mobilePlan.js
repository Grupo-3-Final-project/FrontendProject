import { markerPositionClasses } from '../../data/MapData'

const minimumWaitTime = 5
const waitTimeRange = 46

export function buildVisitedStorageKey(mobileAccessToken) {
  return `visitor-mobile-visited:${mobileAccessToken}`
}

export function readVisitedAttractions(mobileAccessToken, storage = globalThis.localStorage) {
  if (!mobileAccessToken || !storage) {
    return []
  }

  const rawValue = storage.getItem(buildVisitedStorageKey(mobileAccessToken))

  if (!rawValue) {
    return []
  }

  try {
    const parsedValue = JSON.parse(rawValue)

    if (!Array.isArray(parsedValue)) {
      return []
    }

    return parsedValue
      .map((value) => Number(value))
      .filter((value) => Number.isInteger(value))
  } catch {
    return []
  }
}

export function writeVisitedAttractions(mobileAccessToken, visitedAttractionIds, storage = globalThis.localStorage) {
  if (!mobileAccessToken || !storage) {
    return
  }

  storage.setItem(buildVisitedStorageKey(mobileAccessToken), JSON.stringify(visitedAttractionIds))
}

export function clearVisitedAttractions(mobileAccessToken, storage = globalThis.localStorage) {
  if (!mobileAccessToken || !storage) {
    return
  }

  storage.removeItem(buildVisitedStorageKey(mobileAccessToken))
}

export function buildMobilePlan(attractions, visitedAttractionIds, randomFn = Math.random) {
  const visitedIds = new Set(visitedAttractionIds)

  const pendingAttractions = (attractions ?? [])
    .filter((attraction) => !visitedIds.has(attraction.id))
    .map((attraction, index) => ({
      ...attraction,
      waitMinutes: attraction.status === 'OPEN'
        ? Math.floor(randomFn() * waitTimeRange) + minimumWaitTime
        : null,
      positionClass: markerPositionClasses[index % markerPositionClasses.length],
    }))

  const availableAttractions = pendingAttractions
    .filter((attraction) => attraction.status === 'OPEN')
    .sort((firstAttraction, secondAttraction) => {
      if (firstAttraction.waitMinutes !== secondAttraction.waitMinutes) {
        return firstAttraction.waitMinutes - secondAttraction.waitMinutes
      }

      return firstAttraction.name.localeCompare(secondAttraction.name, 'es')
    })

  const blockedAttractions = pendingAttractions
    .filter((attraction) => attraction.status !== 'OPEN')
    .sort((firstAttraction, secondAttraction) => firstAttraction.name.localeCompare(secondAttraction.name, 'es'))

  return {
    pendingCount: pendingAttractions.length,
    availableAttractions,
    blockedAttractions,
    recommendedAttraction: availableAttractions[0] ?? null,
    markers: availableAttractions.map((attraction) => ({
      id: `attraction-${attraction.id}`,
      name: attraction.name,
      waitTime: attraction.waitMinutes,
      positionClass: attraction.positionClass,
    })),
  }
}
