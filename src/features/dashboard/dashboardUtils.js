export const boardTypeOptions = [
  { value: 'HALF_BOARD', label: 'Media pension' },
  { value: 'FULL_BOARD', label: 'Pension completa' },
]

export const attractionSizeOptions = [
  { value: 'SMALL', label: 'Small' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'LARGE', label: 'Large' },
]

export const attractionStatusOptions = [
  { value: 'OPEN', label: 'Abierta' },
  { value: 'CLOSED', label: 'Cerrada' },
  { value: 'MAINTENANCE', label: 'Mantenimiento' },
]

export const employeeTypeOptions = [
  { value: 'CLEANER', label: 'Cleaner' },
  { value: 'ANIMATOR', label: 'Animator' },
  { value: 'TECHNICIAN', label: 'Technician' },
]

export const shiftOptions = [
  { value: 'MORNING', label: 'Manana' },
  { value: 'AFTERNOON', label: 'Tarde' },
]

export const activeOptions = [
  { value: 'true', label: 'Activo' },
  { value: 'false', label: 'Inactivo' },
]

export const hotelFields = [
  { name: 'name', label: 'Nombre', type: 'text', required: true },
  { name: 'description', label: 'Descripcion', type: 'textarea', required: true },
  { name: 'totalRooms', label: 'Habitaciones totales', type: 'number', required: true },
  { name: 'availableRooms', label: 'Habitaciones disponibles', type: 'number', required: true },
  { name: 'totalPlaces', label: 'Plazas totales', type: 'number', required: true },
  { name: 'availablePlaces', label: 'Plazas disponibles', type: 'number', required: true },
  { name: 'halfBoardPrice', label: 'Precio media pension', type: 'number', required: true },
  { name: 'fullBoardPrice', label: 'Precio pension completa', type: 'number', required: true },
  { name: 'imageUrl', label: 'URL de imagen', type: 'text', required: true },
]

export const attractionFields = [
  { name: 'name', label: 'Nombre', type: 'text', required: true },
  { name: 'description', label: 'Descripcion', type: 'textarea', required: true },
  { name: 'size', label: 'Tamano', type: 'select', required: true, options: attractionSizeOptions },
  { name: 'status', label: 'Estado', type: 'select', required: true, options: attractionStatusOptions },
  { name: 'totalSeats', label: 'Plazas totales', type: 'number', required: true },
  { name: 'availableSeats', label: 'Plazas disponibles', type: 'number', required: true },
  { name: 'imageUrl', label: 'URL de imagen', type: 'text', required: true },
]

