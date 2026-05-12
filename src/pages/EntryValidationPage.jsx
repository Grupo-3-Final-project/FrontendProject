import { useCallback, useEffect, useState } from 'react'
import { HiOutlineArrowPath, HiOutlineCheckBadge } from 'react-icons/hi2'
import { useParams } from 'react-router-dom'
import { getApiErrorMessage } from '../api/apiClient'
import { validateEntry } from '../api/ticketApi'
import PrimaryCTA from '../components/mobileExperience/PrimaryCTA'
import StatusMessage from '../components/ui/StatusMessage'
import { formatDate, formatDateTime } from '../features/admin/formatters'

function EntryValidationPage() {
  const { entryToken } = useParams()
  const [validationResult, setValidationResult] = useState(null)
  const [pageError, setPageError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const runValidation = useCallback(async (mode = 'load') => {
    if (!entryToken) {
      setIsLoading(false)
      return
    }

    if (mode === 'load') {
      setIsLoading(true)
    } else {
      setIsRefreshing(true)
    }

    try {
      const response = await validateEntry(entryToken)
      setValidationResult(response)
      setPageError('')
    } catch (error) {
      setValidationResult(null)
      setPageError(getApiErrorMessage(error, 'No se ha podido validar la entrada.'))
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [entryToken])

  useEffect(() => {
    void runValidation()
  }, [runValidation])

  return (
    <main className="flex flex-1 bg-black px-2.5 py-3">
      <section className="flex w-full flex-col gap-2.5">
        {!entryToken && !pageError ? (
          <StatusMessage
            title="Entrada pendiente de validar"
            message="Escanea el QR de acceso de la entrada para validar el paso al parque."
            variant="empty"
          />
        ) : null}

        {isLoading ? (
          <StatusMessage
            title="Validando entrada"
            message="Estamos comprobando el estado de la entrada y la fecha de visita."
            variant="info"
          />
        ) : null}

        {!isLoading && pageError ? (
          <StatusMessage
            title="No se ha podido validar la entrada"
            message={pageError}
            variant="error"
          />
        ) : null}

        {!isLoading && !pageError && validationResult ? (
          <>
            <section className="rounded-2xl border border-green-600/45 bg-neutral-950 px-4 py-4 shadow-[0_0_26px_rgba(34,197,94,0.14)]">
              <div className="flex items-start gap-3">
                <div className="rounded-xl border border-green-500/45 bg-green-950/30 p-2 text-green-300">
                  <HiOutlineCheckBadge className="text-xl" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-base font-black text-white uppercase tracking-[0.08em]">
                    Entrada validada
                  </h1>
                  <p className="mt-1 text-sm leading-snug text-neutral-300">
                    El acceso al parque ha quedado registrado correctamente.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3.5 shadow-[0_0_26px_rgba(0,0,0,0.3)]">
              <div className="grid gap-3 min-[380px]:grid-cols-2">
                <div>
                  <p className="text-[0.68rem] font-black tracking-[0.08em] text-white uppercase">
                    Titular
                  </p>
                  <p className="mt-1 text-sm font-medium text-neutral-200">
                    {validationResult.holderFullName}
                  </p>
                </div>
                <div>
                  <p className="text-[0.68rem] font-black tracking-[0.08em] text-white uppercase">
                    Reserva
                  </p>
                  <p className="mt-1 text-sm font-medium text-neutral-200">
                    #{validationResult.bookingId}
                  </p>
                </div>
                <div>
                  <p className="text-[0.68rem] font-black tracking-[0.08em] text-white uppercase">
                    Fecha de visita
                  </p>
                  <p className="mt-1 text-sm font-medium text-neutral-200">
                    {formatDate(validationResult.visitDate)}
                  </p>
                </div>
                <div>
                  <p className="text-[0.68rem] font-black tracking-[0.08em] text-white uppercase">
                    Validada a las
                  </p>
                  <p className="mt-1 text-sm font-medium text-neutral-200">
                    {formatDateTime(validationResult.usedAt)}
                  </p>
                </div>
              </div>
            </section>
          </>
        ) : null}

        {!isLoading && entryToken ? (
          <PrimaryCTA
            icon={HiOutlineArrowPath}
            label={isRefreshing ? 'Reintentando validacion' : 'Reintentar validacion'}
            disabled={isRefreshing}
            onClick={() => void runValidation('refresh')}
          />
        ) : null}
      </section>
    </main>
  )
}

export default EntryValidationPage
