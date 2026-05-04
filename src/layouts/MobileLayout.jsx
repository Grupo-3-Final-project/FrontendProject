import { Outlet } from 'react-router-dom'
import {
  HiOutlineBolt,
  HiOutlineMap,
  HiOutlineQuestionMarkCircle,
  HiOutlineSparkles,
  HiOutlineTicket,
} from 'react-icons/hi2'
import MobileTopBar from './mobile/MobileTopBar'

const mobileNavigationItems = [
  { label: 'Mapa', icon: HiOutlineMap, isActive: true },
  { label: 'Atracciones', icon: HiOutlineBolt },
  { label: 'Ruta', icon: HiOutlineSparkles },
  { label: 'Entradas', icon: HiOutlineTicket },
  { label: 'Ayuda', icon: HiOutlineQuestionMarkCircle },
]

function MobileLayout() {
  return (
    <div className="min-h-screen bg-black text-neutral-100">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col border-x border-white/10 bg-[linear-gradient(180deg,#111_0%,#050505_100%)] shadow-2xl max-[430px]:border-x-0">
        <MobileTopBar />
        <Outlet />
        <nav
          className="mt-auto grid min-h-[62px] grid-cols-5 items-stretch border-t border-white/10 bg-neutral-950/95 px-1 text-center text-[0.64rem] text-neutral-500 shadow-[0_-18px_40px_rgba(0,0,0,0.35)]"
          aria-label="Navegacion movil"
        >
          {mobileNavigationItems.map((item) => {
            const Icon = item.icon

            return (
              <button
                type="button"
                key={item.label}
                aria-current={item.isActive ? 'page' : undefined}
                className={
                  [
                    'flex min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-1.5 py-2 font-medium transition',
                    'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-red-500',
                    item.isActive
                      ? 'text-red-500'
                      : 'text-neutral-500 hover:bg-white/[0.03] hover:text-neutral-200',
                  ].join(' ')
                }
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="w-full truncate leading-none">{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default MobileLayout
