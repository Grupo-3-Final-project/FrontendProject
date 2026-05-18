import { fireEvent, render, screen } from '@testing-library/react'
import AttractionMarker from './AttractionMarker'

describe('AttractionMarker', () => {
  it('renders marker content and notifies selection', () => {
    const attraction = {
      id: 2,
      name: 'Dragon Coaster',
      waitTime: 18,
      positionClass: 'top-0 left-0',
    }
    const onSelect = vi.fn()

    render(<AttractionMarker attraction={attraction} onSelect={onSelect} />)

    expect(screen.getByText('Dragon Coaster')).toBeInTheDocument()
    expect(screen.getByText('18 min')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Ver informacion de Dragon Coaster/i }))

    expect(onSelect).toHaveBeenCalledWith(attraction)
  })
})
