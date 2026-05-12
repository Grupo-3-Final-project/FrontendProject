import { buildMobilePlan } from './mobilePlan'

describe('buildMobilePlan', () => {
  it('filters visited attractions and sorts available ones by lower wait time', () => {
    const attractions = [
      {
        id: 1,
        name: 'Dragon Coaster',
        description: 'Montana rusa principal',
        status: 'OPEN',
      },
      {
        id: 2,
        name: 'Abyss Wheel',
        description: 'Atraccion giratoria',
        status: 'OPEN',
      },
      {
        id: 3,
        name: 'Fog Tunnel',
        description: 'Recorrido oscuro',
        status: 'MAINTENANCE',
      },
      {
        id: 4,
        name: 'Phantom Boats',
        description: 'Barcas tematicas',
        status: 'OPEN',
      },
    ]

    const randomValues = [0.9, 0.1]
    const plan = buildMobilePlan(attractions, [4], () => randomValues.shift())

    expect(plan.pendingCount).toBe(3)
    expect(plan.availableAttractions.map((attraction) => attraction.name)).toEqual([
      'Abyss Wheel',
      'Dragon Coaster',
    ])
    expect(plan.blockedAttractions.map((attraction) => attraction.name)).toEqual([
      'Fog Tunnel',
    ])
    expect(plan.recommendedAttraction?.name).toBe('Abyss Wheel')
    expect(plan.markers).toHaveLength(2)
  })
})
