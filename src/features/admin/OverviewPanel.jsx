import DashboardKpiCard from '../../components/dashboard/DashboardKpiCard'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'
import StatusMessage from '../../components/ui/StatusMessage'
import { overviewHelpers } from './adminConfig.jsx'
import { formatCurrency, formatDate, formatDateTime } from './formatters'

function PreviewTable({ title, subtitle, items, columns, emptyMessage }) {
  return (
    <Card title={title} subtitle={subtitle}>
      {items.length === 0 ? (
        <StatusMessage title="Sin datos" message={emptyMessage} variant="empty" />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-stone-800 text-left text-sm">
            <thead>
              <tr className="text-stone-400">
                {columns.map((column) => (
                  <th key={column.key} className="px-3 py-3 font-extrabold uppercase">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-900">
              {items.map((item) => (
                <tr key={item.id} className="align-top">
                  {columns.map((column) => (
                    <td key={column.key} className="px-3 py-3 text-stone-300">
                      {column.render ? column.render(item) : item[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}

function OverviewPanel({ summary, bookings, maintenance, shifts }) {
  const recentBookings = bookings.slice(0, 5)
  const upcomingMaintenance = maintenance.slice(0, 5)
  const latestShifts = shifts.slice(0, 6)

  return (
    <section className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardKpiCard
          title="Recaudacion anual"
          value={formatCurrency(summary.totalRevenue)}
          note={`Ano ${summary.year}`}
          variant="success"
          tag="Dashboard"
        />
        <DashboardKpiCard
          title="Reservas registradas"
          value={String(bookings.length)}
          note="Ventas historicas disponibles"
          variant="neutral"
          tag="Taquilla"
        />
        <DashboardKpiCard
          title="Mantenimientos"
          value={String(maintenance.length)}
          note="Tareas generadas en el sistema"
          variant="warning"
          tag="Operaciones"
        />
        <DashboardKpiCard
          title="Turnos activos"
          value={String(shifts.length)}
          note="Asignaciones registradas"
          variant="danger"
          tag="Equipo"
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <Card title="Entradas por rango de edad" subtitle="Metricas reales calculadas en backend para el ano en curso.">
          {summary.ticketsByAgeRange?.length ? (
            <div className="grid gap-3 md:grid-cols-3">
              {summary.ticketsByAgeRange.map((ticketGroup) => (
                <div key={ticketGroup.ageRange} className="rounded-lg border border-stone-800 bg-stone-950/70 p-4">
                  <div className="text-sm font-bold text-stone-300">{overviewHelpers.ticketRangeLabel(ticketGroup)}</div>
                  <div className="mt-3 text-3xl font-black text-stone-100">{ticketGroup.ticketsSold}</div>
                </div>
              ))}
            </div>
          ) : (
            <StatusMessage
              title="Sin datos de venta"
              message="Todavia no hay entradas registradas para calcular el desglose."
              variant="empty"
            />
          )}
        </Card>

        <Card title="Top 3 hoteles" subtitle="Hoteles que mas recaudan en el ano en curso.">
          {summary.topHotels?.length ? (
            <div className="space-y-3">
              {summary.topHotels.map((hotel, index) => (
                <div
                  key={hotel.hotelId}
                  className="flex items-center justify-between gap-3 rounded-lg border border-stone-800 bg-stone-950/70 px-4 py-3"
                >
                  <div>
                    <div className="text-sm font-bold text-stone-100">
                      {index + 1}. {hotel.hotelName}
                    </div>
                    <div className="mt-1 text-xs text-stone-500">{overviewHelpers.hotelRevenueLabel(hotel)}</div>
                  </div>
                  <Badge variant="success">{formatCurrency(hotel.revenue)}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <StatusMessage
              title="Sin ranking"
              message="No hay reservas suficientes para calcular el ranking de hoteles."
              variant="empty"
            />
          )}
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <PreviewTable
          title="Reservas recientes"
          subtitle="Ultimas ventas registradas en el sistema."
          items={recentBookings}
          columns={overviewHelpers.bookingColumns}
          emptyMessage="Todavia no hay reservas disponibles."
        />
        <PreviewTable
          title="Mantenimiento programado"
          subtitle="Proximas revisiones planificadas para atracciones."
          items={upcomingMaintenance}
          columns={overviewHelpers.maintenanceColumns}
          emptyMessage="Aun no se ha generado mantenimiento."
        />
        <PreviewTable
          title="Cobertura de turnos"
          subtitle="Ultimos turnos generados para el equipo."
          items={latestShifts}
          columns={overviewHelpers.shiftColumns}
          emptyMessage="Aun no se han generado turnos."
        />
      </div>

      <Card title="Estado de operacion" subtitle="Resumen rapido del sistema para la presentacion del sprint.">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-stone-800 bg-stone-950/70 p-4">
            <div className="text-sm font-bold text-stone-300">Ultima reserva</div>
            <div className="mt-3 text-lg font-black text-stone-100">
              {recentBookings[0]?.userFullName ?? 'Sin datos'}
            </div>
            <div className="mt-2 text-sm text-stone-500">
              {recentBookings[0] ? formatDateTime(recentBookings[0].createdAt) : 'Todavia no hay ventas registradas.'}
            </div>
          </div>
          <div className="rounded-lg border border-stone-800 bg-stone-950/70 p-4">
            <div className="text-sm font-bold text-stone-300">Proxima revision</div>
            <div className="mt-3 text-lg font-black text-stone-100">
              {upcomingMaintenance[0]?.attractionName ?? 'Sin tareas'}
            </div>
            <div className="mt-2 text-sm text-stone-500">
              {upcomingMaintenance[0] ? formatDate(upcomingMaintenance[0].scheduledDate) : 'Genera la agenda desde Operaciones.'}
            </div>
          </div>
          <div className="rounded-lg border border-stone-800 bg-stone-950/70 p-4">
            <div className="text-sm font-bold text-stone-300">Siguiente cambio de turno</div>
            <div className="mt-3 text-lg font-black text-stone-100">
              {latestShifts[0]?.employeeFullName ?? 'Sin turnos'}
            </div>
            <div className="mt-2 text-sm text-stone-500">
              {latestShifts[0] ? `${formatShiftLabel(latestShifts[0].shift)} hasta ${formatDate(latestShifts[0].endDate)}` : 'Genera turnos para ver la cobertura.'}
            </div>
          </div>
        </div>
      </Card>
    </section>
  )
}

function formatShiftLabel(shift) {
  return shift === 'MORNING' ? 'Manana' : shift === 'AFTERNOON' ? 'Tarde' : shift
}

export default OverviewPanel
