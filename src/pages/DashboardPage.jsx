import { useCallback, useEffect, useMemo, useState } from 'react'
import { LogOut, RefreshCw } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { createAttraction, deleteAttraction, getAttractions, updateAttraction } from '../api/attractionApi'
import { getDashboardSummary } from '../api/dashboardApi'
import { createBooking, getBookings } from '../api/bookingApi'
import { createEmployee, deleteEmployee, getEmployees, updateEmployee } from '../api/employeeApi'
import { createHotel, deleteHotel, getHotels, updateHotel } from '../api/hotelApi'
import { uploadImage } from '../api/imageApi'
import { generateMaintenanceTasks, getMaintenanceTasks } from '../api/maintenanceApi'
import { getOffers } from '../api/offerApi'
import { generateShifts, getShifts } from '../api/shiftApi'
import { loginInternalUser } from '../api/authApi'
import {
  clearAdminSession,
  getApiErrorMessage,
  getStoredAdminSession,
  isUnauthorizedError,
  storeAdminSession,
} from '../api/apiClient'
import { createUser, deleteUser, getUsers, updateUser } from '../api/userApi'
import Button from '../components/ui/Button'
import StatusMessage from '../components/ui/StatusMessage'
import AdminLoginPanel from '../features/admin/AdminLoginPanel'
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
  const [session, setSession] = useState(() => getStoredAdminSession())
  const [isLoading, setIsLoading] = useState(Boolean(session))
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [authError, setAuthError] = useState('')
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
    employees: null,
  })
  const [submittingState, setSubmittingState] = useState({
    users: false,
    hotels: false,
    attractions: false,
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

  const handleUnauthorized = useCallback(
    (error) => {
      if (!isUnauthorizedError(error)) {
        return false
      }

      clearAdminSession()
      setSession(null)
      setAuthError('La sesion ha caducado. Vuelve a iniciar sesion.')
      setResources({
        users: [],
        hotels: [],
        attractions: [],
        employees: [],
        offers: [],
        bookings: [],
        shifts: [],
        maintenance: [],
      })
      return true
    },
    [],
  )

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
      if (!session) {
        return
      }

      if (mode === 'load') {
        setIsLoading(true)
      } else {
        setIsRefreshing(true)
      }

      try {
        await loadAdminData()
        setAuthError('')
      } catch (error) {
        if (!handleUnauthorized(error)) {
          setAuthError(getApiErrorMessage(error, 'No se han podido cargar los datos del panel.'))
        }
      } finally {
        setIsLoading(false)
        setIsRefreshing(false)
      }
    },
    [handleUnauthorized, loadAdminData, session],
  )

  useEffect(() => {
    if (session) {
      void refreshAdminData()
    }
  }, [refreshAdminData, session])

  const handleLogin = async (credentials) => {
    setIsLoggingIn(true)
    setAuthError('')

    try {
      const loginResponse = await loginInternalUser(credentials)
      storeAdminSession(loginResponse)
      setSession(loginResponse)
    } catch (error) {
      setAuthError(getApiErrorMessage(error, 'No se ha podido iniciar sesion.'))
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleLogout = () => {
    clearAdminSession()
    setSession(null)
    setAuthError('')
  }

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
    setSectionMessage(entityKey, 'Edicion activa', 'Ya puedes modificar el formulario y guardar los cambios.', 'info')
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
        setSectionMessage(entityKey, 'Registro creado', 'El nuevo elemento ya esta disponible en el listado.', 'success')
      }

      await reloadEntity(entityKey)
      resetEntityForm(entityKey)
    } catch (error) {
      if (!handleUnauthorized(error)) {
        setSectionMessage(entityKey, 'Operacion rechazada', getApiErrorMessage(error), 'error')
      }
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
      if (!handleUnauthorized(error)) {
        setSectionMessage(entityKey, 'No se ha podido eliminar', getApiErrorMessage(error), 'error')
      }
    }
  }

  const handleUploadImage = async (file, folder) => {
    try {
      return await uploadImage(file, folder)
    } catch (error) {
      if (handleUnauthorized(error)) {
        throw error
      }

      throw new Error(getApiErrorMessage(error, 'No se ha podido subir la imagen.'))
    }
  }

  const handleBookingUserCreate = async (payload) => {
    try {
      const createdUser = await createUser(payload)
      await reloadEntity('users')
      setSectionMessage('bookings', 'Cliente creado', 'El cliente ya esta disponible para futuras ventas.', 'success')
      return createdUser
    } catch (error) {
      if (handleUnauthorized(error)) {
        throw error
      }

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
      setSectionMessage('bookings', 'Venta registrada', 'La compra se ha guardado y el dashboard ya muestra el impacto.', 'success')
      return booking
    } catch (error) {
      if (handleUnauthorized(error)) {
        throw error
      }

      setSectionMessage('bookings', 'No se ha podido registrar la venta', getApiErrorMessage(error), 'error')
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
      setSectionMessage('operations', 'Turnos generados', 'La rotacion de turnos se ha recalculado correctamente.', 'success')
    } catch (error) {
      if (!handleUnauthorized(error)) {
        setSectionMessage('operations', 'No se han podido generar turnos', getApiErrorMessage(error), 'error')
      }
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
      if (!handleUnauthorized(error)) {
        setSectionMessage('operations', 'No se ha podido generar mantenimiento', getApiErrorMessage(error), 'error')
      }
    }
  }

  const activeEntityDefinition = entityDefinitions[activeTab]

  const renderContent = useMemo(() => {
    if (isLoading) {
      return (
        <StatusMessage
          title="Cargando panel"
          message="Estamos recuperando datos reales del backend para el panel interno."
          variant="info"
        />
      )
    }

    if (!session) {
      return <AdminLoginPanel onSubmit={handleLogin} isSubmitting={isLoggingIn} errorMessage={authError} />
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
  }, [
    activeEntityDefinition,
    activeTab,
    authError,
    editingIds,
    forms,
    handleBookingCreate,
    handleBookingUserCreate,
    handleGenerateMaintenance,
    handleGenerateShifts,
    isLoading,
    isLoggingIn,
    resetEntityForm,
    resources,
    sectionMessages,
    session,
    submittingState,
    summary,
  ])

  return (
    <main className="min-w-0 space-y-5">
      <header className="flex flex-col gap-4 rounded-2xl border border-red-900/40 bg-black/15 px-5 py-5 shadow-[0_18px_48px_rgba(0,0,0,0.24)] md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.22em] text-red-300/80 uppercase">
            Panel interno
          </p>
          <h1 className="text-[clamp(2rem,3vw,2.8rem)] leading-[1.04] text-neutral-100">
            {activeTab === 'overview'
              ? 'Dashboard operativo'
              : activeTab === 'bookings'
                ? 'Taquilla'
                : activeTab === 'operations'
                  ? 'Turnos y mantenimiento'
                  : entityDefinitions[activeTab]?.title ?? 'Panel interno'}
          </h1>
          <p className="max-w-3xl text-[0.98rem] leading-6 text-neutral-300">
            MVP conectado a backend para cubrir home, CRUDs, ventas en taquilla, metricas de direccion y operaciones del parque.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {session ? (
            <div className="rounded-lg border border-stone-800 bg-stone-950/70 px-4 py-3 text-sm text-stone-300">
              <div className="font-bold text-stone-100">{session.username}</div>
              <div className="text-xs text-stone-500">{session.role}</div>
            </div>
          ) : null}
          {session ? (
            <>
              <Button disabled={isRefreshing} onClick={() => void refreshAdminData('refresh')} variant="secondary">
                <RefreshCw className="h-4 w-4" />
                {isRefreshing ? 'Actualizando...' : 'Actualizar'}
              </Button>
              <Button onClick={handleLogout} variant="danger">
                <LogOut className="h-4 w-4" />
                Salir
              </Button>
            </>
          ) : null}
        </div>
      </header>

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
