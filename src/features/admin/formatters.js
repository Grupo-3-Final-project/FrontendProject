export function formatCurrency(value) {
  const amount = Number(value ?? 0)

  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(value) {
  if (!value) {
    return '-'
  }

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value))
}

export function formatDateTime(value) {
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

export function formatBoardType(value) {
  if (value === 'FULL_BOARD') {
    return 'Pensión completa'
  }

  if (value === 'HALF_BOARD') {
    return 'Media pensión'
  }

  if (value === 'CHILD') {
    return 'Infantil'
  }

  if (value === 'ADULT') {
    return 'Adulto'
  }

  if (value === 'SENIOR') {
    return 'Pensionista'
  }

  return value ?? '-'
}

export function formatAttractionSize(value) {
  if (value === 'SMALL') {
    return 'Pequeña'
  }

  if (value === 'MEDIUM') {
    return 'Mediana'
  }

  if (value === 'LARGE') {
    return 'Grande'
  }

  return value ?? '-'
}

export function formatAttractionStatus(value) {
  if (value === 'OPEN') {
    return 'Abierta'
  }

  if (value === 'CLOSED') {
    return 'Cerrada'
  }

  if (value === 'MAINTENANCE') {
    return 'Mantenimiento'
  }

  return value ?? '-'
}

export function formatEmployeeType(value) {
  if (value === 'CLEANER') {
    return 'Limpiador'
  }

  if (value === 'ANIMATOR') {
    return 'Animador'
  }

  if (value === 'TECHNICIAN') {
    return 'Técnico'
  }

  return value ?? '-'
}

export function formatShiftLabel(value) {
  if (value === 'MORNING') {
    return 'Mañana'
  }

  if (value === 'AFTERNOON') {
    return 'Tarde'
  }

  return value ?? '-'
}

export function formatMaintenanceStatus(value) {
  if (value === 'SCHEDULED') {
    return 'Programado'
  }

  if (value === 'IN_PROGRESS') {
    return 'En curso'
  }

  if (value === 'COMPLETED') {
    return 'Completado'
  }

  return value ?? '-'
}
