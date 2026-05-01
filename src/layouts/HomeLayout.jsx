import { Outlet } from 'react-router-dom'

function HomeLayout() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#2a0707_0%,#050505_42%,#000_100%)] px-6 py-8 text-neutral-100">
      <header className="mx-auto flex min-h-[78px] w-full max-w-6xl flex-col items-start justify-center gap-5 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
        <span className="text-[0.95rem] font-extrabold text-neutral-100">Parque de terror</span>
        <nav className="flex w-full items-center justify-between gap-3 text-sm text-neutral-400 md:w-auto md:justify-start md:gap-6" aria-label="Navegacion publica">
          <span>Inicio</span>
          <span>Atracciones</span>
          <span>Entradas</span>
        </nav>
      </header>
      <Outlet />
    </div>
  )
}

export default HomeLayout
