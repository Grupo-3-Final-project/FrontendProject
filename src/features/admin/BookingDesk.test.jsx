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
      screen.getByText('La compra se ha registrado, pero no se ha podido enviar el correo al cliente.'),
    ).toBeInTheDocument()
  })
})
