import { render, screen } from '@testing-library/react'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import MapControlButton from './MapControlButton'

describe('MapControlButton', () => {
  it('renders the requested control label', () => {
    render(<MapControlButton icon={HiOutlineMagnifyingGlass} label="Ampliar mapa" />)

    expect(screen.getByRole('button', { name: 'Ampliar mapa' })).toBeInTheDocument()
  })
})
