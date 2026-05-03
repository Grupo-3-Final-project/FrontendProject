import { Badge, Button, Card } from '../../components/ui'
import {
  formatCurrency,
  formatDate,
  getAgeRangeLabel,
  getBoardTypeLabel,
} from './bookingUtils'

function BookingSummaryPanel({
  user,
  companions,
  visitDate,
  selectedHotel,
  selectedOffer,
  boardType,
  canSubmit,
  isSubmitting,
  onSubmit,
  onResetResult,
}) {
  const attendees = user
    ? [
        {
          fullName: `${user.firstName} ${user.lastName}`.trim(),
          birthDate: user.birthDate,
          ageRange: user.ageRange,
          role: 'Titular',
        },
        ...companions.map((companion) => ({
          fullName: `${companion.firstName} ${companion.lastName}`.trim(),
          birthDate: companion.birthDate,
          ageRange: companion.ageRange,
          role: 'Acompanante',
        })),
      ]
    : []

  return (
    <Card
      title="Resumen de la compra"
      subtitle="El backend calcula el precio final y valida las reglas de negocio al confirmar."
      className="sticky top-6"
    >
      <div className="space-y-5">
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-black text-stone-100 uppercase">Titular y asistentes</h3>
            <Badge variant="neutral">{attendees.length} entrada(s)</Badge>
          </div>
          <div className="space-y-2">
            {attendees.length > 0 ? (
              attendees.map((attendee) => (
                <div
                  key={`${attendee.role}-${attendee.fullName}-${attendee.birthDate}`}
                  className="rounded-md border border-white/10 bg-black/25 px-3 py-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <strong className="text-sm text-stone-100">{attendee.fullName}</strong>
                    <Badge variant={attendee.role === 'Titular' ? 'success' : 'neutral'}>
                      {attendee.role}
                    </Badge>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-stone-400">
                    <span>{attendee.birthDate ? formatDate(attendee.birthDate) : 'Sin fecha'}</span>
                    {attendee.ageRange ? <span>{getAgeRangeLabel(attendee.ageRange)}</span> : null}
                  </div>
                </div>
              ))
            ) : (
              <p className="rounded-md border border-dashed border-white/10 px-3 py-4 text-sm text-stone-500">
                Completa los datos del titular para generar el resumen.
              </p>
            )}
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-black text-stone-100 uppercase">Paquete elegido</h3>
          <div className="rounded-md border border-white/10 bg-black/25 px-3 py-3 text-sm text-stone-300">
            <div className="flex items-center justify-between gap-3">
              <span>Fecha de visita</span>
              <strong className="text-stone-100">{visitDate ? formatDate(visitDate) : '-'}</strong>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span>Hotel</span>
              <strong className="text-stone-100">{selectedHotel?.name || 'Solo entradas'}</strong>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span>Plan</span>
              <strong className="text-stone-100">{getBoardTypeLabel(boardType)}</strong>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span>Oferta</span>
              <strong className="text-right text-stone-100">{selectedOffer?.title || 'Sin oferta'}</strong>
            </div>
            {selectedOffer ? (
              <div className="mt-3 flex items-center justify-between gap-3">
                <span>Precio comercial visible</span>
                <strong className="text-stone-100">{formatCurrency(selectedOffer.totalPrice)}</strong>
              </div>
            ) : null}
          </div>
        </section>

        <div className="space-y-3">
          <Button
            className="w-full"
            disabled={!canSubmit || isSubmitting}
            onClick={onSubmit}
          >
            {isSubmitting ? 'Confirmando compra...' : 'Confirmar compra'}
          </Button>
          <Button className="w-full" variant="ghost" onClick={onResetResult}>
            Limpiar detalle actual
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default BookingSummaryPanel
