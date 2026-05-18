import { render, screen, waitFor } from '@testing-library/react'
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
      expect(screen.getByText('Dragon Coaster')).toBeInTheDocument()
      expect(screen.getAllByText('Hotel Magic Park').length).toBeGreaterThan(0)
      expect(screen.getByText('Pack familiar')).toBeInTheDocument()
      expect(screen.getByText('Granada - 24 C')).toBeInTheDocument()
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

    expect(await screen.findByText('Catalogo no disponible')).toBeInTheDocument()
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
    expect(screen.getByText('Mantenimiento')).toBeInTheDocument()
    expect(screen.getByText('Cerrada')).toBeInTheDocument()
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

    expect(await screen.findByText('Dragon Coaster')).toBeInTheDocument()
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
    expect(screen.getByText('Plazas libres')).toBeInTheDocument()
  })
})
