import { render, screen } from '@testing-library/react'
import { dashboardTabs, entityDefinitions, overviewHelpers } from './adminConfig'

describe('adminConfig', () => {
  it('exposes the expected dashboard tabs and payload mappers', () => {
    expect(dashboardTabs.map((tab) => tab.key)).toEqual([
      'overview',
      'bookings',
      'users',
      'hotels',
      'attractions',
      'offers',
      'employees',
      'operations',
    ])

    expect(entityDefinitions.hotels.toPayload({
      totalRooms: '10',
      availableRooms: '8',
      totalPlaces: '20',
      availablePlaces: '16',
      halfBoardPrice: '90.50',
      fullBoardPrice: '120.75',
    })).toMatchObject({
      totalRooms: 10,
      availableRooms: 8,
      totalPlaces: 20,
      availablePlaces: 16,
      halfBoardPrice: 90.5,
      fullBoardPrice: 120.75,
    })

    expect(entityDefinitions.offers.fromItem({
      hotelId: 3,
      includedTickets: 4,
      totalPrice: 249.99,
    })).toMatchObject({
      hotelId: '3',
      includedTickets: '4',
      totalPrice: '249.99',
    })

    expect(entityDefinitions.attractions.toPayload({
      totalSeats: '32',
      availableSeats: '18',
    })).toMatchObject({
      totalSeats: 32,
      availableSeats: 18,
    })

    expect(entityDefinitions.employees.toPayload({
      active: 1,
    })).toMatchObject({
      active: true,
    })
  })

  it('defines expected form fields across administrative entities', () => {
    expect(entityDefinitions.users.fields.map((field) => field.name)).toEqual([
      'firstName',
      'lastName',
      'dni',
      'email',
      'phone',
      'birthDate',
    ])
    expect(entityDefinitions.hotels.fields.find((field) => field.name === 'halfBoardPrice')).toMatchObject({
      type: 'number',
      step: 0.01,
      min: 0.01,
    })
    expect(entityDefinitions.attractions.fields.find((field) => field.name === 'size').options).toHaveLength(3)
    expect(entityDefinitions.offers.fields.find((field) => field.name === 'boardType').options).toHaveLength(2)
    expect(entityDefinitions.employees.fields.find((field) => field.name === 'shift').options).toHaveLength(2)
  })

  it('renders administrative table columns and overview helpers', () => {
    render(
      <div>
        {entityDefinitions.users.columns[0].render({
          firstName: 'Ana',
          lastName: 'Garcia',
          dni: '12345678A',
        })}
        {entityDefinitions.users.columns[3].render({
          birthDate: '1990-05-18',
        })}
        {entityDefinitions.hotels.columns[0].render({
          name: 'Hotel Umbral Nocturno',
          imageUrl: 'https://example.com/hotel.png',
          availablePlaces: 120,
          totalPlaces: 240,
        })}
        {entityDefinitions.hotels.columns[1].render({
          halfBoardPrice: 90,
          fullBoardPrice: 120,
        })}
        {entityDefinitions.hotels.columns[2].render({
          availableRooms: 40,
          totalRooms: 80,
        })}
        {entityDefinitions.attractions.columns[0].render({
          name: 'Dragon Coaster',
          imageUrl: 'https://example.com/dragon.png',
          size: 'LARGE',
        })}
        {entityDefinitions.attractions.columns[1].render({ status: 'OPEN' })}
        {entityDefinitions.attractions.columns[2].render({
          availableSeats: 24,
          totalSeats: 32,
        })}
        {entityDefinitions.attractions.columns[3].render({
          maintenanceFrequencyDays: 7,
        })}
        {entityDefinitions.offers.columns[0].render({
          title: 'Oferta Familiar',
          imageUrl: 'https://example.com/offer.png',
          hotelName: 'Hotel Umbral Nocturno',
        })}
        {entityDefinitions.offers.columns[1].render({
          boardType: 'FULL_BOARD',
        })}
        {entityDefinitions.offers.columns[3].render({
          totalPrice: 249.99,
        })}
        {entityDefinitions.employees.columns[1].render({
          employeeType: 'TECHNICIAN',
        })}
        {entityDefinitions.employees.columns[2].render({
          shift: 'MORNING',
        })}
        {entityDefinitions.employees.columns[3].render({ active: true })}
        {overviewHelpers.bookingColumns[0].render({
          userFullName: 'Ana Garcia',
          createdAt: '2026-05-18T09:30:00',
        })}
        {overviewHelpers.bookingColumns[1].render({
          visitDate: '2026-05-30',
        })}
        {overviewHelpers.bookingColumns[2].render({
          hotelName: null,
        })}
        {overviewHelpers.bookingColumns[3].render({
          totalPrice: 240,
        })}
        {overviewHelpers.maintenanceColumns[0].render({
          attractionName: 'Dragon Coaster',
        })}
        {overviewHelpers.maintenanceColumns[1].render({
          scheduledDate: '2026-05-20',
        })}
        {overviewHelpers.maintenanceColumns[2].render({
          status: 'SCHEDULED',
        })}
        {overviewHelpers.shiftColumns[0].render({
          employeeFullName: 'Luis Romero',
        })}
        {overviewHelpers.shiftColumns[1].render({
          shift: 'AFTERNOON',
        })}
        {overviewHelpers.shiftColumns[2].render({
          startDate: '2026-05-16',
          endDate: '2026-05-31',
        })}
      </div>,
    )

    expect(screen.getAllByText('Ana Garcia').length).toBeGreaterThan(0)
    expect(screen.getByText('12345678A')).toBeInTheDocument()
    expect(document.body).toHaveTextContent('18/05/1990')
    expect(screen.getAllByText('Hotel Umbral Nocturno').length).toBeGreaterThan(0)
    expect(screen.getByText('120/240 plazas')).toBeInTheDocument()
    expect(screen.getByText('MP: 90,00 €')).toBeInTheDocument()
    expect(screen.getByText('PC: 120,00 €')).toBeInTheDocument()
    expect(document.body).toHaveTextContent('40/80')
    expect(screen.getByText('Dragon Coaster')).toBeInTheDocument()
    expect(screen.getByText('Abierta')).toBeInTheDocument()
    expect(document.body).toHaveTextContent('24/32')
    expect(document.body).toHaveTextContent('Cada 7 días')
    expect(screen.getByText('Oferta Familiar')).toBeInTheDocument()
    expect(document.body).toHaveTextContent('Pensión completa')
    expect(document.body).toHaveTextContent('249,99')
    expect(document.body).toHaveTextContent('Técnico')
    expect(document.body).toHaveTextContent('Mañana')
    expect(screen.getByText('Activo')).toBeInTheDocument()
    expect(document.body).toHaveTextContent('Sin hotel')
    expect(screen.getByText('Programado')).toBeInTheDocument()
    expect(document.body).toHaveTextContent('Luis Romero')
    expect(document.body).toHaveTextContent('Tarde')
    expect(document.body).toHaveTextContent('16/05/2026 - 31/05/2026')
    expect(overviewHelpers.hotelRevenueLabel({ hotelName: 'Hotel Umbral Nocturno', revenue: 500 }))
      .toContain('Hotel Umbral Nocturno')
    expect(overviewHelpers.ticketRangeLabel({ ageRange: 'ADULT', ticketsSold: 5 }))
      .toContain('Adulto')
  })
})
