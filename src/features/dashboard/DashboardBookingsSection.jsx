import { useMemo } from 'react'
import { Badge, Button, Card } from '../../components/ui'
import { formatCurrency, formatDate, formatDateTime, getBoardTypeLabel } from './dashboardUtils'

function BookingDetailCard({ booking, isLoadingDetail }) {
  if (isLoadingDetail) {
    return (
      <Card title="Detalle de reserva" subtitle="Cargando detalle protegido">
        <div className="text-sm text-stone-400">Cargando detalle...</div>
      </Card>
    )
  }

  if (!booking) {
    return (
      <Card title="Detalle de reserva" subtitle="Selecciona una fila para consultar tickets y total.">
        <div className="text-sm text-stone-500">Todavia no hay una reserva seleccionada.</div>
      </Card>
    )
  }

  return (
    <Card title={`Reserva #${booking.id}`} subtitle="Detalle completo devuelto por backend.">
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-md border border-white/10 bg-black/25 px-3 py-3">
            <p className="text-xs font-black uppercase text-stone-500">Titular</p>
            <strong className="mt-2 block text-sm text-stone-100">{booking.userFullName}</strong>
          </div>
          <div className="rounded-md border border-white/10 bg-black/25 px-3 py-3">
            <p className="text-xs font-black uppercase text-stone-500">Hotel</p>
            <strong className="mt-2 block text-sm text-stone-100">{booking.hotelName || 'Solo entradas'}</strong>
          </div>
          <div className="rounded-md border border-white/10 bg-black/25 px-3 py-3">
            <p className="text-xs font-black uppercase text-stone-500">Plan</p>
            <strong className="mt-2 block text-sm text-stone-100">{getBoardTypeLabel(booking.boardType)}</strong>
          </div>
          <div className="rounded-md border border-white/10 bg-black/25 px-3 py-3">
            <p className="text-xs font-black uppercase text-stone-500">Total</p>
            <strong className="mt-2 block text-sm text-stone-100">{formatCurrency(booking.totalPrice)}</strong>
          </div>
          <div className="rounded-md border border-white/10 bg-black/25 px-3 py-3">
            <p className="text-xs font-black uppercase text-stone-500">Visita</p>
            <strong className="mt-2 block text-sm text-stone-100">{formatDate(booking.visitDate)}</strong>
          </div>
          <div className="rounded-md border border-white/10 bg-black/25 px-3 py-3">
            <p className="text-xs font-black uppercase text-stone-500">Creada</p>
            <strong className="mt-2 block text-sm text-stone-100">{formatDateTime(booking.createdAt)}</strong>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant={booking.emailSent ? 'success' : 'warning'}>
            {booking.emailSent ? 'Email marcado como enviado' : 'Email pendiente'}
          </Badge>
          <Badge variant="neutral">{booking.tickets.length} ticket(s)</Badge>
        </div>

        <div className="space-y-2">
          {booking.tickets.map((ticket) => (
            <div
              key={`${ticket.holderFullName}-${ticket.ageRange}-${ticket.price}`}
              className="rounded-md border border-white/10 bg-black/25 px-3 py-3"
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm text-stone-100">{ticket.holderFullName}</strong>
                <Badge variant="neutral">{ticket.ageRange}</Badge>
              </div>
              <div className="mt-2 text-sm text-stone-400">{formatCurrency(ticket.price)}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

function DashboardBookingsSection({
  bookings,
  selectedBookingId,
  selectedBooking,
  isLoadingDetail,
  onSelectBooking,
}) {
  const sortedBookings = useMemo(() => bookings.slice(0, 12), [bookings])

  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.95fr)]">
      <Card title="Reservas recientes" subtitle="Listado protegido de compras y reservas.">
        <div className="overflow-hidden rounded-lg border border-white/10">
          <div className="hidden grid-cols-[1.1fr_1fr_110px_120px_140px] gap-3 border-b border-white/10 bg-red-950/30 px-4 py-3 text-xs font-black tracking-[0.12em] text-stone-300 uppercase lg:grid">
            <span>Titular</span>
            <span>Hotel</span>
            <span>Tickets</span>
            <span>Total</span>
            <span className="text-right">Acciones</span>
          </div>

          <div className="divide-y divide-white/10">
            {sortedBookings.length > 0 ? (
              sortedBookings.map((booking) => (
                <div
                  key={booking.id}
                  className={`grid gap-3 px-4 py-4 lg:grid-cols-[1.1fr_1fr_110px_120px_140px] ${
                    selectedBookingId === booking.id ? 'bg-red-950/25' : 'bg-black/20'
                  }`}
                >
                  <div>
                    <p className="text-[0.68rem] font-black tracking-[0.12em] text-stone-500 uppercase lg:hidden">
                      Titular
                    </p>
                    <div className="mt-1 text-sm text-stone-100">{booking.userFullName}</div>
                  </div>
                  <div>
                    <p className="text-[0.68rem] font-black tracking-[0.12em] text-stone-500 uppercase lg:hidden">
                      Hotel
                    </p>
                    <div className="mt-1 text-sm text-stone-300">{booking.hotelName || 'Solo entradas'}</div>
                  </div>
                  <div>
                    <p className="text-[0.68rem] font-black tracking-[0.12em] text-stone-500 uppercase lg:hidden">
                      Tickets
                    </p>
                    <div className="mt-1 text-sm text-stone-300">{booking.totalTickets}</div>
                  </div>
                  <div>
                    <p className="text-[0.68rem] font-black tracking-[0.12em] text-stone-500 uppercase lg:hidden">
                      Total
                    </p>
                    <div className="mt-1 text-sm text-stone-300">{formatCurrency(booking.totalPrice)}</div>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="ghost" onClick={() => onSelectBooking(booking.id)}>
                      Ver detalle
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-sm text-stone-500">No hay reservas disponibles.</div>
            )}
          </div>
        </div>
      </Card>

      <BookingDetailCard booking={selectedBooking} isLoadingDetail={isLoadingDetail} />
    </section>
  )
}

export default DashboardBookingsSection
