import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import DashboardLayout from './DashboardLayout'

vi.mock('../api/authApi', () => ({
  loginInternal: vi.fn(),
}))

describe('DashboardLayout', () => {
  afterEach(() => {
    window.localStorage.clear()
  })

  it('shows the internal access form when there is no active session', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<div>Contenido protegido</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByText('Acceso interno')).toBeInTheDocument()
    expect(screen.queryByText('Contenido protegido')).not.toBeInTheDocument()
  })

  it('shows the protected panel when there is an active session', () => {
    window.localStorage.setItem(
      'parque-internal-session',
      JSON.stringify({
        token: 'test-token',
        username: 'admin',
        role: 'ADMIN',
        expiresAt: '2099-05-22T10:30:00',
      }),
    )

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<div>Contenido protegido</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByText('PANEL DE GESTIÓN')).toBeInTheDocument()
    expect(screen.getByText('Contenido protegido')).toBeInTheDocument()
  })
})
