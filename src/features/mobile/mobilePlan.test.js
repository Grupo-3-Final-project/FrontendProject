import {
  buildMobilePlan,
  buildVisitedStorageKey,
  clearVisitedAttractions,
  readVisitedAttractions,
  writeVisitedAttractions,
} from './mobilePlan'

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

  it('returns a stable storage key and persists visited attractions', () => {
    const storage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    }

    expect(buildVisitedStorageKey('token-123')).toBe('visitor-mobile-visited:token-123')

    writeVisitedAttractions('token-123', [2, 5], storage)
    expect(storage.setItem).toHaveBeenCalledWith('visitor-mobile-visited:token-123', '[2,5]')

    clearVisitedAttractions('token-123', storage)
    expect(storage.removeItem).toHaveBeenCalledWith('visitor-mobile-visited:token-123')
  })

  it('reads visited attractions defensively when storage data is missing or invalid', () => {
    const storage = {
      getItem: vi.fn()
        .mockReturnValueOnce(null)
        .mockReturnValueOnce('"bad-json"')
        .mockReturnValueOnce('[1,"2","foo",3.4,4]'),
    }

    expect(readVisitedAttractions('', storage)).toEqual([])
    expect(readVisitedAttractions('token-123', storage)).toEqual([])
    expect(readVisitedAttractions('token-123', storage)).toEqual([])
    expect(readVisitedAttractions('token-123', storage)).toEqual([1, 2, 4])
  })

  it('separates blocked attractions and resolves ties alphabetically', () => {
    const attractions = [
      {
        id: 1,
        name: 'Casa del Miedo',
        description: 'Recorrido guiado',
        status: 'MAINTENANCE',
      },
      {
        id: 2,
        name: 'Bosque Oscuro',
        description: 'Paseo inmersivo',
        status: 'CLOSED',
      },
      {
        id: 3,
        name: 'Anillo Maldito',
        description: 'Atraccion giratoria',
        status: 'OPEN',
      },
      {
        id: 4,
        name: 'Barca Fantasma',
        description: 'Canal tematico',
        status: 'OPEN',
      },
    ]

    const plan = buildMobilePlan(attractions, [], () => 0)

    expect(plan.availableAttractions.map((attraction) => attraction.name)).toEqual([
      'Anillo Maldito',
      'Barca Fantasma',
    ])
    expect(plan.blockedAttractions.map((attraction) => attraction.name)).toEqual([
      'Bosque Oscuro',
      'Casa del Miedo',
    ])
    expect(plan.recommendedAttraction?.waitMinutes).toBe(5)
    expect(plan.markers[0]).toMatchObject({
      id: 'attraction-3',
      name: 'Anillo Maldito',
      waitTime: 5,
    })
  })

  it('returns an empty plan when there are no pending open attractions', () => {
    const plan = buildMobilePlan(
      [
        { id: 1, name: 'Dragon Coaster', status: 'OPEN' },
        { id: 2, name: 'Niebla Roja', status: 'MAINTENANCE' },
      ],
      [1],
      () => 0.5,
    )

    expect(plan.pendingCount).toBe(1)
    expect(plan.availableAttractions).toEqual([])
    expect(plan.recommendedAttraction).toBeNull()
    expect(plan.markers).toEqual([])
    expect(plan.blockedAttractions.map((attraction) => attraction.name)).toEqual(['Niebla Roja'])
  })
})
