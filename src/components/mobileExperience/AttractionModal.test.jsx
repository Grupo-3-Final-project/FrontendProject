import { fireEvent, render, screen } from '@testing-library/react'
import AttractionModal from './AttractionModal'

describe('AttractionModal', () => {
  it('returns nothing when there is no attraction', () => {
    const { container } = render(<AttractionModal attraction={null} onClose={vi.fn()} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders attraction detail and allows closing the modal', () => {
    const onClose = vi.fn()

    render(
      <AttractionModal
        attraction={{
          name: 'Torre del Terror',
          category: 'Intensa',
          description: 'Caída vertical tematizada.',
          minHeight: '140 cm',
          type: 'Lanzadera',
          waitTime: 25,
          info: {
            intensity: 'Alta',
            duration: '2 min',
            accessibility: 'Acceso con asistencia',
            restrictions: 'No apta para embarazadas',
          },
        }}
        onClose={onClose}
      />,
    )

    expect(screen.getByText('Torre del Terror')).toBeInTheDocument()
    expect(screen.getByText('Intensa')).toBeInTheDocument()
    expect(screen.getByText('140 cm')).toBeInTheDocument()
    expect(screen.getByText('Lanzadera')).toBeInTheDocument()
    expect(screen.getByText('Acceso con asistencia')).toBeInTheDocument()
    expect(screen.getByText('25 min')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Volver al mapa/i }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
