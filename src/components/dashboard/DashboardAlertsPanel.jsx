import { Badge } from '../ui'

function DashboardAlertsPanel({ attractions = [], maintenance = [], bookings = [] }) {
  const alerts = [
    ...attractions
      .filter((attraction) => attraction.status !== 'OPEN')
      .map((attraction) => ({
        key: `attraction-${attraction.id}`,
        title: attraction.name,
        message: `Estado actual: ${attraction.status}.`,
        variant: attraction.status === 'MAINTENANCE' ? 'warning' : 'danger',
        tag: attraction.status === 'MAINTENANCE' ? 'Aviso' : 'Critica',
      })),
    ...maintenance
      .filter((task) => task.status === 'SCHEDULED')
      .slice(0, 2)
      .map((task) => ({
        key: `maintenance-${task.id}`,
        title: task.attractionName,
        message: `Mantenimiento programado para ${task.scheduledDate}.`,
        variant: 'warning',
        tag: 'Agenda',
      })),
  ]

  if (alerts.length === 0) {
    alerts.push({
      key: 'operation-stable',
      title: 'Operacion estable',
      message: `${bookings.length} reservas visibles y sin alertas activas.`,
      variant: 'success',
      tag: 'Estado',
    })
  }

  return (
    <section
      className="min-w-0 rounded-lg border border-red-900/30 bg-[linear-gradient(180deg,rgba(18,18,18,0.96),rgba(8,8,9,0.99))] p-4 shadow-[0_18px_48px_rgba(0,0,0,0.36)]"
      aria-labelledby="dashboard-alerts-title"
    >
      <div className="mb-4">
        <p className="m-0 mb-2 text-xs font-semibold tracking-[0.22em] text-red-300/80 uppercase">
          Riesgos y avisos
        </p>
        <h2 id="dashboard-alerts-title" className="m-0 text-[1.3rem] font-bold text-neutral-100">
          Alertas internas
        </h2>
      </div>

      <div className="grid gap-4">
        {alerts.map((alert) => (
          <article
            key={alert.key}
            className={`grid min-h-24 grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-md bg-[linear-gradient(90deg,rgba(167,15,27,0.1),transparent_65%),rgba(10,10,11,0.66)] p-4 ${
              alert.variant === 'danger'
                ? 'border border-red-500/40'
                : alert.variant === 'warning'
                  ? 'border border-amber-500/35'
                  : 'border border-emerald-500/30'
            }`}
          >
            <Badge variant={alert.variant}>{alert.tag}</Badge>
            <div>
              <h3 className="m-0 text-base font-bold text-neutral-100">{alert.title}</h3>
              <p className="mt-1 mb-0 text-sm leading-relaxed text-neutral-400">{alert.message}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default DashboardAlertsPanel
