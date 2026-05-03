import { Badge, Card } from '../../components/ui'
import {
  formatCurrency,
  formatDate,
  formatDateTime,
  getAgeRangeLabel,
  getBoardTypeLabel,
} from './bookingUtils'

function BookingResultPanel({ booking }) {
  if (!booking) {
    return (
      <Card
        title="Detalle de la reserva"
        subtitle="Aqui apareceran el localizador, las entradas y el total confirmado por backend."
      >
        <div className="rounded-md border border-dashed border-white/10 px-4 py-5 text-sm text-stone-500">
          Todavia no hay ninguna compra confirmada en esta sesion.
        </div>
      </Card>
    )
  }

  return (
    <Card
      title={`Reserva #${booking.id}`}
      subtitle="Respuesta exacta del backend tras crear la compra."
    >
      <div className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-md border border-white/10 bg-black/25 px-3 py-3">
            <p className="text-xs font-black uppercase text-stone-500">Titular</p>
            <strong className="mt-2 block text-sm text-stone-100">{booking.userFullName}</strong>
          </div>
          <div className="rounded-md border border-white/10 bg-black/25 px-3 py-3">
            <p className="text-xs font-black uppercase text-stone-500">Fecha de visita</p>
            <strong className="mt-2 block text-sm text-stone-100">{formatDate(booking.visitDate)}</strong>
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
            <strong className="mt-2 block text-lg text-stone-100">{formatCurrency(booking.totalPrice)}</strong>
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

        <section className="space-y-3">
          <h3 className="text-sm font-black uppercase text-stone-100">Tickets generados</h3>
          <div className="space-y-2">
            {booking.tickets.map((ticket) => (
              <div
                key={`${ticket.holderFullName}-${ticket.ageRange}-${ticket.price}`}
                className="rounded-md border border-white/10 bg-black/25 px-3 py-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <strong className="text-sm text-stone-100">{ticket.holderFullName}</strong>
                  <Badge variant="neutral">{getAgeRangeLabel(ticket.ageRange)}</Badge>
                </div>
                <div className="mt-2 text-sm text-stone-400">{formatCurrency(ticket.price)}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Card>
  )
}

export default BookingResultPanel
