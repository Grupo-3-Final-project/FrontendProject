import { Button, Card } from '../components/ui'

function HomePage() {
  return (
    <main className="home-page">
      <section className="page-panel">
        <p className="page-kicker">Home publica</p>
        <h1>Parque de terror</h1>
        <p className="page-description">
          Base para la pagina comercial. Aqui se prepararan la experiencia
          visual, las atracciones destacadas, las ofertas y la compra.
        </p>
        <div className="page-preview-grid">
          <Card
            title="Experiencia comercial"
            subtitle="Espacio preparado para destacar el parque sin datos internos."
          >
            <p>
              La home mostrara contenido visual, ofertas y acceso a compra o
              recorrido cuando el flujo este definido.
            </p>
            <div className="page-actions">
              <Button>Ver propuesta</Button>
              <Button variant="secondary">Explorar atracciones</Button>
            </div>
          </Card>
        </div>
      </section>
    </main>
  )
}

export default HomePage
