import { useMemo, useState } from 'react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import StatusMessage from '../../components/ui/StatusMessage'
import { formatBoardType, formatCurrency, formatDate } from './formatters'

const inputClasses =
  'min-h-11 w-full rounded-md border border-stone-700 bg-stone-950/90 px-3 py-2 text-sm text-stone-100 outline-none transition focus:border-red-500'

const emptyUserForm = {
  firstName: '',
  lastName: '',
  dni: '',
  email: '',
  phone: '',
  birthDate: '',
}

const emptyCompanion = {
  firstName: '',
  lastName: '',
  birthDate: '',
}

function BookingDesk({
  users,
  hotels,
  offers,
  onCreateUser,
  onCreateBooking,
  statusMessage,
}) {
  const [customerMode, setCustomerMode] = useState('existing')
  const [purchaseMode, setPurchaseMode] = useState('offer')
  const [selectedUserId, setSelectedUserId] = useState(users[0]?.id ? String(users[0].id) : '')
  const [userForm, setUserForm] = useState(emptyUserForm)
  const [visitDate, setVisitDate] = useState(getDefaultVisitDate())
  const [selectedOfferId, setSelectedOfferId] = useState(offers[0]?.id ? String(offers[0].id) : '')
  const [selectedHotelId, setSelectedHotelId] = useState(hotels[0]?.id ? String(hotels[0].id) : '')
  const [boardType, setBoardType] = useState('HALF_BOARD')
  const [companions, setCompanions] = useState([])
  const [bookingResult, setBookingResult] = useState(null)
  const [localMessage, setLocalMessage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedUser = useMemo(
    () => users.find((user) => String(user.id) === selectedUserId) ?? null,
    [selectedUserId, users],
  )
  const selectedOffer = useMemo(
    () => offers.find((offer) => String(offer.id) === selectedOfferId) ?? null,
    [offers, selectedOfferId],
  )
  const selectedHotel = useMemo(
    () => hotels.find((hotel) => String(hotel.id) === selectedHotelId) ?? null,
    [hotels, selectedHotelId],
  )

  const bookingSummary = useMemo(() => {
    if (purchaseMode === 'offer' && selectedOffer) {
      return {
        hotelName: selectedOffer.hotelName,
        boardType: selectedOffer.boardType,
        includedTickets: selectedOffer.includedTickets,
        referencePrice: selectedOffer.totalPrice,
      }
    }

    if (selectedHotel) {
      return {
        hotelName: selectedHotel.name,
        boardType,
        includedTickets: companions.length + 1,
        referencePrice:
          boardType === 'FULL_BOARD'
            ? selectedHotel.fullBoardPrice
            : selectedHotel.halfBoardPrice,
      }
    }

    return null
  }, [boardType, companions.length, purchaseMode, selectedHotel, selectedOffer])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setLocalMessage(null)

    try {
      const bookingUser =
        customerMode === 'existing'
          ? selectedUser
          : await onCreateUser(userForm)

      if (!bookingUser) {
        return
      }

      const holder = {
        firstName: bookingUser.firstName,
        lastName: bookingUser.lastName,
        birthDate: bookingUser.birthDate,
      }

      const payload = {
        userId: bookingUser.id,
        offerId: purchaseMode === 'offer' && selectedOffer ? selectedOffer.id : null,
        hotelId: purchaseMode === 'custom' && selectedHotel ? selectedHotel.id : null,
        boardType: purchaseMode === 'offer' && selectedOffer ? selectedOffer.boardType : boardType,
        visitDate,
        companions: [holder, ...companions],
      }

      const booking = await onCreateBooking(payload)
      setBookingResult(booking)
      setCompanions([])
      setLocalMessage({
        title: 'Compra registrada',
        message: 'La compra en taquilla se ha guardado correctamente.',
        variant: 'success',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateCompanion = (index, field, value) => {
    setCompanions((current) =>
      current.map((companion, companionIndex) =>
        companionIndex === index
          ? {
              ...companion,
              [field]: value,
            }
          : companion,
      ),
    )
  }

  const removeCompanion = (index) => {
    setCompanions((current) => current.filter((_, companionIndex) => companionIndex !== index))
  }

  const activeMessage = localMessage ?? statusMessage

  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)]">
      <Card title="Venta en taquilla" subtitle="Registra una compra con oferta existente o crea una reserva a medida.">
        <div className="space-y-4">
          {activeMessage ? (
            <StatusMessage title={activeMessage.title} message={activeMessage.message} variant={activeMessage.variant} />
          ) : null}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="rounded-lg border border-stone-800 bg-stone-950/70 p-4">
                <span className="text-sm font-bold text-stone-200">Cliente existente</span>
                <div className="mt-3 flex items-center gap-3">
                  <input
                    checked={customerMode === 'existing'}
                    type="radio"
                    name="customerMode"
                    value="existing"
                    onChange={() => setCustomerMode('existing')}
                  />
                  <span className="text-sm text-stone-400">Seleccionar cliente guardado</span>
                </div>
              </label>
              <label className="rounded-lg border border-stone-800 bg-stone-950/70 p-4">
                <span className="text-sm font-bold text-stone-200">Nuevo cliente</span>
                <div className="mt-3 flex items-center gap-3">
                  <input
                    checked={customerMode === 'new'}
                    type="radio"
                    name="customerMode"
                    value="new"
                    onChange={() => setCustomerMode('new')}
                  />
                  <span className="text-sm text-stone-400">Dar de alta al cliente y registrar la compra</span>
                </div>
              </label>
            </div>

            {customerMode === 'existing' ? (
              <label className="block space-y-2">
                <span className="text-sm font-bold text-stone-200">Selecciona cliente</span>
                <select
                  className={inputClasses}
                  value={selectedUserId}
                  onChange={(event) => setSelectedUserId(event.target.value)}
                  required
                >
                  <option value="">Selecciona un cliente</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.firstName} {user.lastName} - {user.dni}
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(emptyUserForm).map(([fieldName]) => (
                  <label key={fieldName} className={`block space-y-2 ${fieldName === 'phone' ? 'md:col-span-1' : ''}`}>
                    <span className="text-sm font-bold text-stone-200">{userFieldLabel(fieldName)}</span>
                    <input
                      className={inputClasses}
                      type={fieldName === 'email' ? 'email' : fieldName === 'birthDate' ? 'date' : 'text'}
                      value={userForm[fieldName]}
                      onChange={(event) =>
                        setUserForm((current) => ({
                          ...current,
                          [fieldName]: event.target.value,
                        }))
                      }
                      required
                    />
                  </label>
                ))}
              </div>
            )}

            <div className="grid gap-3 md:grid-cols-2">
              <label className="rounded-lg border border-stone-800 bg-stone-950/70 p-4">
                <span className="text-sm font-bold text-stone-200">Oferta existente</span>
                <div className="mt-3 flex items-center gap-3">
                  <input
                    checked={purchaseMode === 'offer'}
                    type="radio"
                    name="purchaseMode"
                    value="offer"
                    onChange={() => setPurchaseMode('offer')}
                  />
                  <span className="text-sm text-stone-400">Usar una oferta ya configurada</span>
                </div>
              </label>
              <label className="rounded-lg border border-stone-800 bg-stone-950/70 p-4">
                <span className="text-sm font-bold text-stone-200">Reserva propia</span>
                <div className="mt-3 flex items-center gap-3">
                  <input
                    checked={purchaseMode === 'custom'}
                    type="radio"
                    name="purchaseMode"
                    value="custom"
                    onChange={() => setPurchaseMode('custom')}
                  />
                  <span className="text-sm text-stone-400">Elegir hotel, pensión y viajeros</span>
                </div>
              </label>
            </div>

            {purchaseMode === 'offer' ? (
              <label className="block space-y-2">
                <span className="text-sm font-bold text-stone-200">Oferta</span>
                <select
                  className={inputClasses}
                  value={selectedOfferId}
                  onChange={(event) => setSelectedOfferId(event.target.value)}
                  required
                >
                  <option value="">Selecciona una oferta</option>
                  {offers.map((offer) => (
                    <option key={offer.id} value={offer.id}>
                      {offer.title} - {formatCurrency(offer.totalPrice)}
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-sm font-bold text-stone-200">Hotel</span>
                  <select
                    className={inputClasses}
                    value={selectedHotelId}
                    onChange={(event) => setSelectedHotelId(event.target.value)}
                    required
                  >
                    <option value="">Selecciona un hotel</option>
                    {hotels.map((hotel) => (
                      <option key={hotel.id} value={hotel.id}>
                        {hotel.name} - {hotel.availablePlaces} plazas libres
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-bold text-stone-200">Régimen</span>
                  <select
                    className={inputClasses}
                    value={boardType}
                    onChange={(event) => setBoardType(event.target.value)}
                  >
                    <option value="HALF_BOARD">Media pensión</option>
                    <option value="FULL_BOARD">Pensión completa</option>
                  </select>
                </label>
              </div>
            )}

            <label className="block space-y-2">
              <span className="text-sm font-bold text-stone-200">Fecha de visita</span>
              <input
                className={inputClasses}
                type="date"
                value={visitDate}
                onChange={(event) => setVisitDate(event.target.value)}
                required
              />
            </label>

            <div className="space-y-3 rounded-lg border border-stone-800 bg-stone-950/70 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-black text-stone-100">Titular incluido en la compra</h3>
                  <p className="mt-1 text-sm text-stone-500">
                    El titular siempre cuenta como una de las entradas de la reserva.
                  </p>
                </div>
                <Button onClick={() => setCompanions((current) => [...current, { ...emptyCompanion }])} variant="secondary">
                  Anadir acompanante
                </Button>
              </div>

              <div className="rounded-lg border border-stone-800 bg-black/20 px-4 py-3">
                <div className="font-bold text-stone-100">
                  {customerMode === 'existing'
                    ? selectedUser
                      ? `${selectedUser.firstName} ${selectedUser.lastName}`
                      : 'Selecciona un cliente'
                    : userForm.firstName && userForm.lastName
                      ? `${userForm.firstName} ${userForm.lastName}`
                      : 'Completa los datos del titular'}
                </div>
                <div className="mt-1 text-sm text-stone-500">
                  {customerMode === 'existing'
                    ? selectedUser?.birthDate
                      ? formatDate(selectedUser.birthDate)
                      : 'Pendiente de seleccionar'
                    : userForm.birthDate
                      ? formatDate(userForm.birthDate)
                      : 'Pendiente de completar'}
                </div>
              </div>

              <div className="space-y-4">
                {companions.map((companion, index) => (
                  <div key={`companion-${index}`} className="rounded-lg border border-stone-800 bg-black/20 p-4">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h4 className="text-sm font-black text-stone-100">Acompanante {index + 1}</h4>
                      <Button onClick={() => removeCompanion(index)} variant="danger">
                        Eliminar
                      </Button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      <label className="block space-y-2">
                        <span className="text-sm font-bold text-stone-200">Nombre</span>
                        <input
                          className={inputClasses}
                          type="text"
                          value={companion.firstName}
                          onChange={(event) => updateCompanion(index, 'firstName', event.target.value)}
                          required
                        />
                      </label>
                      <label className="block space-y-2">
                        <span className="text-sm font-bold text-stone-200">Apellidos</span>
                        <input
                          className={inputClasses}
                          type="text"
                          value={companion.lastName}
                          onChange={(event) => updateCompanion(index, 'lastName', event.target.value)}
                          required
                        />
                      </label>
                      <label className="block space-y-2">
                        <span className="text-sm font-bold text-stone-200">Nacimiento</span>
                        <input
                          className={inputClasses}
                          type="date"
                          value={companion.birthDate}
                          onChange={(event) => updateCompanion(index, 'birthDate', event.target.value)}
                          required
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? 'Registrando venta...' : 'Registrar compra'}
            </Button>
          </form>
        </div>
      </Card>

      <div className="space-y-5">
        <Card title="Resumen de la compra" subtitle="Comprobacion previa antes de cerrar la venta.">
          {bookingSummary ? (
            <div className="space-y-3 text-sm text-stone-300">
              <div className="rounded-lg border border-stone-800 bg-stone-950/70 px-4 py-3">
                <div className="text-xs font-bold uppercase text-stone-500">Hotel</div>
                <div className="mt-1 text-base font-black text-stone-100">{bookingSummary.hotelName}</div>
              </div>
              <div className="rounded-lg border border-stone-800 bg-stone-950/70 px-4 py-3">
                <div className="text-xs font-bold uppercase text-stone-500">Régimen</div>
                <div className="mt-1 text-base font-black text-stone-100">{formatBoardType(bookingSummary.boardType)}</div>
              </div>
              <div className="rounded-lg border border-stone-800 bg-stone-950/70 px-4 py-3">
                <div className="text-xs font-bold uppercase text-stone-500">Personas</div>
                <div className="mt-1 text-base font-black text-stone-100">{bookingSummary.includedTickets}</div>
              </div>
              <div className="rounded-lg border border-stone-800 bg-stone-950/70 px-4 py-3">
                <div className="text-xs font-bold uppercase text-stone-500">Precio base</div>
                <div className="mt-1 text-base font-black text-stone-100">{formatCurrency(bookingSummary.referencePrice)}</div>
              </div>
            </div>
          ) : (
            <StatusMessage
              title="Falta seleccionar la compra"
              message="Elige una oferta o un hotel para ver el resumen."
              variant="empty"
            />
          )}
        </Card>

        <Card title="Ultima compra registrada" subtitle="Detalle de la ultima compra guardada.">
          {bookingResult ? (
            <div className="space-y-3 text-sm text-stone-300">
              <div className="rounded-lg border border-stone-800 bg-stone-950/70 px-4 py-3">
                <div className="text-xs font-bold uppercase text-stone-500">Reserva</div>
                <div className="mt-1 text-base font-black text-stone-100">#{bookingResult.id}</div>
              </div>
              <div className="rounded-lg border border-stone-800 bg-stone-950/70 px-4 py-3">
                <div className="text-xs font-bold uppercase text-stone-500">Cliente</div>
                <div className="mt-1 text-base font-black text-stone-100">{bookingResult.userFullName}</div>
              </div>
              <div className="rounded-lg border border-stone-800 bg-stone-950/70 px-4 py-3">
                <div className="text-xs font-bold uppercase text-stone-500">Visita</div>
                <div className="mt-1 text-base font-black text-stone-100">{formatDate(bookingResult.visitDate)}</div>
              </div>
              <div className="rounded-lg border border-stone-800 bg-stone-950/70 px-4 py-3">
                <div className="text-xs font-bold uppercase text-stone-500">Total</div>
                <div className="mt-1 text-base font-black text-stone-100">{formatCurrency(bookingResult.totalPrice)}</div>
              </div>
              <div className="rounded-lg border border-stone-800 bg-stone-950/70 px-4 py-3">
                <div className="text-xs font-bold uppercase text-stone-500">Entradas calculadas</div>
                <ul className="mt-2 space-y-2">
                  {bookingResult.tickets.map((ticket) => (
                    <li key={`${ticket.holderFullName}-${ticket.ageRange}`} className="rounded-md border border-stone-800 bg-black/20 px-3 py-2">
                      <div className="font-bold text-stone-100">{ticket.holderFullName}</div>
                      <div className="mt-1 text-xs text-stone-500">
                        {formatBoardType(ticket.ageRange)} - {formatCurrency(ticket.price)}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <StatusMessage
              title="Sin reserva reciente"
              message="Cuando registres una compra, veras aqui el detalle de la reserva."
              variant="empty"
            />
          )}
        </Card>
      </div>
    </section>
  )
}

function getDefaultVisitDate() {
  const date = new Date()
  date.setDate(date.getDate() + 7)
  return date.toISOString().slice(0, 10)
}

function userFieldLabel(fieldName) {
  const labels = {
    firstName: 'Nombre',
    lastName: 'Apellidos',
    dni: 'DNI',
    email: 'Email',
    phone: 'Teléfono',
    birthDate: 'Fecha de nacimiento',
  }

  return labels[fieldName]
}

export default BookingDesk
