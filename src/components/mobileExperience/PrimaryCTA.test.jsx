import { fireEvent, render, screen } from '@testing-library/react'
import PrimaryCTA from './PrimaryCTA'

describe('PrimaryCTA', () => {
  it('renders the default label and triggers the click handler', () => {
    const onClick = vi.fn()

    render(<PrimaryCTA onClick={onClick} />)

    fireEvent.click(screen.getByRole('button', { name: 'Comprar entradas' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('supports a custom label and disabled state', () => {
    render(<PrimaryCTA label="Abrir pase" disabled />)

    expect(screen.getByRole('button', { name: 'Abrir pase' })).toBeDisabled()
  })
})
