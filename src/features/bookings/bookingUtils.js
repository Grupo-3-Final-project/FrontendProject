export const boardTypeOptions = [
  { value: 'HALF_BOARD', label: 'Media pension' },
  { value: 'FULL_BOARD', label: 'Pension completa' },
]

export const createEmptyCompanion = () => ({
  firstName: '',
  lastName: '',
  birthDate: '',
})

export const createEmptyUser = () => ({
  firstName: '',
  lastName: '',
  dni: '',
  email: '',
  phone: '',
  birthDate: '',
})

export const createEmptyLogin = () => ({
  username: '',
  password: '',
})

export const formatCurrency = (value) =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(Number(value || 0))

export const formatDate = (value) => {
  if (!value) {
    return '-'
  }

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`))
}

export const formatDateTime = (value) => {
  if (!value) {
    return '-'
  }

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

export const getBoardTypeLabel = (boardType) =>
  boardTypeOptions.find((option) => option.value === boardType)?.label || boardType

export const getAgeRangeLabel = (ageRange) => {
  if (ageRange === 'CHILD') {
    return 'Infantil'
  }

  if (ageRange === 'SENIOR') {
    return 'Senior'
  }

  return 'Adulto'
}

export const resolveAgeRange = (birthDate, visitDate) => {
  if (!birthDate || !visitDate) {
    return null
  }

  const birth = new Date(`${birthDate}T00:00:00`)
  const visit = new Date(`${visitDate}T00:00:00`)

  if (Number.isNaN(birth.getTime()) || Number.isNaN(visit.getTime()) || birth > visit) {
    return null
  }

  let age = visit.getFullYear() - birth.getFullYear()
  const monthDelta = visit.getMonth() - birth.getMonth()

  if (monthDelta < 0 || (monthDelta === 0 && visit.getDate() < birth.getDate())) {
    age -= 1
  }

  if (age < 18) {
    return 'CHILD'
  }

  if (age >= 65) {
    return 'SENIOR'
  }

  return 'ADULT'
}

export const getBookingErrorMessage = (error) => {
  const message = error?.message

  if (message === 'Invalid user data') {
    return 'Revisa los datos del titular antes de continuar.'
  }

  if (message === 'Invalid booking data') {
    return 'Revisa la fecha, el plan elegido y los datos de los asistentes.'
  }

  if (message === 'User not found') {
    return 'El titular seleccionado ya no esta disponible. Elige otro usuario.'
  }

  if (message === 'Hotel not found') {
    return 'El hotel seleccionado ya no esta disponible.'
  }

  if (message === 'Offer not found') {
    return 'La oferta seleccionada ya no esta disponible.'
  }

  if (message === 'Hotel is full') {
    return 'El hotel ya no tiene plazas disponibles para esta reserva.'
  }

  if (message === 'A minor cannot travel without an adult') {
    return 'Debe haber al menos un adulto en la reserva si viaja un menor.'
  }

  if (message === 'Email already exists') {
    return 'Ya existe un usuario con ese email.'
  }

  if (message === 'DNI already exists') {
    return 'Ya existe un usuario con ese DNI.'
  }

  return error?.userMessage || 'No se ha podido completar la compra.'
}

export const validateBookingForm = ({
  userMode,
  newUser,
  selectedUserId,
  visitDate,
  productMode,
  selectedHotelId,
  selectedOfferId,
  boardType,
  companions,
}) => {
  const errors = {
    user: {},
    selectedUser: '',
    visitDate: '',
    selectedHotelId: '',
    selectedOfferId: '',
    boardType: '',
    companions: companions.map(() => ({})),
  }

  if (userMode === 'existing') {
    if (!selectedUserId) {
      errors.selectedUser = 'Selecciona un usuario existente.'
    }
  } else {
    if (!newUser.firstName.trim()) {
      errors.user.firstName = 'Introduce el nombre del titular.'
    }

    if (!newUser.lastName.trim()) {
      errors.user.lastName = 'Introduce los apellidos del titular.'
    }

    if (!newUser.dni.trim()) {
      errors.user.dni = 'Introduce el DNI del titular.'
    }

    if (!newUser.email.trim()) {
      errors.user.email = 'Introduce el email del titular.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
      errors.user.email = 'Introduce un email valido.'
    }

    if (!newUser.phone.trim()) {
      errors.user.phone = 'Introduce el telefono del titular.'
    }

    if (!newUser.birthDate) {
      errors.user.birthDate = 'Introduce la fecha de nacimiento del titular.'
    }
  }

  if (!visitDate) {
    errors.visitDate = 'Selecciona la fecha de la visita.'
  }

  if (productMode === 'hotel' && !selectedHotelId) {
    errors.selectedHotelId = 'Selecciona un hotel o cambia a solo entradas.'
  }

  if (productMode === 'offer' && !selectedOfferId) {
    errors.selectedOfferId = 'Selecciona una oferta o cambia de modalidad.'
  }

  if (!boardType) {
    errors.boardType = 'Selecciona un tipo de pension.'
  }

  companions.forEach((companion, index) => {
    if (!companion.firstName.trim()) {
      errors.companions[index].firstName = 'Introduce el nombre.'
    }

    if (!companion.lastName.trim()) {
      errors.companions[index].lastName = 'Introduce los apellidos.'
    }

    if (!companion.birthDate) {
      errors.companions[index].birthDate = 'Selecciona la fecha de nacimiento.'
    }
  })

  const hasErrors =
    Object.keys(errors.user).length > 0 ||
    Boolean(errors.selectedUser) ||
    Boolean(errors.visitDate) ||
    Boolean(errors.selectedHotelId) ||
    Boolean(errors.selectedOfferId) ||
    Boolean(errors.boardType) ||
    errors.companions.some((companionErrors) => Object.keys(companionErrors).length > 0)

  return { errors, hasErrors }
}

export const buildBookingPayload = ({
  userId,
  user,
  companions,
  hotelId,
  offerId,
  boardType,
  visitDate,
}) => ({
  userId,
  offerId: offerId || null,
  hotelId: hotelId || null,
  boardType,
  visitDate,
  companions: [
    {
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
    },
    ...companions.map((companion) => ({
      firstName: companion.firstName.trim(),
      lastName: companion.lastName.trim(),
      birthDate: companion.birthDate,
    })),
  ],
})
