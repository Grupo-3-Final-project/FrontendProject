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

  it('uses the visual fallback and hides empty detail rows when data is missing', () => {
    render(
      <AttractionModal
        attraction={{
          name: 'Pasaje del Olvido',
          description: 'Recorrido inmersivo.',
          waitTime: 10,
          info: {},
        }}
        onClose={vi.fn()}
      />,
    )

    expect(screen.getByText('Pasaje del Olvido')).toBeInTheDocument()
    expect(screen.getByText('Atraccion')).toBeInTheDocument()
    expect(screen.queryByText('Altura minima')).not.toBeInTheDocument()
    expect(screen.queryByText('Tipo')).not.toBeInTheDocument()
    expect(screen.queryByText('Intensidad')).not.toBeInTheDocument()
    expect(screen.getByText('10 min')).toBeInTheDocument()
  })

  it('renders the image branch, full feature rows and secondary action button', () => {
    render(
      <AttractionModal
        attraction={{
          name: 'Dragon Coaster',
          category: 'Familiar',
          description: 'Montana rusa principal.',
          image: 'https://example.com/dragon.jpg',
          minHeight: '120 cm',
          type: 'Coaster',
          waitTime: 18,
          info: {
            intensity: 'Media',
            duration: '3 min',
            accessibility: 'Acceso estandar',
            restrictions: 'No apta para cardiacos',
          },
        }}
        onClose={vi.fn()}
      />,
    )

    expect(screen.getByRole('img', { name: 'Dragon Coaster' })).toHaveAttribute('src', 'https://example.com/dragon.jpg')
    expect(screen.getByRole('button', { name: 'Guardar atraccion' })).toBeInTheDocument()
    expect(screen.getByText('Altura minima')).toBeInTheDocument()
    expect(screen.getByText('120 cm')).toBeInTheDocument()
    expect(screen.getByText('Tipo')).toBeInTheDocument()
    expect(screen.getByText('Coaster')).toBeInTheDocument()
    expect(screen.getByText('Intensidad')).toBeInTheDocument()
    expect(screen.getByText('Media')).toBeInTheDocument()
    expect(screen.getByText('Duracion')).toBeInTheDocument()
    expect(screen.getByText('3 min')).toBeInTheDocument()
    expect(screen.getByText('Accesibilidad')).toBeInTheDocument()
    expect(screen.getByText('Acceso estandar')).toBeInTheDocument()
    expect(screen.getByText('Restricciones')).toBeInTheDocument()
    expect(screen.getByText('No apta para cardiacos')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /AÑADIR A MI RUTA/i })).toBeInTheDocument()
  })
  it('renders only the populated feature and info rows when the attraction data is partial', () => {
    render(
      <AttractionModal
        attraction={{
          name: 'Bosque de la Niebla',
          category: 'Suave',
          description: 'Recorrido atmosferico.',
          minHeight: '110 cm',
          waitTime: 12,
          info: {
            duration: '4 min',
          },
        }}
        onClose={vi.fn()}
      />,
    )

    expect(screen.getByText('110 cm')).toBeInTheDocument()
    expect(screen.queryByText(/^Tipo$/)).not.toBeInTheDocument()
    expect(screen.queryByText('Intensidad')).not.toBeInTheDocument()
    expect(screen.getByText('Duracion')).toBeInTheDocument()
    expect(screen.getByText('4 min')).toBeInTheDocument()
    expect(screen.queryByText('Accesibilidad')).not.toBeInTheDocument()
    expect(screen.queryByText('Restricciones')).not.toBeInTheDocument()
  })
})
