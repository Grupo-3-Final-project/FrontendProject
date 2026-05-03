import DashboardAlertsPanel from '../../components/dashboard/DashboardAlertsPanel'
import DashboardKpiCard from '../../components/dashboard/DashboardKpiCard'
import DashboardMapPanel from '../../components/dashboard/DashboardMapPanel'
import { Badge, Card } from '../../components/ui'
import { formatCurrency } from './dashboardUtils'

function DashboardOverviewSection({
  summary,
  bookings,
  attractions,
  maintenance,
  currentYear,
}) {
  const totalTickets = summary?.ticketsByAgeRange?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.ticketsSold,
    0,
  ) || 0

  return (
    <div className="space-y-5">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardKpiCard
          title={`Ingresos ${currentYear}`}
          value={formatCurrency(summary?.totalRevenue)}
          note="Dato calculado por backend"
          variant="success"
          tag="Revenue"
        />
        <DashboardKpiCard
          title="Entradas vendidas"
          value={`${totalTickets}`}
          note="Suma real del ano seleccionado"
          variant="neutral"
          tag="Tickets"
        />
        <DashboardKpiCard
          title="Reservas visibles"
          value={`${bookings.length}`}
          note="Consulta protegida de reservas"
          variant="danger"
          tag="Taquilla"
        />
        <DashboardKpiCard
          title="Mantenimientos"
          value={`${maintenance.length}`}
          note="Agenda operativa cargada"
          variant="warning"
          tag="Agenda"
        />
      </section>

      <section className="grid items-stretch gap-4 xl:grid-cols-[minmax(0,2.1fr)_minmax(340px,0.95fr)]">
        <DashboardMapPanel attractions={attractions} />
        <DashboardAlertsPanel attractions={attractions} maintenance={maintenance} bookings={bookings} />
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card title="Entradas por rango de edad" subtitle="Metrica anual servida por backend.">
          <div className="space-y-3">
            {summary?.ticketsByAgeRange?.length ? (
              summary.ticketsByAgeRange.map((entry) => (
                <div key={entry.ageRange} className="rounded-md border border-white/10 bg-black/20 px-4 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <strong className="text-sm text-stone-100">{entry.ageRange}</strong>
                    <Badge variant="neutral">{entry.ticketsSold} tickets</Badge>
                  </div>
                  <div className="mt-3 grid grid-cols-12 gap-1">
                    {Array.from({ length: Math.min(12, Math.max(1, entry.ticketsSold)) }).map((_, index) => (
                      <span key={`${entry.ageRange}-${index}`} className="h-2 rounded-full bg-red-600" />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-stone-500">No hay tickets para el ano seleccionado.</div>
            )}
          </div>
        </Card>

        <Card title="Top 3 hoteles" subtitle="Recaudacion anual agrupada por hotel.">
          <div className="space-y-3">
            {summary?.topHotels?.length ? (
              summary.topHotels.map((hotel, index) => (
                <div key={hotel.hotelId} className="rounded-md border border-white/10 bg-black/20 px-4 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase text-stone-500">Posicion {index + 1}</p>
                      <strong className="mt-2 block text-sm text-stone-100">{hotel.hotelName}</strong>
                    </div>
                    <Badge variant={index === 0 ? 'success' : 'neutral'}>
                      {formatCurrency(hotel.revenue)}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-stone-500">No hay hoteles con revenue para este ano.</div>
            )}
          </div>
        </Card>
      </section>
    </div>
  )
}

export default DashboardOverviewSection
