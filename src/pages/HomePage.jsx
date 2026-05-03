import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPinned, QrCode, Ticket, Waves, Zap } from 'lucide-react'
import heroImage from '../assets/home/publicHomeHeroGate.png'
import parkMapImage from '../assets/home/publicHomeParkMap.png'
import fallbackAttractionOne from '../assets/home/attractionHauntedMansion.png'
import fallbackAttractionTwo from '../assets/home/attractionBloodRiver.png'
import fallbackAttractionThree from '../assets/home/attractionTerrorTower.png'
import fallbackAttractionFour from '../assets/home/attractionDarkLabyrinth.png'
import fallbackOfferOne from '../assets/home/offerNightWithoutEscape.png'
import fallbackOfferTwo from '../assets/home/offerFamilyPack.png'
import fallbackOfferThree from '../assets/home/offerHotelTicket.png'
import { getAttractions } from '../api/attractionApi'
import { getHotels } from '../api/hotelApi'
import { getOffers } from '../api/offerApi'
import { Badge, StatusMessage } from '../components/ui'
import { formatCurrency } from '../features/bookings/bookingUtils'

const fallbackAttractionImages = [
  fallbackAttractionOne,
  fallbackAttractionTwo,
  fallbackAttractionThree,
  fallbackAttractionFour,
]

const fallbackOfferImages = [fallbackOfferOne, fallbackOfferTwo, fallbackOfferThree]

const fallbackAttractions = [
  {
    id: 'fallback-1',
    name: 'Mansion Maldita',
    description: 'Pasillos cerrados, puertas que susurran y una salida que no siempre aparece.',
    status: 'OPEN',
    imageUrl: fallbackAttractionOne,
  },
  {
    id: 'fallback-2',
    name: 'Rio de Sangre',
    description: 'Agua oscura, giros rapidos y una noche demasiado larga para mirar atras.',
    status: 'OPEN',
    imageUrl: fallbackAttractionTwo,
  },
  {
    id: 'fallback-3',
    name: 'Torre del Terror',
    description: 'Caida vertical, metal antiguo y una vista que nadie olvida.',
    status: 'OPEN',
    imageUrl: fallbackAttractionThree,
  },
  {
    id: 'fallback-4',
    name: 'Laberinto Oscuro',
    description: 'Paredes vivas, sombras moviles y un recorrido que cambia contigo dentro.',
    status: 'OPEN',
    imageUrl: fallbackAttractionFour,
  },
]

const fallbackOffers = [
  {
    id: 'offer-fallback-1',
    title: 'Noche sin escape',
    description: 'Promo comercial destacada para una visita nocturna sin salida facil.',
    totalPrice: 189,
    boardType: 'FULL_BOARD',
    includedTickets: 2,
    hotelName: 'Hotel del parque',
    imageUrl: fallbackOfferOne,
  },
  {
    id: 'offer-fallback-2',
    title: 'Pack familiar',
    description: 'Cuatro entradas y acceso directo a la experiencia principal.',
    totalPrice: 249,
    boardType: 'FULL_BOARD',
    includedTickets: 4,
    hotelName: 'Hotel del parque',
    imageUrl: fallbackOfferTwo,
  },
  {
    id: 'offer-fallback-3',
    title: 'Hotel + entrada',
    description: 'Alojamiento junto al parque con entrada incluida.',
    totalPrice: 129,
    boardType: 'HALF_BOARD',
    includedTickets: 2,
    hotelName: 'Hotel del parque',
    imageUrl: fallbackOfferThree,
  },
]

const getBoardTypeLabel = (boardType) => {
  if (boardType === 'FULL_BOARD') {
    return 'pension completa'
  }

  if (boardType === 'HALF_BOARD') {
    return 'media pension'
  }

  return boardType || 'sin plan'
}

