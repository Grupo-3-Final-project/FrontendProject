import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { createBooking, getBookings } from '../api/bookingApi'
import { getDashboardSummary } from '../api/dashboardApi'
import { getHotels } from '../api/hotelApi'
import { generateMaintenanceTasks, getMaintenanceTasks } from '../api/maintenanceApi'
import { getOffers } from '../api/offerApi'
import { generateShifts, getShifts } from '../api/shiftApi'
import { createUser, deleteUser, getUsers, updateUser } from '../api/userApi'
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
    vi.clearAllMocks()
    vi.mocked(getOffers).mockResolvedValue([])
    vi.mocked(getDashboardSummary).mockResolvedValue({
      year: 2026,
      totalRevenue: 0,
      ticketsByAgeRange: [],
      topHotels: [],
    })
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

  it('falls back to the overview tab when the query string contains an invalid tab', async () => {
    render(
      <MemoryRouter initialEntries={['/dashboard?tab=invalid']}>
        <DashboardPage />
      </MemoryRouter>,
    )

    expect(await screen.findByRole('heading', { name: 'Resumen' })).toBeInTheDocument()
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
      expect(screen.getByRole('button', { name: 'Editar registro' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Eliminar registro' })).toBeInTheDocument()
    })
  })

  it('shows a controlled page error when the dashboard cannot be loaded', async () => {
    vi.mocked(getDashboardSummary).mockRejectedValueOnce({
      response: {
        data: {
          message: 'Unexpected error',
        },
      },
    })

    render(
      <MemoryRouter initialEntries={['/dashboard?tab=overview']}>
        <DashboardPage />
      </MemoryRouter>,
    )

    expect(await screen.findByText('Se ha producido un error inesperado.')).toBeInTheDocument()
  })

  it('shows a controlled page error when the manual refresh fails', async () => {
    vi.mocked(getDashboardSummary)
      .mockResolvedValueOnce({
        year: 2026,
        totalRevenue: 0,
        ticketsByAgeRange: [],
        topHotels: [],
      })
      .mockRejectedValueOnce({
        response: {
          data: {
            message: 'Unexpected error',
          },
        },
      })

    render(
      <MemoryRouter initialEntries={['/dashboard?tab=overview']}>
        <DashboardPage />
      </MemoryRouter>,
    )

    fireEvent.click(await screen.findByRole('button', { name: /Actualizar/i }))

    expect(await screen.findByText('Se ha producido un error inesperado.')).toBeInTheDocument()
  })

  it('creates a new booking from the dashboard booking desk and refreshes resources', async () => {
    vi.mocked(getUsers).mockResolvedValue([])
    vi.mocked(getHotels).mockResolvedValue([
      {
        id: 1,
        name: 'Hotel Umbral Nocturno',
        description: 'Hotel demo',
        totalRooms: 80,
        availableRooms: 50,
        totalPlaces: 160,
        availablePlaces: 120,
        halfBoardPrice: 90,
        fullBoardPrice: 120,
        imageUrl: 'https://example.com/hotel.png',
      },
    ])
    vi.mocked(createUser).mockResolvedValue({
      id: 4,
      firstName: 'Ana',
      lastName: 'Garcia',
      birthDate: '1990-05-18',
    })
    vi.mocked(createBooking).mockResolvedValue({
      id: 17,
      userFullName: 'Ana Garcia',
      visitDate: '2026-05-30',
      totalPrice: 240,
      emailSent: true,
      tickets: [
        {
          holderFullName: 'Ana Garcia',
          ageRange: 'ADULT',
          price: 120,
        },
      ],
    })
    vi.mocked(getBookings).mockResolvedValue([])

    render(
      <MemoryRouter initialEntries={['/dashboard?tab=bookings']}>
        <DashboardPage />
      </MemoryRouter>,
    )

    fireEvent.click(await screen.findByRole('radio', { name: /Nuevo cliente/i }))
    fireEvent.click(screen.getByRole('radio', { name: /Reserva propia/i }))
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Ana' } })
    fireEvent.change(screen.getByLabelText('Apellidos'), { target: { value: 'Garcia' } })
    fireEvent.change(screen.getByLabelText('DNI'), { target: { value: '12345678A' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ana@example.com' } })
    fireEvent.change(screen.getByLabelText('Teléfono'), { target: { value: '666123123' } })
    fireEvent.change(screen.getByLabelText('Fecha de nacimiento'), { target: { value: '1990-05-18' } })
    fireEvent.change(screen.getByLabelText('Fecha de visita'), { target: { value: '2026-05-30' } })
    fireEvent.click(screen.getByRole('button', { name: /Registrar compra/i }))

    await waitFor(() => {
      expect(createUser).toHaveBeenCalledTimes(1)
      expect(createBooking).toHaveBeenCalledTimes(1)
    })

    expect(createBooking.mock.calls[0][0]).toMatchObject({
      userId: 4,
      hotelId: 1,
      offerId: null,
      visitDate: '2026-05-30',
    })
    expect(screen.getByText('Compra registrada')).toBeInTheDocument()
  })

  it('generates shifts and maintenance from the operations tab', async () => {
    vi.mocked(generateShifts).mockResolvedValue()
    vi.mocked(generateMaintenanceTasks).mockResolvedValue()
    vi.mocked(getShifts).mockResolvedValue([])
    vi.mocked(getMaintenanceTasks).mockResolvedValue([])

    render(
      <MemoryRouter initialEntries={['/dashboard?tab=operations']}>
        <DashboardPage />
      </MemoryRouter>,
    )

    fireEvent.click(await screen.findByRole('button', { name: /^Generar turnos$/i }))
    fireEvent.click(screen.getByRole('button', { name: /^Generar mantenimiento$/i }))

    await waitFor(() => {
      expect(generateShifts).toHaveBeenCalledTimes(1)
      expect(generateMaintenanceTasks).toHaveBeenCalledTimes(1)
    })

    expect(await screen.findByText('La agenda de mantenimiento se ha actualizado.')).toBeInTheDocument()
  })

  it('shows the translated shift generation error when the operation fails', async () => {
    vi.mocked(generateShifts).mockRejectedValueOnce({
      response: {
        data: {
          message: 'Not enough employees to cover required shifts',
        },
      },
    })

    render(
      <MemoryRouter initialEntries={['/dashboard?tab=operations']}>
        <DashboardPage />
      </MemoryRouter>,
    )

    fireEvent.click(await screen.findByRole('button', { name: /^Generar turnos$/i }))

    expect(await screen.findByText('No hay suficientes empleados activos para cubrir los turnos.')).toBeInTheDocument()
  })

  it('shows the translated maintenance generation error when the operation fails', async () => {
    vi.mocked(generateMaintenanceTasks).mockRejectedValueOnce({
      response: {
        data: {
          message: 'Not enough technicians available',
        },
      },
    })

    render(
      <MemoryRouter initialEntries={['/dashboard?tab=operations']}>
        <DashboardPage />
      </MemoryRouter>,
    )

    fireEvent.click(await screen.findByRole('button', { name: /^Generar mantenimiento$/i }))

    expect(await screen.findByText('No hay suficientes tecnicos disponibles para generar mantenimiento.')).toBeInTheDocument()
  })

  it('edits and deletes users from the entity manager', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    vi.mocked(getUsers).mockResolvedValue([
      {
        id: 9,
        firstName: 'Clara',
        lastName: 'Lopez',
        dni: '87654321B',
        email: 'clara@example.com',
        phone: '600111222',
        birthDate: '1992-03-14',
      },
    ])
    vi.mocked(updateUser).mockResolvedValue({
      id: 9,
      firstName: 'Clara',
      lastName: 'Lopez',
      dni: '87654321B',
      email: 'clara+editada@example.com',
      phone: '600111222',
      birthDate: '1992-03-14',
    })
    vi.mocked(deleteUser).mockResolvedValue()

    render(
      <MemoryRouter initialEntries={['/dashboard?tab=users']}>
        <DashboardPage />
      </MemoryRouter>,
    )

    fireEvent.click(await screen.findByRole('button', { name: 'Editar registro' }))
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'clara+editada@example.com' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Guardar cambios/i }))

    await waitFor(() => {
      expect(updateUser).toHaveBeenCalledWith(
        9,
        expect.objectContaining({
          email: 'clara+editada@example.com',
        }),
      )
    })

    expect(await screen.findByText('Los cambios se han guardado correctamente.')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Eliminar registro' }))

    await waitFor(() => {
      expect(deleteUser).toHaveBeenCalledWith(9)
    })

    expect(await screen.findByText('El elemento se ha borrado correctamente.')).toBeInTheDocument()
    window.confirm.mockRestore()
  })

  it('shows the translated update error when the entity save fails', async () => {
    vi.mocked(getUsers).mockResolvedValue([
      {
        id: 9,
        firstName: 'Clara',
        lastName: 'Lopez',
        dni: '87654321B',
        email: 'clara@example.com',
        phone: '600111222',
        birthDate: '1992-03-14',
      },
    ])
    vi.mocked(updateUser).mockRejectedValueOnce({
      response: {
        data: {
          message: 'Invalid user data',
        },
      },
    })

    render(
      <MemoryRouter initialEntries={['/dashboard?tab=users']}>
        <DashboardPage />
      </MemoryRouter>,
    )

    fireEvent.click(await screen.findByRole('button', { name: 'Editar registro' }))
    fireEvent.click(screen.getByRole('button', { name: /Guardar cambios/i }))

    expect(await screen.findByText('Los datos del usuario no son validos.')).toBeInTheDocument()
  })

  it('shows the translated delete error when the entity removal fails', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    vi.mocked(getUsers).mockResolvedValue([
      {
        id: 9,
        firstName: 'Clara',
        lastName: 'Lopez',
        dni: '87654321B',
        email: 'clara@example.com',
        phone: '600111222',
        birthDate: '1992-03-14',
      },
    ])
    vi.mocked(deleteUser).mockRejectedValueOnce({
      response: {
        data: {
          message: 'Unexpected error',
        },
      },
    })

    render(
      <MemoryRouter initialEntries={['/dashboard?tab=users']}>
        <DashboardPage />
      </MemoryRouter>,
    )

    fireEvent.click(await screen.findByRole('button', { name: 'Eliminar registro' }))

    expect(await screen.findByText('Se ha producido un error inesperado.')).toBeInTheDocument()
    window.confirm.mockRestore()
  })
})
