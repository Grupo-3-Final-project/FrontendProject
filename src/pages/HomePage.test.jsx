import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import HomePage from './HomePage'

vi.mock('../api/attractionApi', () => ({
  getAttractions: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: 'Dragon Coaster',
      description: 'Montana rusa principal del parque.',
      status: 'OPEN',
      imageUrl: 'https://example.com/dragon.jpg',
      availableSeats: 24,
      totalSeats: 32,
    },
  ]),
}))

vi.mock('../api/offerApi', () => ({
  getOffers: vi.fn().mockResolvedValue([
    {
      id: 1,
      title: 'Escapada familiar',
      description: 'Hotel y entradas.',
      totalPrice: 199,
      boardType: 'FULL_BOARD',
      includedTickets: 4,
      hotelName: 'Hotel Magic Park',
      imageUrl: 'https://example.com/offer.jpg',
    },
  ]),
}))

vi.mock('../api/hotelApi', () => ({
  getHotels: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: 'Hotel Magic Park',
      halfBoardPrice: 80,
      fullBoardPrice: 120,
    },
  ]),
}))

describe('HomePage', () => {
  it('renders public sections and ctas', async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(await screen.findByText(/Dragon Coaster/i)).toBeInTheDocument()
    expect((await screen.findAllByText(/Escapada familiar/i)).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/La Ultima Puerta/i).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /Comprar entradas/i }).length).toBeGreaterThan(0)
  })
})
