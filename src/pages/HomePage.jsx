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
        label: 'Ofertas listas',
        value: String(catalog.offers.length),
      },
    ],
    [catalog.attractions, catalog.hotels, catalog.offers],
  )

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-neutral-100">
      <section
        id="inicio"
        className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden border-b border-white/10 px-4 py-8 sm:px-6 md:px-8 lg:min-h-[620px] lg:px-10"
      >
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-60"
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.82)_100%)]" />

        <div className="mx-auto grid min-h-[calc(100svh-8rem)] max-w-7xl items-center gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)]">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-black/45 px-3 py-2 text-sm font-semibold text-neutral-100 shadow-xl shadow-black/30 backdrop-blur">
              Parque conectado al backend
            </span>

            <div>
              <p className="text-sm font-extrabold tracking-[0.26em] text-red-500 uppercase">
                Bienvenida
              </p>
              <h1 className="mt-3 text-[clamp(2.7rem,6vw,4.8rem)] leading-[0.92] font-black uppercase text-white">
                Hoteles, atracciones y ventas
                <span className="block text-red-500">listos para el sprint 2</span>
              </h1>
            </div>

            <p className="max-w-2xl text-base leading-7 text-neutral-200/85 sm:text-lg">
              La home ya muestra catalogo real de hoteles, atracciones y ofertas.
              Para este MVP, las compras se registran desde taquilla en el panel interno.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button onClick={() => scrollToSection('hoteles')}>Ver hoteles</Button>
              <Button onClick={() => scrollToSection('visita')} variant="secondary">
                Comprar en taquilla
              </Button>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-neutral-950/70 p-5 shadow-2xl shadow-black/55 backdrop-blur">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-extrabold tracking-[0.14em] text-red-300 uppercase">Estado del parque</p>
                <h2 className="mt-2 text-xl font-black text-white">Datos en directo</h2>
              </div>
              {isLoading ? (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-neutral-300">
                  Cargando
                </span>
              ) : (
                <span className="rounded-full border border-emerald-500/50 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-200">
                  Online
                </span>
              )}
            </div>

            {errorMessage ? (
              <StatusMessage title="Catalogo no disponible" message={errorMessage} variant="error" />
            ) : (
              <div className="space-y-3">
                {liveOverview.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/10 bg-black/20 px-4 py-4"
                  >
                    <div className="text-xs font-bold uppercase tracking-[0.12em] text-neutral-500">
                      {item.label}
                    </div>
                    <div className="mt-2 text-3xl font-black text-white">{item.value}</div>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>
      </section>

      <section id="atracciones" className="border-b border-white/10 bg-black px-4 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Atracciones"
            title="Catalogo disponible"
            description="Listado real de atracciones abiertas, cerradas o en mantenimiento con aforo actualizado."
          />

          {renderLoadingOrError(isLoading, errorMessage) || (
            catalog.attractions.length ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {catalog.attractions.map((attraction) => (
                  <article
                    key={attraction.id}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/85 shadow-2xl shadow-black/45"
                  >
                    <img
                      src={attraction.imageUrl}
                      alt={attraction.name}
                      className="aspect-[16/10] w-full object-cover"
                    />
                    <div className="space-y-3 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-black text-white">{attraction.name}</h3>
                          <p className="mt-2 text-sm leading-6 text-neutral-400">{attraction.description}</p>
                        </div>
                        <StatusPill status={attraction.status} />
                      </div>
                      <div className="grid gap-3 sm:grid-cols-3">
                        <InfoBox label="Tamano" value={formatAttractionSize(attraction.size)} />
                        <InfoBox
                          label="Aforo"
                          value={`${attraction.availableSeats}/${attraction.totalSeats}`}
                        />
                        <InfoBox
                          label="Revision"
                          value={`Cada ${attraction.maintenanceFrequencyDays} dias`}
                        />
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

      <section id="hoteles" className="border-b border-white/10 bg-neutral-950 px-4 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Hoteles"
            title="Estancias disponibles"
            description="Todos los hoteles conectados con disponibilidad real de plazas y precios por regimen."
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

      <section id="ofertas" className="border-b border-white/10 bg-black px-4 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Ofertas"
            title="Packs disponibles"
            description="Ofertas listas para taquilla con hotel, regimen y entradas incluidas."
          />

          {renderLoadingOrError(isLoading, errorMessage) || (
            catalog.offers.length ? (
              <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {catalog.offers.map((offer) => (
                  <article
                    key={offer.id}
                    className="overflow-hidden rounded-2xl border border-red-900/60 bg-neutral-950 shadow-2xl shadow-black/45"
                  >
                    <img
                      src={offer.imageUrl}
                      alt={offer.title}
                      className="aspect-[16/10] w-full object-cover"
                    />
                    <div className="space-y-4 p-5">
                      <div>
                        <h3 className="text-xl font-black text-white">{offer.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-neutral-400">{offer.description}</p>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <InfoBox label="Hotel" value={offer.hotelName} />
                        <InfoBox label="Regimen" value={formatBoardType(offer.boardType)} />
                        <InfoBox label="Entradas" value={String(offer.includedTickets)} />
                        <PriceBox label="Total" value={offer.totalPrice} />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <StatusMessage
                title="Sin ofertas"
                message="Todavia no hay ofertas configuradas."
                variant="empty"
              />
            )
          )}
        </div>
      </section>

      <section id="visita" className="border-b border-white/10 bg-neutral-950 px-4 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="overflow-hidden rounded-3xl border border-red-950/70 bg-black shadow-2xl shadow-black/60">
            <img
              src={parkMapImage}
              alt="Mapa visual del parque"
              className="h-[22rem] w-full object-cover opacity-90 brightness-105 contrast-110"
            />
            <div className="space-y-4 p-6">
              <p className="text-sm font-extrabold tracking-[0.22em] text-red-500 uppercase">
                Compra en taquilla
              </p>
              <h2 className="text-3xl font-black text-white sm:text-4xl">
                El MVP vende desde administracion
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-neutral-300">
                El cliente nos ha pedido priorizar el flujo de ventas en taquilla.
                El panel interno ya permite crear clientes, elegir ofertas o reservas propias y registrar la compra con todos los viajeros.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/dashboard?tab=bookings">
                  <Button>Ir a taquilla</Button>
                </Link>
                <Link to="/dashboard?tab=overview">
                  <Button variant="secondary">Ver dashboard interno</Button>
                </Link>
              </div>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-5 shadow-xl shadow-black/35">
              <h3 className="text-lg font-black text-white">Que cubre ya el MVP</h3>
              <ul className="mt-4 space-y-3 text-sm text-neutral-300">
                <li>Home conectada a hoteles, atracciones y ofertas reales.</li>
                <li>CRUD completo de usuarios, hoteles, atracciones y empleados.</li>
                <li>Venta en taquilla con titular y acompanantes.</li>
                <li>Dashboard de direccion con metricas del ano en curso.</li>
                <li>Generacion de turnos y agenda de mantenimiento.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-5 shadow-xl shadow-black/35">
              <h3 className="text-lg font-black text-white">Operacion interna</h3>
              <p className="mt-3 text-sm leading-7 text-neutral-300">
                Accede al panel para gestionar taquilla, personal, hoteles y atracciones desde una unica interfaz responsive.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section id="info" className="bg-black px-4 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-3xl border border-red-900/70 bg-[radial-gradient(circle_at_center,rgba(185,28,28,0.35),rgba(23,23,23,0.92)_48%,rgba(0,0,0,1)_100%)] px-6 py-12 text-center shadow-2xl shadow-black/60 sm:px-10">
          <p className="text-sm font-extrabold tracking-[0.24em] text-red-400 uppercase">
            Panel listo para demo
          </p>
          <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-black uppercase text-white sm:text-5xl">
            Gestion operativa y ventas en la misma app
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-neutral-200/85 sm:text-lg">
            La presentacion del sprint ya puede enseñar datos reales de backend, CRUDs completos, reservas desde taquilla y metricas de direccion.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/dashboard?tab=overview">
              <Button>Entrar al panel interno</Button>
            </Link>
            <Link to="/dashboard?tab=users">
              <Button variant="secondary">Ver CRUDs</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-extrabold tracking-[0.22em] text-red-500 uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-normal text-white sm:text-4xl">
          {title}
        </h2>
      </div>
      <p className="max-w-2xl text-sm leading-6 text-neutral-300">
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

function renderLoadingOrError(isLoading, errorMessage) {
  if (isLoading) {
    return (
      <StatusMessage
        title="Cargando datos"
        message="Estamos recuperando informacion real del backend para esta seccion."
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
