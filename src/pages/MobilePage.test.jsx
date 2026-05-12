import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { getMobileAccess } from '../api/ticketApi'
import { getGranadaWeather } from '../api/weatherApi'
import MobilePage from './MobilePage'

vi.mock('../api/ticketApi', () => ({
  getMobileAccess: vi.fn(),
}))

vi.mock('../api/weatherApi', () => ({
  getGranadaWeather: vi.fn(),
}))

describe('MobilePage', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('persists visited attractions in localStorage when the recommended one is marked as visited', async () => {
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0.8)
      .mockReturnValueOnce(0.1)
      .mockReturnValue(0.4)

    getMobileAccess.mockResolvedValue({
      ticketId: 7,
      bookingId: 3,
      holderFullName: 'Ana Garcia',
      ticketStatus: 'VALID',
      visitDate: '2026-05-22',
      attractions: [
        {
          id: 1,
          name: 'Dragon Coaster',
          description: 'Montana rusa principal del parque.',
          size: 'LARGE',
          status: 'OPEN',
          totalSeats: 32,
          availableSeats: 28,
          maintenanceFrequencyDays: 7,
          imageUrl: 'https://example.com/dragon.jpg',
        },
        {
          id: 2,
          name: 'Abyss Wheel',
          description: 'Atraccion giratoria.',
          size: 'MEDIUM',
          status: 'OPEN',
          totalSeats: 20,
          availableSeats: 14,
          maintenanceFrequencyDays: 14,
          imageUrl: 'https://example.com/abyss.jpg',
        },
        {
          id: 3,
          name: 'Fog Tunnel',
          description: 'Recorrido oscuro.',
          size: 'SMALL',
          status: 'MAINTENANCE',
          totalSeats: 18,
          availableSeats: 0,
          maintenanceFrequencyDays: 21,
          imageUrl: 'https://example.com/fog.jpg',
        },
      ],
    })

    getGranadaWeather.mockResolvedValue({
      city: 'Granada',
      temperatureCelsius: 24.5,
      apparentTemperatureCelsius: 26.0,
      condition: 'Poco nuboso',
      day: true,
      updatedAt: '2026-05-12T12:00:00',
    })

    render(
      <MemoryRouter initialEntries={['/mobile/token-1']}>
        <Routes>
          <Route path="/mobile/:mobileAccessToken" element={<MobilePage />} />
        </Routes>
      </MemoryRouter>,
    )

    await screen.findByText('Ana Garcia')
    expect(screen.getAllByText('Abyss Wheel').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Dragon Coaster').length).toBeGreaterThan(0)
    expect(screen.getByText('Fog Tunnel')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Marcar visitada/i }))

    await waitFor(() => {
      expect(localStorage.getItem('visitor-mobile-visited:token-1')).toBe('[2]')
    })

    expect(screen.queryAllByText('Abyss Wheel')).toHaveLength(0)
    expect(screen.getAllByText('Dragon Coaster').length).toBeGreaterThan(0)
  })

  it('keeps the mobile experience available when Granada weather cannot be loaded', async () => {
    getMobileAccess.mockResolvedValue({
      ticketId: 7,
      bookingId: 3,
      holderFullName: 'Ana Garcia',
      ticketStatus: 'VALID',
      visitDate: '2026-05-22',
      attractions: [
        {
          id: 1,
          name: 'Dragon Coaster',
          description: 'Montana rusa principal del parque.',
          size: 'LARGE',
          status: 'OPEN',
          totalSeats: 32,
          availableSeats: 28,
          maintenanceFrequencyDays: 7,
          imageUrl: 'https://example.com/dragon.jpg',
        },
      ],
    })

    getGranadaWeather.mockRejectedValue({
      response: {
        data: {
          message: 'Weather service unavailable',
        },
      },
    })

    render(
      <MemoryRouter initialEntries={['/mobile/token-2']}>
        <Routes>
          <Route path="/mobile/:mobileAccessToken" element={<MobilePage />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(await screen.findByText('Ana Garcia')).toBeInTheDocument()
    expect(screen.getByText('Tiempo de Granada no disponible')).toBeInTheDocument()
    expect(screen.getByText('No se ha podido consultar el tiempo de Granada.')).toBeInTheDocument()
    expect(screen.getAllByText('Dragon Coaster').length).toBeGreaterThan(0)
  })
})
