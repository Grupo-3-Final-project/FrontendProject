import { render, screen } from '@testing-library/react'
import DashboardKpiCard from './DashboardKpiCard'

describe('DashboardKpiCard', () => {
  it('renders KPI content with the requested variant', () => {
    render(
      <DashboardKpiCard
        title="Recaudacion anual"
        value="12.450,00 €"
        note="Ano 2026"
        tag="Dashboard"
        variant="danger"
      />,
    )

    expect(screen.getByText('Recaudacion anual')).toBeInTheDocument()
    expect(screen.getByText('12.450,00 €')).toBeInTheDocument()
    expect(screen.getByText('Ano 2026')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('falls back to the neutral variant when the variant is unknown', () => {
    const { container } = render(
      <DashboardKpiCard
        title="Reservas"
        value="24"
        note="Hoy"
        tag="Taquilla"
        variant="custom"
      />,
    )

    expect(screen.getByText('Reservas')).toBeInTheDocument()
    expect(container.querySelector('.border-red-700\\/60')).toBeTruthy()
  })

  it('uses the success palette when the variant is explicit and applies default neutral variant when omitted', () => {
    const { container, rerender } = render(
      <DashboardKpiCard
        title="Ingresos"
        value="900 €"
        note="Semana actual"
        tag="Resumen"
        variant="success"
      />,
    )

    expect(container.querySelector('.border-emerald-500\\/60')).toBeTruthy()
    expect(container.querySelector('.border-emerald-500\\/70')).toBeTruthy()

    rerender(
      <DashboardKpiCard
        title="Reservas"
        value="10"
        note="Hoy"
        tag="Taquilla"
      />,
    )

    expect(container.querySelector('.border-red-700\\/60')).toBeTruthy()
    expect(container.querySelector('.border-red-600\\/75')).toBeTruthy()
  })

  it('renders the warning palette and keeps optional text nodes empty when values are blank', () => {
    const { container } = render(
      <DashboardKpiCard
        title=""
        value="0"
        note=""
        tag=""
        variant="warning"
      />,
    )

    expect(container.querySelector('.border-amber-500\\/65')).toBeTruthy()
    expect(container.querySelector('.border-amber-500\\/75')).toBeTruthy()
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('renders the icon branch when an icon component is provided', () => {
    const Icon = ({ className }) => <svg data-testid="kpi-icon" className={className} />

    render(
      <DashboardKpiCard
        title="Incidencias"
        value="3"
        note="Activas"
        tag="Operaciones"
        icon={Icon}
        variant="success"
      />,
    )

    expect(screen.getByTestId('kpi-icon')).toBeInTheDocument()
  })
})
