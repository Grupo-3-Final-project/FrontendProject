import { Outlet } from 'react-router-dom'

function MobileLayout() {
  return (
    <div className="min-h-screen bg-black text-neutral-100">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col border-x border-white/10 bg-[linear-gradient(180deg,#111_0%,#050505_100%)] shadow-2xl max-[430px]:border-x-0">
        <Outlet />
        <nav className="mt-auto grid min-h-[68px] grid-cols-3 items-center border-t border-white/10 bg-neutral-950/80 text-center text-xs text-neutral-400" aria-label="Navegacion movil">
          <span className="px-3 py-2">Mapa</span>
          <span className="px-3 py-2">Ruta</span>
          <span className="px-3 py-2">Detalle</span>
        </nav>
      </div>
    </div>
  )
}

export default MobileLayout
