import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import DashboardPage from './DashboardPage'

describe('DashboardPage', () => {
  it('shows the internal login panel when there is no active session', () => {
    window.localStorage.removeItem('parqueAdminSession')

    render(
      <MemoryRouter initialEntries={['/dashboard?tab=overview']}>
        <DashboardPage />
      </MemoryRouter>,
    )

    expect(screen.getByText('Acceso interno')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Entrar al panel/i })).toBeInTheDocument()
  })
})
