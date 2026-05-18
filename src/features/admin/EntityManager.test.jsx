import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import EntityManager from './EntityManager'

const definition = {
  key: 'demo',
  title: 'Registros',
  description: 'Gestion demo',
  fields: [
    { name: 'name', label: 'Nombre', type: 'text' },
    { name: 'description', label: 'Descripcion', type: 'textarea' },
    {
      name: 'status',
      label: 'Estado',
      type: 'select',
      options: [
        { value: 'OPEN', label: 'Abierta' },
        { value: 'CLOSED', label: 'Cerrada' },
      ],
    },
    { name: 'active', label: 'Activo', type: 'checkbox' },
    { name: 'imageUrl', label: 'Imagen', type: 'image', folder: 'demo-folder' },
  ],
  columns: [
    { key: 'name', label: 'Nombre' },
    { key: 'status', label: 'Estado' },
  ],
}

describe('EntityManager', () => {
  beforeEach(() => {
    window.confirm = vi.fn(() => true)
  })

  it('submits, uploads images and handles edit and delete actions', async () => {
    const onFieldChange = vi.fn()
    const onSubmit = vi.fn().mockResolvedValue()
    const onEdit = vi.fn()
    const onDelete = vi.fn().mockResolvedValue()
    const onCancel = vi.fn()
    const onUploadImage = vi.fn().mockResolvedValue({
      imageUrl: 'https://cdn.example.com/demo.png',
    })

    const { container } = render(
      <EntityManager
        definition={definition}
        items={[{ id: 7, name: 'Elemento demo', status: 'OPEN' }]}
        formValues={{
          name: 'Elemento demo',
          description: 'Texto',
          status: 'OPEN',
          active: true,
          imageUrl: '',
        }}
        editingId={7}
        isSubmitting={false}
        statusMessage={{ title: 'Correcto', message: 'Guardado', variant: 'success' }}
        onFieldChange={onFieldChange}
        onSubmit={onSubmit}
        onEdit={onEdit}
        onDelete={onDelete}
        onCancel={onCancel}
        onUploadImage={onUploadImage}
      />,
    )

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Cambio' } })
    fireEvent.change(screen.getByLabelText('Descripcion'), { target: { value: 'Detalle' } })
    fireEvent.change(screen.getByLabelText('Estado'), { target: { value: 'CLOSED' } })
    fireEvent.click(screen.getByLabelText('Activo'))

    const file = new File(['image'], 'demo.png', { type: 'image/png' })
    const fileInput = container.querySelector('input[type="file"]')
    fireEvent.change(fileInput, { target: { files: [file] } })
    fireEvent.click(screen.getByRole('button', { name: /Subir a Cloudinary/i }))

    await waitFor(() => {
      expect(onUploadImage).toHaveBeenCalledWith(file, 'demo-folder')
    })

    expect(onFieldChange).toHaveBeenCalledWith('demo', 'imageUrl', 'https://cdn.example.com/demo.png')

    fireEvent.submit(screen.getByRole('button', { name: /Guardar cambios/i }).closest('form'))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith('demo')
    })

    fireEvent.click(screen.getByRole('button', { name: /Cancelar edición/i }))
    expect(onCancel).toHaveBeenCalledWith('demo')

    fireEvent.click(screen.getByRole('button', { name: /^Editar$/i }))
    expect(onEdit).toHaveBeenCalledWith('demo', { id: 7, name: 'Elemento demo', status: 'OPEN' })

    fireEvent.click(screen.getByRole('button', { name: /^Eliminar$/i }))
    await waitFor(() => {
      expect(onDelete).toHaveBeenCalledWith('demo', 7)
    })
  })

  it('shows the empty state when there are no records', () => {
    render(
      <EntityManager
        definition={{ ...definition, canEdit: false, canDelete: false }}
        items={[]}
        formValues={{ name: '', description: '', status: 'OPEN', active: false, imageUrl: '' }}
        editingId={null}
        isSubmitting={false}
        statusMessage={null}
        onFieldChange={vi.fn()}
        onSubmit={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onCancel={vi.fn()}
        onUploadImage={vi.fn()}
      />,
    )

    expect(screen.getByText('Sin registros')).toBeInTheDocument()
    expect(screen.getByText('Todavía no hay datos para esta sección.')).toBeInTheDocument()
  })
})
