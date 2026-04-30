import HomeLayout from '../layouts/HomeLayout'

function HomePage() {
  return (
    <HomeLayout>
      <main className="home-page">
        <section className="page-panel">
          <p className="page-kicker">Home pública</p>
          <h1>Parque de terror</h1>
          <p className="page-description">
            Base para la página comercial. Aquí se prepararán la experiencia
            visual, las atracciones destacadas, las ofertas y la compra.
          </p>
        </section>
      </main>
    </HomeLayout>
  )
}

export default HomePage
