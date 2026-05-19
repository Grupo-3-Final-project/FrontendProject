import { useEffect, useMemo, useRef, useState } from 'react'
import heroImage from '../assets/home/publicHomeHeroGate.png'
import parkMapImage from '../assets/home/publicHomeParkMap.png'
import trailerVideo from '../assets/home/Trailer_Ultima_Puerta.mp4'
import logoAmusementPark from '../assets/logoAmusementPark.png'
import { getAttractions } from '../api/attractionApi'
import { getHotels } from '../api/hotelApi'
import { getOffers } from '../api/offerApi'
import { getGranadaWeather } from '../api/weatherApi'
import { getApiErrorMessage } from '../api/apiClient'
import StatusMessage from '../components/ui/StatusMessage'
import { formatAttractionSize, formatBoardType, formatCurrency } from '../features/admin/formatters'

const mapMarkerPositionsByName = {
  'Montaña del Último Grito': 'left-[18%] top-[22%]',
  'Río de Sangre': 'left-[25%] top-[63%]',
  'Carrusel Maldito': 'left-[46%] top-[50%]',
  'Laberinto de las Sombras': 'left-[69%] top-[43%]',
  'Casa del Eco': 'left-[57%] top-[73%]',
  'Torre del Terror': 'left-[82%] top-[61%]',
}

const fallbackMapMarkerPositions = [
  'left-[18%] top-[30%]',
  'left-[43%] top-[20%]',
  'left-[70%] top-[31%]',
  'left-[31%] top-[50%]',
  'left-[54%] top-[59%]',
  'left-[78%] top-[70%]',
  'left-[24%] top-[77%]',
  'left-[50%] top-[82%]',
]

function getMapMarkerPosition(attraction, index) {
  return mapMarkerPositionsByName[attraction.name] ?? fallbackMapMarkerPositions[index % fallbackMapMarkerPositions.length]
}

const footerDiscoverLinks = [
  { href: '#atracciones', label: 'Atracciones' },
  { href: '#hoteles', label: 'Hoteles' },
  { href: '#ofertas', label: 'Ofertas' },
  { href: '#experiencia', label: 'Experiencia' },
]

const footerVisitLinks = [
  { href: '#visita', label: 'Planifica tu visita' },
  { href: '#info', label: 'Información' },
]

