import { Link } from 'react-router-dom'
import { Compass, MapPinned } from 'lucide-react'
import parkMapImage from '../../assets/home/publicHomeParkMap.png'
import useAttractionsCatalog from '../../hooks/useAttractionsCatalog'
import useMobileProgress from '../../hooks/useMobileProgress'
import { Badge, StatusMessage } from '../../components/ui'
import { getSizeLabel, getStatusLabel } from './mobileUtils'

function MobileMapPage() {
  const { attractions, isLoading, error } = useAttractionsCatalog()
  const { isCompleted } = useMobileProgress()

  return (
    <main className="flex-1 space-y-4 p-4">
      <header className="space-y-2">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-red-400">Mapa del parque</p>
        <h1 className="text-2xl font-black text-white">Localiza tu siguiente parada</h1>
        <p className="text-sm leading-6 text-neutral-400">
          Vista mobile del parque con acceso rapido al detalle de cada atraccion.
        </p>
      </header>

      {error ? <StatusMessage title="Mapa no disponible" message={error} variant="error" /> : null}

      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl shadow-black/40">
        <img
          src={parkMapImage}
          alt="Mapa del parque"
          className="h-64 w-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/65 px-4 py-3 backdrop-blur">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-red-300">Vista general</p>
            <p className="mt-1 text-sm text-white">{attractions.length} atracciones visibles</p>
          </div>
          <MapPinned className="h-5 w-5 text-red-400" />
        </div>
      </section>

      {isLoading ? (
        <StatusMessage
          title="Cargando atracciones"
          message="Se esta preparando el mapa mobile."
          variant="info"
        />
      ) : null}

      <section className="space-y-3">
        {attractions.map((attraction) => (
          <Link
            key={attraction.id}
            to={`/mobile/attraction/${attraction.id}`}
            className="block rounded-2xl border border-white/10 bg-neutral-900/90 p-4 shadow-2xl shadow-black/30"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-base font-black text-white">{attraction.name}</p>
                <p className="mt-2 text-sm leading-6 text-neutral-400">{attraction.description}</p>
              </div>
              <Compass className="mt-1 h-5 w-5 text-red-300" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant={attraction.status === 'OPEN' ? 'success' : 'warning'}>
                {getStatusLabel(attraction.status)}
              </Badge>
              <Badge variant="neutral">{getSizeLabel(attraction.size)}</Badge>
              <Badge variant="neutral">
                {attraction.availableSeats}/{attraction.totalSeats} plazas
              </Badge>
              {isCompleted(attraction.id) ? <Badge variant="success">Completada</Badge> : null}
            </div>
          </Link>
        ))}
      </section>
    </main>
  )
}

export default MobileMapPage
