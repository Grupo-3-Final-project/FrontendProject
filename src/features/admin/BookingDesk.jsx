import { useMemo, useState } from 'react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import StatusMessage from '../../components/ui/StatusMessage'
import { formatBoardType, formatCurrency, formatDate } from './formatters'

const inputClasses =
  'min-h-11 w-full rounded-md border border-stone-700 bg-stone-950/90 px-3 py-2 text-sm text-stone-100 outline-none transition focus:border-red-500'

const detailBlockClasses =
  'rounded-lg border border-stone-800 bg-[linear-gradient(180deg,rgba(28,25,23,0.72),rgba(3,3,4,0.32))] px-4 py-3'

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

function ChoiceCard({ title, description, checked, name, value, onChange }) {
  return (
    <label className={getChoiceCardClasses(checked)}>
      <input
        checked={checked}
        className="sr-only"
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
      />
      <span className="flex items-start justify-between gap-4">
        <span className="min-w-0">
          <span className={`block text-sm font-black ${checked ? 'text-stone-100' : 'text-stone-200'}`}>
            {title}
          </span>
          <span className={`mt-2 block text-sm leading-5 ${checked ? 'text-stone-300' : 'text-stone-500'}`}>
            {description}
          </span>
        </span>
        <span className={getChoiceIndicatorClasses(checked)} aria-hidden="true">
          <span className={`h-2.5 w-2.5 rounded-full ${checked ? 'bg-red-400' : 'bg-transparent'}`} />
        </span>
      </span>
    </label>
  )
}

