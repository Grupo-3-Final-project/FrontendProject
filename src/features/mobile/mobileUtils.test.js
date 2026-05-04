import { buildSuggestedRoute, getProgressMetrics } from './mobileUtils'

const attractions = [
  { id: 1, name: 'A', status: 'OPEN', size: 'LARGE', availableSeats: 20 },
  { id: 2, name: 'B', status: 'OPEN', size: 'MEDIUM', availableSeats: 10 },
  { id: 3, name: 'C', status: 'CLOSED', size: 'SMALL', availableSeats: 30 },
]

describe('mobileUtils', () => {
  it('prioritizes open and incomplete attractions in route', () => {
    const route = buildSuggestedRoute(attractions, [2])

    expect(route.map((attraction) => attraction.id)).toEqual([1, 2])
  })

  it('computes progress metrics from completed attractions', () => {
    const metrics = getProgressMetrics(attractions, [1])

    expect(metrics.totalAttractions).toBe(3)
    expect(metrics.openAttractions).toBe(2)
    expect(metrics.completedAttractions).toBe(1)
    expect(metrics.completionRate).toBe(50)
  })
})