function HomePage() {
  const [attractions, setAttractions] = useState([])
  const [offers, setOffers] = useState([])
  const [hotels, setHotels] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const loadPublicData = async () => {
      setIsLoading(true)
      setLoadError(null)

      try {
        const [attractionsResponse, offersResponse, hotelsResponse] = await Promise.all([
          getAttractions(),
          getOffers(),
          getHotels(),
        ])

        if (!isMounted) {
          return
        }

        setAttractions(attractionsResponse)
        setOffers(offersResponse)
        setHotels(hotelsResponse)
      } catch {
        if (!isMounted) {
          return
        }

        setLoadError('No se han podido cargar las atracciones y ofertas publicas.')
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadPublicData()

    return () => {
      isMounted = false
    }
  }, [])

  const featuredAttractions = useMemo(() => {
    if (attractions.length === 0) {
      return fallbackAttractions
    }

    return attractions.slice(0, 4).map((attraction, index) => ({
      ...attraction,
      imageUrl: attraction.imageUrl || fallbackAttractionImages[index],
    }))
  }, [attractions])

  const featuredOffers = useMemo(() => {
    if (offers.length === 0) {
      return fallbackOffers
    }

    return offers.slice(0, 3).map((offer, index) => ({
      ...offer,
      imageUrl: offer.imageUrl || fallbackOfferImages[index],
    }))
  }, [offers])

  const hotelPack = useMemo(() => hotels[0] || null, [hotels])
  const familyPack = useMemo(
    () => offers.find((offer) => offer.includedTickets >= 4) || offers[0] || null,
    [offers],
  )

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-neutral-100">
      <section
        id="inicio"
        className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_58%_42%,#220606_0%,#050505_48%,#000_100%)] px-4 py-7 sm:px-6 md:px-8 lg:min-h-[620px] lg:px-6 lg:py-4 xl:px-8"
      >
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center brightness-95 contrast-110 lg:object-contain"
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.6)_28%,rgba(0,0,0,0.08)_50%,rgba(0,0,0,0.32)_78%,rgba(0,0,0,0.56)_100%),linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0)_55%,rgba(0,0,0,0.65)_100%)]" />

        <div className="mx-auto grid min-h-[calc(100svh-6.5rem)] w-full max-w-[1180px] items-center gap-7 py-3 sm:py-5 lg:min-h-[590px] lg:grid-cols-[minmax(0,1fr)_280px] lg:py-0">
          <div className="max-w-[42rem]">
            <Badge variant="danger">Granada · Parque de terror</Badge>
            <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.28em] text-red-500 sm:text-sm">
              La Ultima Puerta
            </p>
            <h1 className="mt-3 max-w-[36rem] text-4xl leading-[1] font-black tracking-normal text-white uppercase sm:text-5xl lg:text-[3rem] xl:text-[3.35rem]">
              Cruza la puerta si
              <span className="block text-red-600">te atreves</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-neutral-200 sm:text-lg">
              Home publica orientada a venta para la marca del parque. Compra desde taquilla,
              revisa atracciones reales y abre la experiencia mobile por QR.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/booking"
                className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-red-500 bg-red-700 px-6 py-3 text-sm font-extrabold tracking-wide text-white uppercase transition hover:bg-red-600"
              >
                <Ticket className="h-4 w-4" />
                Comprar entradas
              </Link>
              <a
                href="#atracciones"
                className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/25 bg-black/40 px-6 py-3 text-sm font-extrabold tracking-wide text-white uppercase backdrop-blur transition hover:border-red-500 hover:text-red-200"
              >
                <ArrowRight className="h-4 w-4" />
                Ver atracciones
              </a>
            </div>
          </div>

          <aside className="w-full max-w-[280px] justify-self-center rounded-2xl border border-white/20 bg-neutral-950/60 p-4 backdrop-blur-sm lg:justify-self-end">
            <div className="text-center">
              <p className="text-base font-extrabold text-white">Acceso rapido a mobile</p>
              <p className="mt-2 text-sm leading-5 text-neutral-300">
                El visitante no compra aqui. Escanea y abre el recorrido del parque.
              </p>
            </div>

            <div className="mx-auto mt-5 grid h-24 w-24 grid-cols-5 gap-1 rounded-xl border border-white/20 bg-white p-3">
              {Array.from({ length: 25 }).map((_, index) => (
                <span
                  key={`qr-${index}`}
                  className={`rounded-sm ${
                    [0, 1, 3, 4, 5, 8, 10, 12, 14, 15, 17, 19, 20, 21, 23, 24].includes(index)
                      ? 'bg-black'
                      : index === 13
                        ? 'bg-red-700'
                        : 'bg-white'
                  }`}
                />
              ))}
            </div>

            <Link
              to="/mobile"
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:border-red-500/70 hover:bg-red-950/40"
            >
              <QrCode className="h-4 w-4" />
              Abrir mobile
            </Link>
            <p className="mt-3 rounded-lg border border-red-900/70 bg-red-950/30 px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.14em] text-red-200">
              QR visual · Sin pago real
            </p>
          </aside>
        </div>
      </section>

      {loadError ? (
        <section className="px-4 py-6 sm:px-8 md:px-10 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <StatusMessage
              title="Datos publicos no disponibles"
              message={loadError}
              variant="warning"
            />
          </div>
        </section>
      ) : null}

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
                Lo peor del parque, visible antes de cruzar la puerta
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-neutral-300">
              Usamos atracciones reales del backend para que la home comercial no dependa de
              contenido inventado ni de metricas internas.
            </p>
          </div>

          <div className="grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {featuredAttractions.map((attraction) => (
              <article
                key={attraction.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-neutral-950/85 shadow-2xl shadow-black/45 transition duration-300 hover:-translate-y-1 hover:border-red-700/70"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={attraction.imageUrl}
                    alt={attraction.name}
                    className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-black tracking-normal text-white sm:text-2xl">
                      {attraction.name}
                    </h3>
                    <Badge variant={attraction.status === 'OPEN' ? 'success' : 'warning'}>
                      {attraction.status}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-neutral-300">{attraction.description}</p>
                  {attraction.totalSeats ? (
                    <div className="mt-auto pt-4 text-xs uppercase tracking-[0.12em] text-neutral-400">
                      {attraction.availableSeats}/{attraction.totalSeats} plazas visibles
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
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
                Ofertas visibles
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-normal text-white sm:text-4xl">
                Promociones reales conectadas al backend
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-neutral-300">
              La home vende, pero no mezcla metricas internas. Estas tarjetas solo muestran la
              parte comercial del sistema.
            </p>
          </div>

          <div className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredOffers.map((offer) => (
              <article
                key={offer.id}
                className="group relative min-h-60 overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl shadow-black/45"
              >
                <img
                  src={offer.imageUrl}
                  alt={offer.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-500 group-hover:scale-105 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/20" />
                <div className="relative flex min-h-60 flex-col justify-end p-5">
                  <Badge variant="danger">{offer.includedTickets} entradas</Badge>
                  <h3 className="mt-4 text-xl font-black tracking-normal text-white">{offer.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-200">{offer.description}</p>
                  <div className="mt-4 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm text-neutral-300">{offer.hotelName}</p>
                      <p className="text-xs uppercase tracking-[0.12em] text-neutral-500">
                        {getBoardTypeLabel(offer.boardType)}
                      </p>
                    </div>
                    <strong className="text-2xl font-black text-red-400">
                      {formatCurrency(offer.totalPrice)}
                    </strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="packs"
        className="border-b border-white/10 bg-black px-4 py-10 sm:px-8 sm:py-12 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-7">
            <p className="text-sm font-extrabold tracking-[0.22em] text-red-500 uppercase">
              Packs comerciales
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-normal text-white sm:text-4xl">
              Familiar, hotel y acceso adaptado
            </h2>
          </div>

          <div className="grid items-stretch gap-4 xl:grid-cols-[1.05fr_1.05fr_0.9fr]">
            <article className="rounded-2xl border border-red-900/60 bg-[radial-gradient(circle_at_top,rgba(185,28,28,0.2),rgba(10,10,10,0.96)_52%,rgba(0,0,0,1)_100%)] p-5 shadow-2xl shadow-black/45">
              <div className="flex items-center gap-3">
                <Waves className="h-5 w-5 text-red-300" />
                <strong className="text-white">Pack familiar</strong>
              </div>
              <p className="mt-4 text-sm leading-6 text-neutral-300">
                {familyPack
                  ? `${familyPack.title} con ${familyPack.includedTickets} entradas y ${getBoardTypeLabel(familyPack.boardType)}.`
                  : 'Pack comercial recomendado para grupos familiares.'}
              </p>
              <p className="mt-5 text-3xl font-black text-red-400">
                {familyPack ? formatCurrency(familyPack.totalPrice) : 'Desde 249 EUR'}
              </p>
            </article>

            <article className="rounded-2xl border border-white/15 bg-neutral-950/85 p-5 shadow-2xl shadow-black/45">
              <div className="flex items-center gap-3">
                <MapPinned className="h-5 w-5 text-red-300" />
                <strong className="text-white">Hotel + entrada</strong>
              </div>
              <p className="mt-4 text-sm leading-6 text-neutral-300">
                {hotelPack
                  ? `${hotelPack.name} con plan desde ${formatCurrency(hotelPack.halfBoardPrice)} o ${formatCurrency(hotelPack.fullBoardPrice)}.`
                  : 'Alojamiento junto al parque para entrar sin salir del ambiente.'}
              </p>
              <p className="mt-5 text-3xl font-black text-red-400">
                {hotelPack ? formatCurrency(hotelPack.halfBoardPrice) : 'Desde 129 EUR'}
              </p>
            </article>

            <article className="rounded-2xl border border-yellow-500/70 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.18),rgba(23,23,23,0.9)_52%,rgba(0,0,0,0.98)_100%)] p-5 shadow-2xl shadow-black/45">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-yellow-300" />
                <strong className="text-white">Descuento discapacidad</strong>
              </div>
              <p className="mt-4 text-sm leading-6 text-neutral-300">
                Contenido comercial visible para atencion en taquilla y comunicacion publica.
              </p>
              <p className="mt-5 text-3xl font-black text-yellow-400">-20%</p>
            </article>
          </div>
        </div>
      </section>

      <section
        id="mobile"
        className="border-b border-white/10 bg-neutral-950 px-4 py-10 sm:px-8 sm:py-12 md:px-10 lg:px-12"
      >
        <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div className="relative overflow-hidden rounded-3xl border border-red-950/70 bg-neutral-950 shadow-2xl shadow-black/60">
            <img
              src={parkMapImage}
              alt="Mapa visual del parque"
              className="h-[20rem] w-full object-cover opacity-90 brightness-90 contrast-125 sm:h-[26rem] lg:h-[30rem]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/5 to-black/35" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="absolute right-4 bottom-4 left-4 sm:right-5 sm:bottom-5 sm:left-auto">
              <Link
                to="/mobile"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-red-500 bg-red-700 px-6 py-3 text-sm font-extrabold tracking-wide text-white uppercase shadow-[0_0_32px_rgba(220,38,38,0.35)] transition hover:bg-red-600 sm:w-auto"
              >
                <QrCode className="h-4 w-4" />
                Acceso mobile
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-2xl shadow-black/45">
            <p className="text-sm font-extrabold tracking-[0.22em] text-red-500 uppercase">
              QR y visita
            </p>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
              Prepara la ruta antes de entrar
            </h2>
            <p className="mt-4 text-sm leading-7 text-neutral-300">
              La experiencia mobile esta pensada para el visitante dentro del parque. No hay login
              ni pago real: solo mapa, ruta, progreso y detalle de atracciones.
            </p>

            <div className="mt-6 grid gap-3">
              <div className="rounded-xl border border-white/10 bg-black/25 px-4 py-4">
                <strong className="text-sm text-white">Mapa del parque</strong>
                <p className="mt-2 text-sm text-neutral-400">Acceso rapido al recorrido principal.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/25 px-4 py-4">
                <strong className="text-sm text-white">Ruta optimizada</strong>
                <p className="mt-2 text-sm text-neutral-400">Plan simple para no perder tiempo entre zonas.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/25 px-4 py-4">
                <strong className="text-sm text-white">Progreso guardado</strong>
                <p className="mt-2 text-sm text-neutral-400">Las atracciones completadas se guardan en local.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="reserva"
        className="bg-black px-4 py-10 sm:px-8 sm:py-12 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-red-900/70 bg-[radial-gradient(circle_at_center,rgba(185,28,28,0.35),rgba(23,23,23,0.92)_48%,rgba(0,0,0,1)_100%)] px-5 py-12 text-center shadow-2xl shadow-black/60 sm:px-10 sm:py-14">
          <p className="text-sm font-extrabold tracking-[0.24em] text-red-400 uppercase">
            La Ultima Puerta
          </p>
          <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-black tracking-normal text-white uppercase sm:text-5xl lg:text-6xl">
            Listo para cruzarla
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-neutral-200/85 sm:text-lg">
            Compra desde taquilla, abre el acceso mobile y entra al parque con una experiencia
            conectada de punta a punta.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/booking"
              className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-red-500 bg-red-700 px-8 py-3 text-sm font-extrabold tracking-wide text-white uppercase shadow-[0_0_36px_rgba(220,38,38,0.42)] transition hover:bg-red-600"
            >
              <Ticket className="h-4 w-4" />
              Comprar entradas
            </Link>
            <Link
              to="/mobile"
              className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-8 py-3 text-sm font-extrabold tracking-wide text-white uppercase transition hover:border-red-500/70 hover:bg-red-950/40"
            >
              <QrCode className="h-4 w-4" />
              Abrir mobile
            </Link>
          </div>
        </div>
      </section>

      {isLoading ? (
        <section className="px-4 pb-8 sm:px-8 md:px-10 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <StatusMessage
              title="Cargando contenido comercial"
              message="Se estan consultando atracciones, hoteles y ofertas publicas."
              variant="info"
            />
          </div>
        </section>
      ) : null}
    </main>
  )
}

export default HomePage
