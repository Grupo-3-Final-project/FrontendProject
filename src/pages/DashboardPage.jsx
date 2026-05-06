import DashboardAlertsPanel from '../components/dashboard/DashboardAlertsPanel'
import DashboardKpiCard from '../components/dashboard/DashboardKpiCard'
import DashboardMapPanel from '../components/dashboard/DashboardMapPanel'

function DashboardPage() {
  return (
    <main className="min-w-0 space-y-5 px-0">
      <header className="mb-6 flex max-w-5xl flex-col gap-5 pb-1 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="m-0 mb-2 text-xs font-semibold tracking-[0.22em] text-red-300/80 uppercase">
            Panel interno
          </p>
          <h1 className="max-w-none text-[clamp(2rem,3.2vw,3rem)] leading-[1.05] text-neutral-100">
            Dashboard interno
          </h1>
          <p className="mt-2 max-w-[680px] text-[0.98rem] leading-6 text-neutral-300">
            Gestion operativa del parque preparada para conectar metricas y
            estados internos desde backend.
          </p>
        </div>
        <span className="inline-flex min-h-[34px] items-center whitespace-nowrap rounded-md border border-yellow-600/40 bg-yellow-600/10 px-3 text-[0.82rem] font-extrabold text-yellow-400">
          Datos por conectar
        </span>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="KPIs temporales">
        <DashboardKpiCard
          title="Visitantes hoy"
          value="Pendiente"
          note="Esperando datos de backend"
          variant="danger"
          tag="Por conectar"
        />
        <DashboardKpiCard
          title="Ingresos hoy"
          value="Pendiente"
          note="Metrica disponible tras integracion"
          variant="success"
          tag="Backend"
        />
        <DashboardKpiCard
          title="Entradas vendidas"
          value="Pendiente"
          note="Datos preparados para conexion"
          variant="success"
          tag="Temporal"
        />
        <DashboardKpiCard
          title="Tiempo medio de espera"
          value="Visual"
          note="Estado operativo provisional"
          variant="warning"
          tag="Demo visual"
        />
      </section>

      <section className="grid items-stretch gap-4 xl:grid-cols-[minmax(0,2.1fr)_minmax(340px,0.95fr)]">
        <DashboardMapPanel />
        <DashboardAlertsPanel />
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <article className="min-w-0 rounded-2xl border border-red-900/60 bg-neutral-950/80 p-4 shadow-[0_0_36px_rgba(127,29,29,0.18)]">
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="m-0 mb-2 text-xs font-semibold tracking-[0.22em] text-red-300/80 uppercase">
                Referencia visual
              </p>
              <h2 className="m-0 text-[1.2rem] font-bold text-neutral-100">Reservas recientes</h2>
            </div>
            <span className="inline-flex min-h-[34px] items-center whitespace-nowrap rounded-md border border-yellow-600/40 bg-yellow-600/10 px-3 text-[0.82rem] font-extrabold text-yellow-400">
              Por conectar
            </span>
          </div>
          <div className="overflow-hidden rounded-xl border border-red-950/80">
            <div className="grid min-h-[34px] grid-cols-1 items-center gap-3 border border-red-900/30 bg-red-950/35 px-4 py-3 text-xs font-extrabold tracking-[0.12em] text-neutral-200 uppercase md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_auto]">
              <span className="font-bold text-neutral-100">Referencia visual</span>
              <span>Conexion</span>
              <strong className="text-left text-xs font-extrabold text-neutral-100 md:justify-self-end">Estado</strong>
            </div>
            <div className="grid min-h-[42px] grid-cols-1 items-center gap-3 border-b border-white/10 bg-neutral-950/40 px-4 py-[11px] text-sm text-neutral-300 last:border-b-0 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_auto]">
              <span className="font-bold text-neutral-100">Registro pendiente</span>
              <span>Datos por conectar</span>
              <strong className="text-left text-xs font-extrabold text-neutral-100 md:justify-self-end">Por conectar</strong>
            </div>
            <div className="grid min-h-[42px] grid-cols-1 items-center gap-3 border-b border-white/10 bg-neutral-950/40 px-4 py-[11px] text-sm text-neutral-300 last:border-b-0 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_auto]">
              <span className="font-bold text-neutral-100">Servicio temporal</span>
              <span>Informacion temporal</span>
              <strong className="text-left text-xs font-extrabold text-neutral-100 md:justify-self-end">Visual</strong>
            </div>
            <div className="grid min-h-[42px] grid-cols-1 items-center gap-3 border-b border-white/10 bg-neutral-950/40 px-4 py-[11px] text-sm text-neutral-300 last:border-b-0 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_auto]">
              <span className="font-bold text-neutral-100">Linea de presentacion</span>
              <span>Sin datos reales</span>
              <strong className="text-left text-xs font-extrabold text-neutral-100 md:justify-self-end">Temporal</strong>
            </div>
          </div>
        </article>

        <article className="min-w-0 rounded-2xl border border-red-900/60 bg-neutral-950/80 p-4 shadow-[0_0_36px_rgba(127,29,29,0.18)]">
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="m-0 mb-2 text-xs font-semibold tracking-[0.22em] text-red-300/80 uppercase">
                Referencia visual
              </p>
              <h2 className="m-0 text-[1.2rem] font-bold text-neutral-100">Mantenimiento programado</h2>
            </div>
            <span className="inline-flex min-h-[34px] items-center whitespace-nowrap rounded-md border border-yellow-600/40 bg-yellow-600/10 px-3 text-[0.82rem] font-extrabold text-yellow-400">
              Por conectar
            </span>
          </div>
          <div className="overflow-hidden rounded-xl border border-red-950/80">
            <div className="grid min-h-[34px] grid-cols-1 items-center gap-3 border border-red-900/30 bg-red-950/35 px-4 py-3 text-xs font-extrabold tracking-[0.12em] text-neutral-200 uppercase md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_auto]">
              <span className="font-bold text-neutral-100">Referencia visual</span>
              <span>Conexion</span>
              <strong className="text-left text-xs font-extrabold text-neutral-100 md:justify-self-end">Estado</strong>
            </div>
            <div className="grid min-h-[42px] grid-cols-1 items-center gap-3 border-b border-yellow-700/50 bg-neutral-950/40 px-4 py-[11px] text-sm text-neutral-300 last:border-b-0 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_auto]">
              <span className="font-bold text-neutral-100">Tarea pendiente</span>
              <span>Datos por conectar</span>
              <strong className="text-left text-xs font-extrabold text-neutral-100 md:justify-self-end">Aviso</strong>
            </div>
            <div className="grid min-h-[42px] grid-cols-1 items-center gap-3 border-b border-green-900/50 bg-neutral-950/40 px-4 py-[11px] text-sm text-neutral-300 last:border-b-0 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_auto]">
              <span className="font-bold text-neutral-100">Revision visual</span>
              <span>Informacion temporal</span>
              <strong className="text-left text-xs font-extrabold text-neutral-100 md:justify-self-end">Operativo</strong>
            </div>
            <div className="grid min-h-[42px] grid-cols-1 items-center gap-3 border-b border-red-800/60 bg-neutral-950/40 px-4 py-[11px] text-sm text-neutral-300 last:border-b-0 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_auto]">
              <span className="font-bold text-neutral-100">Incidencia visual</span>
              <span>Estado no conectado</span>
              <strong className="text-left text-xs font-extrabold text-neutral-100 md:justify-self-end">Alerta</strong>
            </div>
          </div>
        </article>
      </section>
    </main>
  )
}

export default DashboardPage
