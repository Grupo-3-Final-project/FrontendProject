import { HiOutlineBars3, HiOutlineBell } from 'react-icons/hi2'
import logoAmusementPark from '../../assets/logoAmusementPark.png'

function MobileTopBar() {
  return (
    <header className="sticky top-0 z-30 flex min-h-14 items-center justify-between border-b border-red-950/70 bg-neutral-950 px-4 text-neutral-100 shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-md text-neutral-300 transition hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
        aria-label="Abrir menu movil"
      >
        <HiOutlineBars3 className="text-xl" />
      </button>

      <div className="flex items-center gap-3" aria-label="La Ultima Puerta">
        <img src={logoAmusementPark} alt="Logo del Parque de Atracciones" className="w-20 h-20 object-contain"/>
        <p className="text-center text-[0.64rem] leading-[0.9] font-black tracking-normal uppercase">
          La Ultima
          <span className="block text-red-600">Puerta</span>
        </p>
      </div>

      <button
        type="button"
        className="relative flex h-9 w-9 items-center justify-center rounded-md text-neutral-300 transition hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
        aria-label="Ver avisos del recorrido"
      >
        <HiOutlineBell className="text-xl" />
        <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[0.62rem] leading-none font-black text-white ring-2 ring-neutral-950">
          
        </span>
      </button>
    </header>
  )
}

export default MobileTopBar
