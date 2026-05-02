import heroImage from '../assets/home/publicHomeHeroGate.png'
import bloodRiverImage from '../assets/home/attractionBloodRiver.png'
import darkLabyrinthImage from '../assets/home/attractionDarkLabyrinth.png'
import hauntedMansionImage from '../assets/home/attractionHauntedMansion.png'
import terrorTowerImage from '../assets/home/attractionTerrorTower.png'

function HomePage() {
  return (
    <main className="min-h-screen bg-black text-neutral-100">
      <section className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden border-b border-white/10 px-5 py-6 sm:px-8 md:px-10 lg:px-12 lg:py-8">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_38%] opacity-70 grayscale brightness-75 contrast-125 mix-blend-luminosity"
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_56%_36%,rgba(185,28,28,0.62),transparent_18rem),radial-gradient(circle_at_68%_56%,rgba(127,29,29,0.34),transparent_24rem),linear-gradient(90deg,rgba(0,0,0,0.97)_0%,rgba(0,0,0,0.78)_34%,rgba(0,0,0,0.28)_62%,rgba(0,0,0,0.92)_100%)]" />

        <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-6 lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="max-w-3xl pt-0 lg:-mt-6">
            <span className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-black/55 px-4 py-2 text-sm font-semibold text-neutral-200 shadow-xl shadow-black/30 backdrop-blur">
              Granada · Parque de terror
            </span>

            <p className="mt-5 text-sm font-extrabold uppercase tracking-[0.28em] text-red-500">
              La Última Puerta
            </p>
            <h1 className="mt-3 max-w-4xl text-[clamp(2.9rem,7vw,5.9rem)] leading-[0.92] font-black tracking-normal text-white uppercase drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)]">
              Cruza la puerta
              <span className="block text-red-600">si te atreves</span>
            </h1>
            <p className="mt-4 max-w-2xl text-xl font-semibold text-neutral-100">
              ¿Te atreves a cruzarla?
            </p>
            <p className="mt-3 max-w-xl text-base leading-7 text-neutral-200/85 sm:text-lg">
              El parque de atracciones de terror más intenso te espera en
              Granada con experiencias nocturnas, sustos memorables y una
              entrada que no todos se atreven a atravesar.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="min-h-12 rounded-lg border border-red-500 bg-red-700 px-7 py-3 text-sm font-extrabold tracking-wide text-white uppercase shadow-[0_0_32px_rgba(220,38,38,0.38)] transition hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
              >
                Comprar entradas
              </button>
              <button
                type="button"
                className="min-h-12 rounded-lg border border-white/25 bg-black/45 px-7 py-3 text-sm font-extrabold tracking-wide text-white uppercase backdrop-blur transition hover:border-red-500 hover:text-red-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
              >
                Ver atracciones
              </button>
            </div>
          </div>

          <aside className="w-full max-w-[300px] justify-self-start rounded-2xl border border-white/15 bg-neutral-950/80 p-5 shadow-2xl shadow-black/50 backdrop-blur-md lg:-mt-4 lg:justify-self-end">
            <div className="text-center">
              <p className="text-lg font-extrabold text-white">
                Tu experiencia empieza aquí
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-300">
                Acceso visual a la experiencia mobile para preparar el recorrido
                dentro del parque.
              </p>
            </div>

            <div className="mx-auto mt-4 grid h-28 w-28 grid-cols-5 gap-1 rounded-xl border border-white/20 bg-white p-3 shadow-inner">
              <span className="rounded-sm bg-black" />
              <span className="rounded-sm bg-black" />
              <span className="rounded-sm bg-white" />
              <span className="rounded-sm bg-black" />
              <span className="rounded-sm bg-black" />
              <span className="rounded-sm bg-black" />
              <span className="rounded-sm bg-white" />
              <span className="rounded-sm bg-black" />
              <span className="rounded-sm bg-white" />
              <span className="rounded-sm bg-black" />
              <span className="rounded-sm bg-white" />
              <span className="rounded-sm bg-black" />
              <span className="rounded-sm bg-red-700" />
              <span className="rounded-sm bg-black" />
              <span className="rounded-sm bg-white" />
              <span className="rounded-sm bg-black" />
              <span className="rounded-sm bg-white" />
              <span className="rounded-sm bg-black" />
              <span className="rounded-sm bg-white" />
              <span className="rounded-sm bg-black" />
              <span className="rounded-sm bg-black" />
              <span className="rounded-sm bg-black" />
              <span className="rounded-sm bg-white" />
              <span className="rounded-sm bg-black" />
              <span className="rounded-sm bg-black" />
            </div>

            <p className="mt-4 rounded-lg border border-red-900/70 bg-red-950/30 px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-red-200">
              QR visual · Sin pago real
            </p>
          </aside>
        </div>
      </section>

      <section
        id="atracciones"
        className="border-b border-white/10 bg-black px-5 py-12 sm:px-8 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-extrabold tracking-[0.22em] text-red-500 uppercase">
                Atracciones destacadas
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-normal text-white sm:text-4xl">
                Elige tu próxima pesadilla
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-neutral-300">
              Cuatro experiencias oscuras para empezar a cruzar la puerta:
              mansiones malditas, aguas rojas, torres imposibles y laberintos
              donde la salida no siempre aparece.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <article className="group overflow-hidden rounded-2xl border border-white/15 bg-neutral-950/85 shadow-2xl shadow-black/45 transition duration-300 hover:-translate-y-1 hover:border-red-700/70">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={hauntedMansionImage}
                  alt="Mansión Maldita"
                  className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-2xl font-black tracking-normal text-white">
                  Mansión Maldita
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-300">
                  Un recorrido entre pasillos cerrados, puertas que susurran y
                  una presencia que espera al final.
                </p>
                <span className="mt-5 inline-flex rounded-md border border-red-500/70 bg-red-600/10 px-3 py-1 text-xs font-extrabold tracking-[0.14em] text-red-300 uppercase">
                  Extrema
                </span>
              </div>
            </article>

            <article className="group overflow-hidden rounded-2xl border border-white/15 bg-neutral-950/85 shadow-2xl shadow-black/45 transition duration-300 hover:-translate-y-1 hover:border-red-700/70">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={bloodRiverImage}
                  alt="Río de Sangre"
                  className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-2xl font-black tracking-normal text-white">
                  Río de Sangre
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-300">
                  Una travesía nocturna por aguas rojas, curvas cerradas y
                  gritos que llegan antes que la corriente.
                </p>
                <span className="mt-5 inline-flex rounded-md border border-red-500/70 bg-red-600/10 px-3 py-1 text-xs font-extrabold tracking-[0.14em] text-red-300 uppercase">
                  Extrema
                </span>
              </div>
            </article>

            <article className="group overflow-hidden rounded-2xl border border-white/15 bg-neutral-950/85 shadow-2xl shadow-black/45 transition duration-300 hover:-translate-y-1 hover:border-red-700/70">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={terrorTowerImage}
                  alt="Torre del Terror"
                  className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-2xl font-black tracking-normal text-white">
                  Torre del Terror
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-300">
                  Una caída vertical entre luces rojas, metal antiguo y el eco
                  de quienes subieron demasiado alto.
                </p>
                <span className="mt-5 inline-flex rounded-md border border-red-500/70 bg-red-600/10 px-3 py-1 text-xs font-extrabold tracking-[0.14em] text-red-300 uppercase">
                  Extrema
                </span>
              </div>
            </article>

            <article className="group overflow-hidden rounded-2xl border border-white/15 bg-neutral-950/85 shadow-2xl shadow-black/45 transition duration-300 hover:-translate-y-1 hover:border-yellow-600/70">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={darkLabyrinthImage}
                  alt="Laberinto Oscuro"
                  className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-2xl font-black tracking-normal text-white">
                  Laberinto Oscuro
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-300">
                  Caminos estrechos, sombras móviles y señales que cambian
                  cuando crees haber encontrado la salida.
                </p>
                <span className="mt-5 inline-flex rounded-md border border-yellow-500/70 bg-yellow-500/10 px-3 py-1 text-xs font-extrabold tracking-[0.14em] text-yellow-300 uppercase">
                  Media
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
