import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { getAttractions } from '../api/attractionApi'
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
})
