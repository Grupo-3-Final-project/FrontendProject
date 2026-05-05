import { Outlet } from 'react-router-dom'
import {
  HiOutlineChartBar,
  HiOutlineClipboardDocumentList,
  HiOutlineCog6Tooth,
  HiOutlineMap,
  HiOutlineMegaphone,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineTag,
  HiOutlineTicket,
  HiOutlineUserGroup,
  HiOutlineWrenchScrewdriver,
} from 'react-icons/hi2'
import logoAmusementPark from '../assets/logoAmusementPark.png'

const navigationItems = [
  { label: 'Resumen', icon: HiOutlineChartBar, isActive: true },
  { label: 'Mapa del parque', icon: HiOutlineMap },
  { label: 'Atracciones', icon: HiOutlineSparkles },
  { label: 'Empleados', icon: HiOutlineUserGroup },
  { label: 'Tareas', icon: HiOutlineClipboardDocumentList },
  { label: 'Reservas', icon: HiOutlineTicket },
  { label: 'Hoteles', icon: HiOutlineShieldCheck },
  { label: 'Mantenimiento', icon: HiOutlineWrenchScrewdriver },
  { label: 'Ofertas', icon: HiOutlineTag },
  { label: 'Informes', icon: HiOutlineMegaphone },
  { label: 'Configuración', icon: HiOutlineCog6Tooth },
]

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_76%_6%,rgba(167,15,27,0.22),transparent_24rem),radial-gradient(circle_at_42%_48%,rgba(167,15,27,0.1),transparent_32rem),linear-gradient(180deg,rgba(7,7,8,0.98),rgba(3,3,4,1))] text-neutral-100 md:grid md:grid-cols-[230px_minmax(0,1fr)] lg:grid-cols-[276px_minmax(0,1fr)]">
      <aside className="flex flex-col border-b border-red-900/60 bg-[radial-gradient(circle_at_30%_8%,rgba(194,20,34,0.22),transparent_8rem),linear-gradient(180deg,rgba(16,15,15,0.99),rgba(5,5,6,0.99))] px-5 py-5 shadow-[22px_0_70px_rgba(0,0,0,0.32)] md:sticky md:top-0 md:min-h-screen md:border-r md:border-b-0 md:px-4 md:py-6" aria-label="Navegacion interna">
        <div className="flex min-w-0 flex-1 flex-col md:min-h-[calc(100vh-3rem)]">
          <div className="rounded-2xl border border-red-950/60 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.22),transparent_8rem),linear-gradient(180deg,rgba(12,12,13,0.9),rgba(0,0,0,0.42))] px-4 py-5 text-center shadow-[0_20px_50px_rgba(0,0,0,0.34)]">
            <img
              src={logoAmusementPark}
              alt="Logo de La Última Puerta"
              className="mx-auto h-24 w-24 object-contain drop-shadow-[0_0_34px_rgba(220,38,38,0.52)]"
            />
            <p className="mt-2 text-[0.66rem] font-extrabold tracking-[0.24em] text-red-500 uppercase">
              Panel interno
            </p>
            <h2 className="mt-2 text-2xl leading-[0.92] font-black tracking-normal text-white uppercase">
              La Última
              <span className="block text-red-600">Puerta</span>
            </h2>
            <p className="mt-3 text-[0.64rem] font-bold tracking-[0.18em] text-neutral-500 uppercase">
              ¿Te atreves a cruzarla?
            </p>
          </div>

          <nav className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-5 text-sm text-neutral-400 md:flex-col" aria-label="Menu interno">
            {navigationItems.map((item) => {
              const Icon = item.icon

              return (
                <button
                  key={item.label}
                  type="button"
                  aria-current={item.isActive ? 'page' : undefined}
                  className={[
                    'group flex min-h-10 min-w-fit items-center gap-3 rounded-lg px-3 py-2 text-left font-bold transition md:min-w-0 md:px-4 md:py-3',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500',
                    item.isActive
                      ? 'border border-red-600/70 bg-red-950/75 text-white shadow-[0_0_28px_rgba(185,28,28,0.24)]'
                      : 'border border-transparent text-neutral-400 hover:border-red-900/50 hover:bg-red-950/35 hover:text-white',
                  ].join(' ')}
                >
                  <Icon
                    className={`h-5 w-5 shrink-0 ${item.isActive ? 'text-red-500' : 'text-neutral-500 group-hover:text-red-400'}`}
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </aside>
      <div className="min-w-0 px-5 py-5 md:px-6 md:py-6 lg:px-10 lg:py-8">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
