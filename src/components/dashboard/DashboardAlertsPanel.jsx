import { Badge } from '../ui'

function DashboardAlertsPanel() {
  return (
    <section
      className="min-w-0 rounded-lg border border-red-900/30 bg-[linear-gradient(180deg,rgba(18,18,18,0.96),rgba(8,8,9,0.99))] p-4 shadow-[0_18px_48px_rgba(0,0,0,0.36)]"
      aria-labelledby="dashboard-alerts-title"
    >
      <div className="mb-4">
        <p className="dashboard-shell__eyebrow">Referencia visual</p>
        <h2 id="dashboard-alerts-title" className="m-0 text-[1.3rem] font-bold text-neutral-100">
          Alertas internas
        </h2>
      </div>

      <div className="grid gap-4">
        <article className="grid min-h-24 grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-md border border-red-500/40 bg-[linear-gradient(90deg,rgba(167,15,27,0.1),transparent_65%),rgba(10,10,11,0.66)] p-4">
          <Badge variant="danger">Critica</Badge>
          <div>
            <h3 className="m-0 text-base font-bold text-neutral-100">Incidencia por conectar</h3>
            <p className="mt-1 mb-0 text-sm leading-relaxed text-neutral-400">
              Espacio visual reservado para alertas internas de backend.
            </p>
          </div>
        </article>
        <article className="grid min-h-24 grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-md border border-amber-500/35 bg-[linear-gradient(90deg,rgba(167,15,27,0.1),transparent_65%),rgba(10,10,11,0.66)] p-4">
          <Badge variant="warning">Aviso</Badge>
          <div>
            <h3 className="m-0 text-base font-bold text-neutral-100">Aviso operativo</h3>
            <p className="mt-1 mb-0 text-sm leading-relaxed text-neutral-400">
              Contenido temporal sin informacion real conectada.
            </p>
          </div>
        </article>
        <article className="grid min-h-24 grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-md border border-emerald-500/30 bg-[linear-gradient(90deg,rgba(167,15,27,0.1),transparent_65%),rgba(10,10,11,0.66)] p-4">
          <Badge variant="success">Estado</Badge>
          <div>
            <h3 className="m-0 text-base font-bold text-neutral-100">Estado visual</h3>
            <p className="mt-1 mb-0 text-sm leading-relaxed text-neutral-400">
              Referencia de lectura para futuros estados operativos.
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}

export default DashboardAlertsPanel
