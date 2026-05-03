import { Badge, Button, Card, SelectField, TextAreaField, TextField } from '../../components/ui'

const gridColumnsClasses = {
  3: 'lg:grid-cols-[repeat(3,minmax(0,1fr))_150px]',
  4: 'lg:grid-cols-[repeat(4,minmax(0,1fr))_150px]',
  5: 'lg:grid-cols-[repeat(5,minmax(0,1fr))_150px]',
}

function FieldRenderer({ field, value, error, onChange }) {
  if (field.type === 'textarea') {
    return (
      <TextAreaField
        label={field.label}
        value={value}
        error={error}
        onChange={(event) => onChange(field.name, event.target.value)}
      />
    )
  }

  if (field.type === 'select') {
    const options = field.options[0]?.value === ''
      ? field.options
      : [{ value: '', label: `Selecciona ${field.label.toLowerCase()}`, disabled: false }, ...field.options]

    return (
      <SelectField
        label={field.label}
        value={value}
        error={error}
        options={options}
        onChange={(event) => onChange(field.name, event.target.value)}
      />
    )
  }

  return (
    <TextField
      label={field.label}
      type={field.type}
      value={value}
      error={error}
      onChange={(event) => onChange(field.name, event.target.value)}
    />
  )
}

function DashboardCrudPanel({
  title,
  subtitle,
  fields,
  rows,
  columns,
  form,
  errors,
  editingLabel,
  isSaving,
  onFieldChange,
  onSubmit,
  onReset,
  onEdit,
  onDelete,
  allowEdit = true,
  emptyMessage,
  submitLabel,
  createLabel,
}) {
  const gridClassName = gridColumnsClasses[columns.length] || gridColumnsClasses[4]

  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.95fr)]">
      <Card title={title} subtitle={subtitle}>
        <div className="overflow-hidden rounded-lg border border-white/10">
          <div className={`hidden gap-3 border-b border-white/10 bg-red-950/30 px-4 py-3 text-xs font-black tracking-[0.12em] text-stone-300 uppercase lg:grid ${gridClassName}`}>
            {columns.map((column) => (
              <span key={column.label}>{column.label}</span>
            ))}
            <span className="text-right">Acciones</span>
          </div>

          <div className="divide-y divide-white/10">
            {rows.length > 0 ? (
              rows.map((row) => (
                <div
                  key={row.id}
                  className={`grid gap-3 bg-black/20 px-4 py-4 lg:grid ${gridClassName}`}
                >
                  {columns.map((column) => (
                    <div key={`${row.id}-${column.label}`} className="min-w-0">
                      <p className="text-[0.68rem] font-black tracking-[0.12em] text-stone-500 uppercase lg:hidden">
                        {column.label}
                      </p>
                      <div className="mt-1 text-sm text-stone-300">{column.render(row)}</div>
                    </div>
                  ))}

                  <div className="flex flex-wrap items-center justify-end gap-2">
                    {allowEdit ? (
                      <Button variant="ghost" onClick={() => onEdit(row)}>
                        Editar
                      </Button>
                    ) : null}
                    {onDelete ? (
                      <Button variant="danger" onClick={() => onDelete(row)}>
                        Borrar
                      </Button>
                    ) : null}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-sm text-stone-500">{emptyMessage}</div>
            )}
          </div>
        </div>
      </Card>

      <Card
        title={editingLabel ? `Editar ${editingLabel}` : createLabel}
        subtitle="Los cambios se envian directamente al backend protegido."
      >
        <div className="space-y-4">
          {editingLabel ? <Badge variant="warning">Modo edicion</Badge> : <Badge variant="success">Alta nueva</Badge>}

          <div className="grid gap-4">
            {fields.map((field) => (
              <FieldRenderer
                key={field.name}
                field={field}
                value={form[field.name]}
                error={errors[field.name]}
                onChange={onFieldChange}
              />
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button className="w-full" disabled={isSaving} onClick={onSubmit}>
              {isSaving ? 'Guardando...' : submitLabel}
            </Button>
            <Button className="w-full" variant="ghost" onClick={onReset}>
              Limpiar formulario
            </Button>
          </div>
        </div>
      </Card>
    </section>
  )
}

export default DashboardCrudPanel
