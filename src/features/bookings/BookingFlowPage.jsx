import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarDays,
  Hotel,
  LogIn,
  LogOut,
  Plus,
  ShieldCheck,
  Ticket,
  Trash2,
  UserRound,
  Users,
} from 'lucide-react'
import { getOffers } from '../../api/offerApi'
import { getHotels } from '../../api/hotelApi'
import { createBooking } from '../../api/bookingApi'
import { createUser, getUsers } from '../../api/userApi'
import { getStoredSession, isAuthenticated, login, logout } from '../../api/authApi'
import {
  Badge,
  Button,
  Card,
  SelectField,
  StatusMessage,
  TextField,
} from '../../components/ui'
import BookingResultPanel from './BookingResultPanel'
import BookingSummaryPanel from './BookingSummaryPanel'
import {
  boardTypeOptions,
  buildBookingPayload,
  createEmptyCompanion,
  createEmptyLogin,
  createEmptyUser,
  formatCurrency,
  formatDate,
  getBookingErrorMessage,
  getBoardTypeLabel,
  resolveAgeRange,
  validateBookingForm,
} from './bookingUtils'

const productModeOptions = [
  {
    value: 'tickets',
    title: 'Solo entradas',
    description: 'Compra de tickets sin hotel.',
  },
  {
    value: 'hotel',
    title: 'Hotel + entradas',
    description: 'Reserva con hotel y plan de pension.',
  },
  {
    value: 'offer',
    title: 'Oferta comercial',
    description: 'Usa una oferta cerrada con hotel incluido.',
  },
]

const getDefaultVisitDate = () => {
  const visitDate = new Date()
  visitDate.setDate(visitDate.getDate() + 7)
  return visitDate.toISOString().slice(0, 10)
}

