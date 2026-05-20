import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { getAttractions } from '../api/attractionApi'
import { getHotels } from '../api/hotelApi'
import { getOffers } from '../api/offerApi'
import { getGranadaWeather } from '../api/weatherApi'
import HomePage from './HomePage'

vi.mock('../api/attractionApi', () => ({
  getAttractions: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: 'Dragon Coaster',
      description: 'Montana rusa principal del parque.',
      status: 'OPEN',
      size: 'LARGE',
      totalSeats: 32,
      availableSeats: 28,
      maintenanceFrequencyDays: 7,
      imageUrl: 'https://example.com/dragon.jpg',
    },
  ]),
}))

vi.mock('../api/hotelApi', () => ({
  getHotels: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: 'Hotel Magic Park',
      description: 'Hotel familiar situado junto al parque.',
      totalRooms: 120,
      availableRooms: 85,
      totalPlaces: 240,
      availablePlaces: 170,
      halfBoardPrice: 80,
      fullBoardPrice: 120,
      imageUrl: 'https://example.com/hotel.jpg',
    },
  ]),
}))

vi.mock('../api/offerApi', () => ({
  getOffers: vi.fn().mockResolvedValue([
    {
      id: 1,
      title: 'Pack familiar',
      description: 'Hotel y entradas para cuatro personas.',
      hotelName: 'Hotel Magic Park',
      boardType: 'FULL_BOARD',
      includedTickets: 4,
      totalPrice: 399.99,
      imageUrl: 'https://example.com/offer.jpg',
    },
  ]),
}))

vi.mock('../api/weatherApi', () => ({
  getGranadaWeather: vi.fn().mockResolvedValue({
    city: 'Granada',
    temperatureCelsius: 23.6,
    apparentTemperatureCelsius: 24.2,
    condition: 'Despejado',
    day: true,
    updatedAt: '2026-05-13T14:30:00',
  }),
}))

