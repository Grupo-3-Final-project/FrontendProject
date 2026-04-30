import DashboardAlertsPanel from '../components/dashboard/DashboardAlertsPanel'
import DashboardKpiCard from '../components/dashboard/DashboardKpiCard'
import DashboardMapPanel from '../components/dashboard/DashboardMapPanel'
import DashboardLayout from '../layouts/DashboardLayout'

function DashboardPage() {
  return (
    <DashboardLayout>
      <main className="dashboard-page dashboard-shell min-w-0">
        <header className="dashboard-shell__header">
          <div>
            <p className="dashboard-shell__eyebrow">Panel interno</p>
            <h1>Dashboard interno</h1>
            <p className="dashboard-shell__description">
              Estructura visual temporal para operacion del parque. Los datos reales
              se conectaran desde backend en pasos posteriores.
            </p>
          </div>
          <span className="dashboard-shell__status">Placeholder visual</span>
        </header>

        <section className="dashboard-shell__kpi-grid" aria-label="KPIs temporales">
          <DashboardKpiCard
            title="Visitantes hoy"
            value="Pendiente"
            note="Placeholder, sin datos reales"
            variant="danger"
            tag="Sin API"
          />
          <DashboardKpiCard
            title="Ingresos hoy"
            value="Pendiente"
            note="Metrica calculada por backend"
            variant="success"
            tag="Backend"
          />
          <DashboardKpiCard
            title="Entradas vendidas"
            value="Pendiente"
            note="Placeholder, sin datos reales"
            variant="success"
            tag="Temporal"
          />
          <DashboardKpiCard
            title="Tiempo medio de espera"
            value="Pendiente"
            note="Placeholder operativo"
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
                <p className="dashboard-shell__eyebrow">Placeholder visual</p>
                <h2>Reservas recientes</h2>
              </div>
              <span>Sin API</span>
            </div>
            <div className="dashboard-shell__placeholder-list">
              <div className="dashboard-shell__row">
                <span>Reserva placeholder</span>
                <span>Fecha pendiente</span>
                <strong>Sin API</strong>
              </div>
              <div className="dashboard-shell__row">
                <span>Entrada temporal</span>
                <span>Hora pendiente</span>
                <strong>Visual</strong>
              </div>
              <div className="dashboard-shell__row">
                <span>Compra mock</span>
                <span>Dato no real</span>
                <strong>Temporal</strong>
              </div>
            </div>
          </article>

          <article className="dashboard-shell__panel">
            <div className="dashboard-shell__panel-header">
              <div>
                <p className="dashboard-shell__eyebrow">Placeholder visual</p>
                <h2>Mantenimiento programado</h2>
              </div>
              <span>Sin API</span>
            </div>
            <div className="dashboard-shell__placeholder-list">
              <div className="dashboard-shell__row dashboard-shell__row--warning">
                <span>Tarea placeholder</span>
                <span>Agenda pendiente</span>
                <strong>Aviso</strong>
              </div>
              <div className="dashboard-shell__row dashboard-shell__row--success">
                <span>Revision temporal</span>
                <span>Sin datos reales</span>
                <strong>Operativo</strong>
              </div>
              <div className="dashboard-shell__row dashboard-shell__row--danger">
                <span>Incidencia mock</span>
                <span>Estado no conectado</span>
                <strong>Alerta</strong>
              </div>
            </div>
          </article>
        </section>
      </main>
    </DashboardLayout>
  )
}

export default DashboardPage
