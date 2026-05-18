import { useMemo, useState } from 'react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import StatusMessage from '../../components/ui/StatusMessage'
import { formatDate, formatEmployeeType, formatMaintenanceStatus, formatShiftLabel } from './formatters'

const inputClasses =
  'min-h-11 w-full rounded-md border border-stone-700 bg-stone-950/90 px-3 py-2 text-sm text-stone-100 outline-none transition focus:border-red-500'

function getDefaultRange() {
  const now = new Date()
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1)
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  return {
    startDate: startDate.toISOString().slice(0, 10),
    endDate: endDate.toISOString().slice(0, 10),
  }
}

function OperationsBoard({
  shifts,
  maintenance,
  onGenerateShifts,
  onGenerateMaintenance,
  statusMessage,
}) {
  const [shiftRange, setShiftRange] = useState(getDefaultRange)
  const [maintenanceRange, setMaintenanceRange] = useState(getDefaultRange)
  const [isGeneratingShifts, setIsGeneratingShifts] = useState(false)
  const [isGeneratingMaintenance, setIsGeneratingMaintenance] = useState(false)

  const shiftPreview = useMemo(() => shifts.slice(0, 10), [shifts])
  const maintenancePreview = useMemo(() => maintenance.slice(0, 10), [maintenance])

  const handleGenerateShifts = async (event) => {
    event.preventDefault()
    setIsGeneratingShifts(true)

    try {
      await onGenerateShifts(shiftRange)
    } finally {
      setIsGeneratingShifts(false)
    }
  }

  const handleGenerateMaintenance = async (event) => {
    event.preventDefault()
    setIsGeneratingMaintenance(true)

    try {
      await onGenerateMaintenance(maintenanceRange)
    } finally {
      setIsGeneratingMaintenance(false)
    }
  }

  return (
    <section className="space-y-5">
      {statusMessage ? (
        <StatusMessage title={statusMessage.title} message={statusMessage.message} variant={statusMessage.variant} />
      ) : null}

      <div className="grid gap-5 xl:grid-cols-2">
        <Card title="Generar turnos" subtitle="Crea la planificación de turnos para el período indicado.">
          <form className="space-y-4" onSubmit={handleGenerateShifts}>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-sm font-bold text-stone-200">Fecha inicio</span>
                <input
                  className={inputClasses}
                  type="date"
                  value={shiftRange.startDate}
                  onChange={(event) =>
                    setShiftRange((current) => ({
                      ...current,
                      startDate: event.target.value,
                    }))
                  }
                  required
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-bold text-stone-200">Fecha fin</span>
                <input
                  className={inputClasses}
                  type="date"
                  value={shiftRange.endDate}
                  onChange={(event) =>
                    setShiftRange((current) => ({
                      ...current,
                      endDate: event.target.value,
                    }))
                  }
                  required
                />
              </label>
            </div>
            <Button disabled={isGeneratingShifts} type="submit">
              {isGeneratingShifts ? 'Generando...' : 'Generar turnos'}
            </Button>
          </form>
        </Card>

        <Card title="Generar mantenimiento" subtitle="Genera las revisiones según el tamaño de las atracciones.">
          <form className="space-y-4" onSubmit={handleGenerateMaintenance}>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-sm font-bold text-stone-200">Fecha inicio</span>
                <input
                  className={inputClasses}
                  type="date"
                  value={maintenanceRange.startDate}
                  onChange={(event) =>
                    setMaintenanceRange((current) => ({
                      ...current,
                      startDate: event.target.value,
                    }))
                  }
                  required
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-bold text-stone-200">Fecha fin</span>
                <input
                  className={inputClasses}
                  type="date"
                  value={maintenanceRange.endDate}
                  onChange={(event) =>
                    setMaintenanceRange((current) => ({
                      ...current,
                      endDate: event.target.value,
                    }))
                  }
                  required
                />
              </label>
            </div>
            <Button disabled={isGeneratingMaintenance} type="submit">
              {isGeneratingMaintenance ? 'Generando...' : 'Generar mantenimiento'}
            </Button>
          </form>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <Card title="Últimos turnos" subtitle="Vista previa de los turnos generados.">
          {shiftPreview.length === 0 ? (
            <StatusMessage
              title="Sin turnos"
              message="Todavía no hay turnos generados en el sistema."
              variant="empty"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-stone-800 text-left text-sm">
                <thead>
                  <tr className="text-stone-400">
                    <th className="px-3 py-3 font-extrabold uppercase">Empleado</th>
                    <th className="px-3 py-3 font-extrabold uppercase">Turno</th>
                    <th className="px-3 py-3 font-extrabold uppercase">Período</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-900">
                  {shiftPreview.map((shift) => (
                    <tr key={shift.id}>
                      <td className="px-3 py-3 text-stone-300">
                        <div className="font-bold text-stone-100">{shift.employeeFullName}</div>
                        <div className="text-xs text-stone-500">{formatEmployeeType(shift.employeeType)}</div>
                      </td>
                      <td className="px-3 py-3 text-stone-300">{formatShiftLabel(shift.shift)}</td>
                      <td className="px-3 py-3 text-stone-300">
                        {formatDate(shift.startDate)} - {formatDate(shift.endDate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Card title="Agenda de mantenimiento" subtitle="Tareas generadas con sus técnicos asignados.">
          {maintenancePreview.length === 0 ? (
            <StatusMessage
              title="Sin mantenimiento"
              message="Todavía no se ha generado la agenda de mantenimiento."
              variant="empty"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-stone-800 text-left text-sm">
                <thead>
                  <tr className="text-stone-400">
                    <th className="px-3 py-3 font-extrabold uppercase">Atracción</th>
                    <th className="px-3 py-3 font-extrabold uppercase">Fecha</th>
                    <th className="px-3 py-3 font-extrabold uppercase">Técnicos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-900">
                  {maintenancePreview.map((task) => (
                    <tr key={task.id}>
                      <td className="px-3 py-3 text-stone-300">
                        <div className="font-bold text-stone-100">{task.attractionName}</div>
                        <div className="text-xs text-stone-500">{formatMaintenanceStatus(task.status)}</div>
                      </td>
                      <td className="px-3 py-3 text-stone-300">{formatDate(task.scheduledDate)}</td>
                      <td className="px-3 py-3 text-stone-300">
                        {task.technicians.length
                          ? task.technicians.map((technician) => technician.fullName).join(', ')
                          : 'Sin asignar'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </section>
  )
}

export default OperationsBoard
