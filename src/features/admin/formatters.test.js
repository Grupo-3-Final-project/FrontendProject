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

describe('formatters', () => {
  it('formats prices and dates for the dashboard', () => {
    expect(formatCurrency(24.5)).toContain('24,50')
    expect(formatDate('2026-05-18')).toBeTruthy()
    expect(formatDateTime('2026-05-18T10:30:00')).toBeTruthy()
    expect(formatDate()).toBe('-')
    expect(formatDateTime()).toBe('-')
  })

  it('translates known enum values and falls back to the original one', () => {
    expect(formatBoardType('FULL_BOARD')).toBe('Pensión completa')
    expect(formatBoardType('HALF_BOARD')).toBe('Media pensión')
    expect(formatBoardType('CHILD')).toBe('Infantil')
    expect(formatBoardType('ADULT')).toBe('Adulto')
    expect(formatBoardType('SENIOR')).toBe('Pensionista')
    expect(formatAttractionSize('SMALL')).toBe('Pequeña')
    expect(formatAttractionSize('MEDIUM')).toBe('Mediana')
    expect(formatAttractionSize('LARGE')).toBe('Grande')
    expect(formatAttractionStatus('OPEN')).toBe('Abierta')
    expect(formatAttractionStatus('CLOSED')).toBe('Cerrada')
    expect(formatAttractionStatus('MAINTENANCE')).toBe('Mantenimiento')
    expect(formatEmployeeType('CLEANER')).toBe('Limpiador')
    expect(formatEmployeeType('ANIMATOR')).toBe('Animador')
    expect(formatEmployeeType('TECHNICIAN')).toBe('Técnico')
    expect(formatShiftLabel('MORNING')).toBe('Mañana')
    expect(formatShiftLabel('AFTERNOON')).toBe('Tarde')
    expect(formatMaintenanceStatus('SCHEDULED')).toBe('Programado')
    expect(formatMaintenanceStatus('IN_PROGRESS')).toBe('En curso')
    expect(formatMaintenanceStatus('COMPLETED')).toBe('Completado')
    expect(formatBoardType('CUSTOM')).toBe('CUSTOM')
    expect(formatAttractionSize()).toBe('-')
    expect(formatAttractionStatus()).toBe('-')
    expect(formatEmployeeType()).toBe('-')
    expect(formatShiftLabel()).toBe('-')
    expect(formatMaintenanceStatus()).toBe('-')
  })
})
