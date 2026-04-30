import MobileLayout from '../layouts/MobileLayout'

function MobilePage() {
  return (
    <MobileLayout>
      <main className="mobile-page">
        <section className="page-panel">
          <p className="page-kicker">Experiencia móvil</p>
          <h1>Visita al parque</h1>
          <p className="page-description">
            Base para visitantes dentro del parque. Aquí se prepararán el mapa,
            la ruta optimizada y el detalle de atracciones.
          </p>
        </section>
      </main>
    </MobileLayout>
  )
}

export default MobilePage
