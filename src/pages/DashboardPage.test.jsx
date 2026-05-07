import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
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
  getOffers: vi.fn().mockResolvedValue([]),
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
  it('shows the internal dashboard without requiring login', async () => {
    render(
      <MemoryRouter initialEntries={['/dashboard?tab=overview']}>
        <DashboardPage />
      </MemoryRouter>,
    )

    expect(screen.getByText('Dashboard interno')).toBeInTheDocument()
    expect(screen.queryByText('Acceso interno')).not.toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Actualizar/i })).toBeInTheDocument()
    })
  })
})
