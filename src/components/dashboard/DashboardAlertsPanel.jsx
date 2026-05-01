import { Badge } from '../ui'
import './DashboardAlertsPanel.css'

function DashboardAlertsPanel() {
  return (
    <section className="dashboard-alerts-panel" aria-labelledby="dashboard-alerts-title">
      <div className="dashboard-alerts-panel__header">
        <p className="dashboard-shell__eyebrow">Referencia visual</p>
        <h2 id="dashboard-alerts-title">Alertas internas</h2>
      </div>

      <div className="dashboard-alerts-panel__list">
        <article className="dashboard-alerts-panel__item dashboard-alerts-panel__item--danger">
          <Badge variant="danger">Critica</Badge>
          <div>
            <h3>Incidencia por conectar</h3>
            <p>Espacio visual reservado para alertas internas de backend.</p>
          </div>
        </article>
        <article className="dashboard-alerts-panel__item dashboard-alerts-panel__item--warning">
          <Badge variant="warning">Aviso</Badge>
          <div>
            <h3>Aviso operativo</h3>
            <p>Contenido temporal sin informacion real conectada.</p>
          </div>
        </article>
        <article className="dashboard-alerts-panel__item dashboard-alerts-panel__item--success">
          <Badge variant="success">Estado</Badge>
          <div>
            <h3>Estado visual</h3>
            <p>Referencia de lectura para futuros estados operativos.</p>
          </div>
        </article>
      </div>
    </section>
  )
}

export default DashboardAlertsPanel
