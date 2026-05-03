import { Link } from 'react-router-dom'
import { RefreshCcw, Route } from 'lucide-react'
import useAttractionsCatalog from '../../hooks/useAttractionsCatalog'
import useMobileProgress from '../../hooks/useMobileProgress'
import { Badge, Button, StatusMessage } from '../../components/ui'
import { buildSuggestedRoute, getProgressMetrics, getStatusLabel } from './mobileUtils'

function MobileRoutePage() {
  const { attractions, isLoading, error, reload } = useAttractionsCatalog()
  const { completedIds, clearCompleted } = useMobileProgress()
  const suggestedRoute = buildSuggestedRoute(attractions, completedIds)
  const metrics = getProgressMetrics(attractions, completedIds)

  return (
    <main className="flex-1 space-y-4 p-4">
      <header className="space-y-2">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-red-400">Ruta optimizada</p>
        <h1 className="text-2xl font-black text-white">Orden recomendado de visita</h1>
        <p className="text-sm leading-6 text-neutral-400">
          La ruta se recalcula con las atracciones abiertas y tu progreso guardado en este movil.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-neutral-900/90 p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-neutral-500">Abiertas</p>
          <strong className="mt-2 block text-2xl text-white">{metrics.openAttractions}</strong>
        </div>
        <div className="rounded-2xl border border-white/10 bg-neutral-900/90 p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-neutral-500">Completadas</p>
          <strong className="mt-2 block text-2xl text-white">{metrics.completedAttractions}</strong>
        </div>
        <div className="rounded-2xl border border-white/10 bg-neutral-900/90 p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-neutral-500">Progreso</p>
          <strong className="mt-2 block text-2xl text-white">{metrics.completionRate}%</strong>
        </div>
      </section>

      <div className="flex gap-3">
        <Button className="flex-1" variant="ghost" onClick={reload}>
          <RefreshCcw className="h-4 w-4" />
          Actualizar ruta
        </Button>
        <Button className="flex-1" variant="ghost" onClick={clearCompleted}>
          Reiniciar progreso
        </Button>
      </div>

      {error ? <StatusMessage title="Ruta no disponible" message={error} variant="error" /> : null}

      {isLoading ? (
        <StatusMessage
          title="Calculando ruta"
          message="Se estan ordenando las atracciones recomendadas."
          variant="info"
        />
      ) : null}

      <section className="space-y-3">
        {suggestedRoute.length > 0 ? (
          suggestedRoute.map((attraction, index) => (
            <Link
              key={attraction.id}
              to={`/mobile/attraction/${attraction.id}`}
              className="block rounded-2xl border border-white/10 bg-neutral-900/90 p-4 shadow-2xl shadow-black/30"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-red-500/60 bg-red-950/40 text-sm font-black text-red-200">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-base font-black text-white">{attraction.name}</p>
                    <Route className="h-4 w-4 text-red-300" />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-neutral-400">{attraction.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="success">{getStatusLabel(attraction.status)}</Badge>
                    <Badge variant="neutral">
                      {attraction.availableSeats}/{attraction.totalSeats} plazas
                    </Badge>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <StatusMessage
            title="Sin ruta disponible"
            message="No hay atracciones abiertas para recomendar en este momento."
            variant="warning"
          />
        )}
      </section>
    </main>
  )
}

export default MobileRoutePage
