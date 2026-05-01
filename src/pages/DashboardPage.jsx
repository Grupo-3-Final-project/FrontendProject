import DashboardAlertsPanel from '../components/dashboard/DashboardAlertsPanel'
import DashboardKpiCard from '../components/dashboard/DashboardKpiCard'
import DashboardMapPanel from '../components/dashboard/DashboardMapPanel'

function DashboardPage() {
  return (
    <main className="dashboard-page dashboard-shell min-w-0">
      <header className="dashboard-shell__header">
        <div>
          <p className="m-0 mb-2 text-xs font-semibold tracking-[0.22em] text-red-300/80 uppercase">
            Panel interno
          </p>
          <h1>Dashboard interno</h1>
          <p className="dashboard-shell__description">
            Gestion operativa del parque preparada para conectar metricas y
            estados internos desde backend.
          </p>
        </div>
        <span className="dashboard-shell__status">Datos por conectar</span>
      </header>

      <section className="dashboard-shell__kpi-grid" aria-label="KPIs temporales">
        <DashboardKpiCard
          title="Visitantes hoy"
          value="Metrica backend"
          note="Pendiente de conexion"
          variant="danger"
          tag="Por conectar"
        />
        <DashboardKpiCard
          title="Ingresos hoy"
          value="Metrica backend"
          note="Calculo pendiente de backend"
          variant="success"
          tag="Backend"
        />
        <DashboardKpiCard
          title="Entradas vendidas"
          value="Metrica backend"
          note="Datos por conectar"
          variant="success"
          tag="Temporal"
        />
        <DashboardKpiCard
          title="Tiempo medio de espera"
          value="Estado visual"
          note="Informacion temporal"
          variant="warning"
          tag="Operativo"
        />
      </section>

      <section className="dashboard-shell__main-grid">
        <DashboardMapPanel />
        <DashboardAlertsPanel />
      </section>

      <section className="dashboard-shell__bottom-grid">
        <article className="dashboard-shell__panel">
          <div className="dashboard-shell__panel-header">
            <div>
              <p className="m-0 mb-2 text-xs font-semibold tracking-[0.22em] text-red-300/80 uppercase">
                Referencia visual
              </p>
              <h2>Reservas recientes</h2>
            </div>
            <span>Por conectar</span>
          </div>
          <div className="dashboard-shell__placeholder-list">
            <div className="dashboard-shell__row dashboard-shell__row--head">
              <span>Referencia visual</span>
              <span>Conexion</span>
              <strong>Estado</strong>
            </div>
            <div className="dashboard-shell__row">
              <span>Registro pendiente</span>
              <span>Datos por conectar</span>
              <strong>Por conectar</strong>
            </div>
            <div className="dashboard-shell__row">
              <span>Servicio temporal</span>
              <span>Informacion temporal</span>
              <strong>Visual</strong>
            </div>
            <div className="dashboard-shell__row">
              <span>Linea de presentacion</span>
              <span>Sin datos reales</span>
              <strong>Temporal</strong>
            </div>
          </div>
        </article>

        <article className="dashboard-shell__panel">
          <div className="dashboard-shell__panel-header">
            <div>
              <p className="m-0 mb-2 text-xs font-semibold tracking-[0.22em] text-red-300/80 uppercase">
                Referencia visual
              </p>
              <h2>Mantenimiento programado</h2>
            </div>
            <span>Por conectar</span>
          </div>
          <div className="dashboard-shell__placeholder-list">
            <div className="dashboard-shell__row dashboard-shell__row--head">
              <span>Referencia visual</span>
              <span>Conexion</span>
              <strong>Estado</strong>
            </div>
            <div className="dashboard-shell__row dashboard-shell__row--warning">
              <span>Tarea pendiente</span>
              <span>Datos por conectar</span>
              <strong>Aviso</strong>
            </div>
            <div className="dashboard-shell__row dashboard-shell__row--success">
              <span>Revision visual</span>
              <span>Informacion temporal</span>
              <strong>Operativo</strong>
            </div>
            <div className="dashboard-shell__row dashboard-shell__row--danger">
              <span>Incidencia visual</span>
              <span>Estado no conectado</span>
              <strong>Alerta</strong>
            </div>
          </div>
        </article>
      </section>
    </main>
  )
}

export default DashboardPage
