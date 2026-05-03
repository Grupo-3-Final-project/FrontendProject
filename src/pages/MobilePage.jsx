import {
  HiOutlineChevronRight,
  HiOutlineCloud,
  HiOutlineEye,
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlineSquare3Stack3D,
  HiOutlineTicket,
  HiOutlineUserGroup,
} from 'react-icons/hi2'
import parkMapImage from '../assets/home/publicHomeParkMap.png'

const statusChips = [
  {
    id: 'weather',
    label: '18 C Parcialmente nublado',
    icon: HiOutlineCloud,
    className: 'border-white/15 bg-neutral-950/85 text-neutral-200',
  },
  {
    id: 'crowd',
    label: 'Afluencia: Alta',
    icon: HiOutlineUserGroup,
    className: 'border-red-600/45 bg-red-950/50 text-red-400',
  },
]

const mapControls = [
  { id: 'zoom-in', label: 'Acercar mapa', icon: HiOutlinePlus },
  { id: 'zoom-out', label: 'Alejar mapa', icon: HiOutlineMinus },
  { id: 'layers', label: 'Capas del mapa', icon: HiOutlineSquare3Stack3D },
  { id: 'focus', label: 'Centrar vista', icon: HiOutlineEye },
]

const attractionMarkers = [
  {
    id: 'terror-tower',
    name: 'Torre del Terror',
    waitTime: '00 min',
    position: 'left-[48%] top-[16%]',
    labelPosition: '-translate-x-1/2 -translate-y-[160%]',
  },
  {
    id: 'haunted-mansion',
    name: 'Mansion Maldita',
    waitTime: '45 min',
    position: 'left-[28%] top-[31%]',
    labelPosition: '-translate-x-1/2 -translate-y-[150%]',
  },
  {
    id: 'dark-labyrinth',
    name: 'Laberinto Oscuro',
    waitTime: '16 min',
    position: 'left-[53%] top-[48%]',
    labelPosition: '-translate-x-[20%] -translate-y-[150%]',
  },
  {
    id: 'blood-river',
    name: 'Rio de Sangre',
    waitTime: '25 min',
    position: 'left-[35%] top-[54%]',
    labelPosition: '-translate-x-1/2 -translate-y-[150%]',
  },
  {
    id: 'forgotten-zone',
    name: 'Zona Olvidada',
    waitTime: '20 min',
    position: 'left-[23%] top-[63%]',
    labelPosition: '-translate-x-1/2 -translate-y-[150%]',
  },
  {
    id: 'macabre-carousel',
    name: 'Carrusel Macabro',
    waitTime: '35 min',
    position: 'left-[42%] top-[72%]',
    labelPosition: '-translate-x-[42%] -translate-y-[150%]',
  },
  {
    id: 'lost-cemetery',
    name: 'Cementerio Perdido',
    waitTime: '6 min',
    position: 'left-[52%] top-[78%]',
    labelPosition: '-translate-x-[35%] -translate-y-[150%]',
  },
]

function StatusChip({ chip }) {
  const Icon = chip.icon

  return (
    <div
      className={`flex min-h-8 items-center gap-1.5 rounded-full border px-3 text-[0.68rem] font-medium whitespace-nowrap ${chip.className}`}
    >
      <Icon className="text-sm" />
      <span>{chip.label}</span>
    </div>
  )
}

function MapControlButton({ control }) {
  const Icon = control.icon

  return (
    <button
      type="button"
      className="flex h-8 w-8 items-center justify-center rounded-md border border-white/15 bg-neutral-950/80 text-neutral-300 shadow-lg shadow-black/40 transition hover:border-red-500/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
      aria-label={control.label}
    >
      <Icon className="text-base" />
    </button>
  )
}

function AttractionMarker({ attraction }) {
  return (
    <article className={`absolute ${attraction.position}`}>
      <div
        className={`absolute left-1/2 top-1/2 z-10 w-max ${attraction.labelPosition}`}
      >
        <p className="rounded-sm border border-white/20 bg-black/80 px-2 py-1 text-[0.55rem] font-bold leading-none text-white shadow-lg shadow-black/60">
          {attraction.name}
        </p>
        <p className="mt-1 text-center text-[0.55rem] font-medium leading-none text-red-400">
          {attraction.waitTime}
        </p>
      </div>
      <span className="absolute left-1/2 top-1/2 h-6 w-px -translate-x-1/2 bg-red-500/70" />
      <span className="relative z-20 block h-3 w-3 rounded-full bg-red-600 ring-4 ring-red-600/20 shadow-[0_0_18px_rgba(239,68,68,0.95)]" />
    </article>
  )
}

function MobileMap() {
  return (
    <section className="relative min-h-[356px] overflow-hidden rounded-xl border border-white/10 bg-neutral-950 shadow-2xl shadow-black/50">
      <img
        src={parkMapImage}
        alt="Mapa nocturno del parque de terror"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(239,68,68,0.04),rgba(0,0,0,0.1)_45%,rgba(0,0,0,0.42)_100%)]" />

      <div className="absolute right-2 top-2 z-30 grid gap-2">
        {mapControls.map((control) => (
          <MapControlButton key={control.id} control={control} />
        ))}
      </div>

      {attractionMarkers.map((attraction) => (
        <AttractionMarker key={attraction.id} attraction={attraction} />
      ))}
    </section>
  )
}

function MobilePage() {
  return (
    <main className="flex flex-1 bg-black px-2.5 py-3">
      <section className="flex w-full flex-col gap-2.5">
        <div className="flex gap-2 overflow-x-auto pb-0.5">
          {statusChips.map((chip) => (
            <StatusChip key={chip.id} chip={chip} />
          ))}
        </div>

        <MobileMap />

        <section className="rounded-2xl border border-red-700/55 bg-neutral-950 px-4 py-3.5 shadow-[0_0_26px_rgba(127,29,29,0.18)]">
          <div className="grid gap-3 min-[380px]:grid-cols-[1fr_auto] min-[380px]:items-center">
            <div className="min-w-0">
              <h1 className="text-[0.8rem] leading-tight font-black tracking-[0.08em] text-white uppercase">
                Mi ruta optimizada
              </h1>
              <p className="mt-1 text-[0.72rem] leading-snug text-neutral-300">
                4 atracciones - 95 min estimados
              </p>
            </div>

            <button
              type="button"
              className="flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-red-600/70 bg-red-950/35 px-4 text-[0.68rem] font-black tracking-[0.04em] text-red-300 transition hover:border-red-500 hover:bg-red-900/45 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 min-[380px]:w-auto"
            >
              Ver ruta
              <HiOutlineChevronRight className="text-sm" />
            </button>
          </div>
        </section>

        <button
          type="button"
          className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 text-[0.72rem] font-black tracking-[0.12em] text-white uppercase shadow-[0_18px_34px_rgba(220,38,38,0.28)] transition hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
        >
          <HiOutlineTicket className="text-base" />
          Comprar entradas
        </button>
      </section>
    </main>
  )
}

export default MobilePage
