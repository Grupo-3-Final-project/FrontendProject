import { fireEvent, render, screen } from '@testing-library/react'
import RouteCard from './RouteCard'

describe('RouteCard', () => {
  it('triggers the CTA when the card is enabled', () => {
    const onAction = vi.fn()

    render(
      <RouteCard
        title="Mi siguiente parada"
        subtitle="2 atracciones pendientes"
        actionLabel="Marcar visitada"
        onAction={onAction}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: /Marcar visitada/i }))

    expect(onAction).toHaveBeenCalledTimes(1)
  })

  it('keeps the CTA disabled when requested', () => {
    render(<RouteCard disabled actionLabel="Sin accion" />)

    expect(screen.getByRole('button', { name: /Sin accion/i })).toBeDisabled()
  })

  it('renders the default copy when no props are provided', () => {
    render(<RouteCard />)

    expect(screen.getByText('Mi ruta optimizada')).toBeInTheDocument()
    expect(screen.getByText('4 atracciones - 95 min estimados')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Ver ruta/i })).toBeInTheDocument()
  })
})
