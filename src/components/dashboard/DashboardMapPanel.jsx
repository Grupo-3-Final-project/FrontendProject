import { Badge } from '../ui'

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
        className="relative min-h-[430px] overflow-hidden rounded-lg border border-red-900/45 bg-[radial-gradient(circle_at_50%_46%,rgba(178,24,34,0.38),transparent_12rem),radial-gradient(circle_at_18%_20%,rgba(120,22,24,0.32),transparent_13rem),radial-gradient(circle_at_82%_66%,rgba(139,20,25,0.28),transparent_12rem),linear-gradient(135deg,rgba(38,24,21,0.88),rgba(5,5,5,0.98)_72%)] shadow-[inset_0_0_90px_rgba(0,0,0,0.78),0_0_34px_rgba(127,29,29,0.22)] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(0,0,0,0.64)_92%)] after:absolute after:inset-[18px] after:rounded-md after:border after:border-white/10 max-[760px]:min-h-[340px]"
        aria-label="Mapa operativo temporal"
      >
        <span className="absolute top-[43%] left-[12%] z-0 h-20 w-[78%] -rotate-[7deg] rounded-full border-t border-b border-red-300/10 bg-red-950/20 shadow-[0_0_34px_rgba(153,27,27,0.28)]" aria-hidden="true" />
        <span className="absolute top-[31%] left-[33%] z-0 h-[38%] w-[34%] rounded-full border border-red-300/10 bg-black/16 shadow-[inset_0_0_42px_rgba(153,27,27,0.24)]" aria-hidden="true" />
        <span className="absolute top-[10%] left-[46%] z-0 h-[82%] w-16 rotate-[18deg] rounded-full border-l border-r border-red-200/10 bg-red-950/16" aria-hidden="true" />
        <span className="absolute bottom-[11%] left-[28%] z-0 h-24 w-[47%] rotate-[8deg] rounded-full border-t border-red-200/10 bg-black/12" aria-hidden="true" />
        <span className="absolute top-[35%] left-[45%] z-10 h-28 w-28 rounded-full border border-red-500/30 bg-[radial-gradient(circle,rgba(220,38,38,0.3),rgba(10,10,10,0.16)_58%,transparent_70%)] shadow-[0_0_42px_rgba(220,38,38,0.28)]" aria-hidden="true" />
        <span className="absolute top-[20%] left-[12%] z-0 h-24 w-36 rounded-[45%] border border-red-950/70 bg-black/22 shadow-[0_0_30px_rgba(0,0,0,0.4)]" aria-hidden="true" />
        <span className="absolute top-[13%] right-[15%] z-0 h-28 w-44 rounded-[42%] border border-red-950/70 bg-black/24 shadow-[0_0_30px_rgba(0,0,0,0.4)]" aria-hidden="true" />
        <span className="absolute right-[8%] bottom-[17%] z-0 h-28 w-32 rounded-[38%] border border-red-950/70 bg-black/24 shadow-[0_0_30px_rgba(0,0,0,0.4)]" aria-hidden="true" />
        <span className="absolute bottom-[18%] left-[38%] z-0 h-20 w-36 rounded-[45%] border border-red-950/70 bg-black/22 shadow-[0_0_30px_rgba(0,0,0,0.4)]" aria-hidden="true" />

        <div className="absolute top-3 right-3 z-30 rounded-full border border-neutral-700 bg-black/72 px-3 py-1 text-[0.72rem] font-extrabold text-neutral-400">
          Sin datos reales
        </div>

        {attractionMarkers.map((marker) => (
          <div
            key={marker.name}
            className={`absolute z-20 -translate-x-1/2 ${marker.positionClass}`}
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
