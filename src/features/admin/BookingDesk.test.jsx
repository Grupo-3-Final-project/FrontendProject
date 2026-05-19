import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import BookingDesk from './BookingDesk'

describe('BookingDesk', () => {
  it('shows when the booking was created but the confirmation email could not be sent', async () => {
    const onCreateBooking = vi.fn().mockResolvedValue({
      id: 9,
      userFullName: 'David Navarro',
      visitDate: '2026-05-22',
      totalPrice: 215,
      emailSent: false,
      tickets: [
        {
          holderFullName: 'David Navarro',
          ageRange: 'ADULT',
          price: 65,
        },
      ],
    })

    render(
      <BookingDesk
        users={[
          {
            id: 1,
            firstName: 'David',
            lastName: 'Navarro',
            dni: '12345678A',
            birthDate: '1990-04-15',
          },
        ]}
        hotels={[]}
        offers={[
          {
            id: 1,
            title: 'Oferta Familiar',
            hotelName: 'Hotel Magic Park',
            boardType: 'FULL_BOARD',
            includedTickets: 1,
            totalPrice: 215,
          },
        ]}
        onCreateUser={vi.fn()}
        onCreateBooking={onCreateBooking}
        statusMessage={null}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: /Registrar compra/i }))

    await waitFor(() => {
      expect(onCreateBooking).toHaveBeenCalledTimes(1)
    })

    expect(screen.getByText('No enviado')).toBeInTheDocument()
    expect(
      screen.getByText(
        'La reserva se ha creado correctamente, pero el email con los QR no se ha podido enviar. Revisa el backend o la configuración de correo.',
      ),
    ).toBeInTheDocument()
  })

  it('builds a custom booking for a new customer and includes companions', async () => {
    const onCreateUser = vi.fn().mockResolvedValue({
      id: 4,
      firstName: 'Ana',
      lastName: 'Garcia',
      birthDate: '1990-05-18',
    })
    const onCreateBooking = vi.fn().mockResolvedValue({
      id: 10,
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
        {
          holderFullName: 'Luis Garcia',
          ageRange: 'CHILD',
          price: 60,
        },
      ],
    })

    render(
      <BookingDesk
        users={[]}
        hotels={[
          {
            id: 1,
            name: 'Hotel Umbral Nocturno',
            availablePlaces: 120,
            fullBoardPrice: 120,
            halfBoardPrice: 90,
          },
        ]}
        offers={[]}
        onCreateUser={onCreateUser}
        onCreateBooking={onCreateBooking}
        statusMessage={null}
      />,
    )

    fireEvent.click(screen.getByRole('radio', { name: /Nuevo cliente/i }))
    fireEvent.click(screen.getByRole('radio', { name: /Reserva propia/i }))
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Ana' } })
    fireEvent.change(screen.getByLabelText('Apellidos'), { target: { value: 'Garcia' } })
    fireEvent.change(screen.getByLabelText('DNI'), { target: { value: '12345678A' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ana@example.com' } })
    fireEvent.change(screen.getByLabelText('Teléfono'), { target: { value: '666123123' } })
    fireEvent.change(screen.getByLabelText('Fecha de nacimiento'), { target: { value: '1990-05-18' } })
    fireEvent.click(screen.getByRole('button', { name: /Anadir acompanante/i }))
    fireEvent.change(screen.getAllByLabelText('Nombre')[1], { target: { value: 'Luis' } })
    fireEvent.change(screen.getAllByLabelText('Apellidos')[1], { target: { value: 'Garcia' } })
    fireEvent.change(screen.getAllByLabelText('Nacimiento')[0], { target: { value: '2016-05-18' } })
    fireEvent.change(screen.getByLabelText('Fecha de visita'), { target: { value: '2026-05-30' } })
    fireEvent.click(screen.getByRole('button', { name: /Registrar compra/i }))

    await waitFor(() => {
      expect(onCreateUser).toHaveBeenCalledTimes(1)
      expect(onCreateBooking).toHaveBeenCalledTimes(1)
    })

    expect(onCreateBooking.mock.calls[0][0]).toMatchObject({
      userId: 4,
      hotelId: 1,
      offerId: null,
      boardType: 'HALF_BOARD',
      visitDate: '2026-05-30',
    })
    expect(onCreateBooking.mock.calls[0][0].companions).toHaveLength(2)
    expect(screen.getByText('Enviado')).toBeInTheDocument()
  })

  it('shows the empty summary state when there is no selectable purchase yet', () => {
    render(
      <BookingDesk
        users={[]}
        hotels={[]}
        offers={[]}
        onCreateUser={vi.fn()}
        onCreateBooking={vi.fn()}
        statusMessage={null}
      />,
    )

    expect(screen.getByText('Falta seleccionar la compra')).toBeInTheDocument()
    expect(screen.getByText('Sin reserva reciente')).toBeInTheDocument()
  })

  it('stops the flow when the customer creation returns nothing', async () => {
    const onCreateUser = vi.fn().mockResolvedValue(null)
    const onCreateBooking = vi.fn()

    render(
      <BookingDesk
        users={[]}
        hotels={[]}
        offers={[
          {
            id: 1,
            title: 'Oferta Familiar',
            hotelName: 'Hotel Magic Park',
            boardType: 'FULL_BOARD',
            includedTickets: 1,
            totalPrice: 215,
          },
        ]}
        onCreateUser={onCreateUser}
        onCreateBooking={onCreateBooking}
        statusMessage={null}
      />,
    )

    fireEvent.click(screen.getByRole('radio', { name: /Nuevo cliente/i }))
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Ana' } })
    fireEvent.change(screen.getByLabelText('Apellidos'), { target: { value: 'Garcia' } })
    fireEvent.change(screen.getByLabelText('DNI'), { target: { value: '12345678A' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ana@example.com' } })
    fireEvent.change(screen.getByLabelText(/Tel/), { target: { value: '666123123' } })
    fireEvent.change(screen.getByLabelText(/Fecha de nacimiento/), { target: { value: '1990-05-18' } })
    fireEvent.change(screen.getByLabelText(/Fecha de visita/), { target: { value: '2026-05-30' } })
    fireEvent.click(screen.getByRole('button', { name: /Registrar compra/i }))

    await waitFor(() => {
      expect(onCreateUser).toHaveBeenCalledTimes(1)
    })

    expect(onCreateBooking).not.toHaveBeenCalled()
  })

  it('allows switching customer and purchase modes, changing selectors and removing companions', async () => {
    render(
      <BookingDesk
        users={[
          {
            id: 1,
            firstName: 'David',
            lastName: 'Navarro',
            dni: '12345678A',
            birthDate: '1990-04-15',
          },
          {
            id: 2,
            firstName: 'Laura',
            lastName: 'Gomez',
            dni: '87654321B',
            birthDate: '1992-06-20',
          },
        ]}
        hotels={[
          {
            id: 1,
            name: 'Hotel Umbral Nocturno',
            availablePlaces: 120,
            fullBoardPrice: 120,
            halfBoardPrice: 90,
          },
          {
            id: 2,
            name: 'Hotel Eclipse',
            availablePlaces: 90,
            fullBoardPrice: 140,
            halfBoardPrice: 100,
          },
        ]}
        offers={[
          {
            id: 1,
            title: 'Oferta Familiar',
            hotelName: 'Hotel Magic Park',
            boardType: 'FULL_BOARD',
            includedTickets: 1,
            totalPrice: 215,
          },
          {
            id: 2,
            title: 'Oferta Nocturna',
            hotelName: 'Hotel Eclipse',
            boardType: 'HALF_BOARD',
            includedTickets: 2,
            totalPrice: 280,
          },
        ]}
        onCreateUser={vi.fn()}
        onCreateBooking={vi.fn()}
        statusMessage={{ title: 'Estado', message: 'Sincronizado', variant: 'info' }}
      />,
    )

    expect(screen.getByText('Sincronizado')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('radio', { name: /Nuevo cliente/i }))
    fireEvent.click(screen.getByRole('radio', { name: /Cliente existente/i }))
    fireEvent.change(screen.getByLabelText('Selecciona cliente'), { target: { value: '2' } })

    fireEvent.change(screen.getAllByRole('combobox')[1], { target: { value: '2' } })
    expect(screen.getByText('Hotel Eclipse')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('radio', { name: /Reserva propia/i }))
    fireEvent.change(screen.getByLabelText(/^Hotel$/), { target: { value: '2' } })
    fireEvent.change(screen.getByLabelText(/R.gimen/), { target: { value: 'FULL_BOARD' } })

    fireEvent.click(screen.getByRole('button', { name: /Anadir acompanante/i }))
    expect(screen.getByText('Acompanante 1')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /Eliminar/i }))
    expect(screen.queryByText('Acompanante 1')).not.toBeInTheDocument()

    expect(screen.getAllByText('Pensión completa').length).toBeGreaterThan(0)
  })
})
