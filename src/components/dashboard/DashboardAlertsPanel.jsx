import { Badge } from '../ui'
import './DashboardAlertsPanel.css'

function DashboardAlertsPanel() {
  return (
    <section className="dashboard-alerts-panel" aria-labelledby="dashboard-alerts-title">
      <div className="dashboard-alerts-panel__header">
        <p className="dashboard-shell__eyebrow">Placeholder visual</p>
        <h2 id="dashboard-alerts-title">Alertas internas</h2>
      </div>

      <div className="dashboard-alerts-panel__list">
        <article className="dashboard-alerts-panel__item">
          <Badge variant="danger">Critica</Badge>
          <div>
            <h3>Alerta placeholder</h3>
            <p>Contenido temporal hasta conectar datos internos.</p>
          </div>
        </article>
        <article className="dashboard-alerts-panel__item">
          <Badge variant="warning">Aviso</Badge>
          <div>
            <h3>Mantenimiento programado</h3>
            <p>Bloque visual sin informacion real de backend.</p>
          </div>
        </article>
        <article className="dashboard-alerts-panel__item">
          <Badge variant="neutral">Estado</Badge>
          <div>
            <h3>Estado interno</h3>
            <p>Espacio reservado para estados operativos.</p>
          </div>
        </article>
      </div>
    </section>
  )
}

export default DashboardAlertsPanel
