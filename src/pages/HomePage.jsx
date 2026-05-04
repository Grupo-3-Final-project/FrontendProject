import heroImage from '../assets/home/publicHomeHeroGate.png'
import bloodRiverImage from '../assets/home/attractionBloodRiver.png'
import darkLabyrinthImage from '../assets/home/attractionDarkLabyrinth.png'
import hauntedMansionImage from '../assets/home/attractionHauntedMansion.png'
import terrorTowerImage from '../assets/home/attractionTerrorTower.png'
import offerFamilyPackImage from '../assets/home/offerFamilyPack.png'
import offerHotelTicketImage from '../assets/home/offerHotelTicket.png'
import offerNightWithoutEscapeImage from '../assets/home/offerNightWithoutEscape.png'
import parkMapImage from '../assets/home/publicHomeParkMap.png'

function HomePage() {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-neutral-100">
      <section
        id="inicio"
        className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_58%_42%,#220606_0%,#050505_48%,#000_100%)] px-4 py-6 sm:px-6 md:px-8 lg:min-h-[580px] lg:px-6 lg:py-3 xl:px-8"
      >
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-100 brightness-100 contrast-100 lg:object-contain"
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.52)_28%,rgba(0,0,0,0.08)_50%,rgba(0,0,0,0.28)_78%,rgba(0,0,0,0.52)_100%),linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0)_55%,rgba(0,0,0,0.65)_100%)]" />

        <div className="mr-auto ml-0 grid min-h-[calc(100svh-6.75rem)] w-full max-w-[1180px] items-center gap-5 py-2 sm:py-4 lg:min-h-[552px] lg:grid-cols-[minmax(0,1fr)_216px] lg:py-0 xl:grid-cols-[minmax(0,1fr)_232px]">
          <div className="max-w-[41rem] pt-0 lg:-mt-1">
            <span className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-black/45 px-3.5 py-2 text-sm font-semibold text-neutral-100 shadow-xl shadow-black/30 backdrop-blur">
              Granada · 18°C
            </span>

            <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.28em] text-red-500 sm:text-sm">
              La Última Puerta
            </p>
            <h1 className="mt-2 max-w-[34rem] text-4xl leading-[0.96] font-black tracking-normal text-white uppercase sm:text-5xl lg:text-[3.35rem] xl:text-[3.7rem]">
              Cruza la puerta
              <span className="block text-red-600">si te atreves</span>
            </h1>
            <p className="mt-3 max-w-xl text-base font-semibold text-neutral-100 sm:text-lg">
              ¿Te atreves a cruzarla?
            </p>
            <p className="mt-2 max-w-md text-base leading-7 text-neutral-200/85 sm:max-w-lg">
              El parque de atracciones de terror más intenso te espera en
              Granada con experiencias nocturnas, sustos memorables y una
              entrada que no todos se atreven a atravesar.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                type="button"
                className="min-h-12 w-full rounded-lg border border-red-500 bg-red-700 px-6 py-3 text-sm font-extrabold tracking-wide text-white uppercase transition hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 sm:w-auto"
                onClick={() => scrollToSection('visita')}
              >
                Comprar entradas
              </button>
              <button
                type="button"
                className="min-h-12 w-full rounded-lg border border-white/25 bg-black/40 px-6 py-3 text-sm font-extrabold tracking-wide text-white uppercase backdrop-blur transition hover:border-red-500 hover:text-red-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 sm:w-auto"
              >
                Ver tráiler
              </button>
            </div>
          </div>

          <aside
            id="info"
            className="w-full max-w-[216px] justify-self-center rounded-2xl border border-white/20 bg-neutral-950/58 p-3 backdrop-blur-sm lg:-mt-1 lg:justify-self-end xl:max-w-[232px]"
          >
            <div className="text-center">
              <p className="text-[0.95rem] leading-tight font-extrabold text-white">
                Tu experiencia empieza aquí
              </p>
              <p className="mt-2 text-xs leading-5 text-neutral-300">
                Acceso visual a la experiencia mobile para preparar el recorrido
                dentro del parque.
              </p>
            </div>

            <div className="mx-auto mt-3 grid h-18 w-18 grid-cols-5 gap-1 rounded-xl border border-white/20 bg-white p-2">
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

            <p className="mt-3 rounded-lg border border-red-900/70 bg-red-950/30 px-3 py-2 text-center text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-red-200">
              QR visual · Sin pago real
            </p>
          </aside>
        </div>
      </section>

      <section
        id="atracciones"
        className="border-b border-white/10 bg-black px-4 py-10 sm:px-8 sm:py-12 md:px-10 lg:px-12"
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

          <div className="grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-neutral-950/85 shadow-2xl shadow-black/45 transition duration-300 hover:-translate-y-1 hover:border-red-700/70">
              <div className="relative aspect-[5/4] overflow-hidden">
                <img
                  src={hauntedMansionImage}
                  alt="Mansión Maldita"
                  className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col items-center p-4 text-center sm:p-5">
                <h3 className="text-xl font-black tracking-normal text-white sm:text-2xl">
                  Mansión Maldita
                </h3>
                <span className="mt-4 inline-flex w-fit rounded-md border border-red-500/70 bg-red-600/10 px-3 py-1 text-xs font-extrabold tracking-[0.14em] text-red-300 uppercase">
                  Extrema
                </span>
              </div>
            </article>

            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-neutral-950/85 shadow-2xl shadow-black/45 transition duration-300 hover:-translate-y-1 hover:border-red-700/70">
              <div className="relative aspect-[5/4] overflow-hidden">
                <img
                  src={bloodRiverImage}
                  alt="Río de Sangre"
                  className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col items-center p-4 text-center sm:p-5">
                <h3 className="text-xl font-black tracking-normal text-white sm:text-2xl">
                  Río de Sangre
                </h3>
                <span className="mt-4 inline-flex w-fit rounded-md border border-red-500/70 bg-red-600/10 px-3 py-1 text-xs font-extrabold tracking-[0.14em] text-red-300 uppercase">
                  Extrema
                </span>
              </div>
            </article>

            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-neutral-950/85 shadow-2xl shadow-black/45 transition duration-300 hover:-translate-y-1 hover:border-red-700/70">
              <div className="relative aspect-[5/4] overflow-hidden">
                <img
                  src={terrorTowerImage}
                  alt="Torre del Terror"
                  className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col items-center p-4 text-center sm:p-5">
                <h3 className="text-xl font-black tracking-normal text-white sm:text-2xl">
                  Torre del Terror
                </h3>
                <span className="mt-4 inline-flex w-fit rounded-md border border-red-500/70 bg-red-600/10 px-3 py-1 text-xs font-extrabold tracking-[0.14em] text-red-300 uppercase">
                  Extrema
                </span>
              </div>
            </article>

            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-neutral-950/85 shadow-2xl shadow-black/45 transition duration-300 hover:-translate-y-1 hover:border-yellow-600/70">
              <div className="relative aspect-[5/4] overflow-hidden">
                <img
                  src={darkLabyrinthImage}
                  alt="Laberinto Oscuro"
                  className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col items-center p-4 text-center sm:p-5">
                <h3 className="text-xl font-black tracking-normal text-white sm:text-2xl">
                  Laberinto Oscuro
                </h3>
                <span className="mt-4 inline-flex w-fit rounded-md border border-yellow-500/70 bg-yellow-500/10 px-3 py-1 text-xs font-extrabold tracking-[0.14em] text-yellow-300 uppercase">
                  Media
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section
        id="ofertas"
        className="border-b border-white/10 bg-neutral-950 px-4 py-10 sm:px-8 sm:py-12 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-extrabold tracking-[0.22em] text-red-500 uppercase">
                Ofertas especiales
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-normal text-white sm:text-4xl">
                Cruza la puerta con ventaja
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-neutral-300">
              Promociones visuales para planificar la visita sin convertir la
              Home en un proceso de compra real.
            </p>
          </div>

          <div className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-[1.1fr_1.1fr_1.1fr_0.85fr]">
            <article className="group relative min-h-40 overflow-hidden rounded-2xl border border-red-900/60 bg-black shadow-2xl shadow-black/45 sm:min-h-44">
              <img
                src={offerNightWithoutEscapeImage}
                alt="Noche sin escape"
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-red-950/15" />
              <div className="relative flex min-h-40 flex-col justify-end p-4 sm:min-h-44 sm:p-5">
                <h3 className="text-xl font-black tracking-normal text-white">
                  Noche sin escape
                </h3>
                <p className="mt-2 text-5xl font-black tracking-normal text-red-500">
                  -20%
                </p>
              </div>
            </article>

            <article className="group relative min-h-40 overflow-hidden rounded-2xl border border-red-900/60 bg-black shadow-2xl shadow-black/45 sm:min-h-44">
              <img
                src={offerFamilyPackImage}
                alt="Pack familiar"
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-red-950/15" />
              <div className="relative flex min-h-40 flex-col justify-end p-4 sm:min-h-44 sm:p-5">
                <h3 className="text-xl font-black tracking-normal text-white">
                  Pack familiar
                </h3>
                <p className="mt-2 text-4xl font-black tracking-normal text-red-500">
                  4 entradas
                </p>
                <p className="mt-1 text-lg font-semibold text-neutral-100">
                  al precio de 3
                </p>
              </div>
            </article>

            <article className="group relative min-h-40 overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl shadow-black/45 sm:min-h-44">
              <img
                src={offerHotelTicketImage}
                alt="Hotel + entrada"
                className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-500 group-hover:scale-105 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/20" />
              <div className="relative flex min-h-40 flex-col justify-end p-4 sm:min-h-44 sm:p-5">
                <h3 className="text-xl font-black tracking-normal text-white">
                  Hotel + entrada
                </h3>
                <p className="mt-2 text-4xl font-black tracking-normal text-red-500">
                  desde 129€
                </p>
              </div>
            </article>

            <article className="flex min-h-40 flex-col justify-center rounded-2xl border border-yellow-500/80 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.18),rgba(23,23,23,0.9)_52%,rgba(0,0,0,0.98)_100%)] p-4 text-center shadow-2xl shadow-black/45 sm:min-h-44 sm:p-5">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-yellow-400/70 bg-yellow-500/10 text-xl font-black text-yellow-300">
                ♿
              </span>
              <h3 className="mt-3 text-lg font-black tracking-normal text-white">
                Descuento discapacidad
              </h3>
              <p className="mt-3 text-4xl font-black tracking-normal text-yellow-400">
                -20%
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        id="experiencia"
        className="border-b border-white/10 bg-black px-4 py-10 sm:px-8 sm:py-12 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-extrabold tracking-[0.22em] text-red-500 uppercase">
                Mapa del parque
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-normal text-white sm:text-4xl">
                La ruta hacia tus peores miedos
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-neutral-300">
              Una vista comercial del recinto para ubicar las grandes zonas de
              terror antes de planificar la visita.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-red-950/70 bg-neutral-950 shadow-2xl shadow-black/60">
            <img
              src={parkMapImage}
              alt="Mapa visual del parque"
              className="h-[20rem] w-full object-cover opacity-90 brightness-90 contrast-125 sm:h-[26rem] lg:h-[30rem]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/5 to-black/35" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <span className="absolute top-[28%] left-[12%] hidden rounded-lg border border-white/20 bg-neutral-950/85 px-4 py-2 text-xs font-bold text-white shadow-xl shadow-black/40 backdrop-blur sm:inline-flex">
              Mansión Maldita
            </span>
            <span className="absolute bottom-[18%] left-[24%] hidden rounded-lg border border-white/20 bg-neutral-950/85 px-4 py-2 text-xs font-bold text-white shadow-xl shadow-black/40 backdrop-blur sm:inline-flex">
              Río de Sangre
            </span>
            <span className="absolute top-[16%] left-[48%] hidden rounded-lg border border-white/20 bg-neutral-950/85 px-4 py-2 text-xs font-bold text-white shadow-xl shadow-black/40 backdrop-blur sm:inline-flex">
              Torre del Terror
            </span>
            <span className="absolute right-[14%] bottom-[28%] hidden rounded-lg border border-white/20 bg-neutral-950/85 px-4 py-2 text-xs font-bold text-white shadow-xl shadow-black/40 backdrop-blur sm:inline-flex">
              Laberinto Oscuro
            </span>

            <div className="absolute right-4 bottom-4 left-4 flex flex-col gap-3 sm:right-5 sm:bottom-5 sm:left-auto sm:items-end">
              <button
                type="button"
                className="min-h-12 w-full rounded-lg border border-red-500 bg-red-700 px-6 py-3 text-sm font-extrabold tracking-wide text-white uppercase shadow-[0_0_32px_rgba(220,38,38,0.35)] transition hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 sm:w-auto"
                onClick={() => scrollToSection('experiencia')}
              >
                Explorar mapa
              </button>
              <p className="max-w-sm rounded-lg border border-white/10 bg-black/60 px-4 py-3 text-xs leading-5 text-neutral-300 backdrop-blur">
                Mapa visual orientativo. El recorrido mobile se preparará en su
                experiencia propia.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="visita"
        className="bg-black px-4 py-10 sm:px-8 sm:py-12 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-red-900/70 bg-[radial-gradient(circle_at_center,rgba(185,28,28,0.35),rgba(23,23,23,0.92)_48%,rgba(0,0,0,1)_100%)] px-5 py-12 text-center shadow-2xl shadow-black/60 sm:px-10 sm:py-14">
          <p className="text-sm font-extrabold tracking-[0.24em] text-red-400 uppercase">
            La Última Puerta
          </p>
          <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-black tracking-normal text-white uppercase drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)] sm:text-5xl lg:text-6xl">
            ¿Listo para cruzar La Última Puerta?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-neutral-200/85 sm:text-lg">
            La experiencia comienza antes de entrar. Atrévete a cruzarla.
          </p>
          <button
            type="button"
            className="mt-8 min-h-12 w-full rounded-lg border border-red-500 bg-red-700 px-8 py-3 text-sm font-extrabold tracking-wide text-white uppercase shadow-[0_0_36px_rgba(220,38,38,0.42)] transition hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 sm:w-auto"
          >
            Comprar entradas
          </button>
        </div>
      </section>
    </main>
  )
}

export default HomePage
