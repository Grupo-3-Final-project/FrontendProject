import { useEffect, useState } from 'react'
import { Building2, FerrisWheel, Home, Hotel, LayoutDashboard, LogOut, Ticket, Users, Wrench } from 'lucide-react'
import { Link, Outlet, useSearchParams } from 'react-router-dom'
import logoAmusementPark from '../assets/logoAmusementPark.png'
import { loginInternal } from '../api/authApi'
import { getApiErrorMessage } from '../api/apiClient'
import Button from '../components/ui/Button'
import StatusMessage from '../components/ui/StatusMessage'
import { dashboardTabs } from '../features/admin/adminConfig.jsx'
import {
  clearInternalSession,
  internalAuthEventName,
  readInternalSession,
  saveInternalSession,
} from '../features/auth/internalAuth'

const tabIcons = {
  overview: LayoutDashboard,
  bookings: Ticket,
  users: Users,
  hotels: Hotel,
  attractions: FerrisWheel,
  employees: Users,
  operations: Wrench,
}

function DashboardLayout() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') ?? 'overview'
  const [internalSession, setInternalSession] = useState(() => readInternalSession())
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })
  const [authError, setAuthError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const syncInternalSession = () => {
      setInternalSession(readInternalSession())
    }

    window.addEventListener(internalAuthEventName, syncInternalSession)
    window.addEventListener('storage', syncInternalSession)

    return () => {
      window.removeEventListener(internalAuthEventName, syncInternalSession)
      window.removeEventListener('storage', syncInternalSession)
    }
  }, [])

  const changeTab = (tabKey) => {
    setSearchParams({ tab: tabKey })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setAuthError('')

    try {
      const session = await loginInternal(credentials)
      saveInternalSession(session)
      setInternalSession(session)
      setCredentials({
        username: '',
        password: '',
      })

      if (!dashboardTabs.some((tab) => tab.key === activeTab)) {
        setSearchParams({ tab: 'overview' })
      }
    } catch (error) {
      setAuthError(getApiErrorMessage(error, 'No se ha podido iniciar sesión.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogout = () => {
    clearInternalSession()
    setInternalSession(null)
    setCredentials({
      username: '',
      password: '',
    })
    setAuthError('')
  }

  if (!internalSession) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_76%_6%,rgba(167,15,27,0.22),transparent_24rem),radial-gradient(circle_at_42%_48%,rgba(167,15,27,0.1),transparent_32rem),linear-gradient(180deg,rgba(7,7,8,0.98),rgba(3,3,4,1))] px-5 py-10 text-neutral-100">
        <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md items-center">
          <div className="w-full rounded-2xl border border-white/10 bg-black/70 p-6 shadow-[0_28px_80px_rgba(0,0,0,0.46)]">
            <div className="text-center">
              <img
                src={logoAmusementPark}
                alt=""
                className="mx-auto h-24 w-24 object-cover object-center"
                aria-hidden="true"
              />
              <div className="mt-4 text-2xl leading-[0.95] font-black text-white">
                <span className="block">La Última</span>
                <span className="block text-red-500">Puerta</span>
              </div>
              <p className="mt-4 text-[0.72rem] font-bold tracking-[0.28em] text-stone-400 uppercase">
                Acceso interno
              </p>
            </div>

            {authError ? (
              <div className="mt-5">
                <StatusMessage title="No se ha podido iniciar sesión" message={authError} variant="error" />
              </div>
            ) : null}

            <form className="mt-5 space-y-4" onSubmit={handleLogin}>
              <label className="block space-y-2">
                <span className="text-sm font-bold text-stone-200">Usuario</span>
                <input
                  className="min-h-11 w-full rounded-md border border-stone-700 bg-stone-950/90 px-3 py-2 text-sm text-stone-100 outline-none transition focus:border-red-500"
                  type="text"
                  value={credentials.username}
                  onChange={(event) =>
                    setCredentials((current) => ({
                      ...current,
                      username: event.target.value,
                    }))
                  }
                  required
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-bold text-stone-200">Contraseña</span>
                <input
                  className="min-h-11 w-full rounded-md border border-stone-700 bg-stone-950/90 px-3 py-2 text-sm text-stone-100 outline-none transition focus:border-red-500"
                  type="password"
                  value={credentials.password}
                  onChange={(event) =>
                    setCredentials((current) => ({
                      ...current,
                      password: event.target.value,
                    }))
                  }
                  required
                />
              </label>

              <Button className="w-full" disabled={isSubmitting} type="submit">
                {isSubmitting ? 'Accediendo...' : 'Entrar al panel'}
              </Button>
            </form>

            <p className="mt-5 text-center text-xs leading-5 text-stone-400">
              El panel interno requiere autenticación JWT para taquilla y administración.
            </p>
          </div>
        </section>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_76%_6%,rgba(167,15,27,0.22),transparent_24rem),radial-gradient(circle_at_42%_48%,rgba(167,15,27,0.1),transparent_32rem),linear-gradient(180deg,rgba(7,7,8,0.98),rgba(3,3,4,1))] text-neutral-100 md:grid md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[286px_minmax(0,1fr)]">
      <aside className="flex overflow-hidden border-b border-white/10 bg-black text-neutral-100 shadow-[22px_0_70px_rgba(0,0,0,0.32)] md:sticky md:top-0 md:min-h-screen md:flex-col md:border-r md:border-b-0">
        <div className="w-full px-5 pt-8 pb-6 text-center">
          <img
            src={logoAmusementPark}
            alt=""
            className="mx-auto h-28 w-28 object-cover object-center"
            aria-hidden="true"
          />
          <div className="mt-4 text-2xl leading-[0.95] font-black tracking-normal text-white">
            <span className="block">La Última</span>
            <span className="block text-red-500">Puerta</span>
          </div>
          <p className="mt-4 text-[0.68rem] font-bold tracking-[0.28em] text-stone-400 uppercase">
            PANEL DE GESTIÓN
          </p>
        </div>

        <nav className="flex w-full flex-col text-sm text-stone-300">
          {dashboardTabs.map((tab) => {
            const Icon = tabIcons[tab.key] ?? Building2
            const isActive = activeTab === tab.key

            return (
              <button
                key={tab.key}
                className={`relative flex w-full items-center gap-3 border-l-4 px-7 py-3.5 text-left font-bold transition ${
                  isActive
                    ? 'border-red-600 bg-red-950/40 text-white'
                    : 'border-transparent hover:bg-red-950/30 hover:text-white'
                }`}
                type="button"
                onClick={() => changeTab(tab.key)}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-red-500' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="mt-auto w-full border-t border-white/10 text-sm text-stone-300">
          <div className="space-y-1 border-b border-white/10 px-7 py-4">
            <p className="text-[0.65rem] font-bold tracking-[0.16em] text-stone-500 uppercase">
              Sesión activa
            </p>
            <p className="truncate font-bold text-white">{internalSession.username}</p>
            <p className="text-xs text-stone-400">{internalSession.role}</p>
          </div>
          <Link
            className="flex w-full items-center gap-3 px-7 py-4 font-bold transition hover:bg-red-950/30 hover:text-white"
            to="/home"
          >
            <Home className="h-4 w-4 shrink-0 text-stone-400" />
            Volver a la home
          </Link>
          <button
            className="flex w-full items-center gap-3 px-7 py-4 text-left font-bold transition hover:bg-red-950/30 hover:text-white"
            type="button"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 shrink-0 text-stone-400" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <div className="min-w-0 px-5 py-5 md:px-6 md:py-6 lg:px-10 lg:py-8">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
