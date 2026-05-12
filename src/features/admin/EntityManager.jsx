import { useMemo, useState } from 'react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import StatusMessage from '../../components/ui/StatusMessage'

const inputClasses =
  'min-h-11 w-full rounded-md border border-stone-700 bg-stone-950/90 px-3 py-2 text-sm text-stone-100 outline-none transition focus:border-red-500'

const textareaClasses = `${inputClasses} min-h-28 resize-y`

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
    const confirmed = window.confirm('Esta accion eliminara el registro seleccionado. Deseas continuar?')

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
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <Card title={definition.title} subtitle={definition.description}>
        <div className="space-y-4">
          {statusMessage ? (
            <StatusMessage title={statusMessage.title} message={statusMessage.message} variant={statusMessage.variant} />
          ) : null}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="rounded-lg border border-red-900/40 bg-black/20 px-4 py-3">
              <h3 className="text-base font-black text-stone-100">{formTitle}</h3>
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
                      className="flex min-h-11 items-center justify-between rounded-md border border-stone-700 bg-stone-950/90 px-3 py-2 md:col-span-2"
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
                          className="h-40 w-full rounded-md border border-stone-800 object-cover"
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
                  Cancelar edicion
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
            message="Todavia no hay datos para esta seccion."
            variant="empty"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-stone-800 text-left text-sm">
              <thead>
                <tr className="text-stone-400">
                  {definition.columns.map((column) => (
                    <th key={column.key} className="px-3 py-3 font-extrabold uppercase">
                      {column.label}
                    </th>
                  ))}
                  {hasActions ? (
                    <th className="px-3 py-3 font-extrabold uppercase">Acciones</th>
                  ) : null}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-900">
                {sortedItems.map((item) => (
                  <tr key={item.id} className="align-top">
                    {definition.columns.map((column) => (
                      <td key={column.key} className="px-3 py-3 text-stone-300">
                        {column.render ? column.render(item) : item[column.key]}
                      </td>
                    ))}
                    {hasActions ? (
                      <td className="px-3 py-3">
                        <div className="flex flex-wrap gap-2">
                          {canEdit ? (
                            <Button onClick={() => onEdit(definition.key, item)} variant="secondary">
                              Editar
                            </Button>
                          ) : null}
                          {canDelete ? (
                            <Button onClick={() => handleDelete(item.id)} variant="danger">
                              Eliminar
                            </Button>
                          ) : null}
                        </div>
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </section>
  )
}

export default EntityManager
