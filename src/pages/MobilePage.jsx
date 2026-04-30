import { Badge, Button, Card } from '../components/ui'
import MobileLayout from '../layouts/MobileLayout'

function MobilePage() {
  return (
    <MobileLayout>
      <main className="mobile-page">
        <section className="page-panel">
          <p className="page-kicker">Experiencia movil</p>
          <h1>Visita al parque</h1>
          <p className="page-description">
            Base para visitantes dentro del parque. Aqui se prepararan el mapa,
            la ruta optimizada y el detalle de atracciones.
          </p>
          <div className="page-preview-grid">
            <Card
              title="Ruta del visitante"
              subtitle="Base visual mobile-first sin login ni compra real."
            >
              <div className="page-inline-items">
                <Badge variant="neutral">Progreso pendiente</Badge>
              </div>
              <div className="page-actions">
                <Button>Actualizar ruta</Button>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </MobileLayout>
  )
}

export default MobilePage
