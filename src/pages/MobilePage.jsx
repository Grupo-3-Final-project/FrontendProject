import { Link } from 'react-router-dom'
import { ChevronRight, MapPinned, Route, Trophy } from 'lucide-react'
import useAttractionsCatalog from '../hooks/useAttractionsCatalog'
import useMobileProgress from '../hooks/useMobileProgress'
import { Badge, Card, StatusMessage } from '../components/ui'
import { buildSuggestedRoute, getProgressMetrics } from '../features/mobile/mobileUtils'

function MobilePage() {
  const { attractions, isLoading, error } = useAttractionsCatalog()
  const { completedIds } = useMobileProgress()
  const route = buildSuggestedRoute(attractions, completedIds)
  const metrics = getProgressMetrics(attractions, completedIds)
  const nextAttraction = route[0]

  return (
    <main className="flex flex-1 flex-col gap-4 p-4">
      <section className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top,rgba(185,28,28,0.24),rgba(10,10,10,0.96)_55%,rgba(0,0,0,1)_100%)] p-5 shadow-2xl shadow-black/40">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-red-400">Experiencia mobile</p>
        <h1 className="mt-3 text-3xl font-black text-white">Visita en marcha</h1>
        <p className="mt-3 text-sm leading-6 text-neutral-300">
          Acceso rapido al mapa, la ruta optimizada y el progreso guardado en este dispositivo.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Badge variant="success">{metrics.completedAttractions} completadas</Badge>
          <Badge variant="neutral">{metrics.openAttractions} abiertas</Badge>
          <Badge variant="warning">{metrics.completionRate}% progreso</Badge>
        </div>
      </section>

      {error ? (
        <StatusMessage title="Mobile no disponible" message={error} variant="error" />
      ) : null}

      {isLoading ? (
        <StatusMessage
          title="Preparando recorrido"
          message="Se estan consultando las atracciones del parque."
          variant="info"
        />
      ) : null}

      <div className="grid gap-4">
        <Card title="Siguiente recomendacion" subtitle="Primera parada de la ruta actual.">
          {nextAttraction ? (
            <Link to={`/mobile/attraction/${nextAttraction.id}`} className="block">
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-4">
                <div>
                  <p className="text-sm font-black text-white">{nextAttraction.name}</p>
                  <p className="mt-2 text-sm text-neutral-400">{nextAttraction.description}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-red-300" />
              </div>
            </Link>
          ) : (
            <p className="text-sm text-neutral-500">No hay una atraccion abierta disponible ahora mismo.</p>
          )}
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card title="Mapa" subtitle="Vista general del parque.">
            <Link
              to="/mobile/map"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-gradient-to-b from-red-600 to-red-800 px-[18px] py-[11px] font-extrabold leading-tight text-stone-100 shadow-[0_10px_28px_rgba(0,0,0,0.22)] transition duration-150 ease-out hover:from-red-500 hover:to-red-700"
            >
              <MapPinned className="h-4 w-4" />
              Abrir mapa
            </Link>
          </Card>
          <Card title="Ruta" subtitle="Orden recomendado segun progreso.">
            <Link
              to="/mobile/route"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-gradient-to-b from-red-600 to-red-800 px-[18px] py-[11px] font-extrabold leading-tight text-stone-100 shadow-[0_10px_28px_rgba(0,0,0,0.22)] transition duration-150 ease-out hover:from-red-500 hover:to-red-700"
            >
              <Route className="h-4 w-4" />
              Ver ruta
            </Link>
          </Card>
        </div>

        <Card title="Tu progreso" subtitle="Datos guardados en localStorage.">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.14em] text-neutral-500">Abiertas</p>
              <strong className="mt-2 block text-2xl text-white">{metrics.openAttractions}</strong>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.14em] text-neutral-500">Completadas</p>
              <strong className="mt-2 block text-2xl text-white">{metrics.completedAttractions}</strong>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.14em] text-neutral-500">Progreso</p>
              <strong className="mt-2 block text-2xl text-white">{metrics.completionRate}%</strong>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-neutral-400">
            <Trophy className="h-4 w-4 text-amber-300" />
            El recorrido se guarda solo en este movil.
          </div>
        </Card>
      </div>
    </main>
  )
}

export default MobilePage
