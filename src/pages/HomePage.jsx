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
        className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_58%_42%,#220606_0%,#050505_48%,#000_100%)] px-4 py-6 sm:px-6 md:px-8 lg:min-h-[600px] lg:px-6 lg:py-3 xl:px-8"
      >
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-100 brightness-100 contrast-100 lg:object-contain"
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.84)_0%,rgba(0,0,0,0.48)_28%,rgba(0,0,0,0.05)_52%,rgba(0,0,0,0.24)_78%,rgba(0,0,0,0.5)_100%),linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0)_52%,rgba(0,0,0,0.68)_100%)]" />

        <div className="mr-auto ml-0 grid min-h-[calc(100svh-6.75rem)] w-full max-w-[1160px] items-center gap-4 py-2 sm:py-4 lg:min-h-[572px] lg:grid-cols-[minmax(0,1fr)_196px] lg:py-0 xl:grid-cols-[minmax(0,1fr)_208px]">
          <div className="max-w-[39rem] pt-0 lg:-mt-2">
            <span className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-black/45 px-3.5 py-2 text-sm font-semibold text-neutral-100 shadow-xl shadow-black/30 backdrop-blur">
              Granada · 18°C
            </span>

            <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.26em] text-red-500 sm:text-sm">
              La Última Puerta
            </p>
            <h1 className="mt-2 max-w-[31rem] text-[2.6rem] leading-[0.94] font-black tracking-normal text-white uppercase drop-shadow-[0_14px_32px_rgba(0,0,0,0.9)] sm:text-[3.15rem] lg:text-[3.2rem] xl:text-[3.5rem]">
              Cruza la puerta
              <span className="block text-red-600">si te atreves</span>
            </h1>
            <p className="mt-4 max-w-xl text-base font-semibold text-neutral-100 sm:text-lg">
              ¿Te atreves a cruzarla?
            </p>
            <p className="mt-2 max-w-md text-base leading-7 text-neutral-200/80 sm:max-w-[31rem]">
              El parque de atracciones de terror más intenso te espera en
              Granada con experiencias nocturnas, sustos memorables y una
              entrada que no todos se atreven a atravesar.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
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
            className="w-full max-w-[196px] justify-self-center rounded-xl border border-white/15 bg-neutral-950/45 p-3 shadow-xl shadow-black/35 backdrop-blur-sm lg:-mt-2 lg:justify-self-end lg:opacity-90 xl:max-w-[208px]"
          >
            <div className="text-center">
              <p className="text-[0.9rem] leading-tight font-extrabold text-white">
                Tu experiencia empieza aquí
              </p>
              <p className="mt-2 text-[0.7rem] leading-5 text-neutral-300/85">
                Acceso visual a la experiencia mobile para preparar el recorrido
                dentro del parque.
              </p>
            </div>

            <div className="mx-auto mt-3 grid h-16 w-16 grid-cols-5 gap-1 rounded-lg border border-white/20 bg-white p-2">
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

            <p className="mt-3 rounded-lg border border-red-950/60 bg-black/30 px-3 py-2 text-center text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-red-200/90">
              QR visual · Sin pago real
            </p>
          </aside>
        </div>
      </section>

      <section
        id="atracciones"
        className="scroll-mt-32 border-b border-white/10 bg-black px-4 py-10 sm:px-8 sm:py-12 md:scroll-mt-0 md:px-10 lg:px-12"
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
        className="scroll-mt-32 border-b border-white/10 bg-neutral-950 px-4 py-10 sm:px-8 sm:py-12 md:scroll-mt-0 md:px-10 lg:px-12"
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
        className="scroll-mt-32 border-b border-white/10 bg-black px-4 py-10 sm:px-8 sm:py-12 md:scroll-mt-0 md:px-10 lg:px-12"
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
              className="h-[20rem] w-full object-cover opacity-95 brightness-105 contrast-110 sm:h-[24rem] lg:h-[27rem]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/0 to-black/25" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            <span className="absolute top-[28%] left-[12%] hidden rounded-lg border border-white/20 bg-neutral-950/85 px-4 py-2 text-xs font-bold text-white shadow-xl shadow-black/40 backdrop-blur sm:inline-flex">
              Mansión Maldita
            </span>
            <span className="absolute bottom-[18%] left-[24%] hidden rounded-lg border border-white/20 bg-neutral-950/85 px-4 py-2 text-xs font-bold text-white shadow-xl shadow-black/40 backdrop-blur sm:inline-flex">
              Río de Sangre
            </span>
            <span className="absolute top-[16%] left-[48%] hidden rounded-lg border border-white/20 bg-neutral-950/85 px-4 py-2 text-xs font-bold text-white shadow-xl shadow-black/40 backdrop-blur sm:inline-flex">
              Torre del Terror
            </span>
            <span className="absolute right-[18%] bottom-[38%] hidden rounded-lg border border-white/20 bg-neutral-950/85 px-4 py-2 text-xs font-bold text-white shadow-xl shadow-black/40 backdrop-blur sm:inline-flex">
              Laberinto Oscuro
            </span>

            <div className="absolute right-4 bottom-4 left-4 flex flex-col gap-2 sm:right-6 sm:bottom-6 sm:left-auto sm:items-end">
              <button
                type="button"
                className="min-h-12 w-full rounded-lg border border-red-500 bg-red-700 px-6 py-3 text-sm font-extrabold tracking-wide text-white uppercase shadow-[0_0_32px_rgba(220,38,38,0.35)] transition hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 sm:w-auto"
                onClick={() => scrollToSection('experiencia')}
              >
                Explorar mapa
              </button>
              <p className="max-w-[15rem] rounded-lg border border-white/5 bg-black/35 px-3 py-2 text-[0.68rem] leading-4 text-neutral-300/75 backdrop-blur">
                Mapa visual orientativo. El recorrido mobile se preparará en su
                experiencia propia.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="visita"
        className="scroll-mt-32 border-b border-white/10 bg-black px-4 py-10 sm:px-8 sm:py-12 md:scroll-mt-0 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-extrabold tracking-[0.22em] text-red-500 uppercase">
                Planifica tu visita
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-normal text-white sm:text-4xl">
                Todo listo antes de cruzar la puerta
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-neutral-300">
              Consulta una guía visual de acceso, horarios y servicios para
              preparar la visita sin convertir la Home en una compra real.
            </p>
          </div>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(21rem,0.8fr)]">
            <div className="space-y-5">
              <div className="relative overflow-hidden rounded-3xl border border-red-950/70 bg-neutral-950 shadow-2xl shadow-black/60">
                <img
                  src={parkMapImage}
                  alt="Mapa visual para planificar la visita"
                  className="h-[18rem] w-full object-cover opacity-90 brightness-105 contrast-110 sm:h-[24rem] lg:h-[26rem]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />
                <div className="absolute right-4 bottom-4 left-4 rounded-2xl border border-white/10 bg-black/55 p-4 backdrop-blur sm:right-6 sm:bottom-6 sm:left-6">
                  <p className="text-sm font-extrabold tracking-[0.18em] text-red-300 uppercase">
                    Mapa visual del parque
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-200/85">
                    Una vista orientativa para ubicar accesos, zonas principales
                    y puntos de referencia antes de la experiencia mobile.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <article className="rounded-2xl border border-white/10 bg-neutral-950 p-5 shadow-xl shadow-black/35">
                  <p className="text-base font-black text-white">En coche</p>
                  <p className="mt-2 text-sm leading-6 text-neutral-400">
                    Acceso por A-44, salida 107. Aparcamiento gratuito junto a
                    la entrada principal.
                  </p>
                </article>

                <article className="rounded-2xl border border-white/10 bg-neutral-950 p-5 shadow-xl shadow-black/35">
                  <p className="text-base font-black text-white">En autobús</p>
                  <p className="mt-2 text-sm leading-6 text-neutral-400">
                    Línea 26 desde el centro cada 20 minutos. Parada La Última
                    Puerta.
                  </p>
                </article>

                <article className="rounded-2xl border border-white/10 bg-neutral-950 p-5 shadow-xl shadow-black/35">
                  <p className="text-base font-black text-white">En tren</p>
                  <p className="mt-2 text-sm leading-6 text-neutral-400">
                    Cercanías hasta estación Sur y lanzadera visual gratuita al
                    parque.
                  </p>
                </article>
              </div>
            </div>

            <aside className="space-y-5">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-xl shadow-black/35">
                <div className="border-b border-white/10 bg-red-950/35 px-5 py-4">
                  <h3 className="text-sm font-extrabold tracking-[0.14em] text-white uppercase">
                    Horario de apertura
                  </h3>
                </div>
                <div className="divide-y divide-white/10">
                  <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm">
                    <span className="text-neutral-400">Lunes — Jueves</span>
                    <span className="font-bold text-neutral-500">Cerrado</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm">
                    <span className="text-neutral-400">Viernes</span>
                    <span className="font-bold text-green-400">
                      19:00 — 01:00
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm">
                    <span className="text-neutral-400">Sábado</span>
                    <span className="font-bold text-green-400">
                      18:00 — 02:00
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm">
                    <span className="text-neutral-400">Domingo</span>
                    <span className="font-bold text-green-400">
                      18:00 — 00:00
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm">
                    <span className="text-neutral-400">Festivos</span>
                    <span className="font-bold text-green-400">
                      18:00 — 01:00
                    </span>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-xl shadow-black/35">
                <div className="border-b border-white/10 px-5 py-4">
                  <h3 className="text-sm font-extrabold tracking-[0.14em] text-white uppercase">
                    Servicios
                  </h3>
                </div>
                <ul className="divide-y divide-white/10 text-sm text-neutral-300">
                  <li className="flex items-center gap-3 px-5 py-4">
                    <span className="text-green-400">✓</span>
                    Aparcamiento gratuito
                  </li>
                  <li className="flex items-center gap-3 px-5 py-4">
                    <span className="text-green-400">✓</span>
                    Cafetería y restaurante
                  </li>
                  <li className="flex items-center gap-3 px-5 py-4">
                    <span className="text-green-400">✓</span>
                    Tienda de souvenirs
                  </li>
                  <li className="flex items-center gap-3 px-5 py-4">
                    <span className="text-green-400">✓</span>
                    Consigna de equipaje
                  </li>
                  <li className="flex items-center gap-3 px-5 py-4">
                    <span className="text-green-400">✓</span>
                    Servicio médico
                  </li>
                </ul>
              </div>

              <button
                type="button"
                className="min-h-12 w-full rounded-lg border border-red-500 bg-red-700 px-8 py-3 text-sm font-extrabold tracking-wide text-white uppercase shadow-[0_0_30px_rgba(220,38,38,0.35)] transition hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
              >
                Comprar entradas
              </button>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-black px-4 py-10 sm:px-8 sm:py-12 md:px-10 lg:px-12">
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
