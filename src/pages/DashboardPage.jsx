import { useCallback, useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { createAttraction, deleteAttraction, getAttractions, updateAttraction } from '../api/attractionApi'
import { createBooking, getBookings } from '../api/bookingApi'
import { getDashboardSummary } from '../api/dashboardApi'
import { createEmployee, deleteEmployee, getEmployees, updateEmployee } from '../api/employeeApi'
import { createHotel, deleteHotel, getHotels, updateHotel } from '../api/hotelApi'
import { uploadImage } from '../api/imageApi'
import { generateMaintenanceTasks, getMaintenanceTasks } from '../api/maintenanceApi'
import { createOffer, deleteOffer, getOffers, updateOffer } from '../api/offerApi'
import { generateShifts, getShifts } from '../api/shiftApi'
import { getApiErrorMessage } from '../api/apiClient'
import { createUser, deleteUser, getUsers, updateUser } from '../api/userApi'
import Button from '../components/ui/Button'
import StatusMessage from '../components/ui/StatusMessage'
import BookingDesk from '../features/admin/BookingDesk'
import EntityManager from '../features/admin/EntityManager'
import OperationsBoard from '../features/admin/OperationsBoard'
import OverviewPanel from '../features/admin/OverviewPanel'
import { dashboardTabs, entityDefinitions } from '../features/admin/adminConfig.jsx'

const currentYear = new Date().getFullYear()

const entityServices = {
  users: {
    load: getUsers,
    create: createUser,
    update: updateUser,
    remove: deleteUser,
  },
  hotels: {
    load: getHotels,
    create: createHotel,
    update: updateHotel,
    remove: deleteHotel,
  },
  attractions: {
    load: getAttractions,
    create: createAttraction,
    update: updateAttraction,
    remove: deleteAttraction,
  },
  offers: {
    load: getOffers,
    create: createOffer,
    update: updateOffer,
    remove: deleteOffer,
  },
  employees: {
    load: getEmployees,
    create: createEmployee,
    update: updateEmployee,
    remove: deleteEmployee,
  },
}

function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') ?? 'overview'
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pageError, setPageError] = useState('')
  const [resources, setResources] = useState({
    users: [],
    hotels: [],
    attractions: [],
    employees: [],
    offers: [],
    bookings: [],
    shifts: [],
    maintenance: [],
  })
  const [summary, setSummary] = useState({
    year: currentYear,
    totalRevenue: 0,
    ticketsByAgeRange: [],
    topHotels: [],
  })
  const [forms, setForms] = useState(createInitialForms())
  const [editingIds, setEditingIds] = useState({
    users: null,
    hotels: null,
    attractions: null,
    offers: null,
    employees: null,
  })
  const [submittingState, setSubmittingState] = useState({
    users: false,
    hotels: false,
    attractions: false,
    offers: false,
    employees: false,
  })
  const [sectionMessages, setSectionMessages] = useState({})

  useEffect(() => {
    if (!dashboardTabs.some((tab) => tab.key === activeTab)) {
      setSearchParams({ tab: 'overview' })
    }
  }, [activeTab, setSearchParams])

  const resetEntityForm = useCallback((entityKey) => {
    setForms((current) => ({
      ...current,
      [entityKey]: {
        ...entityDefinitions[entityKey].emptyForm,
      },
    }))
    setEditingIds((current) => ({
      ...current,
      [entityKey]: null,
    }))
  }, [])

  const setSectionMessage = useCallback((sectionKey, title, message, variant) => {
    setSectionMessages((current) => ({
      ...current,
      [sectionKey]: { title, message, variant },
    }))
  }, [])

  const clearSectionMessage = useCallback((sectionKey) => {
    setSectionMessages((current) => ({
      ...current,
      [sectionKey]: null,
    }))
  }, [])

  const loadAdminData = useCallback(async () => {
    const [summaryData, users, hotels, attractions, employees, offers, bookings, shifts, maintenance] =
      await Promise.all([
        getDashboardSummary(currentYear),
        getUsers(),
        getHotels(),
        getAttractions(),
        getEmployees(),
        getOffers(),
        getBookings(),
        getShifts(),
        getMaintenanceTasks(),
      ])

    setSummary(summaryData)
    setResources({
      users,
      hotels,
      attractions,
      employees,
      offers,
      bookings,
      shifts,
      maintenance,
    })
  }, [])

  const refreshAdminData = useCallback(
    async (mode = 'load') => {
      if (mode === 'load') {
        setIsLoading(true)
      } else {
        setIsRefreshing(true)
      }

      try {
        await loadAdminData()
        setPageError('')
      } catch (error) {
        setPageError(getApiErrorMessage(error, 'No se han podido cargar los datos del panel.'))
      } finally {
        setIsLoading(false)
        setIsRefreshing(false)
      }
    },
    [loadAdminData],
  )

  useEffect(() => {
    void refreshAdminData()
  }, [refreshAdminData])

  const handleFieldChange = (entityKey, fieldName, value) => {
    setForms((current) => ({
      ...current,
      [entityKey]: {
        ...current[entityKey],
        [fieldName]: value,
      },
    }))
  }

  const handleEdit = (entityKey, item) => {
    setForms((current) => ({
      ...current,
      [entityKey]: entityDefinitions[entityKey].fromItem(item),
    }))
    setEditingIds((current) => ({
      ...current,
      [entityKey]: item.id,
    }))
    setSectionMessage(entityKey, 'Edición activa', 'Ya puedes modificar el formulario y guardar los cambios.', 'info')
  }

  const reloadEntity = useCallback(async (entityKey) => {
    const items = await entityServices[entityKey].load()

    setResources((current) => ({
      ...current,
      [entityKey]: items,
    }))
  }, [])

  const handleEntitySubmit = async (entityKey) => {
    clearSectionMessage(entityKey)
    setSubmittingState((current) => ({
      ...current,
      [entityKey]: true,
    }))

    try {
      const payload = entityDefinitions[entityKey].toPayload(forms[entityKey])
      const currentId = editingIds[entityKey]

      if (currentId) {
        await entityServices[entityKey].update(currentId, payload)
        setSectionMessage(entityKey, 'Registro actualizado', 'Los cambios se han guardado correctamente.', 'success')
      } else {
        await entityServices[entityKey].create(payload)
        setSectionMessage(entityKey, 'Registro creado', 'El nuevo elemento ya está disponible en el listado.', 'success')
      }

      await reloadEntity(entityKey)
      resetEntityForm(entityKey)
    } catch (error) {
      setSectionMessage(entityKey, 'Operación rechazada', getApiErrorMessage(error), 'error')
    } finally {
      setSubmittingState((current) => ({
        ...current,
        [entityKey]: false,
      }))
    }
  }

  const handleEntityDelete = async (entityKey, id) => {
    clearSectionMessage(entityKey)

    try {
      await entityServices[entityKey].remove(id)
      await reloadEntity(entityKey)
      if (editingIds[entityKey] === id) {
        resetEntityForm(entityKey)
      }
      setSectionMessage(entityKey, 'Registro eliminado', 'El elemento se ha borrado correctamente.', 'success')
    } catch (error) {
      setSectionMessage(entityKey, 'No se ha podido eliminar', getApiErrorMessage(error), 'error')
    }
  }

  const handleUploadImage = async (file, folder) => {
    try {
      return await uploadImage(file, folder)
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'No se ha podido subir la imagen.'), { cause: error })
    }
  }

  const handleBookingUserCreate = async (payload) => {
    try {
      const createdUser = await createUser(payload)
      await reloadEntity('users')
      setSectionMessage('bookings', 'Cliente creado', 'El cliente ya aparece en el listado.', 'success')
      return createdUser
    } catch (error) {
      setSectionMessage('bookings', 'No se ha podido dar de alta al cliente', getApiErrorMessage(error), 'error')
      throw error
    }
  }

  const handleBookingCreate = async (payload) => {
    try {
      const booking = await createBooking(payload)
      await Promise.all([
        reloadEntity('hotels'),
        getBookings().then((bookings) =>
          setResources((current) => ({
            ...current,
            bookings,
          })),
        ),
        getDashboardSummary(currentYear).then(setSummary),
      ])
      setSectionMessage('bookings', 'Compra registrada', 'La compra se ha guardado correctamente.', 'success')
      return booking
    } catch (error) {
      setSectionMessage('bookings', 'No se ha podido registrar la compra', getApiErrorMessage(error), 'error')
      throw error
    }
  }

  const handleGenerateShifts = async (payload) => {
    try {
      await generateShifts(payload)
      const shifts = await getShifts()
      setResources((current) => ({
        ...current,
        shifts,
      }))
      setSectionMessage('operations', 'Turnos generados', 'La planificación se ha actualizado.', 'success')
    } catch (error) {
      setSectionMessage('operations', 'No se han podido generar turnos', getApiErrorMessage(error), 'error')
    }
  }

  const handleGenerateMaintenance = async (payload) => {
    try {
      await generateMaintenanceTasks(payload)
      const maintenance = await getMaintenanceTasks()
      setResources((current) => ({
        ...current,
        maintenance,
      }))
      setSectionMessage('operations', 'Mantenimiento generado', 'La agenda de mantenimiento se ha actualizado.', 'success')
    } catch (error) {
      setSectionMessage('operations', 'No se ha podido generar mantenimiento', getApiErrorMessage(error), 'error')
    }
  }

  const activeEntityDefinition = entityDefinitions[activeTab]

  const renderContent = (() => {
    if (isLoading) {
      return (
        <StatusMessage
          title="Cargando panel"
          message="Estamos cargando la información del panel."
          variant="info"
        />
      )
    }

    if (activeEntityDefinition) {
      return (
        <EntityManager
          definition={activeEntityDefinition}
          items={resources[activeEntityDefinition.key]}
          formValues={forms[activeEntityDefinition.key]}
          editingId={editingIds[activeEntityDefinition.key]}
          isSubmitting={submittingState[activeEntityDefinition.key]}
          statusMessage={sectionMessages[activeEntityDefinition.key]}
          onFieldChange={handleFieldChange}
          onSubmit={handleEntitySubmit}
          onEdit={handleEdit}
          onDelete={handleEntityDelete}
          onCancel={resetEntityForm}
          onUploadImage={handleUploadImage}
        />
      )
    }

    if (activeTab === 'bookings') {
      return (
        <BookingDesk
          users={resources.users}
          hotels={resources.hotels}
          offers={resources.offers}
          onCreateUser={handleBookingUserCreate}
          onCreateBooking={handleBookingCreate}
          statusMessage={sectionMessages.bookings}
        />
      )
    }

    if (activeTab === 'operations') {
      return (
        <OperationsBoard
          shifts={resources.shifts}
          maintenance={resources.maintenance}
          onGenerateShifts={handleGenerateShifts}
          onGenerateMaintenance={handleGenerateMaintenance}
          statusMessage={sectionMessages.operations}
        />
      )
    }

    return (
      <OverviewPanel
        summary={summary}
        bookings={resources.bookings}
        maintenance={resources.maintenance}
        shifts={resources.shifts}
      />
    )
  })()

  const activeTabLabel = dashboardTabs.find((tab) => tab.key === activeTab)?.label ?? 'Panel interno'

  return (
    <main className="min-w-0 space-y-4">
      <header className="flex flex-col gap-3 border-b border-red-900/35 bg-black/5 pb-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-[0.68rem] font-semibold tracking-[0.22em] text-red-400/80 uppercase">
            Panel interno
          </p>
          <h1 className="text-2xl leading-tight font-black text-neutral-100 md:text-3xl">
            {activeTabLabel}
          </h1>
          <p className="max-w-2xl text-sm leading-5 text-neutral-400">
            Gestión interna para reservas, operaciones y administración del parque.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <Button disabled={isRefreshing} onClick={() => void refreshAdminData('refresh')} variant="secondary">
            <RefreshCw className="h-4 w-4" />
            {isRefreshing ? 'Actualizando...' : 'Actualizar'}
          </Button>
        </div>
      </header>

      {pageError ? (
        <StatusMessage
          title="No se han podido cargar los datos"
          message={pageError}
          variant="error"
        />
      ) : null}

      {renderContent}
    </main>
  )
}

function createInitialForms() {
  return Object.fromEntries(
    Object.entries(entityDefinitions).map(([key, definition]) => [
      key,
      { ...definition.emptyForm },
    ]),
  )
}

export default DashboardPage
