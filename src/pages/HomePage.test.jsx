import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
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
      expect(screen.getByText('Mapa visual orientativo')).toBeInTheDocument()
    })

    const mapSelectors = screen.getAllByRole('button', { name: 'Destacar Dragon Coaster en el mapa' })

    expect(mapSelectors.length).toBe(2)

    fireEvent.click(mapSelectors[0])

    mapSelectors.forEach((selector) => {
      expect(selector).toHaveAttribute('aria-pressed', 'true')
    })
  })
})
