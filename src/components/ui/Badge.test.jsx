import { render, screen } from '@testing-library/react'
import Badge from './Badge'

describe('Badge', () => {
  it('renders the requested variant classes', () => {
    const { container, rerender } = render(<Badge variant="success">Activo</Badge>)

    expect(screen.getByText('Activo')).toBeInTheDocument()
    expect(container.querySelector('.border-green-500\\/50')).toBeTruthy()

    rerender(<Badge variant="warning">Pendiente</Badge>)
    expect(container.querySelector('.border-yellow-500\\/60')).toBeTruthy()

    rerender(<Badge variant="danger">Bloqueado</Badge>)
    expect(container.querySelector('.border-red-500\\/60')).toBeTruthy()
  })

  it('falls back to the neutral style when the variant is unknown', () => {
    const { container } = render(<Badge variant="custom">Neutro</Badge>)

    expect(screen.getByText('Neutro')).toBeInTheDocument()
    expect(container.querySelector('.border-stone-600')).toBeTruthy()
  })
})
