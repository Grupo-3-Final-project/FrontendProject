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
    expect(formatBoardType('ADULT')).toBe('Adulto')
    expect(formatAttractionSize('LARGE')).toBe('Grande')
    expect(formatAttractionStatus('MAINTENANCE')).toBe('Mantenimiento')
    expect(formatEmployeeType('TECHNICIAN')).toBe('Técnico')
    expect(formatShiftLabel('MORNING')).toBe('Mañana')
    expect(formatMaintenanceStatus('COMPLETED')).toBe('Completado')
    expect(formatBoardType('CUSTOM')).toBe('CUSTOM')
  })
})