describe('HomePage', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders live catalog data from backend services', async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    await screen.findByRole('heading', { level: 1, name: /Cruza la puerta/i })

    await waitFor(() => {
      expect(screen.getAllByText('Dragon Coaster').length).toBeGreaterThan(0)
      expect(screen.getAllByText('Hotel Magic Park').length).toBeGreaterThan(0)
      expect(screen.getByText('Pack familiar')).toBeInTheDocument()
      expect(screen.getByText('Granada - 24 C')).toBeInTheDocument()
      expect(screen.getAllByText('Mapa visual orientativo').length).toBeGreaterThan(0)
    })

    const mapSelectors = screen.getAllByRole('button', { name: 'Destacar Dragon Coaster en el mapa' })

    expect(mapSelectors.length).toBe(2)

    fireEvent.click(mapSelectors[0])

    mapSelectors.forEach((selector) => {
      expect(selector).toHaveAttribute('aria-pressed', 'true')
    })
  })

  it('shows a controlled error and fallback weather when the public catalog cannot be loaded', async () => {
    getAttractions.mockRejectedValueOnce({
      response: {
        data: {
          message: 'Catalog unavailable',
        },
      },
    })
    getGranadaWeather.mockRejectedValueOnce(new Error('Weather offline'))

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect((await screen.findAllByText(/Cat..logo no disponible|No se han podido cargar los datos/i)).length).toBeGreaterThan(0)
    expect(screen.getAllByText('Catalog unavailable').length).toBeGreaterThan(0)
    expect(screen.getByText('Granada - Sin datos')).toBeInTheDocument()
  })

  it('scrolls to the requested sections from the primary public CTAs', async () => {
    const attractionsSection = document.createElement('section')
    attractionsSection.id = 'atracciones'
    attractionsSection.scrollIntoView = vi.fn()
    document.body.appendChild(attractionsSection)

    const visitSection = document.createElement('section')
    visitSection.id = 'visita'
    visitSection.scrollIntoView = vi.fn()
    document.body.appendChild(visitSection)

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    await screen.findByRole('heading', { level: 1, name: /Cruza la puerta/i })

    screen.getByRole('button', { name: 'Ver atracciones' }).click()
    screen.getByRole('button', { name: 'Planificar visita' }).click()

    expect(attractionsSection.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    })
    expect(visitSection.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    })

    attractionsSection.remove()
    visitSection.remove()
  })

  it('plays the trailer and scrolls to the visit section from the primary trailer CTA', async () => {
    const visitSection = document.createElement('section')
    visitSection.id = 'visita'
    visitSection.scrollIntoView = vi.fn()
    document.body.appendChild(visitSection)

    const playSpy = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue()

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    await screen.findByRole('heading', { level: 1, name: /Cruza la puerta/i })

    fireEvent.click(screen.getByRole('button', { name: 'Ver tráiler' }))

    expect(visitSection.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    })
    expect(playSpy).toHaveBeenCalledTimes(1)

    playSpy.mockRestore()
    visitSection.remove()
  })

  it('keeps the page stable when trailer playback rejects', async () => {
    const visitSection = document.createElement('section')
    visitSection.id = 'visita'
    visitSection.scrollIntoView = vi.fn()
    document.body.appendChild(visitSection)

    const playSpy = vi.spyOn(HTMLMediaElement.prototype, 'play').mockRejectedValueOnce(new Error('Playback blocked'))

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    await screen.findByRole('heading', { level: 1, name: /Cruza la puerta/i })

    expect(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Ver tráiler' }))
    }).not.toThrow()

    expect(playSpy).toHaveBeenCalledTimes(1)

    playSpy.mockRestore()
    visitSection.remove()
  })

  it('renders empty catalog messages when the public catalog is available but has no records', async () => {
    getAttractions.mockResolvedValueOnce([])
    getHotels.mockResolvedValueOnce([])
    getOffers.mockResolvedValueOnce([])

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(await screen.findByText('Sin atracciones')).toBeInTheDocument()
    expect(screen.getByText('Sin hoteles')).toBeInTheDocument()
    expect(screen.getByText('Sin ofertas')).toBeInTheDocument()
  })

  it('renders the multi-slide public catalog when several records are available', async () => {
    getAttractions.mockResolvedValueOnce([
      {
        id: 1,
        name: 'Dragon Coaster',
        description: 'Montana rusa principal del parque.',
        status: 'OPEN',
        size: 'LARGE',
        totalSeats: 32,
        availableSeats: 28,
        maintenanceFrequencyDays: 7,
        imageUrl: 'https://example.com/dragon.jpg',
      },
      {
        id: 2,
        name: 'Fog Tunnel',
        description: 'Recorrido oscuro.',
        status: 'MAINTENANCE',
        size: 'SMALL',
        totalSeats: 16,
        availableSeats: 0,
        maintenanceFrequencyDays: 21,
        imageUrl: 'https://example.com/fog.jpg',
      },
      {
        id: 3,
        name: 'Abyss Wheel',
        description: 'Atraccion giratoria.',
        status: 'CLOSED',
        size: 'MEDIUM',
        totalSeats: 18,
        availableSeats: 0,
        maintenanceFrequencyDays: 14,
        imageUrl: 'https://example.com/abyss.jpg',
      },
    ])
    getHotels.mockResolvedValueOnce([
      {
        id: 1,
        name: 'Hotel Magic Park',
        description: 'Hotel familiar situado junto al parque.',
        totalRooms: 120,
        availableRooms: 85,
        totalPlaces: 240,
        availablePlaces: 170,
        halfBoardPrice: 80,
        fullBoardPrice: 120,
        imageUrl: 'https://example.com/hotel.jpg',
      },
      {
        id: 2,
        name: 'Hotel Sombra',
        description: 'Segundo hotel.',
        totalRooms: 60,
        availableRooms: 40,
        totalPlaces: 120,
        availablePlaces: 90,
        halfBoardPrice: 70,
        fullBoardPrice: 110,
        imageUrl: 'https://example.com/hotel-2.jpg',
      },
      {
        id: 3,
        name: 'Hotel Eclipse',
        description: 'Tercer hotel.',
        totalRooms: 40,
        availableRooms: 25,
        totalPlaces: 80,
        availablePlaces: 50,
        halfBoardPrice: 65,
        fullBoardPrice: 105,
        imageUrl: 'https://example.com/hotel-3.jpg',
      },
    ])

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    await screen.findByRole('heading', { level: 1, name: /Cruza la puerta/i })

    expect(screen.getAllByText('Dragon Coaster').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Fog Tunnel').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Abyss Wheel').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Hotel Magic Park').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Hotel Sombra').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Hotel Eclipse').length).toBeGreaterThan(0)
    expect(screen.getAllByText('En mantenimiento').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Cerrada').length).toBeGreaterThan(0)
  })

  it('renders the offer carousel navigation and rotates through multiple public offers', async () => {
    getOffers.mockResolvedValueOnce([
      {
        id: 1,
        title: 'Pack familiar',
        description: 'Hotel y entradas para cuatro personas.',
        hotelName: 'Hotel Magic Park',
        boardType: 'FULL_BOARD',
        includedTickets: 4,
        totalPrice: 399.99,
        imageUrl: 'https://example.com/offer.jpg',
      },
      {
        id: 2,
        title: 'Pack nocturno',
        description: 'Hotel y entradas para dos personas.',
        hotelName: 'Hotel Sombra',
        boardType: 'HALF_BOARD',
        includedTickets: 2,
        totalPrice: 199.99,
        imageUrl: 'https://example.com/offer-2.jpg',
      },
    ])

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    await screen.findByRole('heading', { level: 1, name: /Cruza la puerta/i })

    expect(screen.getAllByText(/Pack familiar|Pack nocturno/).length).toBeGreaterThan(1)

    fireEvent.click(screen.getByRole('button', { name: 'Ver elemento siguiente de ofertas' }))

    expect(screen.getByText('Pack nocturno')).toBeInTheDocument()
    expect(screen.getAllByText('Pensión completa').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Media pensión').length).toBeGreaterThan(0)
  })

  it('falls back to the raw attraction status when the public catalog returns an unknown state', async () => {
    getAttractions.mockResolvedValueOnce([
      {
        id: 1,
        name: 'Galeria Zero',
        description: 'Experiencia experimental.',
        status: 'PAUSED',
        size: 'MEDIUM',
        totalSeats: 20,
        availableSeats: 10,
        maintenanceFrequencyDays: 14,
        imageUrl: 'https://example.com/galeria.jpg',
      },
    ])

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    await screen.findByRole('heading', { level: 1, name: /Cruza la puerta/i })

    expect(screen.getAllByText('PAUSED').length).toBeGreaterThan(0)
  })

  it('shows the loading state before the public catalog resolves', async () => {
    let resolveAttractions
    let resolveHotels
    let resolveOffers

    getAttractions.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveAttractions = resolve
        }),
    )
    getHotels.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveHotels = resolve
        }),
    )
    getOffers.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveOffers = resolve
        }),
    )

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect((await screen.findAllByText('Cargando datos')).length).toBeGreaterThan(0)

    resolveAttractions([
      {
        id: 1,
        name: 'Dragon Coaster',
        description: 'Montana rusa principal del parque.',
        status: 'OPEN',
        size: 'LARGE',
        totalSeats: 32,
        availableSeats: 28,
        maintenanceFrequencyDays: 7,
        imageUrl: 'https://example.com/dragon.jpg',
      },
    ])
    resolveHotels([
      {
        id: 1,
        name: 'Hotel Magic Park',
        description: 'Hotel familiar situado junto al parque.',
        totalRooms: 120,
        availableRooms: 85,
        totalPlaces: 240,
        availablePlaces: 170,
        halfBoardPrice: 80,
        fullBoardPrice: 120,
        imageUrl: 'https://example.com/hotel.jpg',
      },
    ])
    resolveOffers([
      {
        id: 1,
        title: 'Pack familiar',
        description: 'Hotel y entradas para cuatro personas.',
        hotelName: 'Hotel Magic Park',
        boardType: 'FULL_BOARD',
        includedTickets: 4,
        totalPrice: 399.99,
        imageUrl: 'https://example.com/offer.jpg',
      },
    ])

    await waitFor(() => {
      expect(screen.getAllByText('Dragon Coaster').length).toBeGreaterThan(0)
    })
  })

  it('shows the generic home error when the catalog loader throws before settling', async () => {
    const allSettledSpy = vi.spyOn(Promise, 'allSettled').mockRejectedValueOnce(new Error('Unexpected loader failure'))

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect((await screen.findAllByText('No se ha podido cargar la home.')).length).toBeGreaterThan(0)
    expect(screen.getByText('Granada - Sin datos')).toBeInTheDocument()

    allSettledSpy.mockRestore()
  })

  it('renders the two-slide carousel variants for attractions and hotels', async () => {
    getAttractions.mockResolvedValueOnce([
      {
        id: 1,
        name: 'Dragon Coaster',
        description: 'Montana rusa principal del parque.',
        status: 'OPEN',
        size: 'LARGE',
        totalSeats: 32,
        availableSeats: 28,
        maintenanceFrequencyDays: 7,
        imageUrl: 'https://example.com/dragon.jpg',
      },
      {
        id: 2,
        name: 'Fog Tunnel',
        description: 'Recorrido oscuro.',
        status: 'MAINTENANCE',
        size: 'SMALL',
        totalSeats: 16,
        availableSeats: 0,
        maintenanceFrequencyDays: 21,
        imageUrl: 'https://example.com/fog.jpg',
      },
    ])
    getHotels.mockResolvedValueOnce([
      {
        id: 1,
        name: 'Hotel Magic Park',
        description: 'Hotel familiar situado junto al parque.',
        totalRooms: 120,
        availableRooms: 85,
        totalPlaces: 240,
        availablePlaces: 170,
        halfBoardPrice: 80,
        fullBoardPrice: 120,
        imageUrl: 'https://example.com/hotel.jpg',
      },
      {
        id: 2,
        name: 'Hotel Sombra',
        description: 'Segundo hotel.',
        totalRooms: 60,
        availableRooms: 40,
        totalPlaces: 120,
        availablePlaces: 90,
        halfBoardPrice: 70,
        fullBoardPrice: 110,
        imageUrl: 'https://example.com/hotel-2.jpg',
      },
    ])

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    await screen.findByRole('heading', { level: 1, name: /Cruza la puerta/i })

    expect(screen.getAllByText('Dragon Coaster').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Fog Tunnel').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Hotel Magic Park').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Hotel Sombra').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Plazas libres').length).toBeGreaterThan(0)
  })

  it('renders the current hotel and offer spotlight cards with their descriptive content', async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    await screen.findByRole('heading', { level: 1, name: /Cruza la puerta/i })

    expect(screen.getByText('Hotel destacado')).toBeInTheDocument()
    expect(screen.getByText('Hotel familiar situado junto al parque.')).toBeInTheDocument()
    expect(screen.getAllByText(/80,00/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/120,00/).length).toBeGreaterThan(0)
    expect(screen.getByText('Oferta especial')).toBeInTheDocument()
    expect(screen.getByText('Hotel y entradas para cuatro personas.')).toBeInTheDocument()
    expect(screen.getAllByText('4 entradas').length).toBeGreaterThan(0)
    expect(screen.getAllByText(/399,99/).length).toBeGreaterThan(0)
  })

  it('rotates the attraction carousel automatically and pauses while hovered or focused', async () => {
    const setIntervalSpy = vi.spyOn(window, 'setInterval')
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval')

    getAttractions.mockResolvedValueOnce([
      {
        id: 1,
        name: 'Dragon Coaster',
        description: 'Descripcion Dragon',
        status: 'OPEN',
        size: 'LARGE',
        totalSeats: 32,
        availableSeats: 28,
        maintenanceFrequencyDays: 7,
        imageUrl: 'https://example.com/dragon.jpg',
      },
      {
        id: 2,
        name: 'Fog Tunnel',
        description: 'Descripcion Fog',
        status: 'MAINTENANCE',
        size: 'SMALL',
        totalSeats: 16,
        availableSeats: 0,
        maintenanceFrequencyDays: 21,
        imageUrl: 'https://example.com/fog.jpg',
      },
      {
        id: 3,
        name: 'Abyss Wheel',
        description: 'Descripcion Abyss',
        status: 'CLOSED',
        size: 'MEDIUM',
        totalSeats: 18,
        availableSeats: 0,
        maintenanceFrequencyDays: 14,
        imageUrl: 'https://example.com/abyss.jpg',
      },
    ])

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    await screen.findByRole('heading', { level: 1, name: /Cruza la puerta/i })
    expect(screen.getByText('Descripcion Dragon')).toBeInTheDocument()

    const carousel = screen.getByLabelText('Carrusel de atracciones')
    const rotateCarousel = setIntervalSpy.mock.calls[0][0]

    act(() => {
      rotateCarousel()
    })
    expect(setIntervalSpy).toHaveBeenCalled()

    fireEvent.mouseEnter(carousel)
    expect(clearIntervalSpy).toHaveBeenCalled()

    fireEvent.mouseLeave(carousel)
    expect(setIntervalSpy.mock.calls.length).toBeGreaterThan(1)

    fireEvent.focus(carousel)
    expect(clearIntervalSpy.mock.calls.length).toBeGreaterThan(0)

    fireEvent.blur(carousel, { relatedTarget: document.body })
    expect(setIntervalSpy.mock.calls.length).toBeGreaterThan(2)

    fireEvent.click(screen.getByRole('button', { name: 'Ver elemento anterior de atracciones' }))
    expect(screen.getAllByText('Dragon Coaster').length).toBeGreaterThan(0)

    setIntervalSpy.mockRestore()
    clearIntervalSpy.mockRestore()
  })

  it('shows hotel and offer spotlight details when those carousels change the current card', async () => {
    getHotels.mockResolvedValueOnce([
      {
        id: 1,
        name: 'Hotel Magic Park',
        description: 'Hotel familiar situado junto al parque.',
        totalRooms: 120,
        availableRooms: 85,
        totalPlaces: 240,
        availablePlaces: 170,
        halfBoardPrice: 80,
        fullBoardPrice: 120,
        imageUrl: 'https://example.com/hotel.jpg',
      },
      {
        id: 2,
        name: 'Hotel Sombra',
        description: 'Hotel con ambientacion nocturna.',
        totalRooms: 60,
        availableRooms: 40,
        totalPlaces: 120,
        availablePlaces: 90,
        halfBoardPrice: 70,
        fullBoardPrice: 110,
        imageUrl: 'https://example.com/hotel-2.jpg',
      },
    ])
    getOffers.mockResolvedValueOnce([
      {
        id: 1,
        title: 'Pack familiar',
        description: 'Hotel y entradas para cuatro personas.',
        hotelName: 'Hotel Magic Park',
        boardType: 'FULL_BOARD',
        includedTickets: 4,
        totalPrice: 399.99,
        imageUrl: 'https://example.com/offer.jpg',
      },
      {
        id: 2,
        title: 'Pack nocturno',
        description: 'Hotel y entradas para dos personas.',
        hotelName: 'Hotel Sombra',
        boardType: 'HALF_BOARD',
        includedTickets: 2,
        totalPrice: 199.99,
        imageUrl: 'https://example.com/offer-2.jpg',
      },
    ])

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    await screen.findByRole('heading', { level: 1, name: /Cruza la puerta/i })

    fireEvent.click(screen.getByRole('button', { name: 'Ver elemento siguiente de hoteles' }))
    expect(screen.getAllByText('Hotel Sombra').length).toBeGreaterThan(0)
    expect(screen.getByRole('button', { name: 'Ver elemento anterior de hoteles' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Ver elemento siguiente de ofertas' }))
    expect(screen.getAllByText('Pack nocturno').length).toBeGreaterThan(0)
    expect(screen.getByRole('button', { name: 'Ver elemento anterior de ofertas' })).toBeInTheDocument()
  })

  it('allows selecting an attraction from the map legend and renders the static information panels', async () => {
    getAttractions.mockResolvedValueOnce([
      {
        id: 1,
        name: 'Dragon Coaster',
        description: 'Montana rusa principal del parque.',
        status: 'OPEN',
        size: 'LARGE',
        totalSeats: 32,
        availableSeats: 28,
        maintenanceFrequencyDays: 7,
        imageUrl: 'https://example.com/dragon.jpg',
      },
      {
        id: 2,
        name: 'Fog Tunnel',
        description: 'Recorrido oscuro.',
        status: 'MAINTENANCE',
        size: 'SMALL',
        totalSeats: 16,
        availableSeats: 0,
        maintenanceFrequencyDays: 21,
        imageUrl: 'https://example.com/fog.jpg',
      },
    ])

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    await screen.findByRole('heading', { level: 1, name: /Cruza la puerta/i })

    const legendButton = screen.getAllByRole('button', { name: 'Destacar Fog Tunnel en el mapa' }).at(-1)

    fireEvent.click(legendButton)

    expect(legendButton).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('Preguntas frecuentes')).toBeInTheDocument()
    expect(screen.getByText('900 123 456')).toBeInTheDocument()
    expect(screen.getByText('2.500 personas')).toBeInTheDocument()
    expect(screen.getByText('Experiencia mobile mediante QR')).toBeInTheDocument()
  })
})
