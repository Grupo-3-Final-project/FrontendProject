import { Building2, FerrisWheel, Hotel, LayoutDashboard, Ticket, Users, Wrench } from 'lucide-react'
import { Link, Outlet, useSearchParams } from 'react-router-dom'
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
      <aside className="border-b border-red-900/60 bg-[radial-gradient(circle_at_30%_8%,rgba(194,20,34,0.22),transparent_8rem),linear-gradient(180deg,rgba(16,15,15,0.99),rgba(5,5,6,0.99))] px-5 py-5 shadow-[22px_0_70px_rgba(0,0,0,0.32)] md:sticky md:top-0 md:min-h-screen md:border-r md:border-b-0 md:px-4 md:py-6">
        <div className="space-y-3">
          <div className="relative inline-flex flex-col gap-1 pl-4 text-lg leading-tight font-black tracking-wide text-red-500 uppercase before:absolute before:left-0 before:top-1/2 before:h-10 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-red-600 before:shadow-[0_0_24px_rgba(220,38,38,0.8)]">
            Puerta
          </div>
          <p className="max-w-[200px] text-sm leading-6 text-stone-400">
            Taquilla y administracion del parque.
          </p>
        </div>

        <nav className="mt-8 flex flex-wrap gap-2 text-sm text-neutral-400 md:flex-col">
          {dashboardTabs.map((tab) => {
            const Icon = tabIcons[tab.key] ?? Building2
            const isActive = activeTab === tab.key

            return (
              <button
                key={tab.key}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left font-bold transition ${
                  isActive
                    ? 'bg-red-950/70 text-white ring-1 ring-red-700/80'
                    : 'hover:bg-red-950/40 hover:text-white'
                }`}
                type="button"
                onClick={() => changeTab(tab.key)}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="mt-8 rounded-lg border border-stone-800 bg-black/20 p-4 text-sm text-stone-400">
          <div className="font-bold text-stone-200">Taquilla</div>
          <p className="mt-2 leading-6">
            Desde aqui puedes registrar compras y gestionar el parque.
          </p>
          <Link
            className="mt-4 inline-flex items-center gap-2 rounded-md border border-stone-700 px-3 py-2 font-bold text-stone-200 transition hover:border-red-500 hover:text-white"
            to="/home"
          >
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
