import { Button, Card } from '../components/ui'

function HomePage() {
  return (
    <main className="flex flex-1 items-center py-6 md:py-8">
      <section className="w-full rounded-2xl border border-white/15 bg-neutral-900/90 p-6 shadow-2xl">
        <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.16em] text-red-500">
          Home publica
        </p>
        <h1>Parque de terror</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-200/85">
          Base para la pagina comercial. Aqui se prepararan la experiencia
          visual, las atracciones destacadas, las ofertas y la compra.
        </p>
        <div className="mt-8 grid w-full max-w-[680px] gap-4">
          <Card
            title="Experiencia comercial"
            subtitle="Espacio preparado para destacar el parque sin datos internos."
          >
            <p>
              La home mostrara contenido visual, ofertas y acceso a compra o
              recorrido cuando el flujo este definido.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
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
