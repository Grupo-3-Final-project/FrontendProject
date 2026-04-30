import DashboardAlertsPanel from '../components/dashboard/DashboardAlertsPanel'
import DashboardKpiCard from '../components/dashboard/DashboardKpiCard'
import DashboardMapPanel from '../components/dashboard/DashboardMapPanel'
import DashboardLayout from '../layouts/DashboardLayout'

function DashboardPage() {
  return (
    <DashboardLayout>
      <main className="dashboard-page dashboard-shell">
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
          />
          <DashboardKpiCard
            title="Ingresos hoy"
            value="Pendiente"
            note="Metrica calculada por backend"
            variant="success"
          />
          <DashboardKpiCard
            title="Entradas vendidas"
            value="Pendiente"
            note="Placeholder, sin datos reales"
            variant="success"
          />
          <DashboardKpiCard
            title="Tiempo medio de espera"
            value="Pendiente"
            note="Placeholder operativo"
            variant="warning"
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
              <p>Reserva temporal</p>
              <p>Contenido pendiente de conectar con backend</p>
              <p>Estado visual no real</p>
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
              <p>Tarea temporal</p>
              <p>Bloque reservado para agenda operativa</p>
              <p>Estado visual no real</p>
            </div>
          </article>
        </section>
      </main>
    </DashboardLayout>
  )
}

export default DashboardPage
