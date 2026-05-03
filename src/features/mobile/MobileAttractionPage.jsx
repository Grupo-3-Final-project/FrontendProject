import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Circle } from 'lucide-react'
import useAttractionsCatalog from '../../hooks/useAttractionsCatalog'
import useMobileProgress from '../../hooks/useMobileProgress'
import { Badge, Button, StatusMessage } from '../../components/ui'
import { getSizeLabel, getStatusLabel } from './mobileUtils'

function MobileAttractionPage() {
  const { id } = useParams()
  const { attractions, isLoading, error } = useAttractionsCatalog()
  const { isCompleted, toggleCompleted } = useMobileProgress()

  const attraction = attractions.find((currentAttraction) => String(currentAttraction.id) === id)

  if (error) {
    return (
      <main className="flex-1 p-4">
        <StatusMessage title="Detalle no disponible" message={error} variant="error" />
      </main>
    )
  }

  if (isLoading) {
    return (
      <main className="flex-1 p-4">
        <StatusMessage
          title="Cargando detalle"
          message="Se esta consultando la atraccion seleccionada."
          variant="info"
        />
      </main>
    )
  }

  if (!attraction) {
    return (
      <main className="flex-1 p-4">
        <StatusMessage
          title="Atraccion no encontrada"
          message="No existe una atraccion con ese identificador."
          variant="warning"
        />
      </main>
    )
  }

  const completed = isCompleted(attraction.id)

  return (
    <main className="flex-1 space-y-4 p-4">
      <Link
        to="/mobile/route"
        className="inline-flex items-center gap-2 text-sm font-black text-red-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a la ruta
      </Link>

      <section className="overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/90 shadow-2xl shadow-black/30">
        <img
          src={attraction.imageUrl}
          alt={attraction.name}
          className="h-56 w-full object-cover"
        />
        <div className="space-y-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-2xl font-black text-white">{attraction.name}</p>
              <p className="mt-2 text-sm leading-6 text-neutral-400">{attraction.description}</p>
            </div>
            {completed ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />
            ) : (
              <Circle className="h-5 w-5 shrink-0 text-neutral-500" />
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant={attraction.status === 'OPEN' ? 'success' : 'warning'}>
              {getStatusLabel(attraction.status)}
            </Badge>
            <Badge variant="neutral">{getSizeLabel(attraction.size)}</Badge>
            <Badge variant="neutral">
              {attraction.availableSeats}/{attraction.totalSeats} plazas
            </Badge>
            <Badge variant="neutral">
              Revision cada {attraction.maintenanceFrequencyDays} dias
            </Badge>
          </div>

          <Button className="w-full" onClick={() => toggleCompleted(attraction.id)}>
            {completed ? 'Marcar como pendiente' : 'Marcar como completada'}
          </Button>
        </div>
      </section>
    </main>
  )
}

export default MobileAttractionPage
