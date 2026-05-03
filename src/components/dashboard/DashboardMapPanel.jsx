import { Badge } from '../ui'

const badgeByStatus = {
  OPEN: 'success',
  MAINTENANCE: 'warning',
  CLOSED: 'danger',
}

function DashboardMapPanel({ attractions = [] }) {
  const highlightedAttractions = attractions.slice(0, 4)
  const positions = [
    'top-[18%] left-[18%]',
    'top-[34%] left-[48%]',
    'right-[10%] bottom-[18%]',
    'bottom-[16%] left-[14%]',
  ]

  return (
    <section
      className="min-w-0 rounded-lg border border-red-900/30 bg-[linear-gradient(180deg,rgba(18,18,18,0.96),rgba(8,8,9,0.99))] p-4 shadow-[0_18px_48px_rgba(0,0,0,0.36)]"
      aria-labelledby="dashboard-map-title"
    >
      <div className="mb-4 flex items-start justify-between gap-4 max-[760px]:flex-col">
        <div>
          <p className="m-0 mb-2 text-xs font-semibold tracking-[0.22em] text-red-300/80 uppercase">
            Estado del parque
          </p>
          <h2 id="dashboard-map-title" className="m-0 text-[1.3rem] font-bold text-neutral-100">
            Mapa operativo
          </h2>
        </div>
        <Badge variant="success">{attractions.length} atracciones cargadas</Badge>
      </div>

      <div
        className="relative min-h-[430px] overflow-hidden rounded-lg border border-red-900/40 bg-[linear-gradient(rgba(244,239,232,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(244,239,232,0.035)_1px,transparent_1px),radial-gradient(circle_at_50%_50%,rgba(167,15,27,0.34),transparent_7rem),radial-gradient(circle_at_72%_30%,rgba(199,149,46,0.12),transparent_7rem),radial-gradient(circle_at_22%_72%,rgba(47,161,92,0.1),transparent_8rem),linear-gradient(135deg,rgba(41,36,36,0.72),rgba(5,5,5,0.92))] bg-[length:56px_56px,56px_56px,auto,auto,auto,auto] before:absolute before:inset-[18px] before:rounded-md before:border before:border-neutral-100/10 after:absolute after:inset-[16%_8%] after:rounded-[45%_55%_40%_60%] after:border after:border-red-700/20 after:shadow-[inset_0_0_38px_rgba(167,15,27,0.18),0_0_34px_rgba(167,15,27,0.16)] max-[760px]:min-h-[280px]"
        aria-label="Mapa operativo"
      >
        <span className="absolute inset-[28%_34%] rounded-full bg-red-700/20 blur-2xl" aria-hidden="true" />
        {highlightedAttractions.map((attraction, index) => (
          <span
            key={attraction.id}
            className={`absolute z-20 grid max-w-[180px] gap-1 rounded-md border bg-black/80 px-4 py-3 text-sm font-bold max-[760px]:max-w-[140px] max-[760px]:text-[0.82rem] ${positions[index]} ${
              attraction.status === 'OPEN'
                ? 'border-emerald-500/65 text-emerald-300'
                : attraction.status === 'MAINTENANCE'
                  ? 'border-amber-500/70 text-amber-300'
                  : 'border-red-500/75 text-red-300'
            }`}
          >
            <strong>{attraction.name}</strong>
            <small className="text-xs font-bold text-neutral-400">{attraction.status}</small>
          </span>
        ))}
        <span className="absolute inset-[18%_12%] z-10 rounded-[44%_56%_48%_52%] border-2 border-dashed border-red-700/60" />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {highlightedAttractions.map((attraction) => (
          <Badge key={attraction.id} variant={badgeByStatus[attraction.status] || 'neutral'}>
            {attraction.name}
          </Badge>
        ))}
      </div>
    </section>
  )
}

export default DashboardMapPanel