function DetailBlock({ label, value, accent = false, valueClassName = '', children }) {
  return (
    <div className={`${detailBlockClasses} ${accent ? 'border-red-900/60 bg-[linear-gradient(180deg,rgba(127,29,29,0.22),rgba(3,3,4,0.46))]' : ''}`}>
      <div className="text-xs font-bold uppercase text-stone-500">{label}</div>
      <div className={`${accent ? 'text-xl text-stone-50' : 'text-base text-stone-100'} ${valueClassName} mt-1 font-black`}>
        {value}
      </div>
      {children}
    </div>
  )
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
    () => resolveSelectedItem(users, selectedUserId),
    [selectedUserId, users],
  )
  const selectedOffer = useMemo(
    () => resolveSelectedItem(offers, selectedOfferId),
    [offers, selectedOfferId],
  )
  const selectedHotel = useMemo(
    () => resolveSelectedItem(hotels, selectedHotelId),
    [hotels, selectedHotelId],
  )

  const bookingSummary = useMemo(() => {
    return buildBookingSummary({
      boardType,
      companionsCount: companions.length,
      purchaseMode,
      selectedHotel,
      selectedOffer,
    })
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

      const payload = buildBookingPayload({
        boardType,
        bookingUser,
        companions,
        purchaseMode,
        selectedHotel,
        selectedOffer,
        visitDate,
      })

      const booking = await onCreateBooking(payload)
      setBookingResult(booking)
      setCompanions([])
      setLocalMessage({
        title: 'Compra registrada',
        message: booking.emailSent
          ? 'La compra en taquilla se ha guardado y el correo se ha enviado correctamente.'
          : 'La reserva se ha creado correctamente, pero el email con los QR no se ha podido enviar. Revisa el backend o la configuración de correo.',
        variant: booking.emailSent ? 'success' : 'warning',
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
    <section className="grid gap-5 2xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)]">
      <Card title="Venta en taquilla" subtitle="Registra una compra con oferta existente o crea una reserva a medida.">
        <div className="space-y-4">
          {activeMessage ? (
            <div className="rounded-xl border border-red-950/35 bg-black/20 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_18px_42px_rgba(0,0,0,0.22)]">
              <StatusMessage title={activeMessage.title} message={activeMessage.message} variant={activeMessage.variant} />
            </div>
          ) : null}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-3 md:grid-cols-2">
              <ChoiceCard
                checked={customerMode === 'existing'}
                description="Seleccionar cliente guardado"
                name="customerMode"
                onChange={() => setCustomerMode('existing')}
                title="Cliente existente"
                value="existing"
              />
              <ChoiceCard
                checked={customerMode === 'new'}
                description="Dar de alta al cliente y registrar la compra"
                name="customerMode"
                onChange={() => setCustomerMode('new')}
                title="Nuevo cliente"
                value="new"
              />
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
              <ChoiceCard
                checked={purchaseMode === 'offer'}
                description="Usar una oferta ya configurada"
                name="purchaseMode"
                onChange={() => setPurchaseMode('offer')}
                title="Oferta existente"
                value="offer"
              />
              <ChoiceCard
                checked={purchaseMode === 'custom'}
                description="Elegir hotel, pensión y viajeros"
                name="purchaseMode"
                onChange={() => setPurchaseMode('custom')}
                title="Reserva propia"
                value="custom"
              />
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
                  Añadir acompañante
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
                      <h4 className="text-sm font-black text-stone-100">Acompañante {index + 1}</h4>
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
        <Card title="Resumen de la compra" subtitle="Comprobación previa antes de cerrar la venta.">
          {bookingSummary ? (
            <div className="space-y-3 text-sm text-stone-300">
              <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-1">
                <DetailBlock accent label="Precio base" value={formatCurrency(bookingSummary.referencePrice)} />
                <DetailBlock accent label="Personas" value={bookingSummary.includedTickets} />
              </div>
              <DetailBlock label="Hotel" value={bookingSummary.hotelName} />
              <DetailBlock label="Régimen" value={formatBoardType(bookingSummary.boardType)} />
            </div>
          ) : (
            <StatusMessage
              title="Falta seleccionar la compra"
              message="Elige una oferta o un hotel para ver el resumen."
              variant="empty"
            />
          )}
        </Card>

        <Card title="Última compra registrada" subtitle="Detalle de la última compra guardada.">
          {bookingResult ? (
            <div className="space-y-3 text-sm text-stone-300">
              <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-1">
                <DetailBlock accent label="Total" value={formatCurrency(bookingResult.totalPrice)} />
                <DetailBlock label="Reserva" value={`#${bookingResult.id}`} />
              </div>
              <DetailBlock label="Cliente" value={bookingResult.userFullName} />
              <DetailBlock label="Visita" value={formatDate(bookingResult.visitDate)} />
              <DetailBlock
                label="Correo"
                value={bookingResult.emailSent ? 'Enviado' : 'No enviado'}
                valueClassName={bookingResult.emailSent ? '' : 'text-red-300'}
              >
                <div className="mt-1 text-xs text-stone-500">
                  {bookingResult.emailSent
                    ? 'El cliente debería recibir sus QR por correo.'
                    : 'La reserva existe; revisa el backend o la configuración de correo.'}
                </div>
              </DetailBlock>
              <div className={detailBlockClasses}>
                <div className="text-xs font-bold uppercase text-stone-500">Entradas calculadas</div>
                <ul className="mt-2 space-y-2">
                  {bookingResult.tickets.map((ticket) => (
                    <li key={`${ticket.holderFullName}-${ticket.ageRange}`} className="rounded-md border border-white/10 bg-black/25 px-3 py-2">
                      <div className="text-sm font-bold text-stone-100">{ticket.holderFullName}</div>
                      <div className="mt-1 text-xs leading-4 text-stone-500">
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
              message="Cuando registres una compra, verás aquí el detalle de la reserva."
              variant="empty"
            />
          )}
        </Card>
      </div>
    </section>
  )
}

function getChoiceCardClasses(checked) {
  const baseClasses =
    'block cursor-pointer rounded-lg border p-4 shadow-[0_14px_34px_rgba(0,0,0,0.2)] transition duration-200'
  const checkedClasses =
    'border-red-500/65 bg-[linear-gradient(145deg,rgba(127,29,29,0.34),rgba(12,10,10,0.94))] shadow-[0_0_30px_rgba(127,29,29,0.16),inset_0_1px_0_rgba(255,255,255,0.04)]'
  const idleClasses =
    'border-stone-800 bg-stone-950/70 hover:border-red-900/65 hover:bg-[linear-gradient(145deg,rgba(68,64,60,0.34),rgba(12,10,10,0.9))] hover:text-stone-100'

  return `${baseClasses} ${checked ? checkedClasses : idleClasses}`
}

function getChoiceIndicatorClasses(checked) {
  const baseClasses =
    'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition duration-200'
  const checkedClasses = 'border-red-400 bg-red-500/15 shadow-[0_0_18px_rgba(248,113,113,0.22)]'
  const idleClasses = 'border-stone-600 bg-black/30'

  return `${baseClasses} ${checked ? checkedClasses : idleClasses}`
}

function getDefaultVisitDate() {
  const date = new Date()
  date.setDate(date.getDate() + 7)
  return date.toISOString().slice(0, 10)
}

function resolveSelectedItem(items, selectedId) {
  return items.find((item) => String(item.id) === selectedId) ?? null
}

function buildBookingSummary({ boardType, companionsCount, purchaseMode, selectedHotel, selectedOffer }) {
  if (purchaseMode === 'offer' && selectedOffer) {
    return {
      hotelName: selectedOffer.hotelName,
      boardType: selectedOffer.boardType,
      includedTickets: selectedOffer.includedTickets,
      referencePrice: selectedOffer.totalPrice,
    }
  }

  if (!selectedHotel) {
    return null
  }

  return {
    hotelName: selectedHotel.name,
    boardType,
    includedTickets: companionsCount + 1,
    referencePrice:
      boardType === 'FULL_BOARD'
        ? selectedHotel.fullBoardPrice
        : selectedHotel.halfBoardPrice,
  }
}

function buildBookingPayload({
  boardType,
  bookingUser,
  companions,
  purchaseMode,
  selectedHotel,
  selectedOffer,
  visitDate,
}) {
  return {
    userId: bookingUser.id,
    offerId: purchaseMode === 'offer' && selectedOffer ? selectedOffer.id : null,
    hotelId: purchaseMode === 'custom' && selectedHotel ? selectedHotel.id : null,
    boardType: purchaseMode === 'offer' && selectedOffer ? selectedOffer.boardType : boardType,
    visitDate,
    companions: [buildBookingHolder(bookingUser), ...companions],
  }
}

function buildBookingHolder(bookingUser) {
  return {
    firstName: bookingUser.firstName,
    lastName: bookingUser.lastName,
    birthDate: bookingUser.birthDate,
  }
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
