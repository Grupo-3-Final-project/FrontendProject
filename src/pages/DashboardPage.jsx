import { Badge, Card, StatusMessage } from '../components/ui'
import DashboardLayout from '../layouts/DashboardLayout'

function DashboardPage() {
  return (
    <DashboardLayout>
      <main className="dashboard-page">
        <section className="page-panel">
          <p className="page-kicker">Dashboard interno</p>
          <h1>Panel de operacion</h1>
          <p className="page-description">
            Base para la gestion interna. Aqui se prepararan KPIs, reservas,
            hoteles, empleados, mantenimiento, taquilla y estado de atracciones.
          </p>
          <div className="page-preview-grid page-preview-grid--dashboard">
            <Card
              title="Estado operativo"
              subtitle="Contenedor base para informacion interna."
            >
              <div className="page-inline-items">
                <Badge variant="success">Abierto</Badge>
                <Badge variant="warning">Revision pendiente</Badge>
              </div>
            </Card>
            <StatusMessage
              title="Sin datos conectados"
              message="Los datos reales se incorporaran desde servicios API en otro paso."
              variant="empty"
            />
          </div>
        </section>
      </main>
    </DashboardLayout>
  )
}

export default DashboardPage
