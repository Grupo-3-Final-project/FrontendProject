import { Euro, Ticket, Users, Wrench } from 'lucide-react'
import DashboardKpiCard from '../../components/dashboard/DashboardKpiCard'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'
import StatusMessage from '../../components/ui/StatusMessage'
import { overviewHelpers } from './adminConfig.jsx'
import { formatCurrency, formatDate, formatDateTime } from './formatters'

const detailBlockClasses =
  'rounded-lg border border-stone-800 bg-[linear-gradient(180deg,rgba(28,25,23,0.72),rgba(3,3,4,0.32))] px-4 py-3 shadow-[0_14px_34px_rgba(0,0,0,0.18)]'

function DetailBlock({ label, value, meta, accent = false }) {
  return (
    <div className={`${detailBlockClasses} ${accent ? 'border-red-900/60 bg-[linear-gradient(180deg,rgba(127,29,29,0.22),rgba(3,3,4,0.46))]' : ''}`}>
      <div className="text-xs font-bold uppercase text-stone-500">{label}</div>
      <div className={`${accent ? 'text-2xl text-stone-50' : 'text-lg text-stone-100'} mt-2 font-black`}>
        {value}
      </div>
      {meta ? <div className="mt-2 text-xs leading-4 text-stone-500">{meta}</div> : null}
    </div>
  )
}

function PreviewTable({ title, subtitle, items, columns, emptyMessage }) {
  return (
    <Card title={title} subtitle={subtitle}>
      {items.length === 0 ? (
        <StatusMessage title="Sin datos" message={emptyMessage} variant="empty" />
      ) : (
        <div className="overflow-hidden rounded-lg border border-stone-800 bg-black/20">
          <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-stone-800 text-left text-sm">
            <thead className="bg-[linear-gradient(90deg,rgba(127,29,29,0.2),rgba(28,25,23,0.2))]">
              <tr className="text-stone-400">
                {columns.map((column) => (
                  <th key={column.key} className="px-3 py-3 text-[0.72rem] font-extrabold uppercase">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-900">
              {items.map((item) => (
                <tr key={item.id} className="align-top transition hover:bg-white/[0.03]">
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
          icon={Euro}
          title="Recaudación anual"
          value={formatCurrency(summary.totalRevenue)}
          note={`Año ${summary.year}`}
          variant="success"
          tag="Dashboard"
        />
        <DashboardKpiCard
          icon={Ticket}
          title="Reservas registradas"
          value={String(bookings.length)}
          note="Compras registradas"
          variant="neutral"
          tag="Taquilla"
        />
        <DashboardKpiCard
          icon={Wrench}
          title="Mantenimientos"
          value={String(maintenance.length)}
          note="Revisiones planificadas"
          variant="warning"
          tag="Operaciones"
        />
        <DashboardKpiCard
          icon={Users}
          title="Turnos activos"
          value={String(shifts.length)}
          note="Asignaciones activas"
          variant="danger"
          tag="Equipo"
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <Card title="Entradas por rango de edad" subtitle="Resumen del año en curso.">
          {summary.ticketsByAgeRange?.length ? (
            <div className="grid gap-3 md:grid-cols-3">
              {summary.ticketsByAgeRange.map((ticketGroup) => (
                <DetailBlock
                  key={ticketGroup.ageRange}
                  accent
                  label={overviewHelpers.ticketRangeLabel(ticketGroup)}
                  value={ticketGroup.ticketsSold}
                />
              ))}
            </div>
          ) : (
            <StatusMessage
              title="Sin datos de venta"
              message="Todavía no hay entradas registradas para calcular el desglose."
              variant="empty"
            />
          )}
        </Card>

        <Card title="Top 3 hoteles" subtitle="Hoteles con mayor recaudación en el año en curso.">
          {summary.topHotels?.length ? (
            <div className="space-y-3">
              {summary.topHotels.map((hotel, index) => (
                <div
                  key={hotel.hotelId}
                  className="flex items-center justify-between gap-4 rounded-lg border border-stone-800 bg-[linear-gradient(180deg,rgba(28,25,23,0.72),rgba(3,3,4,0.32))] px-4 py-3 shadow-[0_14px_34px_rgba(0,0,0,0.18)]"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-red-900/50 bg-red-950/25 text-xs font-black text-red-200">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-stone-100">{hotel.hotelName}</div>
                      <div className="mt-1 text-xs text-stone-500">{overviewHelpers.hotelRevenueLabel(hotel)}</div>
                    </div>
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

      <div className="grid gap-5 2xl:grid-cols-3">
        <PreviewTable
          title="Reservas recientes"
          subtitle="Últimas reservas registradas."
          items={recentBookings}
          columns={overviewHelpers.bookingColumns}
          emptyMessage="Todavía no hay reservas disponibles."
        />
        <PreviewTable
          title="Mantenimiento programado"
          subtitle="Próximas revisiones planificadas para atracciones."
          items={upcomingMaintenance}
          columns={overviewHelpers.maintenanceColumns}
          emptyMessage="Aún no se ha generado mantenimiento."
        />
        <PreviewTable
          title="Cobertura de turnos"
          subtitle="Últimos turnos generados."
          items={latestShifts}
          columns={overviewHelpers.shiftColumns}
          emptyMessage="Aún no se han generado turnos."
        />
      </div>

      <Card title="Estado general" subtitle="Resumen rápido del sistema.">
        <div className="grid gap-4 md:grid-cols-3">
          <DetailBlock
            label="Última reserva"
            value={recentBookings[0]?.userFullName ?? 'Sin datos'}
            meta={recentBookings[0] ? formatDateTime(recentBookings[0].createdAt) : 'Todavía no hay reservas registradas.'}
          />
          <DetailBlock
            label="Próxima revisión"
            value={upcomingMaintenance[0]?.attractionName ?? 'Sin tareas'}
            meta={upcomingMaintenance[0] ? formatDate(upcomingMaintenance[0].scheduledDate) : 'Genera la agenda desde Operaciones.'}
          />
          <DetailBlock
            label="Siguiente cambio de turno"
            value={latestShifts[0]?.employeeFullName ?? 'Sin turnos'}
            meta={latestShifts[0] ? `${formatShiftLabel(latestShifts[0].shift)} hasta ${formatDate(latestShifts[0].endDate)}` : 'Genera turnos para ver la cobertura.'}
          />
        </div>
      </Card>
    </section>
  )
}

function formatShiftLabel(shift) {
  return shift === 'MORNING' ? 'Mañana' : shift === 'AFTERNOON' ? 'Tarde' : shift
}

export default OverviewPanel
