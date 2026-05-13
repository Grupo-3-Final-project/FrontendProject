import { Building2, FerrisWheel, Home, Hotel, LayoutDashboard, Ticket, Users, Wrench } from 'lucide-react'
import { Link, Outlet, useSearchParams } from 'react-router-dom'
import logoAmusementPark from '../assets/logoAmusementPark.png'
import { dashboardTabs } from '../features/admin/adminConfig.jsx'

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

  const changeTab = (tabKey) => {
    setSearchParams({ tab: tabKey })
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
          <Link
            className="flex w-full items-center gap-3 px-7 py-4 font-bold transition hover:bg-red-950/30 hover:text-white"
            to="/home"
          >
            <Home className="h-4 w-4 shrink-0 text-stone-400" />
            Volver a la home
          </Link>
        </div>
      </aside>

      <div className="min-w-0 px-5 py-5 md:px-6 md:py-6 lg:px-10 lg:py-8">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
