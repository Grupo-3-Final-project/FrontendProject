import { useMemo, useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import StatusMessage from '../../components/ui/StatusMessage'

const inputClasses =
  'min-h-11 w-full rounded-md border border-stone-700 bg-stone-950/90 px-3 py-2 text-sm text-stone-100 outline-none transition focus:border-red-500'

const textareaClasses = `${inputClasses} min-h-28 resize-y`

const panelBlockClasses =
  'rounded-lg border border-stone-800 bg-[linear-gradient(180deg,rgba(28,25,23,0.72),rgba(3,3,4,0.32))] shadow-[0_14px_34px_rgba(0,0,0,0.18)]'

const actionButtonBaseClasses =
  'inline-flex h-8 min-h-8 w-8 items-center justify-center rounded-md border p-0 text-stone-100 shadow-none transition duration-150 ease-out focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-yellow-500/80 enabled:cursor-pointer enabled:hover:-translate-y-px enabled:active:translate-y-0'

const editActionButtonClasses =
  `${actionButtonBaseClasses} border-stone-700 bg-stone-950/85 enabled:hover:border-stone-500 enabled:hover:bg-stone-800`

const deleteActionButtonClasses =
  `${actionButtonBaseClasses} border-white/10 bg-gradient-to-b from-red-500 to-red-900 enabled:hover:from-red-400 enabled:hover:to-red-700`

function EntityManager({
  definition,
  items,
  formValues,
  editingId,
  isSubmitting,
  statusMessage,
  onFieldChange,
  onSubmit,
  onEdit,
  onDelete,
  onCancel,
  onUploadImage,
}) {
  const [selectedFiles, setSelectedFiles] = useState({})
  const [uploadingField, setUploadingField] = useState('')

  const canEdit = definition.canEdit !== false
  const canDelete = definition.canDelete !== false
  const hasActions = canEdit || canDelete
  const formTitle = editingId ? 'Editar registro' : 'Nuevo registro'
  const sortedItems = useMemo(() => items ?? [], [items])

  const handleChange = (field, value) => {
    onFieldChange(definition.key, field, value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await onSubmit(definition.key)
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Esta acción eliminará el registro seleccionado. ¿Deseas continuar?')

    if (!confirmed) {
      return
    }

    await onDelete(definition.key, id)
  }

  const handleUpload = async (field) => {
    const file = selectedFiles[field.name]

    if (!file || !onUploadImage) {
      return
    }

    setUploadingField(field.name)

    try {
      const uploadedImage = await onUploadImage(file, field.folder)
      handleChange(field.name, uploadedImage.imageUrl)
      setSelectedFiles((current) => ({
        ...current,
        [field.name]: null,
      }))
    } finally {
      setUploadingField('')
    }
  }

  return (
    <section className="grid gap-5 2xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <Card title={definition.title} subtitle={definition.description}>
        <div className="space-y-4">
          {statusMessage ? (
            <div className="rounded-xl border border-red-950/35 bg-black/20 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_18px_42px_rgba(0,0,0,0.22)]">
              <StatusMessage title={statusMessage.title} message={statusMessage.message} variant={statusMessage.variant} />
            </div>
          ) : null}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="rounded-lg border border-red-900/60 bg-[linear-gradient(180deg,rgba(127,29,29,0.22),rgba(3,3,4,0.46))] px-4 py-3 shadow-[0_14px_34px_rgba(0,0,0,0.18)]">
              <div className="text-xs font-bold uppercase text-stone-500">Formulario</div>
              <h3 className="mt-1 text-base font-black text-stone-100">{formTitle}</h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {definition.fields.map((field) => {
                const fieldValue = formValues[field.name]

                if (field.type === 'textarea') {
                  return (
                    <label key={field.name} className="block space-y-2 md:col-span-2">
                      <span className="text-sm font-bold text-stone-200">{field.label}</span>
                      <textarea
                        className={textareaClasses}
                        value={fieldValue}
                        onChange={(event) => handleChange(field.name, event.target.value)}
                        required
                      />
                    </label>
                  )
                }

                if (field.type === 'select') {
                  return (
                    <label key={field.name} className="block space-y-2">
                      <span className="text-sm font-bold text-stone-200">{field.label}</span>
                      <select
                        className={inputClasses}
                        value={fieldValue}
                        onChange={(event) => handleChange(field.name, event.target.value)}
                      >
                        {field.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  )
                }

                if (field.type === 'checkbox') {
                  return (
                    <label
                      key={field.name}
                        className="flex min-h-11 items-center justify-between rounded-md border border-stone-700 bg-[linear-gradient(180deg,rgba(28,25,23,0.72),rgba(3,3,4,0.32))] px-3 py-2 md:col-span-2"
                    >
                      <span className="text-sm font-bold text-stone-200">{field.label}</span>
                      <input
                        checked={Boolean(fieldValue)}
                        type="checkbox"
                        onChange={(event) => handleChange(field.name, event.target.checked)}
                      />
                    </label>
                  )
                }

                if (field.type === 'image') {
                  return (
                    <div key={field.name} className="space-y-3 md:col-span-2">
                      <label className="block space-y-2">
                        <span className="text-sm font-bold text-stone-200">{field.label}</span>
                        <input
                          className={inputClasses}
                          value={fieldValue}
                          onChange={(event) => handleChange(field.name, event.target.value)}
                          type="url"
                          placeholder="https://..."
                          required
                        />
                      </label>
                      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                        <input
                          className={`${inputClasses} file:mr-3 file:rounded-md file:border-0 file:bg-red-700 file:px-3 file:py-2 file:font-bold file:text-white`}
                          type="file"
                          accept="image/*"
                          onChange={(event) =>
                            setSelectedFiles((current) => ({
                              ...current,
                              [field.name]: event.target.files?.[0] ?? null,
                            }))
                          }
                        />
                        <Button
                          disabled={!selectedFiles[field.name] || uploadingField === field.name}
                          onClick={() => handleUpload(field)}
                          variant="secondary"
                        >
                          {uploadingField === field.name ? 'Subiendo...' : 'Subir a Cloudinary'}
                        </Button>
                      </div>
                      {fieldValue ? (
                        <img
                          src={fieldValue}
                          alt="Vista previa"
                          className="h-40 w-full rounded-md border border-stone-800 bg-black/30 object-cover shadow-[0_14px_34px_rgba(0,0,0,0.18)]"
                        />
                      ) : null}
                    </div>
                  )
                }

                return (
                  <label key={field.name} className="block space-y-2">
                    <span className="text-sm font-bold text-stone-200">{field.label}</span>
                    <input
                      className={inputClasses}
                      value={fieldValue}
                      onChange={(event) => handleChange(field.name, event.target.value)}
                      type={field.type}
                      min={field.min}
                      step={field.step}
                      required
                    />
                  </label>
                )
              })}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Guardando...' : editingId ? 'Guardar cambios' : 'Crear registro'}
              </Button>
              {editingId ? (
                <Button onClick={() => onCancel(definition.key)} variant="secondary">
                  Cancelar edición
                </Button>
              ) : null}
            </div>
          </form>
        </div>
      </Card>

      <Card title={`Listado de ${definition.title.toLowerCase()}`} subtitle="Todos los registros disponibles en este momento.">
        {sortedItems.length === 0 ? (
          <StatusMessage
            title="Sin registros"
            message="Todavía no hay datos para esta sección."
            variant="empty"
          />
        ) : (
          <div className={`${panelBlockClasses} overflow-hidden`}>
            <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-stone-800 text-left text-sm">
              <thead className="bg-[linear-gradient(90deg,rgba(127,29,29,0.2),rgba(28,25,23,0.2))]">
                <tr className="text-stone-400">
                  {definition.columns.map((column) => (
                    <th key={column.key} className="px-3 py-3 text-[0.72rem] font-extrabold uppercase">
                      {column.label}
                    </th>
                  ))}
                  {hasActions ? (
                    <th className="w-20 px-2 py-3 text-center text-[0.72rem] font-extrabold uppercase">Acciones</th>
                  ) : null}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-900">
                {sortedItems.map((item) => (
                  <tr key={item.id} className="align-top transition hover:bg-white/[0.03]">
                    {definition.columns.map((column) => (
                      <td key={column.key} className="px-3 py-3 text-stone-300">
                        {column.render ? column.render(item) : item[column.key]}
                      </td>
                    ))}
                    {hasActions ? (
                      <td className="px-2 py-3">
                        <div className="flex flex-nowrap justify-center gap-1.5">
                          {canEdit ? (
                            <button
                              aria-label="Editar registro"
                              className={editActionButtonClasses}
                              onClick={() => onEdit(definition.key, item)}
                              title="Editar"
                              type="button"
                            >
                              <Pencil className="h-4 w-4" aria-hidden="true" />
                            </button>
                          ) : null}
                          {canDelete ? (
                            <button
                              aria-label="Eliminar registro"
                              className={deleteActionButtonClasses}
                              onClick={() => handleDelete(item.id)}
                              title="Eliminar"
                              type="button"
                            >
                              <Trash2 className="h-4 w-4" aria-hidden="true" />
                            </button>
                          ) : null}
                        </div>
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        )}
      </Card>
    </section>
  )
}

export default EntityManager