function HomePage() {
  const [catalog, setCatalog] = useState({
    attractions: [],
    hotels: [],
    offers: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [weatherLabel, setWeatherLabel] = useState('Granada - Sin datos')
  const [selectedMapAttractionId, setSelectedMapAttractionId] = useState(null)
  const trailerVideoRef = useRef(null)

  useEffect(() => {
    let isMounted = true

    const loadCatalog = async () => {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const [catalogResult, weatherResult] = await Promise.allSettled([
          Promise.all([
            getAttractions(),
            getHotels(),
            getOffers(),
          ]),
          getGranadaWeather(),
        ])

        if (isMounted) {
          if (catalogResult.status === 'fulfilled') {
            const [attractions, hotels, offers] = catalogResult.value
            setCatalog({ attractions, hotels, offers })
          } else {
            setErrorMessage(getApiErrorMessage(catalogResult.reason, 'No se ha podido cargar la home.'))
          }

          if (weatherResult.status === 'fulfilled') {
            setWeatherLabel(`Granada - ${Math.round(weatherResult.value.temperatureCelsius)} C`)
          } else {
            setWeatherLabel('Granada - Sin datos')
          }
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(getApiErrorMessage(error, 'No se ha podido cargar la home.'))
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadCatalog()

    return () => {
      isMounted = false
    }
  }, [])


  const liveOverview = useMemo(
    () => [
      {
        label: 'Atracciones destacadas',
        value: String(catalog.attractions.filter((attraction) => attraction.status === 'OPEN').length),
      },
      {
        label: 'Hoteles tematizados',
        value: String(catalog.hotels.filter((hotel) => hotel.availablePlaces > 0).length),
      },
      {
        label: 'Ofertas en taquilla',
        value: String(catalog.offers.length),
      },
    ],
    [catalog.attractions, catalog.hotels, catalog.offers],
  )

  const playTrailerSection = () => {
    scrollToSection('visita')

    const videoElement = trailerVideoRef.current

    if (!videoElement) {
      return
    }

    videoElement.currentTime = 0

    void videoElement.play().catch(() => undefined)
  }


  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-neutral-100">
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
              {weatherLabel}
            </span>

            <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.26em] text-red-500 sm:text-sm">
              La Última Puerta
            </p>
            <h1 className="mt-2 max-w-[31rem] text-[2.6rem] leading-[0.94] font-black tracking-normal text-white uppercase drop-shadow-[0_14px_32px_rgba(0,0,0,0.9)] sm:text-[3.15rem] lg:text-[3.2rem] xl:text-[3.5rem]">
              Cruza la puerta
              <span className="block text-red-600">si te atreves</span>
            </h1>
            <p className="mt-4 max-w-xl text-base font-semibold text-neutral-100 sm:text-lg">
              Explora atracciones, hoteles y ofertas para preparar tu visita nocturna en Granada.
            </p>
            <p className="mt-2 max-w-md text-base leading-7 text-neutral-200/80 sm:max-w-[31rem]">
              El parque de atracciones de terror más intenso te espera en Granada con experiencias nocturnas, hoteles disponibles y ofertas listas para la visita.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                type="button"
                className="min-h-12 w-full rounded-lg border border-red-500 bg-red-700 px-6 py-3 text-sm font-extrabold tracking-wide text-white uppercase shadow-[0_0_32px_rgba(220,38,38,0.35)] transition hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 sm:w-auto"
                onClick={playTrailerSection}
              >
                Ver tráiler
              </button>
              <button
                type="button"
                className="min-h-12 w-full rounded-lg border border-white/25 bg-black/40 px-6 py-3 text-sm font-extrabold tracking-wide text-white uppercase backdrop-blur transition hover:border-red-500 hover:text-red-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 sm:w-auto"
                onClick={() => scrollToSection('atracciones')}
              >
                Ver atracciones
              </button>
            </div>
          </div>

          <aside className="w-full max-w-[196px] justify-self-center rounded-xl border border-white/15 bg-neutral-950/45 p-3 shadow-xl shadow-black/35 backdrop-blur-sm lg:-mt-2 lg:justify-self-end lg:opacity-90 xl:max-w-[208px]">
            <div className="text-center">
              <p className="text-[0.9rem] leading-tight font-extrabold text-white">
                Tu visita empieza aquí
              </p>
              <p className="mt-2 text-[0.7rem] leading-5 text-neutral-300/85">
                Consulta atracciones, hoteles y ofertas antes de tu llegada.
              </p>
            </div>

            <div className="mx-auto mt-3 space-y-2">
              {errorMessage ? (
                <StatusMessage title="Catálogo no disponible" message={errorMessage} variant="error" />
              ) : (
                liveOverview.map((item) => (
                  <div key={item.label} className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-left">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                      {item.label}
                    </p>
                    <p className="mt-1 text-lg font-black text-white">{item.value}</p>
                  </div>
                ))
              )}
            </div>

            <p className="mt-3 rounded-lg border border-red-950/60 bg-black/30 px-3 py-2 text-center text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-red-200/90">
              Reservas en taquilla
            </p>
          </aside>
        </div>
      </section>

      <section
        id="atracciones"
        className="scroll-mt-32 border-b border-white/10 bg-black px-4 py-10 sm:px-8 sm:py-12 md:scroll-mt-0 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Atracciones destacadas"
            title="Elige tu próxima pesadilla"
            description="Descubre algunas de las atracciones principales antes de organizar tu recorrido."
          />

          {renderLoadingOrError(isLoading, errorMessage) || (
            catalog.attractions.length ? (
              <AttractionCoverflowCarousel attractions={catalog.attractions} />
            ) : (
              <StatusMessage
                title="Sin atracciones"
                message="Todavía no hay atracciones cargadas en el catálogo."
                variant="empty"
              />
            )
          )}
        </div>
      </section>

      <section
        id="hoteles"
        className="scroll-mt-32 border-b border-white/10 bg-black px-4 py-10 sm:px-8 sm:py-12 md:scroll-mt-0 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Hoteles"
            title="Descansa junto al parque"
            description="Consulta disponibilidad de plazas y precios para preparar tu estancia."
          />

          {renderLoadingOrError(isLoading, errorMessage) || (
            catalog.hotels.length ? (
              <HotelCoverflowCarousel hotels={catalog.hotels} />
            ) : (
              <StatusMessage
                title="Sin hoteles"
                message="Todavía no hay hoteles disponibles en el sistema."
                variant="empty"
              />
            )
          )}
        </div>
      </section>

      <section
        id="ofertas"
        className="scroll-mt-32 border-b border-white/10 bg-black px-4 py-10 sm:px-8 sm:py-12 md:scroll-mt-0 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Ofertas especiales"
            title="Cruza la puerta con ventaja"
            description="Promociones disponibles con hotel y entradas para aprovechar mejor la visita."
          />

          {renderLoadingOrError(isLoading, errorMessage) || (
            catalog.offers.length ? (
              <OfferCoverflowCarousel offers={catalog.offers} />
            ) : (
              <StatusMessage
                title="Sin ofertas"
                message="Todavía no hay ofertas disponibles."
                variant="empty"
              />
            )
          )}
        </div>
      </section>

      <section
        id="experiencia"
        className="scroll-mt-32 border-b border-white/10 bg-black px-4 py-10 sm:px-8 sm:py-12 md:scroll-mt-0 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Mapa del parque"
            title="La ruta hacia tus peores miedos"
            description="Consulta las zonas principales del parque y organiza mejor tu recorrido."
          />

          <div className="relative overflow-hidden rounded-3xl border border-red-950/70 bg-neutral-950 shadow-2xl shadow-black/60">
            <img
              src={parkMapImage}
              alt="Mapa visual del parque"
              className="h-[20rem] w-full object-cover opacity-95 brightness-105 contrast-110 sm:h-[24rem] lg:h-[27rem]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/0 to-black/25" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            {catalog.attractions.map((attraction, index) => {
              const isSelected = selectedMapAttractionId === attraction.id
              const markerStateClassName = isSelected
                ? 'scale-105 border-red-400 bg-red-950/85 text-white ring-2 ring-red-500/70 shadow-[0_0_28px_rgba(220,38,38,0.55)]'
                : 'border-white/25 bg-black/70 text-neutral-100 shadow-xl shadow-black/40 hover:border-red-500/70 hover:bg-red-950/70 hover:text-white'

              return (
                <button
                  key={attraction.id}
                  type="button"
                  aria-pressed={isSelected}
                  aria-label={`Destacar ${attraction.name} en el mapa`}
                  onClick={() => setSelectedMapAttractionId(attraction.id)}
                    className={`absolute z-20 hidden max-w-[8.5rem] -translate-x-1/2 -translate-y-1/2 rounded-lg border px-2.5 py-1.5 text-[0.62rem] leading-tight font-extrabold backdrop-blur transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 md:block md:max-w-[11rem] md:px-3 md:py-2 md:text-xs ${getMapMarkerPosition(attraction, index)} ${markerStateClassName}`}
                >
                  <span className="line-clamp-2">{attraction.name}</span>
                </button>
              )
            })}

            <div className="absolute right-4 bottom-4 left-4 flex flex-col gap-2 sm:right-6 sm:bottom-6 sm:left-auto sm:items-end">
              <button
                type="button"
                className="min-h-12 w-full rounded-lg border border-red-500 bg-red-700 px-6 py-3 text-sm font-extrabold tracking-wide text-white uppercase shadow-[0_0_32px_rgba(220,38,38,0.35)] transition hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 sm:w-auto"
                onClick={() => scrollToSection('visita')}
              >
                Planificar visita
              </button>
              <p className="max-w-[15rem] rounded-lg border border-white/5 bg-black/35 px-3 py-2 text-[0.68rem] leading-4 text-neutral-300/75 backdrop-blur">
                Ubica accesos, zonas principales y puntos de referencia del parque.
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-neutral-950 p-4 shadow-xl shadow-black/35 sm:p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-sm font-extrabold tracking-[0.16em] text-red-300 uppercase">
                  Mapa visual orientativo
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-300">
                  Consulta la leyenda del catálogo para identificar las atracciones disponibles y su estado actual.
                </p>
              </div>
            </div>

            {catalog.attractions.length ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {catalog.attractions.map((attraction) => {
                  const isSelected = selectedMapAttractionId === attraction.id
                  const selectorStateClassName = isSelected
                    ? 'border-red-500/70 bg-red-950/35 ring-2 ring-red-500/45 shadow-[0_0_24px_rgba(220,38,38,0.24)]'
                    : 'border-white/10 bg-black/35 hover:border-red-500/55 hover:bg-red-950/20'

                  return (
                    <button
                      key={attraction.id}
                      type="button"
                      aria-pressed={isSelected}
                      aria-label={`Destacar ${attraction.name} en el mapa`}
                      onClick={() => setSelectedMapAttractionId(attraction.id)}
                      className={`rounded-xl border p-4 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 ${selectorStateClassName}`}
                    >
                      <h4 className="line-clamp-2 text-base font-black text-white">
                        {attraction.name}
                      </h4>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <StatusPill status={attraction.status} />
                        <InfoTag>{formatAttractionSize(attraction.size)}</InfoTag>
                      </div>
                    </button>
                  )
                })}
              </div>
            ) : !isLoading && !errorMessage ? (
              <div className="mt-4">
                <StatusMessage
                  title="Sin atracciones en el mapa"
                  message="Todavía no hay atracciones cargadas para mostrar en la leyenda."
                  variant="empty"
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section
        id="visita"
        className="scroll-mt-32 border-b border-white/10 bg-black px-4 py-10 sm:px-8 sm:py-12 md:scroll-mt-0 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Tráiler oficial"
            title="La Última Puerta"
            description="Consulta accesos, horarios y servicios antes de venir al parque."
          />

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(21rem,0.8fr)]">
            <div className="space-y-5">
              <div className="relative overflow-hidden rounded-3xl border border-red-950/70 bg-neutral-950 shadow-2xl shadow-black/60">
                <video
                  ref={trailerVideoRef}
                  className="aspect-video w-full bg-black object-cover"
                  src={trailerVideo}
                  controls
                  playsInline
                >
                  Tu navegador no puede reproducir este vídeo.
                </video>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <article className="rounded-2xl border border-white/10 bg-neutral-950 p-5 shadow-xl shadow-black/35">
                  <p className="text-base font-black text-white">En coche</p>
                  <p className="mt-2 text-sm leading-6 text-neutral-400">
                    Acceso por A-44, salida 107. Aparcamiento gratuito junto a la entrada principal.
                  </p>
                </article>

                <article className="rounded-2xl border border-white/10 bg-neutral-950 p-5 shadow-xl shadow-black/35">
                  <p className="text-base font-black text-white">En autobús</p>
                  <p className="mt-2 text-sm leading-6 text-neutral-400">
                    Línea 26 desde el centro cada 20 minutos. Parada La Última Puerta.
                  </p>
                </article>

                <article className="rounded-2xl border border-white/10 bg-neutral-950 p-5 shadow-xl shadow-black/35">
                  <p className="text-base font-black text-white">En tren</p>
                  <p className="mt-2 text-sm leading-6 text-neutral-400">
                    Cercanías hasta estación Sur y servicio de lanzadera gratuito al parque.
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
                    <span className="text-neutral-400">Lunes - Jueves</span>
                    <span className="font-bold text-neutral-500">Cerrado</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm">
                    <span className="text-neutral-400">Viernes</span>
                    <span className="font-bold text-green-400">19:00 - 01:00</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm">
                    <span className="text-neutral-400">Sábado</span>
                    <span className="font-bold text-green-400">18:00 - 02:00</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm">
                    <span className="text-neutral-400">Domingo</span>
                    <span className="font-bold text-green-400">18:00 - 00:00</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm">
                    <span className="text-neutral-400">Festivos</span>
                    <span className="font-bold text-green-400">18:00 - 01:00</span>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-xl shadow-black/35">
                <div className="border-b border-white/10 px-5 py-4">
                  <h3 className="text-sm font-extrabold tracking-[0.14em] text-white uppercase">
                    Servicios
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-400">
                    Servicios disponibles durante la visita.
                  </p>
                </div>
                <ul className="divide-y divide-white/10 text-sm text-neutral-300">
                  <li className="px-5 py-4">
                    Aparcamiento gratuito
                  </li>
                  <li className="px-5 py-4">
                    Cafetería y restaurante
                  </li>
                  <li className="px-5 py-4">
                    Tienda de souvenirs
                  </li>
                  <li className="px-5 py-4">
                    Consigna de equipaje
                  </li>
                  <li className="px-5 py-4">
                    Servicio médico
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section
        id="info"
        className="scroll-mt-32 border-b border-white/10 bg-neutral-950 px-4 py-10 sm:px-8 sm:py-12 md:scroll-mt-0 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Información"
            title="Antes de cruzar La Última Puerta"
            description="Resuelve las dudas más frecuentes antes de tu llegada."
          />

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(21rem,0.8fr)]">
            <div className="space-y-5">
              <div>
                <h3 className="mb-4 text-xl font-black tracking-normal text-white">
                  Preguntas frecuentes
                </h3>
                <div className="space-y-3">
                  <FaqItem
                    title="¿Se recomienda reserva previa?"
                    description="Sí. La reserva anticipada ayuda a organizar la visita y evita esperas en fechas de alta demanda."
                  />
                  <FaqItem
                    title="¿Hay restricciones de edad o salud?"
                    description="Algunas atracciones pueden no estar recomendadas para menores o personas sensibles a experiencias intensas."
                  />
                  <FaqItem
                    title="¿Pueden entrar niños pequeños?"
                    description="El acceso familiar es posible, pero ciertas zonas de terror tienen recomendaciones específicas por edad."
                  />
                  <FaqItem
                    title="¿Hay aparcamiento gratuito?"
                    description="Sí. El aparcamiento se encuentra junto al acceso principal del parque."
                  />
                  <FaqItem
                    title="¿Se permite reentrada?"
                    description="La reentrada queda sujeta a validación en taquilla durante la misma jornada de visita."
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-yellow-500/45 bg-yellow-500/10 p-5 shadow-xl shadow-black/35">
                <h3 className="text-lg font-black tracking-normal text-white">
                  Aviso importante
                </h3>
                <p className="mt-3 text-sm leading-7 text-yellow-100/85">
                  El parque contiene experiencias de terror intenso con efectos de luz, sonido y escenas inmersivas. Consulta las recomendaciones de cada atracción antes de acceder.
                </p>
              </div>
            </div>

            <aside className="space-y-5">
              <InfoCard
                title="Contacto"
                rows={[
                  ['Teléfono', '900 123 456'],
                  ['Email', 'info@laultimapuerta.es'],
                  ['Dirección', 'Ctra. Sierra Nevada Km 4, Granada'],
                ]}
              />

              <InfoCard
                title="Datos del parque"
                rows={[
                  ['Fundación', '2019'],
                  ['Aforo máximo', '2.500 personas'],
                  ['Temporada', 'Sept - Dic'],
                  ['Idioma', 'Español / Inglés'],
                ]}
              />
            </aside>
          </div>
        </div>
      </section>

      <footer className="border-t border-red-950/70 bg-black px-4 py-8 sm:px-8 sm:py-10 md:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-red-950/80 bg-[radial-gradient(circle_at_14%_18%,rgba(185,28,28,0.28),rgba(23,23,23,0.96)_34%,rgba(0,0,0,1)_100%)] shadow-[0_0_42px_rgba(127,29,29,0.16)]">
          <div className="grid gap-8 px-5 py-7 sm:px-8 sm:py-8 md:grid-cols-2 lg:px-10 xl:grid-cols-[minmax(0,1.45fr)_repeat(3,minmax(9rem,0.55fr))]">
            <div className="max-w-2xl md:col-span-2 xl:col-span-1">
              <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/20 p-3 shadow-inner shadow-black/30 sm:flex-row sm:items-center sm:gap-5">
                <div className="relative flex h-24 w-24 shrink-0 items-center justify-center sm:h-28 sm:w-28">
                  <div className="absolute inset-1 rounded-full bg-red-700/10 blur-xl" />
                  <img
                    src={logoAmusementPark}
                    alt="Logo de La Última Puerta"
                    className="relative h-20 w-20 object-contain drop-shadow-[0_0_24px_rgba(220,38,38,0.45)] sm:h-24 sm:w-24"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-2xl leading-tight font-black tracking-normal text-white sm:text-3xl xl:whitespace-nowrap xl:text-[2.35rem]">
                    La Última Puerta
                  </p>
                  <p className="mt-2 text-sm font-extrabold tracking-[0.16em] text-red-300 uppercase">
                    ¿Te atreves a cruzarla?
                  </p>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-300">
                    Parque de terror inmersivo en Granada.
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-sm font-bold text-white">
                  Planifica tu visita antes de cruzar la puerta.
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#visita"
                    className="inline-flex min-h-11 items-center justify-center rounded-lg border border-red-500 bg-red-700 px-4 py-2.5 text-xs font-extrabold tracking-wide text-white uppercase shadow-[0_0_24px_rgba(220,38,38,0.25)] transition hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-400"
                  >
                    Planificar visita
                  </a>
                  <a
                    href="#atracciones"
                    className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 text-xs font-extrabold tracking-wide text-neutral-100 uppercase transition hover:border-red-500 hover:text-red-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-400"
                  >
                    Ver atracciones
                  </a>
                </div>
              </div>
            </div>

            <nav className="min-w-0" aria-label="Descubre La Última Puerta">
              <h2 className="text-sm font-extrabold tracking-[0.16em] text-white uppercase">
                Descubre
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-6">
                {footerDiscoverLinks.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="inline-flex rounded-md text-neutral-300 transition hover:text-red-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-400"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="min-w-0">
              <h2 className="text-sm font-extrabold tracking-[0.16em] text-white uppercase">
                Visita
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-neutral-300">
                {footerVisitLinks.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="inline-flex rounded-md text-neutral-300 transition hover:text-red-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-400"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>Entradas en taquilla</li>
                <li>Experiencia mobile mediante QR</li>
              </ul>
            </div>

            <div className="min-w-0">
              <h2 className="text-sm font-extrabold tracking-[0.16em] text-white uppercase">
                Servicios
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-neutral-300">
                <li>Accesibilidad</li>
                <li>Horarios y servicios</li>
                <li>Mapa visual orientativo</li>
                <li>Granada</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-white/10 px-5 py-4 text-xs font-bold tracking-[0.12em] text-neutral-500 uppercase sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
            <p>© 2026 La Última Puerta</p>
            <p>Terror, misterio y adrenalina bajo la noche de Granada.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-extrabold tracking-[0.22em] text-red-500 uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-normal text-white sm:text-4xl">
          {title}
        </h2>
      </div>
      <p className="max-w-xl text-sm leading-6 text-neutral-300">
        {description}
      </p>
    </div>
  )
}

function InfoTag({ children }) {
  return (
    <span className="inline-flex rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs font-extrabold tracking-[0.14em] text-neutral-200 uppercase">
      {children}
    </span>
  )
}

function StatusPill({ status }) {
  const classes =
    status === 'OPEN'
      ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-100'
      : status === 'MAINTENANCE'
        ? 'border-yellow-500/50 bg-yellow-500/15 text-yellow-100'
        : 'border-red-500/50 bg-red-500/15 text-red-100'

  return (
    <span className={`inline-flex h-fit rounded-full border px-3 py-1 text-xs font-bold uppercase ${classes}`}>
      {formatHomeAttractionStatus(status)}
    </span>
  )
}

function formatHomeAttractionStatus(status) {
  if (status === 'MAINTENANCE') {
    return 'En mantenimiento'
  }

  if (status === 'OPEN') {
    return 'Abierta'
  }

  if (status === 'CLOSED') {
    return 'Cerrada'
  }

  return status ?? '-'
}

function FaqItem({ title, description }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-black/45 p-5 shadow-xl shadow-black/35">
      <h4 className="text-base font-black text-white">{title}</h4>
      <p className="mt-2 text-sm leading-6 text-neutral-400">{description}</p>
    </article>
  )
}

function InfoCard({ title, rows }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/45 shadow-xl shadow-black/35">
      <div className="border-b border-white/10 bg-red-950/35 px-5 py-4">
        <h3 className="text-sm font-extrabold tracking-[0.14em] text-white uppercase">
          {title}
        </h3>
      </div>
      <div className="space-y-4 p-5 text-sm">
        {rows.map(([label, value]) => (
          <div key={label}>
            <p className="text-xs font-bold tracking-[0.12em] text-neutral-500 uppercase">
              {label}
            </p>
            <p className="mt-1 font-bold text-white">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function renderLoadingOrError(isLoading, errorMessage) {
  if (isLoading) {
    return (
      <StatusMessage
        title="Cargando datos"
        message="Estamos recuperando información del parque."
        variant="info"
      />
    )
  }

  if (errorMessage) {
    return (
      <StatusMessage
        title="No se han podido cargar los datos"
        message={errorMessage}
        variant="error"
      />
    )
  }

  return null
}

function AttractionCoverflowCarousel({ attractions }) {
  return (
    <HomeCoverflowCarousel
      carouselName="atracciones"
      items={attractions}
      getItemKey={(attraction) => attraction.id}
      renderCard={(attraction, position) => (
        <AttractionCoverflowCard attraction={attraction} position={position} />
      )}
    />
  )
}

function HotelCoverflowCarousel({ hotels }) {
  return (
    <HomeCoverflowCarousel
      carouselName="hoteles"
      items={hotels}
      getItemKey={(hotel) => hotel.id}
      renderCard={(hotel, position) => (
        <HotelCoverflowCard hotel={hotel} position={position} />
      )}
    />
  )
}

function OfferCoverflowCarousel({ offers }) {
  return (
    <HomeCoverflowCarousel
      carouselName="ofertas"
      items={offers}
      getItemKey={(offer) => offer.id}
      renderCard={(offer, position) => (
        <OfferCoverflowCard offer={offer} position={position} />
      )}
    />
  )
}

function HomeCoverflowCarousel({ carouselName, items, getItemKey, renderCard }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [isFocusWithin, setIsFocusWithin] = useState(false)

  useEffect(() => {
    setActiveIndex(0)
  }, [items.length])

  useEffect(() => {
    if (items.length <= 1 || isHovering || isFocusWithin) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % items.length)
    }, 4000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [isFocusWithin, isHovering, items.length])

  const slides = getHomeCoverflowSlides(items, activeIndex)
  const canNavigate = items.length > 1

  const showPreviousItem = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + items.length) % items.length)
  }

  const showNextItem = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % items.length)
  }

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsFocusWithin(false)
    }
  }

  return (
    <div
      className="relative mx-auto h-[34rem] max-w-7xl overflow-hidden py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 sm:h-[38rem] lg:h-[42rem]"
      tabIndex={0}
      aria-label={`Carrusel de ${carouselName}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onFocus={() => setIsFocusWithin(true)}
      onBlur={handleBlur}
    >
      <div className="absolute inset-x-12 top-1/2 h-48 -translate-y-1/2 rounded-full bg-red-950/10 blur-3xl" />
      <div className="absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-black via-black/80 to-transparent sm:w-24" />
      <div className="absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-black via-black/80 to-transparent sm:w-24" />
      {canNavigate && (
        <div className="pointer-events-none absolute inset-x-2 top-1/2 z-40 flex -translate-y-1/2 justify-between sm:inset-x-4">
          <button
            type="button"
            aria-label={`Ver elemento anterior de ${carouselName}`}
            className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-red-950/70 bg-black/75 text-2xl leading-none font-black text-white shadow-[0_0_20px_rgba(0,0,0,0.65)] transition hover:border-red-500 hover:bg-red-950/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 sm:h-11 sm:w-11 sm:text-3xl"
            onClick={showPreviousItem}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label={`Ver elemento siguiente de ${carouselName}`}
            className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-red-950/70 bg-black/75 text-2xl leading-none font-black text-white shadow-[0_0_20px_rgba(0,0,0,0.65)] transition hover:border-red-500 hover:bg-red-950/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 sm:h-11 sm:w-11 sm:text-3xl"
            onClick={showNextItem}
          >
            ›
          </button>
        </div>
      )}
      {slides.map(({ item, position }) => (
        <div key={getItemKey(item)}>
          {renderCard(item, position)}
        </div>
      ))}
    </div>
  )
}

function SpotlightChip({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
      <p className="text-[0.62rem] uppercase tracking-[0.18em] text-neutral-400">{label}</p>
      <p className="mt-1 text-sm font-black text-white">{value}</p>
    </div>
  )
}

function getHomeCoverflowSlides(items, activeIndex) {
  if (items.length === 1) {
    return [{ item: items[0], position: 'current' }]
  }

  if (items.length === 2) {
    return [
      { item: items[activeIndex], position: 'current' },
      { item: items[(activeIndex + 1) % items.length], position: 'next' },
    ]
  }

  return [
    {
      item: items[(activeIndex - 1 + items.length) % items.length],
      position: 'previous',
    },
    {
      item: items[activeIndex],
      position: 'current',
    },
    {
      item: items[(activeIndex + 1) % items.length],
      position: 'next',
    },
  ]
}

function HomeCoverflowCard({ position, imageUrl, imageAlt, children }) {
  const isCurrent = position === 'current'
  const positionClassName = {
    previous:
      'z-10 hidden w-[22rem] -translate-x-[140%] -translate-y-1/2 scale-[0.92] opacity-55 md:block lg:w-[28rem]',
    current:
      'z-30 w-[min(88vw,31rem)] -translate-x-1/2 -translate-y-1/2 scale-100 opacity-100 sm:w-[33rem] lg:w-[37rem]',
    next:
      'z-10 hidden w-[22rem] translate-x-[48%] -translate-y-1/2 scale-[0.92] opacity-55 md:block lg:w-[28rem]',
  }[position]

  const cardClassName = isCurrent
    ? 'group relative flex h-[31rem] flex-col overflow-hidden rounded-[1.75rem] border border-red-950/60 bg-black shadow-[0_0_34px_rgba(127,29,29,0.18)] transition-all duration-500 hover:scale-[1.015] hover:border-red-800/75 hover:shadow-[0_0_48px_rgba(185,28,28,0.28)] sm:h-[35rem] lg:h-[39rem]'
    : 'relative flex h-[26rem] flex-col overflow-hidden rounded-2xl border border-red-950/45 bg-black shadow-[0_0_24px_rgba(0,0,0,0.65)] transition-all duration-700 sm:h-[30rem]'

  return (
    <div className={`absolute top-1/2 left-1/2 transition-all duration-700 ease-in-out ${positionClassName}`}>
      <article className={cardClassName}>
        <img
          src={imageUrl}
          alt={imageAlt}
          className={`h-full w-full object-cover transition duration-700 ${isCurrent ? 'opacity-90 group-hover:scale-[1.03] group-hover:opacity-95' : 'opacity-70 grayscale contrast-90'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />

        {isCurrent ? (
          <GothicFrame />
        ) : (
          <div className="absolute inset-0 bg-black/25" />
        )}

        <div className={`absolute right-0 bottom-0 left-0 ${isCurrent ? 'p-6 sm:p-7' : 'p-5'}`}>
          {children}
        </div>
      </article>
    </div>
  )
}

function AttractionCoverflowCard({ attraction, position }) {
  const isCurrent = position === 'current'

  return (
    <HomeCoverflowCard
      position={position}
      imageUrl={attraction.imageUrl}
      imageAlt={attraction.name}
    >
      <h3 className={`${isCurrent ? 'text-3xl sm:text-4xl' : 'text-2xl'} line-clamp-2 leading-tight font-black tracking-normal ${isCurrent ? 'text-white' : 'text-neutral-100 drop-shadow-[0_0_18px_rgba(0,0,0,0.8)]'}`}>
        {attraction.name}
      </h3>
      {isCurrent && (
        <p className="mt-3 line-clamp-3 max-w-xl text-sm leading-6 text-neutral-300 sm:text-base">
          {attraction.description}
        </p>
      )}
      <div className={`${isCurrent ? 'mt-5' : 'mt-4'} flex flex-wrap items-center gap-2`}>
        <StatusPill status={attraction.status} />
        <InfoTag>{formatAttractionSize(attraction.size)}</InfoTag>
      </div>
    </HomeCoverflowCard>
  )
}

function HotelCoverflowCard({ hotel, position }) {
  const isCurrent = position === 'current'

  return (
    <HomeCoverflowCard
      position={position}
      imageUrl={hotel.imageUrl}
      imageAlt={hotel.name}
    >
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-400">Hotel destacado</p>
      <h3 className={`${isCurrent ? 'mt-4 text-3xl sm:text-4xl' : 'mt-3 text-2xl'} line-clamp-2 leading-tight font-black tracking-normal text-white`}>
        {hotel.name}
      </h3>
      {isCurrent && (
        <p className="mt-3 line-clamp-3 max-w-xl text-sm leading-6 text-neutral-300 sm:text-base">
          {hotel.description}
        </p>
      )}
      <div className={`${isCurrent ? 'mt-5 grid gap-3 sm:grid-cols-2' : 'mt-4 flex flex-wrap gap-2'}`}>
        <SpotlightChip label="Habitaciones libres" value={`${hotel.availableRooms}/${hotel.totalRooms}`} />
        <SpotlightChip label="Plazas libres" value={`${hotel.availablePlaces}/${hotel.totalPlaces}`} />
        {isCurrent && (
          <>
            <SpotlightChip label="Media pensión" value={formatCurrency(hotel.halfBoardPrice)} />
            <SpotlightChip label="Pensión completa" value={formatCurrency(hotel.fullBoardPrice)} />
          </>
        )}
      </div>
    </HomeCoverflowCard>
  )
}

function OfferCoverflowCard({ offer, position }) {
  const isCurrent = position === 'current'

  return (
    <HomeCoverflowCard
      position={position}
      imageUrl={offer.imageUrl}
      imageAlt={offer.title}
    >
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-400">Oferta especial</p>
      <h3 className={`${isCurrent ? 'mt-4 text-3xl sm:text-4xl' : 'mt-3 text-2xl'} line-clamp-2 leading-tight font-black tracking-normal text-white`}>
        {offer.title}
      </h3>
      {isCurrent && (
        <p className="mt-3 line-clamp-3 max-w-xl text-sm leading-6 text-neutral-300 sm:text-base">
          {offer.description}
        </p>
      )}
      <div className={`${isCurrent ? 'mt-5' : 'mt-4'} flex flex-wrap gap-2 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-red-100`}>
        <span className="max-w-full truncate rounded-md border border-white/10 bg-black/35 px-2.5 py-1">
          {offer.hotelName}
        </span>
        <span className="rounded-md border border-red-900/60 bg-red-950/35 px-2.5 py-1">
          {formatBoardType(offer.boardType)}
        </span>
        <span className="rounded-md border border-white/10 bg-black/35 px-2.5 py-1">
          {offer.includedTickets} entradas
        </span>
      </div>
      <p className={`${isCurrent ? 'mt-5 text-3xl sm:text-4xl' : 'mt-4 text-2xl'} font-black tracking-normal text-red-500`}>
        {formatCurrency(offer.totalPrice)}
      </p>
    </HomeCoverflowCard>
  )
}

function GothicFrame() {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-[1.75rem]">
      <div className="absolute inset-2 rounded-[1.45rem] border border-red-950/50 shadow-[inset_0_0_24px_rgba(127,29,29,0.16)]" />
      <div className="absolute inset-5 rounded-[1.1rem] border border-white/5" />
      <div className="absolute top-5 left-1/2 h-16 w-28 -translate-x-1/2 rounded-t-full border-t border-red-900/55" />
      <div className="absolute top-6 left-1/2 h-12 w-px -translate-x-1/2 bg-gradient-to-b from-red-900/55 to-transparent" />
      <div className="absolute top-5 left-5 h-12 w-12 rounded-tl-2xl border-t border-l border-red-900/55" />
      <div className="absolute top-5 right-5 h-12 w-12 rounded-tr-2xl border-t border-r border-red-900/55" />
      <div className="absolute bottom-5 left-5 h-12 w-12 rounded-bl-2xl border-b border-l border-red-950/65" />
      <div className="absolute right-5 bottom-5 h-12 w-12 rounded-br-2xl border-r border-b border-red-950/65" />
      <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-red-950/25 to-transparent" />
      <div className="absolute inset-x-10 top-9 h-px bg-gradient-to-r from-transparent via-red-900/55 to-transparent" />
      <div className="absolute inset-x-10 bottom-9 h-px bg-gradient-to-r from-transparent via-red-950/55 to-transparent" />
    </div>
  )
}

function scrollToSection(sectionId) {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

export default HomePage

