import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { getOffers } from '../api/offerApi'
import DashboardPage from './DashboardPage'

vi.mock('../api/attractionApi', () => ({
  createAttraction: vi.fn(),
  deleteAttraction: vi.fn(),
  getAttractions: vi.fn().mockResolvedValue([]),
  updateAttraction: vi.fn(),
}))

vi.mock('../api/bookingApi', () => ({
  createBooking: vi.fn(),
  getBookings: vi.fn().mockResolvedValue([]),
}))

vi.mock('../api/dashboardApi', () => ({
  getDashboardSummary: vi.fn().mockResolvedValue({
    year: 2026,
    totalRevenue: 0,
    ticketsByAgeRange: [],
    topHotels: [],
  }),
}))

vi.mock('../api/employeeApi', () => ({
  createEmployee: vi.fn(),
  deleteEmployee: vi.fn(),
  getEmployees: vi.fn().mockResolvedValue([]),
  updateEmployee: vi.fn(),
}))

vi.mock('../api/hotelApi', () => ({
  createHotel: vi.fn(),
  deleteHotel: vi.fn(),
  getHotels: vi.fn().mockResolvedValue([]),
  updateHotel: vi.fn(),
}))

vi.mock('../api/imageApi', () => ({
  uploadImage: vi.fn(),
}))

vi.mock('../api/maintenanceApi', () => ({
  generateMaintenanceTasks: vi.fn(),
  getMaintenanceTasks: vi.fn().mockResolvedValue([]),
}))

vi.mock('../api/offerApi', () => ({
  createOffer: vi.fn(),
  deleteOffer: vi.fn(),
  getOffers: vi.fn().mockResolvedValue([]),
  updateOffer: vi.fn(),
}))

vi.mock('../api/shiftApi', () => ({
  generateShifts: vi.fn(),
  getShifts: vi.fn().mockResolvedValue([]),
}))

vi.mock('../api/userApi', () => ({
  createUser: vi.fn(),
  deleteUser: vi.fn(),
  getUsers: vi.fn().mockResolvedValue([]),
  updateUser: vi.fn(),
}))

describe('DashboardPage', () => {
  afterEach(() => {
    vi.mocked(getOffers).mockResolvedValue([])
  })

  it('renders the internal dashboard content once the route is authenticated', async () => {
    render(
      <MemoryRouter initialEntries={['/dashboard?tab=overview']}>
        <DashboardPage />
      </MemoryRouter>,
    )

    expect(screen.getByText('Panel interno')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Actualizar/i })).toBeInTheDocument()
    })
  })

  it('shows edit and delete actions for offers', async () => {
    vi.mocked(getOffers).mockResolvedValue([
      {
        id: 1,
        title: 'Oferta Familiar Magic Park',
        description: 'Hotel + entradas para 2 adultos y 2 ninos.',
        hotelId: 1,
        hotelName: 'Hotel Magic Park',
        boardType: 'FULL_BOARD',
        includedTickets: 4,
        totalPrice: 399.99,
        imageUrl: 'https://example.com/offer.jpg',
      },
    ])

    render(
      <MemoryRouter initialEntries={['/dashboard?tab=offers']}>
        <DashboardPage />
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Editar' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Eliminar' })).toBeInTheDocument()
    })
  })
})
