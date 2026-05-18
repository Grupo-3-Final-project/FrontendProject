import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import OperationsBoard from './OperationsBoard'

describe('OperationsBoard', () => {
  it('renders empty states and generates shifts and maintenance', async () => {
    const onGenerateShifts = vi.fn().mockResolvedValue()
    const onGenerateMaintenance = vi.fn().mockResolvedValue()

    render(
      <OperationsBoard
        shifts={[]}
        maintenance={[]}
        onGenerateShifts={onGenerateShifts}
        onGenerateMaintenance={onGenerateMaintenance}
        statusMessage={{ title: 'Estado', message: 'Sincronizado', variant: 'success' }}
      />,
    )

    expect(screen.getByText('Sin turnos')).toBeInTheDocument()
    expect(screen.getByText('Sin mantenimiento')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /^Generar turnos$/i }))
    fireEvent.click(screen.getByRole('button', { name: /^Generar mantenimiento$/i }))

    await waitFor(() => {
      expect(onGenerateShifts).toHaveBeenCalledTimes(1)
      expect(onGenerateMaintenance).toHaveBeenCalledTimes(1)
    })

    expect(onGenerateShifts.mock.calls[0][0]).toHaveProperty('startDate')
    expect(onGenerateMaintenance.mock.calls[0][0]).toHaveProperty('endDate')
  })

  it('shows preview tables with generated shifts and maintenance', () => {
    render(
      <OperationsBoard
        shifts={[
          {
            id: 1,
            employeeFullName: 'Laura Gomez',
            employeeType: 'TECHNICIAN',
            shift: 'MORNING',
            startDate: '2026-05-01',
            endDate: '2026-05-15',
          },
        ]}
        maintenance={[
          {
            id: 2,
            attractionName: 'Torre del Terror',
            status: 'SCHEDULED',
            scheduledDate: '2026-05-03',
            technicians: [{ fullName: 'Mario Lopez' }],
          },
        ]}
        onGenerateShifts={vi.fn()}
        onGenerateMaintenance={vi.fn()}
        statusMessage={null}
      />,
    )

    expect(screen.getByText('Laura Gomez')).toBeInTheDocument()
    expect(screen.getByText('Técnico')).toBeInTheDocument()
    expect(screen.getByText('Torre del Terror')).toBeInTheDocument()
    expect(screen.getByText('Mario Lopez')).toBeInTheDocument()
  })

  it('shows maintenance without technicians and keeps buttons disabled while submitting', async () => {
    let resolveShifts
    let resolveMaintenance

    const onGenerateShifts = vi.fn().mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveShifts = resolve
        }),
    )
    const onGenerateMaintenance = vi.fn().mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveMaintenance = resolve
        }),
    )

    render(
      <OperationsBoard
        shifts={[]}
        maintenance={[
          {
            id: 2,
            attractionName: 'Bosque Maldito',
            status: 'IN_PROGRESS',
            scheduledDate: '2026-05-03',
            technicians: [],
          },
        ]}
        onGenerateShifts={onGenerateShifts}
        onGenerateMaintenance={onGenerateMaintenance}
        statusMessage={null}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: /^Generar turnos$/i }))
    fireEvent.click(screen.getByRole('button', { name: /^Generar mantenimiento$/i }))

    expect(screen.getAllByRole('button', { name: 'Generando...' })).toHaveLength(2)
    expect(screen.getByText('Sin asignar')).toBeInTheDocument()

    resolveShifts()
    resolveMaintenance()
  })

  it('propagates edited date ranges to both generation handlers', async () => {
    const onGenerateShifts = vi.fn().mockResolvedValue()
    const onGenerateMaintenance = vi.fn().mockResolvedValue()

    render(
      <OperationsBoard
        shifts={[]}
        maintenance={[]}
        onGenerateShifts={onGenerateShifts}
        onGenerateMaintenance={onGenerateMaintenance}
        statusMessage={null}
      />,
    )

    const startInputs = screen.getAllByLabelText('Fecha inicio')
    const endInputs = screen.getAllByLabelText('Fecha fin')

    fireEvent.change(startInputs[0], { target: { value: '2026-06-01' } })
    fireEvent.change(endInputs[0], { target: { value: '2026-06-15' } })
    fireEvent.change(startInputs[1], { target: { value: '2026-07-01' } })
    fireEvent.change(endInputs[1], { target: { value: '2026-07-20' } })

    fireEvent.click(screen.getByRole('button', { name: /^Generar turnos$/i }))
    fireEvent.click(screen.getByRole('button', { name: /^Generar mantenimiento$/i }))

    await waitFor(() => {
      expect(onGenerateShifts).toHaveBeenCalledWith({
        startDate: '2026-06-01',
        endDate: '2026-06-15',
      })
      expect(onGenerateMaintenance).toHaveBeenCalledWith({
        startDate: '2026-07-01',
        endDate: '2026-07-20',
      })
    })
  })
})
