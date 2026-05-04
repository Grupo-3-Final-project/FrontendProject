import { buildBookingPayload, validateBookingForm } from './bookingUtils'

describe('bookingUtils', () => {
  it('validates missing booking data', () => {
    const result = validateBookingForm({
      userMode: 'new',
      newUser: {
        firstName: '',
        lastName: '',
        dni: '',
        email: '',
        phone: '',
        birthDate: '',
      },
      selectedUserId: '',
      visitDate: '',
      productMode: 'hotel',
      selectedHotelId: '',
      selectedOfferId: '',
      boardType: '',
      companions: [{ firstName: '', lastName: '', birthDate: '' }],
    })

    expect(result.hasErrors).toBe(true)
    expect(result.errors.user.firstName).toContain('nombre')
    expect(result.errors.selectedHotelId).toContain('hotel')
    expect(result.errors.companions[0].birthDate).toContain('fecha')
  })

  it('builds the backend payload with buyer and companions', () => {
    const payload = buildBookingPayload({
      userId: 7,
      user: {
        firstName: 'Ana',
        lastName: 'Martin',
        birthDate: '1990-01-01',
      },
      companions: [{ firstName: 'Leo', lastName: 'Martin', birthDate: '2015-05-05' }],
      hotelId: 2,
      offerId: null,
      boardType: 'FULL_BOARD',
      visitDate: '2026-06-01',
    })

    expect(payload.userId).toBe(7)
    expect(payload.hotelId).toBe(2)
    expect(payload.companions).toHaveLength(2)
    expect(payload.companions[0].firstName).toBe('Ana')
    expect(payload.companions[1].firstName).toBe('Leo')
  })
})
