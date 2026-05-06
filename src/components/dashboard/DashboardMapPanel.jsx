import { Badge } from '../ui'
import parkMapImage from '../../assets/home/publicHomeParkMap.png'

const attractionMarkers = [
  {
    name: 'Torre del Terror',
    status: 'Operativa',
    positionClass: 'top-[17%] left-[57%]',
    panelClass: 'border-emerald-500/70 bg-black/85 text-emerald-200 shadow-[0_0_28px_rgba(16,185,129,0.18)]',
    dotClass: 'bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.85)]',
  },
  {
    name: 'Mansion Maldita',
    status: 'Mantenimiento',
    positionClass: 'top-[24%] left-[20%]',
    panelClass: 'border-yellow-500/75 bg-black/85 text-yellow-200 shadow-[0_0_28px_rgba(234,179,8,0.18)]',
    dotClass: 'bg-yellow-400 shadow-[0_0_18px_rgba(250,204,21,0.85)]',
  },
  {
    name: 'Rio de Sangre',
    status: 'Operativa',
    positionClass: 'top-[42%] left-[39%]',
    panelClass: 'border-emerald-500/70 bg-black/85 text-emerald-200 shadow-[0_0_28px_rgba(16,185,129,0.18)]',
    dotClass: 'bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.85)]',
  },
  {
    name: 'Laberinto Oscuro',
    status: 'Mantenimiento',
    positionClass: 'top-[39%] right-[13%]',
    panelClass: 'border-yellow-500/75 bg-black/85 text-yellow-200 shadow-[0_0_28px_rgba(234,179,8,0.18)]',
    dotClass: 'bg-yellow-400 shadow-[0_0_18px_rgba(250,204,21,0.85)]',
  },
  {
    name: 'Zona Asesina',
    status: 'Fuera de servicio',
    positionClass: 'bottom-[28%] left-[14%]',
    panelClass: 'border-red-500/75 bg-black/85 text-red-200 shadow-[0_0_28px_rgba(239,68,68,0.18)]',
    dotClass: 'bg-red-500 shadow-[0_0_18px_rgba(248,113,113,0.85)]',
  },
  {
    name: 'Carrusel Macabro',
    status: 'Operativa',
    positionClass: 'bottom-[21%] left-[44%]',
    panelClass: 'border-emerald-500/70 bg-black/85 text-emerald-200 shadow-[0_0_28px_rgba(16,185,129,0.18)]',
    dotClass: 'bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.85)]',
  },
  {
    name: 'Cementerio Perdido',
    status: 'Cerrada',
    positionClass: 'bottom-[24%] right-[23%]',
    panelClass: 'border-neutral-500/55 bg-black/85 text-neutral-300 shadow-[0_0_26px_rgba(115,115,115,0.16)]',
    dotClass: 'bg-neutral-500 shadow-[0_0_16px_rgba(163,163,163,0.55)]',
  },
]

const legendItems = [
  { label: 'Operativa', variant: 'success' },
  { label: 'Mantenimiento', variant: 'warning' },
  { label: 'Fuera de servicio', variant: 'danger' },
  { label: 'Cerrada', variant: 'neutral' },
]

function DashboardMapPanel() {
  return (
    <section
      className="min-w-0 rounded-lg border border-red-900/35 bg-[linear-gradient(180deg,rgba(18,18,18,0.98),rgba(8,8,9,0.99))] p-4 shadow-[0_18px_48px_rgba(0,0,0,0.36)]"
      aria-labelledby="dashboard-map-title"
    >
      <div className="mb-4 flex items-start justify-between gap-4 max-[760px]:flex-col">
        <div>
          <p className="m-0 mb-2 text-xs font-semibold tracking-[0.22em] text-red-300/80 uppercase">
            Referencia visual
          </p>
          <h2 id="dashboard-map-title" className="m-0 text-[1.3rem] font-bold text-neutral-100">
            Mapa operativo
          </h2>
        </div>
        <Badge variant="neutral">Sin datos reales</Badge>
      </div>

      <div
        className="relative min-h-[430px] overflow-hidden rounded-lg border border-red-900/45 bg-neutral-950 shadow-[inset_0_0_90px_rgba(0,0,0,0.78),0_0_34px_rgba(127,29,29,0.22)] before:absolute before:inset-0 before:z-10 before:bg-[linear-gradient(90deg,rgba(0,0,0,0.6),transparent_26%,transparent_72%,rgba(0,0,0,0.62)),radial-gradient(ellipse_at_center,transparent_38%,rgba(0,0,0,0.72)_95%),linear-gradient(180deg,rgba(127,29,29,0.16),rgba(0,0,0,0.28))] after:absolute after:inset-[18px] after:z-20 after:rounded-md after:border after:border-white/10 max-[760px]:min-h-[340px]"
        aria-label="Mapa operativo temporal"
      >
        <img
          src={parkMapImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.72] contrast-125 saturate-125"
          aria-hidden="true"
        />
        <span className="absolute top-[43%] left-[12%] z-20 h-20 w-[78%] -rotate-[7deg] rounded-full border-t border-b border-red-300/10 bg-red-950/10 shadow-[0_0_34px_rgba(153,27,27,0.22)]" aria-hidden="true" />
        <span className="absolute top-[31%] left-[33%] z-20 h-[38%] w-[34%] rounded-full border border-red-300/10 bg-black/10 shadow-[inset_0_0_42px_rgba(153,27,27,0.2)]" aria-hidden="true" />
        <span className="absolute top-[35%] left-[45%] z-20 h-28 w-28 rounded-full border border-red-500/25 bg-[radial-gradient(circle,rgba(220,38,38,0.22),rgba(10,10,10,0.08)_58%,transparent_70%)] shadow-[0_0_42px_rgba(220,38,38,0.24)]" aria-hidden="true" />

        <div className="absolute top-3 right-3 z-40 rounded-full border border-neutral-700 bg-black/72 px-3 py-1 text-[0.72rem] font-extrabold text-neutral-400">
          Sin datos reales
        </div>

        {attractionMarkers.map((marker) => (
          <div
            key={marker.name}
            className={`absolute z-30 -translate-x-1/2 ${marker.positionClass}`}
          >
            <div className={`grid min-w-[150px] gap-0.5 rounded-md border px-3 py-2 text-xs font-extrabold leading-tight ${marker.panelClass} max-[760px]:min-w-[126px] max-[760px]:px-2.5 max-[760px]:py-2 max-[760px]:text-[0.72rem]`}>
              <strong className="text-neutral-100">{marker.name}</strong>
              <span>{marker.status}</span>
            </div>
            <span className={`mx-auto mt-1 block h-2 w-2 rounded-full ${marker.dotClass}`} aria-hidden="true" />
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {legendItems.map((item) => (
          <Badge key={item.label} variant={item.variant}>
            {item.label}
          </Badge>
        ))}
      </div>
    </section>
  )
}

export default DashboardMapPanel
