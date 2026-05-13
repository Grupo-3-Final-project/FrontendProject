import Badge from '../../components/ui/Badge'
import {
  formatAttractionSize,
  formatAttractionStatus,
  formatBoardType,
  formatCurrency,
  formatDate,
  formatDateTime,
  formatEmployeeType,
  formatMaintenanceStatus,
  formatShiftLabel,
} from './formatters'

export const dashboardTabs = [
  { key: 'overview', label: 'Resumen' },
  { key: 'bookings', label: 'Taquilla' },
  { key: 'users', label: 'Usuarios' },
  { key: 'hotels', label: 'Hoteles' },
  { key: 'attractions', label: 'Atracciones' },
  { key: 'offers', label: 'Ofertas' },
  { key: 'employees', label: 'Empleados' },
  { key: 'operations', label: 'Operaciones' },
]

const numberField = (name, label, options = {}) => ({
  name,
  label,
  type: 'number',
  min: options.min ?? 0,
  step: options.step ?? 1,
})

export const entityDefinitions = {
  users: {
    key: 'users',
    title: 'Usuarios',
    description: 'Consulta y gestiona los datos de los clientes del parque.',
    emptyForm: {
      firstName: '',
      lastName: '',
      dni: '',
      email: '',
      phone: '',
      birthDate: '',
    },
    fields: [
      { name: 'firstName', label: 'Nombre', type: 'text' },
      { name: 'lastName', label: 'Apellidos', type: 'text' },
      { name: 'dni', label: 'DNI', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'phone', label: 'Teléfono', type: 'text' },
      { name: 'birthDate', label: 'Fecha de nacimiento', type: 'date' },
    ],
    columns: [
      {
        key: 'fullName',
        label: 'Cliente',
        render: (item) => (
          <div className="min-w-0">
            <div className="font-bold text-stone-100">{item.firstName} {item.lastName}</div>
            <div className="text-xs text-stone-500">{item.dni}</div>
          </div>
        ),
      },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Teléfono' },
      {
        key: 'birthDate',
        label: 'Nacimiento',
        render: (item) => formatDate(item.birthDate),
      },
    ],
    toPayload: (form) => ({ ...form }),
    fromItem: (item) => ({ ...item }),
  },
  hotels: {
    key: 'hotels',
    title: 'Hoteles',
    description: 'Gestiona plazas, habitaciones y precios de los hoteles.',
    emptyForm: {
      name: '',
      description: '',
      totalRooms: '0',
      availableRooms: '0',
      totalPlaces: '0',
      availablePlaces: '0',
      halfBoardPrice: '0',
      fullBoardPrice: '0',
      imageUrl: '',
    },
    fields: [
      { name: 'name', label: 'Nombre', type: 'text' },
      { name: 'description', label: 'Descripción', type: 'textarea' },
      numberField('totalRooms', 'Habitaciones totales', { min: 1 }),
      numberField('availableRooms', 'Habitaciones disponibles', { min: 0 }),
      numberField('totalPlaces', 'Plazas totales', { min: 1 }),
      numberField('availablePlaces', 'Plazas disponibles', { min: 0 }),
      numberField('halfBoardPrice', 'Media pensión', { min: 0.01, step: 0.01 }),
      numberField('fullBoardPrice', 'Pensión completa', { min: 0.01, step: 0.01 }),
      { name: 'imageUrl', label: 'Imagen', type: 'image', folder: 'hotels' },
    ],
    columns: [
      {
        key: 'name',
        label: 'Hotel',
        render: (item) => (
          <div className="flex items-center gap-3">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="h-12 w-16 rounded-md border border-stone-800 object-cover"
            />
            <div className="min-w-0">
              <div className="font-bold text-stone-100">{item.name}</div>
              <div className="text-xs text-stone-500">
                {item.availablePlaces}/{item.totalPlaces} plazas
              </div>
            </div>
          </div>
        ),
      },
      {
        key: 'boardPrices',
        label: 'Precios',
        render: (item) => (
          <div className="text-sm text-stone-300">
            <div>MP: {formatCurrency(item.halfBoardPrice)}</div>
            <div>PC: {formatCurrency(item.fullBoardPrice)}</div>
          </div>
        ),
      },
      {
        key: 'rooms',
        label: 'Habitaciones',
        render: (item) => `${item.availableRooms}/${item.totalRooms}`,
      },
    ],
    toPayload: (form) => ({
      ...form,
      totalRooms: Number(form.totalRooms),
      availableRooms: Number(form.availableRooms),
      totalPlaces: Number(form.totalPlaces),
      availablePlaces: Number(form.availablePlaces),
      halfBoardPrice: Number(form.halfBoardPrice),
      fullBoardPrice: Number(form.fullBoardPrice),
    }),
    fromItem: (item) => ({
      ...item,
      totalRooms: String(item.totalRooms),
      availableRooms: String(item.availableRooms),
      totalPlaces: String(item.totalPlaces),
      availablePlaces: String(item.availablePlaces),
      halfBoardPrice: String(item.halfBoardPrice),
      fullBoardPrice: String(item.fullBoardPrice),
    }),
  },
  attractions: {
    key: 'attractions',
    title: 'Atracciones',
    description: 'Actualiza el catálogo, el aforo y el estado de cada atracción.',
    emptyForm: {
      name: '',
      description: '',
      size: 'SMALL',
      status: 'OPEN',
      totalSeats: '0',
      availableSeats: '0',
      imageUrl: '',
    },
    fields: [
      { name: 'name', label: 'Nombre', type: 'text' },
      { name: 'description', label: 'Descripción', type: 'textarea' },
      {
        name: 'size',
        label: 'Tamaño',
        type: 'select',
        options: [
          { value: 'SMALL', label: 'Pequeña' },
          { value: 'MEDIUM', label: 'Mediana' },
          { value: 'LARGE', label: 'Grande' },
        ],
      },
      {
        name: 'status',
        label: 'Estado',
        type: 'select',
        options: [
          { value: 'OPEN', label: 'Abierta' },
          { value: 'CLOSED', label: 'Cerrada' },
          { value: 'MAINTENANCE', label: 'Mantenimiento' },
        ],
      },
      numberField('totalSeats', 'Asientos totales', { min: 1 }),
      numberField('availableSeats', 'Asientos disponibles', { min: 0 }),
      { name: 'imageUrl', label: 'Imagen', type: 'image', folder: 'attractions' },
    ],
    columns: [
      {
        key: 'name',
        label: 'Atracción',
        render: (item) => (
          <div className="flex items-center gap-3">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="h-12 w-16 rounded-md border border-stone-800 object-cover"
            />
            <div className="min-w-0">
              <div className="font-bold text-stone-100">{item.name}</div>
              <div className="text-xs text-stone-500">{formatAttractionSize(item.size)}</div>
            </div>
          </div>
        ),
      },
      {
        key: 'status',
        label: 'Estado',
        render: (item) => (
          <Badge variant={item.status === 'OPEN' ? 'success' : item.status === 'MAINTENANCE' ? 'warning' : 'danger'}>
            {formatAttractionStatus(item.status)}
          </Badge>
        ),
      },
      {
        key: 'seats',
        label: 'Aforo',
        render: (item) => `${item.availableSeats}/${item.totalSeats}`,
      },
      {
        key: 'maintenanceFrequencyDays',
        label: 'Revisión',
        render: (item) => `Cada ${item.maintenanceFrequencyDays} días`,
      },
    ],
    toPayload: (form) => ({
      ...form,
      totalSeats: Number(form.totalSeats),
      availableSeats: Number(form.availableSeats),
    }),
    fromItem: (item) => ({
      ...item,
      totalSeats: String(item.totalSeats),
      availableSeats: String(item.availableSeats),
    }),
  },
  offers: {
    key: 'offers',
    title: 'Ofertas',
    description: 'Crea packs comerciales con hotel, pensión, entradas e imagen.',
    emptyForm: {
      title: '',
      description: '',
      hotelId: '1',
      boardType: 'FULL_BOARD',
      includedTickets: '1',
      totalPrice: '0',
      imageUrl: '',
    },
    fields: [
      { name: 'title', label: 'Título', type: 'text' },
      { name: 'description', label: 'Descripción', type: 'textarea' },
      numberField('hotelId', 'Hotel', { min: 1 }),
      {
        name: 'boardType',
        label: 'Régimen',
        type: 'select',
        options: [
          { value: 'HALF_BOARD', label: 'Media pensión' },
          { value: 'FULL_BOARD', label: 'Pensión completa' },
        ],
      },
      numberField('includedTickets', 'Entradas incluidas', { min: 1 }),
      numberField('totalPrice', 'Precio total', { min: 0.01, step: 0.01 }),
      { name: 'imageUrl', label: 'Imagen', type: 'image', folder: 'offers' },
    ],
    columns: [
      {
        key: 'title',
        label: 'Oferta',
        render: (item) => (
          <div className="flex items-center gap-3">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-12 w-16 rounded-md border border-stone-800 object-cover"
            />
            <div className="min-w-0">
              <div className="font-bold text-stone-100">{item.title}</div>
              <div className="text-xs text-stone-500">{item.hotelName}</div>
            </div>
          </div>
        ),
      },
      {
        key: 'boardType',
        label: 'Régimen',
        render: (item) => formatBoardType(item.boardType),
      },
      {
        key: 'includedTickets',
        label: 'Entradas',
      },
      {
        key: 'totalPrice',
        label: 'Precio',
        render: (item) => formatCurrency(item.totalPrice),
      },
    ],
    toPayload: (form) => ({
      ...form,
      hotelId: Number(form.hotelId),
      includedTickets: Number(form.includedTickets),
      totalPrice: Number(form.totalPrice),
    }),
    fromItem: (item) => ({
      ...item,
      hotelId: String(item.hotelId),
      includedTickets: String(item.includedTickets),
      totalPrice: String(item.totalPrice),
    }),
  },
  employees: {
    key: 'employees',
    title: 'Empleados',
    description: 'Gestiona el personal del parque y su turno base.',
    emptyForm: {
      firstName: '',
      lastName: '',
      dni: '',
      email: '',
      employeeType: 'CLEANER',
      shift: 'MORNING',
      active: true,
    },
    fields: [
      { name: 'firstName', label: 'Nombre', type: 'text' },
      { name: 'lastName', label: 'Apellidos', type: 'text' },
      { name: 'dni', label: 'DNI', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' },
      {
        name: 'employeeType',
        label: 'Tipo',
        type: 'select',
        options: [
          { value: 'CLEANER', label: 'Limpiador' },
          { value: 'ANIMATOR', label: 'Animador' },
          { value: 'TECHNICIAN', label: 'Técnico' },
        ],
      },
      {
        name: 'shift',
        label: 'Turno base',
        type: 'select',
        options: [
          { value: 'MORNING', label: 'Mañana' },
          { value: 'AFTERNOON', label: 'Tarde' },
        ],
      },
      { name: 'active', label: 'Activo', type: 'checkbox' },
    ],
    columns: [
      {
        key: 'fullName',
        label: 'Empleado',
        render: (item) => (
          <div className="min-w-0">
            <div className="font-bold text-stone-100">{item.firstName} {item.lastName}</div>
            <div className="text-xs text-stone-500">{item.dni}</div>
          </div>
        ),
      },
      {
        key: 'employeeType',
        label: 'Oficio',
        render: (item) => formatEmployeeType(item.employeeType),
      },
      {
        key: 'shift',
        label: 'Turno',
        render: (item) => formatShiftLabel(item.shift),
      },
      {
        key: 'active',
        label: 'Estado',
        render: (item) => <Badge variant={item.active ? 'success' : 'neutral'}>{item.active ? 'Activo' : 'Inactivo'}</Badge>,
      },
    ],
    toPayload: (form) => ({ ...form, active: Boolean(form.active) }),
    fromItem: (item) => ({ ...item }),
  },
}

export const overviewHelpers = {
  bookingColumns: [
    {
      key: 'customer',
      label: 'Cliente',
      render: (item) => (
        <div className="min-w-0">
          <div className="font-bold text-stone-100">{item.userFullName}</div>
          <div className="text-xs text-stone-500">{formatDateTime(item.createdAt)}</div>
        </div>
      ),
    },
    {
      key: 'visitDate',
      label: 'Visita',
      render: (item) => formatDate(item.visitDate),
    },
    {
      key: 'hotelName',
      label: 'Hotel',
      render: (item) => item.hotelName ?? 'Sin hotel',
    },
    {
      key: 'totalPrice',
      label: 'Total',
      render: (item) => formatCurrency(item.totalPrice),
    },
  ],
  maintenanceColumns: [
    {
      key: 'attractionName',
      label: 'Atracción',
      render: (item) => item.attractionName,
    },
    {
      key: 'scheduledDate',
      label: 'Fecha',
      render: (item) => formatDate(item.scheduledDate),
    },
    {
      key: 'status',
      label: 'Estado',
      render: (item) => <Badge variant="warning">{formatMaintenanceStatus(item.status)}</Badge>,
    },
  ],
  shiftColumns: [
    {
      key: 'employeeFullName',
      label: 'Empleado',
      render: (item) => item.employeeFullName,
    },
    {
      key: 'shift',
      label: 'Turno',
      render: (item) => formatShiftLabel(item.shift),
    },
    {
      key: 'period',
      label: 'Período',
      render: (item) => `${formatDate(item.startDate)} - ${formatDate(item.endDate)}`,
    },
  ],
  hotelRevenueLabel: (hotel) => `${hotel.hotelName} - ${formatCurrency(hotel.revenue)}`,
  ticketRangeLabel: (ticketGroup) => `${formatBoardType(ticketGroup.ageRange)}: ${ticketGroup.ticketsSold}`,
}
