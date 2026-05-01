import { Badge } from '../ui'
import './DashboardMapPanel.css'

function DashboardMapPanel() {
  return (
    <section className="dashboard-map-panel" aria-labelledby="dashboard-map-title">
      <div className="dashboard-map-panel__header">
        <div>
          <p className="dashboard-shell__eyebrow">Referencia visual</p>
          <h2 id="dashboard-map-title">Mapa operativo</h2>
        </div>
        <Badge variant="neutral">Sin datos reales</Badge>
      </div>

      <div className="dashboard-map-panel__canvas" aria-label="Mapa operativo temporal">
        <span className="dashboard-map-panel__glow" aria-hidden="true" />
        <span className="dashboard-map-panel__point dashboard-map-panel__point--success">
          <strong>Sector operativo</strong>
          <small>Estado visual</small>
        </span>
        <span className="dashboard-map-panel__point dashboard-map-panel__point--warning">
          <strong>Area en revision</strong>
          <small>Datos por conectar</small>
        </span>
        <span className="dashboard-map-panel__point dashboard-map-panel__point--danger">
          <strong>Incidencia interna</strong>
          <small>Informacion temporal</small>
        </span>
        <span className="dashboard-map-panel__point dashboard-map-panel__point--neutral">
          <strong>Zona sin conexion</strong>
          <small>Sin datos reales</small>
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
