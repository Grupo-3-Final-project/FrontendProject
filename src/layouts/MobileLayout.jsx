import { NavLink, Outlet } from 'react-router-dom'

function MobileLayout() {
  return (
    <div className="min-h-screen bg-black text-neutral-100">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col border-x border-white/10 bg-[linear-gradient(180deg,#111_0%,#050505_100%)] shadow-2xl max-[430px]:border-x-0">
        <div className="border-b border-white/10 px-4 py-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-red-400">La Ultima Puerta</p>
          <p className="mt-1 text-sm text-neutral-400">Guia del visitante sin login ni pago real.</p>
        </div>
        <Outlet />
        <nav className="mt-auto grid min-h-[68px] grid-cols-3 items-center border-t border-white/10 bg-neutral-950/80 text-center text-xs text-neutral-400" aria-label="Navegacion movil">
          <NavLink
            to="/mobile"
            end
            className={({ isActive }) =>
              `px-3 py-2 ${isActive ? 'text-white' : 'text-neutral-400'}`
            }
          >
            Inicio
          </NavLink>
          <NavLink
            to="/mobile/map"
            className={({ isActive }) =>
              `px-3 py-2 ${isActive ? 'text-white' : 'text-neutral-400'}`
            }
          >
            Mapa
          </NavLink>
          <NavLink
            to="/mobile/route"
            className={({ isActive }) =>
              `px-3 py-2 ${isActive ? 'text-white' : 'text-neutral-400'}`
            }
          >
            Ruta
          </NavLink>
        </nav>
      </div>
    </div>
  )
}

export default MobileLayout
