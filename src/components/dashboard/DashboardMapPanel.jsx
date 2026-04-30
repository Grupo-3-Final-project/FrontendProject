import { Badge } from '../ui'
import './DashboardMapPanel.css'

function DashboardMapPanel() {
  return (
    <section className="dashboard-map-panel" aria-labelledby="dashboard-map-title">
      <div className="dashboard-map-panel__header">
        <div>
          <p className="dashboard-shell__eyebrow">Placeholder visual</p>
          <h2 id="dashboard-map-title">Mapa operativo</h2>
        </div>
        <Badge variant="neutral">Sin datos reales</Badge>
      </div>

      <div className="dashboard-map-panel__canvas" aria-label="Mapa operativo temporal">
        <span className="dashboard-map-panel__point dashboard-map-panel__point--success">
          <strong>Zona operativa</strong>
          <small>Placeholder</small>
        </span>
        <span className="dashboard-map-panel__point dashboard-map-panel__point--warning">
          <strong>Mantenimiento</strong>
          <small>Sin API</small>
        </span>
        <span className="dashboard-map-panel__point dashboard-map-panel__point--danger">
          <strong>Alerta interna</strong>
          <small>Temporal</small>
        </span>
        <span className="dashboard-map-panel__point dashboard-map-panel__point--neutral">
          <strong>Zona cerrada</strong>
          <small>Visual</small>
        </span>
        <span className="dashboard-map-panel__route" />
      </div>

      <div className="dashboard-map-panel__legend">
        <Badge variant="success">Operativo</Badge>
        <Badge variant="warning">Mantenimiento</Badge>
        <Badge variant="danger">Alerta</Badge>
      </div>
    </section>
  )
}

export default DashboardMapPanel
