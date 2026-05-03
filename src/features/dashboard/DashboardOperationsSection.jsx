import { Badge, Button, Card, StatusMessage, TextField } from '../../components/ui'
import {
  formatDate,
  getEmployeeTypeLabel,
  getMaintenanceStatusLabel,
  getShiftLabel,
} from './dashboardUtils'

function WindowForm({ title, subtitle, form, errors, isSubmitting, submitLabel, onChange, onSubmit }) {
  return (
    <Card title={title} subtitle={subtitle}>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            label="Fecha de inicio"
            type="date"
            value={form.startDate}
            error={errors.startDate}
            onChange={(event) => onChange('startDate', event.target.value)}
          />
          <TextField
            label="Fecha de fin"
            type="date"
            value={form.endDate}
            error={errors.endDate}
            onChange={(event) => onChange('endDate', event.target.value)}
          />
        </div>
        <Button className="w-full" disabled={isSubmitting} onClick={onSubmit}>
          {isSubmitting ? 'Procesando...' : submitLabel}
        </Button>
      </div>
    </Card>
  )
}

function DashboardOperationsSection({
  shifts,
  maintenance,
  shiftWindow,
  maintenanceWindow,
  shiftErrors,
  maintenanceErrors,
  lastActionMessage,
  isGeneratingShifts,
  isGeneratingMaintenance,
  onShiftFieldChange,
  onMaintenanceFieldChange,
  onGenerateShifts,
  onGenerateMaintenance,
}) {
  return (
    <div className="space-y-5">
      {lastActionMessage ? (
        <StatusMessage
          title="Operacion completada"
          message={lastActionMessage}
          variant="success"
        />
      ) : null}

      <section className="grid gap-5 xl:grid-cols-2">
        <WindowForm
          title="Generar turnos"
          subtitle="Rango protegido para crear turnos de 15 dias."
          form={shiftWindow}
          errors={shiftErrors}
          isSubmitting={isGeneratingShifts}
          submitLabel="Generar turnos"
          onChange={onShiftFieldChange}
          onSubmit={onGenerateShifts}
        />
        <WindowForm
          title="Generar mantenimiento"
          subtitle="Genera agenda automatica segun las atracciones activas."
          form={maintenanceWindow}
          errors={maintenanceErrors}
          isSubmitting={isGeneratingMaintenance}
          submitLabel="Generar mantenimiento"
          onChange={onMaintenanceFieldChange}
          onSubmit={onGenerateMaintenance}
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <Card title="Turnos generados" subtitle="Vista operativa de cobertura actual.">
          <div className="space-y-3">
            {shifts.length > 0 ? (
              shifts.map((shift) => (
                <div
                  key={shift.id}
                  className="rounded-md border border-white/10 bg-black/25 px-3 py-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <strong className="text-sm text-stone-100">{shift.employeeFullName}</strong>
                    <Badge variant="neutral">{getShiftLabel(shift.shift)}</Badge>
                  </div>
                  <div className="mt-2 text-sm text-stone-400">
                    {getEmployeeTypeLabel(shift.employeeType)} · {formatDate(shift.startDate)} - {formatDate(shift.endDate)}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-stone-500">No hay turnos generados.</div>
            )}
          </div>
        </Card>

        <Card title="Agenda de mantenimiento" subtitle="Tareas planificadas desde backend.">
          <div className="space-y-3">
            {maintenance.length > 0 ? (
              maintenance.map((task) => (
                <div
                  key={task.id}
                  className="rounded-md border border-white/10 bg-black/25 px-3 py-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <strong className="text-sm text-stone-100">{task.attractionName}</strong>
                    <Badge variant={task.status === 'SCHEDULED' ? 'warning' : 'success'}>
                      {getMaintenanceStatusLabel(task.status)}
                    </Badge>
                  </div>
                  <div className="mt-2 text-sm text-stone-400">
                    {formatDate(task.scheduledDate)}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {task.technicians.map((technician) => (
                      <Badge key={technician.id} variant="neutral">
                        {technician.fullName}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-stone-500">No hay tareas de mantenimiento generadas.</div>
            )}
          </div>
        </Card>
      </section>
    </div>
  )
}

export default DashboardOperationsSection
