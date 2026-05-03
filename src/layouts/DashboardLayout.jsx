import { Link, Outlet, useLocation } from 'react-router-dom'
import { dashboardViews } from '../features/dashboard/dashboardViews'

function DashboardLayout() {
  const location = useLocation()
  const activeView = new URLSearchParams(location.search).get('view') || 'overview'

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_76%_6%,rgba(167,15,27,0.22),transparent_24rem),radial-gradient(circle_at_42%_48%,rgba(167,15,27,0.1),transparent_32rem),linear-gradient(180deg,rgba(7,7,8,0.98),rgba(3,3,4,1))] text-neutral-100 md:grid md:grid-cols-[230px_minmax(0,1fr)] lg:grid-cols-[276px_minmax(0,1fr)]">
      <aside className="border-b border-red-900/60 bg-[radial-gradient(circle_at_30%_8%,rgba(194,20,34,0.22),transparent_8rem),linear-gradient(180deg,rgba(16,15,15,0.99),rgba(5,5,6,0.99))] px-5 py-5 shadow-[22px_0_70px_rgba(0,0,0,0.32)] md:sticky md:top-0 md:min-h-screen md:border-r md:border-b-0 md:px-4 md:py-6" aria-label="Navegacion interna">
        <span className="relative inline-flex flex-col gap-1 pl-4 text-lg leading-tight font-black tracking-wide text-red-500 uppercase before:absolute before:left-0 before:top-1/2 before:h-10 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-red-600 before:shadow-[0_0_24px_rgba(220,38,38,0.8)]">
          Puerta
        </span>
        <nav className="mt-5 flex flex-wrap gap-2 text-sm text-neutral-400 md:mt-8 md:flex-col">
          {dashboardViews.map((view) => {
            const Icon = view.icon
            const isActive = activeView === view.id

            return (
              <Link
                key={view.id}
                to={`/dashboard?view=${view.id}`}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 font-bold transition ${
                  isActive
                    ? 'bg-red-950/70 text-white ring-1 ring-red-700/80'
                    : 'hover:bg-red-950/40 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{view.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
      <div className="min-w-0 px-5 py-5 md:px-6 md:py-6 lg:px-10 lg:py-8">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
