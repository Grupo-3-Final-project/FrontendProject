import { Badge, Button, Card } from '../components/ui'

function MobilePage() {
  return (
    <main className="mobile-page">
      <section className="page-panel">
        <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.16em] text-red-500">
          Experiencia movil
        </p>
        <h1>Visita al parque</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-200/85">
          Base para visitantes dentro del parque. Aqui se prepararan el mapa,
          la ruta optimizada y el detalle de atracciones.
        </p>
        <div className="page-preview-grid">
          <Card
            title="Ruta del visitante"
            subtitle="Base visual mobile-first sin login ni compra real."
          >
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="neutral">Progreso pendiente</Badge>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button>Actualizar ruta</Button>
            </div>
          </Card>
        </div>
      </section>
    </main>
  )
}

export default MobilePage
