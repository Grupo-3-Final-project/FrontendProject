import logoAmusementPark from '../../assets/logoAmusementPark.png'

// TODO: imports pendientes de implementar — menú hamburguesa y notificaciones
// import { useState } from 'react'
// import {
//   HiOutlineBars3,
//   HiOutlineBell,
//   HiOutlineCalendar,
//   HiOutlineCog6Tooth,
//   HiOutlineHome,
//   HiOutlineInformationCircle,
//   HiOutlineMap,
//   HiOutlineSparkles,
//   HiOutlineTicket,
//   HiOutlineXMark,
// } from 'react-icons/hi2'

// TODO: items del menú hamburguesa — pendientes de implementar rutas y páginas por sección
// const mobileMenuItems = [
//   { id: 'home', label: 'Inicio', icon: HiOutlineHome },
//   { id: 'map', label: 'Mapa del parque', icon: HiOutlineMap },
//   { id: 'attractions', label: 'Atracciones', icon: HiOutlineSparkles },
//   { id: 'route', label: 'Mi ruta', icon: HiOutlineCalendar },
//   { id: 'tickets', label: 'Mis entradas', icon: HiOutlineTicket },
//   { id: 'information', label: 'Informacion', icon: HiOutlineInformationCircle },
//   { id: 'settings', label: 'Ajustes', icon: HiOutlineCog6Tooth },
// ]

function MobileTopBar() {
  // TODO: estado del drawer — pendiente de implementar menú hamburguesa
  // const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-30 flex min-h-14 items-center justify-center border-b border-red-950/70 bg-neutral-950 px-4 text-neutral-100 shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
        {/* TODO: botón hamburguesa — pendiente de implementar navegación por secciones
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md text-neutral-300 transition hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          aria-label="Abrir menu movil"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-sidebar"
          onClick={() => setIsMenuOpen(true)}
        >
          <HiOutlineBars3 className="text-xl" />
        </button>
        */}

        <div className="flex items-center gap-2" aria-label="La Ultima Puerta">
          <img
            src={logoAmusementPark}
            alt="Logo del Parque de Atracciones"
            className="h-9 w-9 object-contain"
          />
          <p className="text-center text-[0.64rem] leading-[0.9] font-black tracking-normal uppercase">
            La Ultima
            <span className="block text-red-600">Puerta</span>
          </p>
        </div>

        {/* TODO: botón de notificaciones — pendiente de implementar
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-md text-neutral-300 transition hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          aria-label="Ver avisos del recorrido"
        >
          <HiOutlineBell className="text-xl" />
          <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[0.62rem] leading-none font-black text-white ring-2 ring-neutral-950" />
        </button>
        */}
      </header>

      {/* TODO: overlay y sidebar del menú hamburguesa — pendientes de implementar rutas y páginas
      {isMenuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          aria-label="Cerrar menu movil"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <aside
        id="mobile-sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(82vw,230px)] flex-col border-r border-white/10 bg-neutral-950 text-neutral-100 shadow-2xl shadow-black/80 transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex min-h-[62px] items-center justify-between border-b border-white/10 px-5">
          <div className="flex items-center gap-2">
            <img
              src={logoAmusementPark}
              alt="Logo del Parque de Atracciones"
              className="h-20 w-20 object-contain"
            />
            <p className="text-[0.64rem] leading-[0.9] font-black uppercase text-white">
              La Ultima
              <span className="block text-red-600">Puerta</span>
            </p>
          </div>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-md text-neutral-500 transition hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            aria-label="Cerrar menu movil"
            onClick={() => setIsMenuOpen(false)}
          >
            <HiOutlineXMark className="text-xl" />
          </button>
        </div>

        <nav className="flex-1 px-5 py-5" aria-label="Menu de experiencia movil">
          <ul className="space-y-1">
            {mobileMenuItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className="flex min-h-10 w-full items-center gap-3 rounded-md px-1 text-left text-sm font-medium text-neutral-300 transition hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="text-base text-neutral-500" />
                    <span>{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="px-5 pb-5">
          <button
            type="button"
            className="flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-red-700 px-4 py-3 text-xs font-black tracking-wide text-white uppercase shadow-[0_0_28px_rgba(220,38,38,0.35)] transition hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            onClick={() => setIsMenuOpen(false)}
          >
            <HiOutlineTicket className="text-base" />
            Ver mis entradas
          </button>
        </div>
      </aside>
      */}
    </>
  )
}

export default MobileTopBar