import { render, screen } from '@testing-library/react'
import OverviewPanel from './OverviewPanel'

describe('OverviewPanel', () => {
  it('renders dashboard metrics, rankings and preview tables with live data', () => {
    render(
      <OverviewPanel
        summary={{
          year: 2026,
          totalRevenue: 12450,
          ticketsByAgeRange: [
            { ageRange: 'ADULT', ticketsSold: 30 },
            { ageRange: 'CHILD', ticketsSold: 12 },
          ],
          topHotels: [
            { hotelId: 1, hotelName: 'Hotel Umbral Nocturno', revenue: 7400 },
            { hotelId: 2, hotelName: 'Hotel Sendero Carmesí', revenue: 5050 },
          ],
        }}
        bookings={[
          {
            id: 1,
            userFullName: 'Ana Garcia',
            createdAt: '2026-05-18T09:30:00',
            visitDate: '2026-05-30',
            hotelName: 'Hotel Umbral Nocturno',
            totalPrice: 240,
          },
        ]}
        maintenance={[
          {
            id: 1,
            attractionName: 'Dragon Coaster',
            scheduledDate: '2026-05-21',
            status: 'SCHEDULED',
          },
        ]}
        shifts={[
          {
            id: 1,
            employeeFullName: 'Luis Romero',
            shift: 'MORNING',
            startDate: '2026-05-16',
            endDate: '2026-05-31',
          },
        ]}
      />,
    )

    expect(screen.getByText(/Recaudaci.n anual/i)).toBeInTheDocument()
    expect(screen.getByText('12.450,00 €')).toBeInTheDocument()
    expect(screen.getByText('Entradas por rango de edad')).toBeInTheDocument()
    expect(screen.getByText('Adulto: 30')).toBeInTheDocument()
    expect(screen.getByText('Infantil: 12')).toBeInTheDocument()
    expect(screen.getAllByText('Hotel Umbral Nocturno').length).toBeGreaterThan(0)
    expect(screen.getByText('Reservas recientes')).toBeInTheDocument()
    expect(screen.getAllByText('Ana Garcia').length).toBeGreaterThan(0)
    expect(screen.getByText('Mantenimiento programado')).toBeInTheDocument()
    expect(screen.getAllByText('Dragon Coaster').length).toBeGreaterThan(0)
    expect(screen.getByText('Cobertura de turnos')).toBeInTheDocument()
    expect(screen.getAllByText('Luis Romero').length).toBeGreaterThan(0)
    expect(screen.getByText('Estado general')).toBeInTheDocument()
  })

  it('renders empty states when there is no dashboard data yet', () => {
    render(
      <OverviewPanel
        summary={{
          year: 2026,
          totalRevenue: 0,
          ticketsByAgeRange: [],
          topHotels: [],
        }}
        bookings={[]}
        maintenance={[]}
        shifts={[]}
      />,
    )

    expect(screen.getByText('Sin datos de venta')).toBeInTheDocument()
    expect(screen.getByText('Sin ranking')).toBeInTheDocument()
    expect(screen.getAllByText('Sin datos').length).toBe(4)
    expect(screen.getByText('Todavía no hay reservas registradas.')).toBeInTheDocument()
    expect(screen.getByText('Genera la agenda desde Operaciones.')).toBeInTheDocument()
    expect(screen.getByText('Genera turnos para ver la cobertura.')).toBeInTheDocument()
  })

  it('keeps unknown shift labels unchanged in the general status summary', () => {
    render(
      <OverviewPanel
        summary={{
          year: 2026,
          totalRevenue: 0,
          ticketsByAgeRange: [],
          topHotels: [],
        }}
        bookings={[]}
        maintenance={[]}
        shifts={[
          {
            id: 9,
            employeeFullName: 'Ana Cruz',
            shift: 'NIGHT',
            startDate: '2026-05-16',
            endDate: '2026-05-31',
          },
        ]}
      />,
    )

    expect(screen.getAllByText('Ana Cruz').length).toBeGreaterThan(0)
    expect(screen.getByText(/NIGHT hasta/)).toBeInTheDocument()
  })
})