function BookingFlowPage() {
  const [offers, setOffers] = useState([])
  const [hotels, setHotels] = useState([])
  const [users, setUsers] = useState([])
  const [session, setSession] = useState(getStoredSession())
  const [userMode, setUserMode] = useState(isAuthenticated() ? 'existing' : 'new')
  const [loginForm, setLoginForm] = useState(createEmptyLogin())
  const [newUser, setNewUser] = useState(createEmptyUser())
  const [selectedUserId, setSelectedUserId] = useState('')
  const [provisionedUser, setProvisionedUser] = useState(null)
  const [visitDate, setVisitDate] = useState(getDefaultVisitDate())
  const [productMode, setProductMode] = useState('tickets')
  const [selectedHotelId, setSelectedHotelId] = useState('')
  const [selectedOfferId, setSelectedOfferId] = useState('')
  const [boardType, setBoardType] = useState('HALF_BOARD')
  const [companions, setCompanions] = useState([createEmptyCompanion()])
  const [formErrors, setFormErrors] = useState({
    user: {},
    selectedUser: '',
    visitDate: '',
    selectedHotelId: '',
    selectedOfferId: '',
    boardType: '',
    companions: [{}],
  })
  const [isBootLoading, setIsBootLoading] = useState(true)
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [loadError, setLoadError] = useState(null)
  const [loginError, setLoginError] = useState(null)
  const [submitError, setSubmitError] = useState(null)
  const [bookingResult, setBookingResult] = useState(null)

  useEffect(() => {
    let isMounted = true

    const loadPublicData = async () => {
      setIsBootLoading(true)
      setLoadError(null)

      try {
        const [hotelsResponse, offersResponse] = await Promise.all([
          getHotels(),
          getOffers(),
        ])

        if (!isMounted) {
          return
        }

        setHotels(hotelsResponse)
        setOffers(offersResponse)
      } catch (error) {
        if (!isMounted) {
          return
        }

        setLoadError(getBookingErrorMessage(error))
      } finally {
        if (isMounted) {
          setIsBootLoading(false)
        }
      }
    }

    loadPublicData()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!session?.token) {
      return
    }

    let isMounted = true

    const loadInternalUsers = async () => {
      setIsLoadingUsers(true)

      try {
        const usersResponse = await getUsers()

        if (!isMounted) {
          return
        }

        setUsers(usersResponse)
      } catch (error) {
        if (!isMounted) {
          return
        }

        setLoginError(getBookingErrorMessage(error))
      } finally {
        if (isMounted) {
          setIsLoadingUsers(false)
        }
      }
    }

    loadInternalUsers()

    return () => {
      isMounted = false
    }
  }, [session, userMode])

  const selectedOffer = useMemo(
    () => offers.find((offer) => String(offer.id) === String(selectedOfferId)) || null,
    [offers, selectedOfferId],
  )

  const selectedHotel = useMemo(() => {
    if (selectedOffer) {
      return hotels.find((hotel) => hotel.id === selectedOffer.hotelId) || null
    }

    return hotels.find((hotel) => String(hotel.id) === String(selectedHotelId)) || null
  }, [hotels, selectedHotelId, selectedOffer])

  const selectedUser = useMemo(
    () => users.find((user) => String(user.id) === String(selectedUserId)) || null,
    [users, selectedUserId],
  )

  const activeUser = useMemo(() => {
    if (userMode === 'existing') {
      return selectedUser
        ? {
            ...selectedUser,
            ageRange: resolveAgeRange(selectedUser.birthDate, visitDate),
          }
        : null
    }

    return newUser.firstName || newUser.lastName || newUser.birthDate
      ? {
          ...newUser,
          ageRange: resolveAgeRange(newUser.birthDate, visitDate),
        }
      : null
  }, [newUser, selectedUser, userMode, visitDate])

  const enrichedCompanions = useMemo(
    () =>
      companions.map((companion) => ({
        ...companion,
        ageRange: resolveAgeRange(companion.birthDate, visitDate),
      })),
    [companions, visitDate],
  )

  const effectiveBoardType = selectedOffer?.boardType || boardType

  const handleLoginFieldChange = (event) => {
    const { name, value } = event.target
    setLoginForm((currentValue) => ({
      ...currentValue,
      [name]: value,
    }))
  }

  const handleUserFieldChange = (event) => {
    const { name, value } = event.target
    setProvisionedUser(null)
    setNewUser((currentValue) => ({
      ...currentValue,
      [name]: value,
    }))
  }

  const handleCompanionFieldChange = (index, fieldName, value) => {
    setCompanions((currentValue) =>
      currentValue.map((companion, companionIndex) =>
        companionIndex === index
          ? {
              ...companion,
              [fieldName]: value,
            }
          : companion,
      ),
    )
  }

  const handleProductModeChange = (nextMode) => {
    setProductMode(nextMode)
    setSubmitError(null)
    setBookingResult(null)

    if (nextMode !== 'offer') {
      setSelectedOfferId('')
    }

    if (nextMode !== 'hotel') {
      setSelectedHotelId('')
    }

    if (nextMode === 'tickets') {
      setBoardType('HALF_BOARD')
    }
  }

  const handleOfferChange = (event) => {
    const nextOfferId = event.target.value
    setSelectedOfferId(nextOfferId)

    const nextOffer = offers.find((offer) => String(offer.id) === String(nextOfferId))

    if (nextOffer?.boardType) {
      setBoardType(nextOffer.boardType)
    }
  }

  const handleInternalLogin = async (event) => {
    event.preventDefault()
    setLoginError(null)
    setIsLoggingIn(true)

    try {
      const nextSession = await login(loginForm)
      setSession(nextSession)
      setUserMode('existing')
      setLoginForm(createEmptyLogin())
    } catch (error) {
      setLoginError(getBookingErrorMessage(error))
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleInternalLogout = () => {
    logout()
    setSession(null)
    setUsers([])
    setSelectedUserId('')
    setUserMode('new')
  }

  const handleAddCompanion = () => {
    setCompanions((currentValue) => [...currentValue, createEmptyCompanion()])
  }

  const handleRemoveCompanion = (index) => {
    setCompanions((currentValue) => currentValue.filter((_, companionIndex) => companionIndex !== index))
  }

  const handleResetResult = () => {
    setBookingResult(null)
    setSubmitError(null)
  }

  const handleSubmit = async () => {
    setSubmitError(null)
    setBookingResult(null)

    const { errors, hasErrors } = validateBookingForm({
      userMode,
      newUser,
      selectedUserId,
      visitDate,
      productMode,
      selectedHotelId,
      selectedOfferId,
      boardType: effectiveBoardType,
      companions,
    })

    setFormErrors(errors)

    if (hasErrors) {
      return
    }

    setIsSubmitting(true)

    try {
      let bookingUser = activeUser
      let userId = selectedUser?.id

      if (userMode === 'new') {
        if (provisionedUser) {
          bookingUser = provisionedUser
          userId = provisionedUser.id
        } else {
          const createdUser = await createUser(newUser)
          bookingUser = createdUser
          userId = createdUser.id
          setProvisionedUser(createdUser)

          if (session?.token) {
            setUsers((currentValue) => [createdUser, ...currentValue])
            setSelectedUserId(String(createdUser.id))
          }
        }
      }

      const bookingPayload = buildBookingPayload({
        userId,
        user: bookingUser,
        companions,
        hotelId: selectedHotel?.id || null,
        offerId: selectedOffer?.id || null,
        boardType: effectiveBoardType,
        visitDate,
      })

      const createdBooking = await createBooking(bookingPayload)
      setBookingResult(createdBooking)
    } catch (error) {
      setSubmitError(getBookingErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  const canSubmit = Boolean(activeUser && visitDate && !isBootLoading)

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(167,15,27,0.2),transparent_24rem),linear-gradient(180deg,#060606_0%,#000_100%)] px-4 py-8 text-stone-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="grid gap-5 rounded-3xl border border-white/10 bg-black/45 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.36)] lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:p-7">
          <div className="space-y-4">
            <Badge variant="danger">Taquilla y compra</Badge>
            <div>
              <p className="text-xs font-black tracking-[0.24em] text-red-400 uppercase">
                La Ultima Puerta
              </p>
              <h1 className="mt-3 max-w-none text-[clamp(2rem,4vw,3.6rem)] leading-[1.02] text-white">
                Crea la compra, valida el titular y confirma la reserva.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-300 sm:text-base">
                Flujo principal para taquilla y administracion. Puedes registrar un nuevo
                titular o iniciar sesion interna para reutilizar usuarios ya existentes.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/home"
                className="inline-flex min-h-11 items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-black text-white transition hover:border-red-500/70 hover:bg-red-950/30"
              >
                Volver a la home
              </Link>
              <Link
                to="/mobile"
                className="inline-flex min-h-11 items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-black text-white transition hover:border-red-500/70 hover:bg-red-950/30"
              >
                Ver experiencia mobile
              </Link>
            </div>
          </div>

          <Card
            title="Acceso interno"
            subtitle="Activa la seleccion de usuarios existentes y la consulta de reservas protegidas."
            className="h-full"
          >
            {session?.token ? (
              <div className="space-y-4">
                <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-4 py-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-emerald-300" />
                    <div>
                      <p className="text-sm font-black text-stone-100">{session.username}</p>
                      <p className="mt-1 text-xs text-stone-400">{session.email}</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full" variant="ghost" onClick={handleInternalLogout}>
                  <LogOut className="h-4 w-4" />
                  Cerrar sesion interna
                </Button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleInternalLogin}>
                <TextField
                  label="Usuario interno"
                  name="username"
                  value={loginForm.username}
                  onChange={handleLoginFieldChange}
                  placeholder="admin"
                />
                <TextField
                  label="Contrasena"
                  name="password"
                  type="password"
                  value={loginForm.password}
                  onChange={handleLoginFieldChange}
                  placeholder="admin12345"
                />
                <Button className="w-full" type="submit" disabled={isLoggingIn}>
                  <LogIn className="h-4 w-4" />
                  {isLoggingIn ? 'Abriendo sesion...' : 'Abrir sesion interna'}
                </Button>
              </form>
            )}

            {loginError ? (
              <StatusMessage
                title="Acceso no disponible"
                message={loginError}
                variant="error"
              />
            ) : null}
          </Card>
        </header>

        {loadError ? (
          <StatusMessage
            title="No se han podido cargar hoteles u ofertas"
            message={loadError}
            variant="error"
          />
        ) : null}

        {submitError ? (
          <StatusMessage title="No se ha podido confirmar la compra" message={submitError} variant="error" />
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.9fr)]">
          <div className="space-y-6">
            <Card
              title="Titular de la compra"
              subtitle="El titular se registra como primera entrada de la reserva."
            >
              <div className="space-y-5">
                <div className="grid gap-3 md:grid-cols-2">
                  <Button
                    className="w-full"
                    variant={userMode === 'new' ? 'primary' : 'ghost'}
                    onClick={() => setUserMode('new')}
                  >
                    <UserRound className="h-4 w-4" />
                    Nuevo titular
                  </Button>
                  <Button
                    className="w-full"
                    variant={userMode === 'existing' ? 'primary' : 'ghost'}
                    disabled={!session?.token}
                    onClick={() => setUserMode('existing')}
                  >
                    <Users className="h-4 w-4" />
                    Usuario existente
                  </Button>
                </div>

                {userMode === 'existing' ? (
                  <SelectField
                    label="Selecciona un usuario"
                    value={selectedUserId}
                    onChange={(event) => setSelectedUserId(event.target.value)}
                    error={formErrors.selectedUser}
                    helpText={
                      isLoadingUsers
                        ? 'Cargando usuarios internos...'
                        : 'Necesitas sesion interna para reutilizar titulares ya creados.'
                    }
                    options={[
                      { value: '', label: 'Selecciona un usuario' },
                      ...users.map((user) => ({
                        value: String(user.id),
                        label: `${user.firstName} ${user.lastName} · ${user.dni}`,
                      })),
                    ]}
                  />
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    <TextField
                      label="Nombre"
                      name="firstName"
                      value={newUser.firstName}
                      onChange={handleUserFieldChange}
                      error={formErrors.user.firstName}
                    />
                    <TextField
                      label="Apellidos"
                      name="lastName"
                      value={newUser.lastName}
                      onChange={handleUserFieldChange}
                      error={formErrors.user.lastName}
                    />
                    <TextField
                      label="DNI"
                      name="dni"
                      value={newUser.dni}
                      onChange={handleUserFieldChange}
                      error={formErrors.user.dni}
                    />
                    <TextField
                      label="Telefono"
                      name="phone"
                      value={newUser.phone}
                      onChange={handleUserFieldChange}
                      error={formErrors.user.phone}
                    />
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      value={newUser.email}
                      onChange={handleUserFieldChange}
                      error={formErrors.user.email}
                    />
                    <TextField
                      label="Fecha de nacimiento"
                      name="birthDate"
                      type="date"
                      value={newUser.birthDate}
                      onChange={handleUserFieldChange}
                      error={formErrors.user.birthDate}
                    />
                  </div>
                )}
              </div>
            </Card>

            <Card
              title="Plan de compra"
              subtitle="Elige solo entradas, hotel o una oferta ya preparada."
            >
              <div className="space-y-5">
                <div className="grid gap-3 lg:grid-cols-3">
                  {productModeOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`rounded-lg border p-4 text-left transition ${
                        productMode === option.value
                          ? 'border-red-500/80 bg-red-950/40 shadow-[0_0_28px_rgba(167,15,27,0.24)]'
                          : 'border-white/10 bg-black/20 hover:border-red-500/40 hover:bg-red-950/20'
                      }`}
                      onClick={() => handleProductModeChange(option.value)}
                    >
                      <strong className="block text-sm text-stone-100">{option.title}</strong>
                      <p className="mt-2 text-sm text-stone-400">{option.description}</p>
                    </button>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <TextField
                    label="Fecha de visita"
                    type="date"
                    value={visitDate}
                    onChange={(event) => setVisitDate(event.target.value)}
                    error={formErrors.visitDate}
                  />
                  <SelectField
                    label="Tipo de pension"
                    value={effectiveBoardType}
                    onChange={(event) => setBoardType(event.target.value)}
                    disabled={Boolean(selectedOffer)}
                    error={formErrors.boardType}
                    options={boardTypeOptions}
                    helpText={
                      selectedOffer
                        ? 'La oferta fija automaticamente el plan de pension.'
                        : 'Campo requerido por el contrato de reservas.'
                    }
                  />
                </div>

                {productMode === 'hotel' ? (
                  <div className="space-y-3">
                    <SelectField
                      label="Hotel"
                      value={selectedHotelId}
                      onChange={(event) => setSelectedHotelId(event.target.value)}
                      error={formErrors.selectedHotelId}
                      options={[
                        { value: '', label: 'Selecciona un hotel' },
                        ...hotels.map((hotel) => ({
                          value: String(hotel.id),
                          label: `${hotel.name} · ${hotel.availablePlaces}/${hotel.totalPlaces} plazas`,
                        })),
                      ]}
                    />

                    {selectedHotel ? (
                      <div className="rounded-lg border border-white/10 bg-black/25 px-4 py-4 text-sm text-stone-300">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <strong className="block text-stone-100">{selectedHotel.name}</strong>
                            <p className="mt-2 text-stone-400">{selectedHotel.description}</p>
                          </div>
                          <Badge variant="warning">
                            {selectedHotel.availablePlaces}/{selectedHotel.totalPlaces}
                          </Badge>
                        </div>
                        <div className="mt-4 grid gap-2 sm:grid-cols-2">
                          <span>Media pension: {formatCurrency(selectedHotel.halfBoardPrice)}</span>
                          <span>Pension completa: {formatCurrency(selectedHotel.fullBoardPrice)}</span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {productMode === 'offer' ? (
                  <div className="space-y-3">
                    <SelectField
                      label="Oferta"
                      value={selectedOfferId}
                      onChange={handleOfferChange}
                      error={formErrors.selectedOfferId}
                      options={[
                        { value: '', label: 'Selecciona una oferta' },
                        ...offers.map((offer) => ({
                          value: String(offer.id),
                          label: `${offer.title} · ${formatCurrency(offer.totalPrice)}`,
                        })),
                      ]}
                    />

                    {selectedOffer ? (
                      <div className="rounded-lg border border-white/10 bg-black/25 px-4 py-4 text-sm text-stone-300">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <strong className="block text-stone-100">{selectedOffer.title}</strong>
                            <p className="mt-2 text-stone-400">{selectedOffer.description}</p>
                          </div>
                          <Badge variant="success">{selectedOffer.includedTickets} incluidas</Badge>
                        </div>
                        <div className="mt-4 grid gap-2 sm:grid-cols-2">
                          <span>Hotel: {selectedOffer.hotelName}</span>
                          <span>Plan: {getBoardTypeLabel(selectedOffer.boardType)}</span>
                          <span>Precio: {formatCurrency(selectedOffer.totalPrice)}</span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </Card>

            <Card
              title="Asistentes adicionales"
              subtitle="El titular ya cuenta como primera entrada de la reserva."
            >
              <div className="space-y-4">
                {enrichedCompanions.map((companion, index) => (
                  <div
                    key={`companion-${index}`}
                    className="rounded-lg border border-white/10 bg-black/20 p-4"
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Ticket className="h-4 w-4 text-red-300" />
                        <strong className="text-sm text-stone-100">
                          Acompanante {index + 1}
                        </strong>
                      </div>
                      {companions.length > 1 ? (
                        <Button variant="ghost" onClick={() => handleRemoveCompanion(index)}>
                          <Trash2 className="h-4 w-4" />
                          Quitar
                        </Button>
                      ) : null}
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <TextField
                        label="Nombre"
                        value={companion.firstName}
                        onChange={(event) =>
                          handleCompanionFieldChange(index, 'firstName', event.target.value)
                        }
                        error={formErrors.companions[index]?.firstName}
                      />
                      <TextField
                        label="Apellidos"
                        value={companion.lastName}
                        onChange={(event) =>
                          handleCompanionFieldChange(index, 'lastName', event.target.value)
                        }
                        error={formErrors.companions[index]?.lastName}
                      />
                      <TextField
                        label="Fecha de nacimiento"
                        type="date"
                        value={companion.birthDate}
                        onChange={(event) =>
                          handleCompanionFieldChange(index, 'birthDate', event.target.value)
                        }
                        error={formErrors.companions[index]?.birthDate}
                        helpText={
                          companion.ageRange
                            ? `Tarifa prevista: ${companion.ageRange.toLowerCase()}`
                            : 'El backend calcula la tarifa definitiva.'
                        }
                      />
                    </div>
                  </div>
                ))}

                <Button className="w-full" variant="ghost" onClick={handleAddCompanion}>
                  <Plus className="h-4 w-4" />
                  Anadir acompanante
                </Button>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <BookingSummaryPanel
              user={activeUser}
              companions={enrichedCompanions}
              visitDate={visitDate}
              selectedHotel={selectedHotel}
              selectedOffer={selectedOffer}
              boardType={effectiveBoardType}
              canSubmit={canSubmit}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              onResetResult={handleResetResult}
            />

            <BookingResultPanel booking={bookingResult} />

            <Card
              title="Referencia operativa"
              subtitle="Credenciales demo y atajos para pruebas de integracion."
            >
              <div className="space-y-3 text-sm text-stone-400">
                <div className="rounded-md border border-white/10 bg-black/25 px-3 py-3">
                  <div className="flex items-center gap-2 text-stone-100">
                    <ShieldCheck className="h-4 w-4 text-emerald-300" />
                    <strong>Sesion interna demo</strong>
                  </div>
                  <p className="mt-2">Usuario: admin</p>
                  <p>Contrasena: admin12345</p>
                </div>
                <div className="rounded-md border border-white/10 bg-black/25 px-3 py-3">
                  <div className="flex items-center gap-2 text-stone-100">
                    <CalendarDays className="h-4 w-4 text-amber-300" />
                    <strong>Reglas de negocio activas</strong>
                  </div>
                  <ul className="mt-2 space-y-1 pl-4 text-sm">
                    <li>El backend bloquea hoteles sin plazas.</li>
                    <li>Un menor no puede viajar sin un adulto.</li>
                    <li>La respuesta final incluye tickets, total y fecha de creacion.</li>
                  </ul>
                </div>
                <div className="rounded-md border border-white/10 bg-black/25 px-3 py-3">
                  <div className="flex items-center gap-2 text-stone-100">
                    <Hotel className="h-4 w-4 text-red-300" />
                    <strong>Datos demo cargados</strong>
                  </div>
                  <p className="mt-2">Hoteles: {hotels.length}</p>
                  <p>Ofertas: {offers.length}</p>
                  <p>Usuarios internos visibles: {users.length}</p>
                </div>
                {activeUser ? (
                  <div className="rounded-md border border-white/10 bg-black/25 px-3 py-3">
                    <div className="flex items-center gap-2 text-stone-100">
                      <UserRound className="h-4 w-4 text-red-300" />
                      <strong>Titular actual</strong>
                    </div>
                    <p className="mt-2">{`${activeUser.firstName} ${activeUser.lastName}`}</p>
                    <p>{activeUser.birthDate ? formatDate(activeUser.birthDate) : 'Sin fecha'}</p>
                  </div>
                ) : null}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

export default BookingFlowPage