export const employeeFields = [
  { name: 'firstName', label: 'Nombre', type: 'text', required: true },
  { name: 'lastName', label: 'Apellidos', type: 'text', required: true },
  { name: 'dni', label: 'DNI', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  {
    name: 'employeeType',
    label: 'Tipo de empleado',
    type: 'select',
    required: true,
    options: employeeTypeOptions,
  },
  { name: 'shift', label: 'Turno', type: 'select', required: true, options: shiftOptions },
  { name: 'active', label: 'Estado', type: 'select', required: true, options: activeOptions },
]

export const offerFields = (hotels) => [
  { name: 'title', label: 'Titulo', type: 'text', required: true },
  { name: 'description', label: 'Descripcion', type: 'textarea', required: true },
  {
    name: 'hotelId',
    label: 'Hotel',
    type: 'select',
    required: true,
    options: [
      { value: '', label: 'Selecciona un hotel' },
      ...hotels.map((hotel) => ({ value: String(hotel.id), label: hotel.name })),
    ],
  },
  { name: 'boardType', label: 'Pension', type: 'select', required: true, options: boardTypeOptions },
  { name: 'includedTickets', label: 'Entradas incluidas', type: 'number', required: true },
  { name: 'totalPrice', label: 'Precio total', type: 'number', required: true },
  { name: 'imageUrl', label: 'URL de imagen', type: 'text', required: true },
]

export const createHotelForm = () => ({
  name: '',
  description: '',
  totalRooms: '',
  availableRooms: '',
  totalPlaces: '',
  availablePlaces: '',
  halfBoardPrice: '',
  fullBoardPrice: '',
  imageUrl: '',
})

export const createAttractionForm = () => ({
  name: '',
  description: '',
  size: 'MEDIUM',
  status: 'OPEN',
  totalSeats: '',
  availableSeats: '',
  imageUrl: '',
})

export const createEmployeeForm = () => ({
  firstName: '',
  lastName: '',
  dni: '',
  email: '',
  employeeType: 'CLEANER',
  shift: 'MORNING',
  active: 'true',
})

export const createOfferForm = () => ({
  title: '',
  description: '',
  hotelId: '',
  boardType: 'HALF_BOARD',
  includedTickets: '',
  totalPrice: '',
  imageUrl: '',
})

export const createWindowForm = () => ({
  startDate: '',
  endDate: '',
})

export const createLoginForm = () => ({
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

export const getBoardTypeLabel = (value) =>
  boardTypeOptions.find((option) => option.value === value)?.label || value

export const getAttractionStatusLabel = (value) =>
  attractionStatusOptions.find((option) => option.value === value)?.label || value

export const getMaintenanceStatusLabel = (value) => {
  if (value === 'SCHEDULED') {
    return 'Programado'
  }

  if (value === 'COMPLETED') {
    return 'Completado'
  }

  if (value === 'CANCELLED') {
    return 'Cancelado'
  }

  return value
}

export const getEmployeeTypeLabel = (value) =>
  employeeTypeOptions.find((option) => option.value === value)?.label || value

export const getShiftLabel = (value) =>
  shiftOptions.find((option) => option.value === value)?.label || value

export const getApiErrorMessage = (error) => {
  const message = error?.message

  if (message === 'Authentication is required') {
    return 'Necesitas iniciar sesion interna para acceder al dashboard.'
  }

  if (message === 'Invalid credentials') {
    return 'Las credenciales internas no son validas.'
  }

  if (message === 'Invalid login data') {
    return 'Revisa las credenciales antes de continuar.'
  }

  if (message === 'Invalid image file') {
    return 'La imagen no es valida.'
  }

  if (message === 'Email already exists') {
    return 'Ya existe un registro con ese email.'
  }

  if (message === 'DNI already exists') {
    return 'Ya existe un registro con ese DNI.'
  }

  if (message === 'Not enough employees to cover required shifts') {
    return 'No hay empleados suficientes para generar los turnos solicitados.'
  }

  if (message === 'Not enough technicians available') {
    return 'No hay tecnicos suficientes para generar el mantenimiento solicitado.'
  }

  return error?.userMessage || 'No se ha podido completar la operacion.'
}

export const validateFields = (fields, form) => {
  const errors = {}

  fields.forEach((field) => {
    const value = form[field.name]

    if (field.required && `${value ?? ''}`.trim() === '') {
      errors[field.name] = `Completa el campo ${field.label.toLowerCase()}.`
      return
    }

    if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors[field.name] = 'Introduce un email valido.'
    }
  })

  return errors
}

export const validateWindowForm = (form) => {
  const errors = {}

  if (!form.startDate) {
    errors.startDate = 'Selecciona la fecha de inicio.'
  }

  if (!form.endDate) {
    errors.endDate = 'Selecciona la fecha de fin.'
  }

  if (form.startDate && form.endDate && form.endDate < form.startDate) {
    errors.endDate = 'La fecha fin no puede ser anterior a la fecha de inicio.'
  }

  return errors
}

export const buildPayloadFromForm = (fields, form) =>
  fields.reduce((payload, field) => {
    const value = form[field.name]

    if (field.type === 'number') {
      payload[field.name] = Number(value)
      return payload
    }

    if (field.name === 'active') {
      payload[field.name] = value === 'true'
      return payload
    }

    if (field.name === 'hotelId') {
      payload[field.name] = Number(value)
      return payload
    }

    payload[field.name] = value
    return payload
  }, {})

export const buildFormFromItem = (fields, item) =>
  fields.reduce((form, field) => {
    const value = item[field.name]
    form[field.name] = typeof value === 'boolean' ? String(value) : `${value ?? ''}`
    return form
  }, {})
