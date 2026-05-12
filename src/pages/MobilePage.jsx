import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  HiOutlineArrowPath,
  HiOutlineCloud,
  HiOutlineExclamationTriangle,
  HiOutlineSparkles,
} from 'react-icons/hi2'
import { useParams } from 'react-router-dom'
import { getApiErrorMessage } from '../api/apiClient'
import { getMobileAccess } from '../api/ticketApi'
import { getGranadaWeather } from '../api/weatherApi'
import MobileMap from '../components/mobileExperience/MobileMap'
import PrimaryCTA from '../components/mobileExperience/PrimaryCTA'
import RouteCard from '../components/mobileExperience/RouteCard'
import StatusChip from '../components/mobileExperience/StatusChip'
import StatusMessage from '../components/ui/StatusMessage'
import { mapControls } from '../data/MapData'
import {
  buildMobilePlan,
  clearVisitedAttractions,
  readVisitedAttractions,
  writeVisitedAttractions,
} from '../features/mobile/mobilePlan'
import {
  formatAttractionStatus,
  formatDate,
  formatDateTime,
} from '../features/admin/formatters'

function MobilePage() {
  const { mobileAccessToken } = useParams()
  const [mobileAccess, setMobileAccess] = useState(null)
  const [weather, setWeather] = useState(null)
  const [weatherError, setWeatherError] = useState('')
  const [plan, setPlan] = useState(() => buildMobilePlan([], []))
  const [pageError, setPageError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshExperience = useCallback(async (mode = 'load') => {
    if (!mobileAccessToken) {
      setIsLoading(false)
      return
    }

    if (mode === 'load') {
      setIsLoading(true)
    } else {
      setIsRefreshing(true)
    }

    try {
      const [mobileAccessResult, weatherResult] = await Promise.allSettled([
        getMobileAccess(mobileAccessToken),
        getGranadaWeather(),
      ])

      if (mobileAccessResult.status === 'rejected') {
        throw mobileAccessResult.reason
      }

      const visitedAttractionIds = readVisitedAttractions(mobileAccessToken)
      const mobileAccessResponse = mobileAccessResult.value

      setMobileAccess(mobileAccessResponse)
      setPlan(buildMobilePlan(mobileAccessResponse.attractions, visitedAttractionIds))

      if (weatherResult.status === 'fulfilled') {
        setWeather(weatherResult.value)
        setWeatherError('')
      } else {
        setWeather(null)
        setWeatherError(getApiErrorMessage(weatherResult.reason, 'No se ha podido consultar el tiempo de Granada.'))
      }

      setPageError('')
    } catch (error) {
      setWeather(null)
      setWeatherError('')
      setPageError(getApiErrorMessage(error, 'No se ha podido cargar la experiencia movil.'))
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [mobileAccessToken])

  useEffect(() => {
    void refreshExperience()
  }, [refreshExperience])

  const handleMarkRecommendedVisited = useCallback(() => {
    if (!mobileAccessToken || !mobileAccess?.attractions || !plan.recommendedAttraction) {
      return
    }

    const nextVisitedAttractionIds = [
      ...new Set([
        ...readVisitedAttractions(mobileAccessToken),
        plan.recommendedAttraction.id,
      ]),
    ]

    writeVisitedAttractions(mobileAccessToken, nextVisitedAttractionIds)
    setPlan(buildMobilePlan(mobileAccess.attractions, nextVisitedAttractionIds))
  }, [mobileAccess, mobileAccessToken, plan.recommendedAttraction])

  const handleResetVisited = useCallback(() => {
    if (!mobileAccessToken || !mobileAccess?.attractions) {
      return
    }

    clearVisitedAttractions(mobileAccessToken)
    setPlan(buildMobilePlan(mobileAccess.attractions, []))
  }, [mobileAccess, mobileAccessToken])

  const statusChips = useMemo(() => {
    const chips = []

    if (weather) {
      chips.push({
        id: 'weather',
        label: `${Math.round(weather.temperatureCelsius)} C ${weather.condition}`,
        icon: HiOutlineCloud,
        variant: 'default',
      })
    }

    chips.push({
      id: 'pending',
      label: `Pendientes: ${plan.pendingCount}`,
      icon: HiOutlineSparkles,
      variant: 'default',
    })

    if (plan.blockedAttractions.length > 0) {
      chips.push({
        id: 'blocked',
        label: `No operativas: ${plan.blockedAttractions.length}`,
        icon: HiOutlineExclamationTriangle,
        variant: 'danger',
      })
    }

    return chips
  }, [plan.blockedAttractions.length, plan.pendingCount, weather])

  const routeTitle = plan.recommendedAttraction
    ? plan.recommendedAttraction.name
    : plan.pendingCount > 0
      ? 'Sin recomendacion disponible'
      : 'Jornada completada'

  const routeSubtitle = plan.recommendedAttraction
    ? `${plan.recommendedAttraction.waitMinutes} min de espera - ${plan.pendingCount} atracciones pendientes`
    : plan.pendingCount > 0
      ? 'Ahora mismo solo quedan atracciones no operativas.'
      : 'Ya no quedan atracciones pendientes en este dispositivo.'

  return (
    <main className="flex flex-1 bg-black px-2.5 py-3">
      <section className="flex w-full flex-col gap-2.5">
        {pageError ? (
          <StatusMessage
            title="No se ha podido abrir la experiencia movil"
            message={pageError}
            variant="error"
          />
        ) : null}

        {!pageError && weatherError ? (
          <StatusMessage
            title="Tiempo de Granada no disponible"
            message={weatherError}
            variant="warning"
          />
        ) : null}

        {!mobileAccessToken && !pageError ? (
          <StatusMessage
            title="Acceso movil pendiente"
            message="Escanea el QR de acceso movil de tu entrada para abrir esta experiencia."
            variant="empty"
          />
        ) : null}

        {isLoading ? (
          <StatusMessage
            title="Cargando experiencia movil"
            message="Estamos preparando tu acceso, el tiempo de Granada y las atracciones pendientes."
            variant="info"
          />
        ) : null}

        {!isLoading && !pageError && mobileAccess ? (
          <>
            <div className="flex gap-2 overflow-x-auto pb-0.5">
              {statusChips.map((chip) => (
                <StatusChip key={chip.id} {...chip} />
              ))}
            </div>

            <MobileMap markers={plan.markers} controls={mapControls} />

            <RouteCard
              title={routeTitle}
              subtitle={routeSubtitle}
              actionLabel="Marcar visitada"
              disabled={!plan.recommendedAttraction}
              onAction={handleMarkRecommendedVisited}
            />

            <section className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3.5 shadow-[0_0_26px_rgba(0,0,0,0.3)]">
              <div className="grid gap-3 min-[380px]:grid-cols-2">
                <div>
                  <p className="text-[0.68rem] font-black tracking-[0.08em] text-white uppercase">
                    Titular
                  </p>
                  <p className="mt-1 text-sm font-medium text-neutral-200">
                    {mobileAccess.holderFullName}
                  </p>
                </div>
                <div>
                  <p className="text-[0.68rem] font-black tracking-[0.08em] text-white uppercase">
                    Fecha de visita
                  </p>
                  <p className="mt-1 text-sm font-medium text-neutral-200">
                    {formatDate(mobileAccess.visitDate)}
                  </p>
                </div>
                <div>
                  <p className="text-[0.68rem] font-black tracking-[0.08em] text-white uppercase">
                    Estado del ticket
                  </p>
                  <p className="mt-1 text-sm font-medium text-neutral-200">
                    {mobileAccess.ticketStatus === 'VALID' ? 'Valido' : mobileAccess.ticketStatus}
                  </p>
                </div>
                <div>
                  <p className="text-[0.68rem] font-black tracking-[0.08em] text-white uppercase">
                    Tiempo en Granada
                  </p>
                  <p className="mt-1 text-sm font-medium text-neutral-200">
                    {weather
                      ? `${Math.round(weather.temperatureCelsius)} C - ${weather.condition}`
                      : '-'}
                  </p>
                  <p className="mt-1 text-[0.68rem] text-neutral-500">
                    {weather ? `Actualizado ${formatDateTime(weather.updatedAt)}` : 'Sin datos'}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3.5 shadow-[0_0_26px_rgba(0,0,0,0.3)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-[0.8rem] leading-tight font-black tracking-[0.08em] text-white uppercase">
                    Atracciones pendientes
                  </h2>
                  <p className="mt-1 text-[0.72rem] leading-snug text-neutral-300">
                    Se muestran ordenadas por menor tiempo de espera simulado.
                  </p>
                </div>
                {plan.pendingCount === 0 ? (
                  <button
                    type="button"
                    className="text-[0.68rem] font-black tracking-[0.04em] text-red-300 uppercase transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                    onClick={handleResetVisited}
                  >
                    Reiniciar
                  </button>
                ) : null}
              </div>

              <div className="mt-3 space-y-2.5">
                {plan.availableAttractions.length > 0 ? (
                  plan.availableAttractions.map((attraction) => (
                    <article
                      key={attraction.id}
                      className={`rounded-xl border px-3 py-3 ${
                        plan.recommendedAttraction?.id === attraction.id
                          ? 'border-red-700/55 bg-red-950/20'
                          : 'border-white/10 bg-black/25'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-black text-white">
                            {attraction.name}
                          </h3>
                          <p className="mt-1 text-[0.72rem] leading-snug text-neutral-400">
                            {attraction.description}
                          </p>
                        </div>
                        <div className="shrink-0 rounded-lg border border-red-600/45 bg-red-950/40 px-2.5 py-1 text-[0.68rem] font-black text-red-300">
                          {attraction.waitMinutes} min
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="rounded-xl border border-white/10 bg-black/25 px-3 py-3 text-[0.74rem] leading-snug text-neutral-400">
                    No hay atracciones operativas pendientes en este momento.
                  </p>
                )}
              </div>
            </section>

            {plan.blockedAttractions.length > 0 ? (
              <section className="rounded-2xl border border-red-700/35 bg-neutral-950 px-4 py-3.5 shadow-[0_0_26px_rgba(127,29,29,0.12)]">
                <h2 className="text-[0.8rem] leading-tight font-black tracking-[0.08em] text-white uppercase">
                  Atracciones no operativas
                </h2>
                <div className="mt-3 space-y-2.5">
                  {plan.blockedAttractions.map((attraction) => (
                    <article key={attraction.id} className="rounded-xl border border-white/10 bg-black/25 px-3 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-black text-white">
                            {attraction.name}
                          </h3>
                          <p className="mt-1 text-[0.72rem] leading-snug text-neutral-400">
                            {attraction.description}
                          </p>
                        </div>
                        <div className="shrink-0 rounded-lg border border-white/10 bg-neutral-900/80 px-2.5 py-1 text-[0.68rem] font-black text-neutral-300">
                          {formatAttractionStatus(attraction.status)}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            <PrimaryCTA
              icon={HiOutlineArrowPath}
              label={isRefreshing ? 'Actualizando plan' : 'Actualizar plan'}
              disabled={isRefreshing}
              onClick={() => void refreshExperience('refresh')}
            />
          </>
        ) : null}
      </section>
    </main>
  )
}

export default MobilePage
