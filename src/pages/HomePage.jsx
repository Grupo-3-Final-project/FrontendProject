import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/home/publicHomeHeroGate.png'
import parkMapImage from '../assets/home/publicHomeParkMap.png'
import { getAttractions } from '../api/attractionApi'
import { getHotels } from '../api/hotelApi'
import { getOffers } from '../api/offerApi'
import { getApiErrorMessage } from '../api/apiClient'
import Button from '../components/ui/Button'
import StatusMessage from '../components/ui/StatusMessage'
import { formatAttractionSize, formatAttractionStatus, formatBoardType, formatCurrency } from '../features/admin/formatters'

function HomePage() {
  const [catalog, setCatalog] = useState({
    attractions: [],
    hotels: [],
    offers: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadCatalog = async () => {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const [attractions, hotels, offers] = await Promise.all([
          getAttractions(),
          getHotels(),
          getOffers(),
        ])

        if (isMounted) {
          setCatalog({ attractions, hotels, offers })
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
        label: 'Atracciones activas',
        value: String(catalog.attractions.filter((attraction) => attraction.status === 'OPEN').length),
      },
      {
        label: 'Hoteles disponibles',
        value: String(catalog.hotels.filter((hotel) => hotel.availablePlaces > 0).length),
      },
      {
        label: 'Ofertas especiales',
        value: String(catalog.offers.length),
      },
    ],
    [catalog.attractions, catalog.hotels, catalog.offers],
  )

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
              Granada - 18 C
            </span>

            <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.26em] text-red-500 sm:text-sm">
              La Ultima Puerta
            </p>
            <h1 className="mt-2 max-w-[31rem] text-[2.6rem] leading-[0.94] font-black tracking-normal text-white uppercase drop-shadow-[0_14px_32px_rgba(0,0,0,0.9)] sm:text-[3.15rem] lg:text-[3.2rem] xl:text-[3.5rem]">
              Cruza la puerta
              <span className="block text-red-600">si te atreves</span>
            </h1>
            <p className="mt-4 max-w-xl text-base font-semibold text-neutral-100 sm:text-lg">
              Te atreves a cruzarla?
            </p>
            <p className="mt-2 max-w-md text-base leading-7 text-neutral-200/80 sm:max-w-[31rem]">
              El parque de atracciones de terror mas intenso te espera en Granada con experiencias nocturnas, hoteles disponibles y ofertas listas para la visita.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                type="button"
                className="min-h-12 w-full rounded-lg border border-white/25 bg-black/40 px-6 py-3 text-sm font-extrabold tracking-wide text-white uppercase backdrop-blur transition hover:border-red-500 hover:text-red-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 sm:w-auto"
              >
                Ver trailer
              </button>
            </div>
          </div>

          <aside className="w-full max-w-[196px] justify-self-center rounded-xl border border-white/15 bg-neutral-950/45 p-3 shadow-xl shadow-black/35 backdrop-blur-sm lg:-mt-2 lg:justify-self-end lg:opacity-90 xl:max-w-[208px]">
            <div className="text-center">
              <p className="text-[0.9rem] leading-tight font-extrabold text-white">
                Tu visita empieza aqui
              </p>
              <p className="mt-2 text-[0.7rem] leading-5 text-neutral-300/85">
                Consulta atracciones, hoteles y ofertas antes de tu llegada.
              </p>
            </div>

            <div className="mx-auto mt-3 space-y-2">
              {errorMessage ? (
                <StatusMessage title="Catalogo no disponible" message={errorMessage} variant="error" />
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
            title="Elige tu proxima pesadilla"
            description="Descubre algunas de las atracciones principales antes de organizar tu recorrido."
          />

          {renderLoadingOrError(isLoading, errorMessage) || (
            catalog.attractions.length ? (
              <div className="grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {catalog.attractions.map((attraction) => (
                  <article
                    key={attraction.id}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-neutral-950/85 shadow-2xl shadow-black/45 transition duration-300 hover:-translate-y-1 hover:border-red-700/70"
                  >
                    <div className="relative aspect-[5/4] overflow-hidden">
                      <img
                        src={attraction.imageUrl}
                        alt={attraction.name}
                        className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col items-center p-4 text-center sm:p-5">
                      <h3 className="text-xl font-black tracking-normal text-white sm:text-2xl">
                        {attraction.name}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-neutral-400">
                        {attraction.description}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                        <StatusPill status={attraction.status} />
                        <InfoTag>{formatAttractionSize(attraction.size)}</InfoTag>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <StatusMessage
                title="Sin atracciones"
                message="Todavia no hay atracciones cargadas en el catalogo."
                variant="empty"
              />
            )
          )}
        </div>
      </section>

      <section
        id="hoteles"
        className="scroll-mt-32 border-b border-white/10 bg-neutral-950 px-4 py-10 sm:px-8 sm:py-12 md:scroll-mt-0 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Hoteles"
            title="Descansa junto al parque"
            description="Consulta disponibilidad de plazas y precios para preparar tu estancia."
          />

          {renderLoadingOrError(isLoading, errorMessage) || (
            catalog.hotels.length ? (
              <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {catalog.hotels.map((hotel) => (
                  <article
                    key={hotel.id}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-2xl shadow-black/45"
                  >
                    <img
                      src={hotel.imageUrl}
                      alt={hotel.name}
                      className="aspect-[16/10] w-full object-cover"
                    />
                    <div className="space-y-4 p-5">
                      <div>
                        <h3 className="text-xl font-black text-white">{hotel.name}</h3>
                        <p className="mt-2 text-sm leading-6 text-neutral-400">{hotel.description}</p>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <InfoBox label="Habitaciones libres" value={`${hotel.availableRooms}/${hotel.totalRooms}`} />
                        <InfoBox label="Plazas libres" value={`${hotel.availablePlaces}/${hotel.totalPlaces}`} />
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <PriceBox label="Media pension" value={hotel.halfBoardPrice} />
                        <PriceBox label="Pension completa" value={hotel.fullBoardPrice} />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <StatusMessage
                title="Sin hoteles"
                message="Todavia no hay hoteles disponibles en el sistema."
                variant="empty"
              />
            )
          )}
        </div>
      </section>

      <section
        id="ofertas"
        className="scroll-mt-32 border-b border-white/10 bg-neutral-950 px-4 py-10 sm:px-8 sm:py-12 md:scroll-mt-0 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Ofertas especiales"
            title="Cruza la puerta con ventaja"
            description="Promociones disponibles con hotel y entradas para aprovechar mejor la visita."
          />

          {renderLoadingOrError(isLoading, errorMessage) || (
            catalog.offers.length ? (
              <div className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
                {catalog.offers.map((offer) => (
                  <article
                    key={offer.id}
                    className="group relative min-h-40 overflow-hidden rounded-2xl border border-red-900/60 bg-black shadow-2xl shadow-black/45 sm:min-h-44"
                  >
                    <img
                      src={offer.imageUrl}
                      alt={offer.title}
                      className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-red-950/15" />
                    <div className="relative flex min-h-40 flex-col justify-end p-4 sm:min-h-44 sm:p-5">
                      <h3 className="text-xl font-black tracking-normal text-white">
                        {offer.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-neutral-200/85">
                        {offer.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.12em] text-red-200">
                        <span>{offer.hotelName}</span>
                        <span>-</span>
                        <span>{formatBoardType(offer.boardType)}</span>
                        <span>-</span>
                        <span>{offer.includedTickets} entradas</span>
                      </div>
                      <p className="mt-3 text-3xl font-black tracking-normal text-red-500">
                        {formatCurrency(offer.totalPrice)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <StatusMessage
                title="Sin ofertas"
                message="Todavia no hay ofertas disponibles."
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

            <span className="absolute top-[28%] left-[12%] hidden rounded-lg border border-white/20 bg-neutral-950/85 px-4 py-2 text-xs font-bold text-white shadow-xl shadow-black/40 backdrop-blur sm:inline-flex">
              Mansion Maldita
            </span>
            <span className="absolute bottom-[18%] left-[24%] hidden rounded-lg border border-white/20 bg-neutral-950/85 px-4 py-2 text-xs font-bold text-white shadow-xl shadow-black/40 backdrop-blur sm:inline-flex">
              Rio de Sangre
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
                onClick={() => scrollToSection('visita')}
              >
                Planificar visita
              </button>
              <p className="max-w-[15rem] rounded-lg border border-white/5 bg-black/35 px-3 py-2 text-[0.68rem] leading-4 text-neutral-300/75 backdrop-blur">
                Ubica accesos, zonas principales y puntos de referencia del parque.
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
          <SectionHeader
            eyebrow="Planifica tu visita"
            title="Todo listo antes de cruzar la puerta"
            description="Consulta accesos, horarios y servicios antes de venir al parque."
          />

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
                    Una referencia para ubicar accesos, zonas principales y puntos de interes del parque.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <article className="rounded-2xl border border-white/10 bg-neutral-950 p-5 shadow-xl shadow-black/35">
                  <p className="text-base font-black text-white">En coche</p>
                  <p className="mt-2 text-sm leading-6 text-neutral-400">
                    Acceso por A-44, salida 107. Aparcamiento gratuito junto a la entrada principal.
                  </p>
                </article>

                <article className="rounded-2xl border border-white/10 bg-neutral-950 p-5 shadow-xl shadow-black/35">
                  <p className="text-base font-black text-white">En autobus</p>
                  <p className="mt-2 text-sm leading-6 text-neutral-400">
                    Linea 26 desde el centro cada 20 minutos. Parada La Ultima Puerta.
                  </p>
                </article>

                <article className="rounded-2xl border border-white/10 bg-neutral-950 p-5 shadow-xl shadow-black/35">
                  <p className="text-base font-black text-white">En tren</p>
                  <p className="mt-2 text-sm leading-6 text-neutral-400">
                    Cercanias hasta estacion Sur y servicio de lanzadera gratuito al parque.
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
                    <span className="text-neutral-400">Sabado</span>
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
                </div>
                <ul className="divide-y divide-white/10 text-sm text-neutral-300">
                  <li className="flex items-center gap-3 px-5 py-4">
                    <span className="text-green-400">OK</span>
                    Aparcamiento gratuito
                  </li>
                  <li className="flex items-center gap-3 px-5 py-4">
                    <span className="text-green-400">OK</span>
                    Cafeteria y restaurante
                  </li>
                  <li className="flex items-center gap-3 px-5 py-4">
                    <span className="text-green-400">OK</span>
                    Tienda de souvenirs
                  </li>
                  <li className="flex items-center gap-3 px-5 py-4">
                    <span className="text-green-400">OK</span>
                    Consigna de equipaje
                  </li>
                  <li className="flex items-center gap-3 px-5 py-4">
                    <span className="text-green-400">OK</span>
                    Servicio medico
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
            eyebrow="Informacion"
            title="Antes de cruzar La Ultima Puerta"
            description="Resuelve las dudas mas frecuentes antes de tu llegada."
          />

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(21rem,0.8fr)]">
            <div className="space-y-5">
              <div>
                <h3 className="mb-4 text-xl font-black tracking-normal text-white">
                  Preguntas frecuentes
                </h3>
                <div className="space-y-3">
                  <FaqItem
                    title="Se recomienda reserva previa?"
                    description="Si. La reserva anticipada ayuda a organizar la visita y evita esperas en fechas de alta demanda."
                  />
                  <FaqItem
                    title="Hay restricciones de edad o salud?"
                    description="Algunas atracciones pueden no estar recomendadas para menores o personas sensibles a experiencias intensas."
                  />
                  <FaqItem
                    title="Pueden entrar ninos pequenos?"
                    description="El acceso familiar es posible, pero ciertas zonas de terror tienen recomendaciones especificas por edad."
                  />
                  <FaqItem
                    title="Hay aparcamiento gratuito?"
                    description="Si. El aparcamiento se encuentra junto al acceso principal del parque."
                  />
                  <FaqItem
                    title="Se permite reentrada?"
                    description="La reentrada queda sujeta a validacion en taquilla durante la misma jornada de visita."
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-yellow-500/45 bg-yellow-500/10 p-5 shadow-xl shadow-black/35">
                <h3 className="text-lg font-black tracking-normal text-white">
                  Aviso importante
                </h3>
                <p className="mt-3 text-sm leading-7 text-yellow-100/85">
                  El parque contiene experiencias de terror intenso con efectos de luz, sonido y escenas inmersivas. Consulta las recomendaciones de cada atraccion antes de acceder.
                </p>
              </div>
            </div>

            <aside className="space-y-5">
              <InfoCard
                title="Contacto"
                rows={[
                  ['Telefono', '900 123 456'],
                  ['Email', 'info@laultimapuerta.es'],
                  ['Direccion', 'Ctra. Sierra Nevada Km 4, Granada'],
                ]}
              />

              <InfoCard
                title="Datos del parque"
                rows={[
                  ['Fundacion', '2019'],
                  ['Aforo maximo', '2.500 personas'],
                  ['Temporada', 'Sept - Dic'],
                  ['Idioma', 'Espanol / Ingles'],
                ]}
              />
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-black px-4 py-10 sm:px-8 sm:py-12 md:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-red-900/70 bg-[radial-gradient(circle_at_center,rgba(185,28,28,0.35),rgba(23,23,23,0.92)_48%,rgba(0,0,0,1)_100%)] px-5 py-12 text-center shadow-2xl shadow-black/60 sm:px-10 sm:py-14">
          <p className="text-sm font-extrabold tracking-[0.24em] text-red-400 uppercase">
            La Ultima Puerta
          </p>
          <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-black tracking-normal text-white uppercase drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)] sm:text-5xl lg:text-6xl">
            Listo para cruzar La Ultima Puerta?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-neutral-200/85 sm:text-lg">
            La experiencia comienza antes de entrar. Atrevete a cruzarla.
          </p>
        </div>
      </section>
    </main>
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

function InfoBox({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
      <div className="text-xs font-bold uppercase tracking-[0.12em] text-neutral-500">{label}</div>
      <div className="mt-2 text-sm font-bold text-white">{value}</div>
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

function PriceBox({ label, value }) {
  return <InfoBox label={label} value={formatCurrency(value)} />
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
      {formatAttractionStatus(status)}
    </span>
  )
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
        message="Estamos recuperando informacion del parque."
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

function scrollToSection(sectionId) {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

export default HomePage

