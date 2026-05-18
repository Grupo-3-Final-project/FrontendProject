import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { validateEntry } from '../api/ticketApi'
import EntryValidationPage from './EntryValidationPage'

vi.mock('../api/ticketApi', () => ({
  validateEntry: vi.fn(),
}))

describe('EntryValidationPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('does not consume the ticket until the validation button is pressed', async () => {
    validateEntry.mockResolvedValue({
      ticketId: 19,
      bookingId: 10,
      holderFullName: 'Visitante Mvp',
      ticketStatus: 'USED',
      visitDate: '2026-05-12',
      usedAt: '2026-05-12T13:05:31',
    })

    render(
      <MemoryRouter initialEntries={['/entry/entry-token-1']}>
        <Routes>
          <Route path="/entry/:entryToken" element={<EntryValidationPage />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByText('Entrada lista para validar')).toBeInTheDocument()
    expect(validateEntry).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole('button', { name: 'Validar entrada' }))

    expect(await screen.findByText('Entrada validada')).toBeInTheDocument()
    expect(screen.getByText('Visitante Mvp')).toBeInTheDocument()
    expect(screen.getByText('#10')).toBeInTheDocument()
    expect(validateEntry).toHaveBeenCalledWith('entry-token-1')
  })

  it('shows the pending message when the entry token is missing', async () => {
    render(
      <MemoryRouter initialEntries={['/entry']}>
        <Routes>
          <Route path="/entry" element={<EntryValidationPage />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(await screen.findByText('Entrada pendiente de validar')).toBeInTheDocument()
  })

  it('allows retrying the validation after an API error', async () => {
    validateEntry
      .mockRejectedValueOnce({
        response: {
          data: {
            message: 'Entrada ya usada',
          },
        },
      })
      .mockResolvedValueOnce({
        ticketId: 19,
        bookingId: 10,
        holderFullName: 'Visitante Mvp',
        ticketStatus: 'USED',
        visitDate: '2026-05-12',
        usedAt: '2026-05-12T13:05:31',
      })

    render(
      <MemoryRouter initialEntries={['/entry/entry-token-2']}>
        <Routes>
          <Route path="/entry/:entryToken" element={<EntryValidationPage />} />
        </Routes>
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Validar entrada' }))

    expect(await screen.findByText('No se ha podido validar la entrada')).toBeInTheDocument()
    expect(screen.getByText('Entrada ya usada')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Reintentar validacion' }))

    expect(await screen.findByText('Entrada validada')).toBeInTheDocument()
    expect(validateEntry.mock.calls.length).toBeGreaterThanOrEqual(2)
  })
})
