import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { loginInternal } from '../api/authApi'
import DashboardLayout from './DashboardLayout'

vi.mock('../api/authApi', () => ({
  loginInternal: vi.fn(),
}))

describe('DashboardLayout', () => {
  afterEach(() => {
    window.localStorage.clear()
    vi.clearAllMocks()
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

    expect(screen.getByText(/PANEL DE GESTI.N/i)).toBeInTheDocument()
    expect(screen.getByText('Contenido protegido')).toBeInTheDocument()
  })

  it('logs in successfully and then allows logging out', async () => {
    vi.mocked(loginInternal).mockResolvedValue({
      token: 'jwt-token',
      username: 'admin',
      role: 'ADMIN',
      expiresAt: '2099-05-22T10:30:00',
    })

    render(
      <MemoryRouter initialEntries={['/dashboard?tab=unknown']}>
        <Routes>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<div>Contenido protegido</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText('Usuario'), { target: { value: 'admin' } })
    fireEvent.change(screen.getByLabelText('Contrasena'), { target: { value: 'admin12345' } })
    fireEvent.click(screen.getByRole('button', { name: /Entrar al panel/i }))

    await waitFor(() => {
      expect(screen.getByText(/PANEL DE GESTI.N/i)).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: /Cerrar sesion/i }))

    await waitFor(() => {
      expect(screen.getByText('Acceso interno')).toBeInTheDocument()
    })
  })

  it('shows translated login errors when credentials are rejected', async () => {
    vi.mocked(loginInternal).mockRejectedValue({
      response: {
        data: {
          message: 'Invalid credentials',
        },
      },
    })

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<div>Contenido protegido</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText('Usuario'), { target: { value: 'admin' } })
    fireEvent.change(screen.getByLabelText('Contrasena'), { target: { value: 'bad-pass' } })
    fireEvent.click(screen.getByRole('button', { name: /Entrar al panel/i }))

    expect(await screen.findByText('Credenciales invalidas.')).toBeInTheDocument()
  })
})
