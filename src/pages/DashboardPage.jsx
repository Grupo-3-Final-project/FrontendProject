import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { LockKeyhole, LogIn, LogOut, RefreshCcw } from 'lucide-react'
import {
  getStoredSession,
  login as loginInternal,
  logout as logoutInternal,
} from '../api/authApi'
import {
  createAttraction,
  deleteAttraction,
  getAttractions,
  updateAttraction,
} from '../api/attractionApi'
import { getBookingById, getBookings } from '../api/bookingApi'
import { getDashboardSummary } from '../api/dashboardApi'
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from '../api/employeeApi'
import {
  createHotel,
  deleteHotel,
  getHotels,
  updateHotel,
} from '../api/hotelApi'
import { generateMaintenanceSchedule, getMaintenanceTasks } from '../api/maintenanceApi'
import { createOffer, getOffers } from '../api/offerApi'
import { generateShifts, getShifts } from '../api/shiftApi'
import { Button, Card, SelectField, StatusMessage, TextField } from '../components/ui'
import DashboardBookingsSection from '../features/dashboard/DashboardBookingsSection'
import DashboardCrudPanel from '../features/dashboard/DashboardCrudPanel'
import DashboardOperationsSection from '../features/dashboard/DashboardOperationsSection'
import DashboardOverviewSection from '../features/dashboard/DashboardOverviewSection'
import { dashboardViews } from '../features/dashboard/dashboardViews'
import {
  attractionFields,
  buildFormFromItem,
  buildPayloadFromForm,
  createAttractionForm,
  createEmployeeForm,
  createHotelForm,
  createLoginForm,
  createOfferForm,
  createWindowForm,
  employeeFields,
  formatCurrency,
  getApiErrorMessage,
  getAttractionStatusLabel,
  getBoardTypeLabel,
  getEmployeeTypeLabel,
  getShiftLabel,
  hotelFields,
  offerFields,
  validateFields,
  validateWindowForm,
} from '../features/dashboard/dashboardUtils'

function DashboardPage() {
  const [searchParams] = useSearchParams()
  const activeViewId = searchParams.get('view') || 'overview'
  const activeView = dashboardViews.find((view) => view.id === activeViewId) || dashboardViews[0]
  const currentYear = new Date().getFullYear()

  const [session, setSession] = useState(getStoredSession())
  const [loginForm, setLoginForm] = useState(createLoginForm())
  const [loginError, setLoginError] = useState(null)
  const [pageError, setPageError] = useState(null)
  const [lastActionMessage, setLastActionMessage] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [savingKey, setSavingKey] = useState(null)
  const [isLoadingBookingDetail, setIsLoadingBookingDetail] = useState(false)

  const [summary, setSummary] = useState(null)
  const [bookings, setBookings] = useState([])
  const [hotels, setHotels] = useState([])
  const [attractions, setAttractions] = useState([])
  const [employees, setEmployees] = useState([])
  const [offers, setOffers] = useState([])
  const [shifts, setShifts] = useState([])
  const [maintenance, setMaintenance] = useState([])

  const [selectedBookingId, setSelectedBookingId] = useState(null)
  const [selectedBooking, setSelectedBooking] = useState(null)

  const [hotelForm, setHotelForm] = useState(createHotelForm())
  const [attractionForm, setAttractionForm] = useState(createAttractionForm())
  const [employeeForm, setEmployeeForm] = useState(createEmployeeForm())
  const [offerForm, setOfferForm] = useState(createOfferForm())
  const [shiftWindow, setShiftWindow] = useState(createWindowForm())
  const [maintenanceWindow, setMaintenanceWindow] = useState(createWindowForm())

  const [hotelErrors, setHotelErrors] = useState({})
  const [attractionErrors, setAttractionErrors] = useState({})
  const [employeeErrors, setEmployeeErrors] = useState({})
  const [offerErrors, setOfferErrors] = useState({})
  const [shiftErrors, setShiftErrors] = useState({})
  const [maintenanceErrors, setMaintenanceErrors] = useState({})

  const [editingHotelId, setEditingHotelId] = useState(null)
  const [editingAttractionId, setEditingAttractionId] = useState(null)
  const [editingEmployeeId, setEditingEmployeeId] = useState(null)

  const handleUnauthorized = useCallback(() => {
    logoutInternal()
    setSession(null)
    setSelectedBooking(null)
    setSelectedBookingId(null)
  }, [])

  const loadProtectedData = useCallback(async (activeSession = session) => {
    if (!activeSession?.token) {
      return
    }

    setIsLoadingData(true)
    setPageError(null)

    try {
      const [
        summaryResponse,
        bookingsResponse,
        hotelsResponse,
        attractionsResponse,
        employeesResponse,
        offersResponse,
        shiftsResponse,
        maintenanceResponse,
      ] = await Promise.all([
        getDashboardSummary(currentYear),
        getBookings(),
        getHotels(),
        getAttractions(),
        getEmployees(),
        getOffers(),
        getShifts(),
        getMaintenanceTasks(),
      ])

      setSummary(summaryResponse)
      setBookings(bookingsResponse)
      setHotels(hotelsResponse)
      setAttractions(attractionsResponse)
      setEmployees(employeesResponse)
      setOffers(offersResponse)
      setShifts(shiftsResponse)
      setMaintenance(maintenanceResponse)
    } catch (error) {
      if (error.status === 401) {
        handleUnauthorized()
      }

      setPageError(getApiErrorMessage(error))
    } finally {
      setIsLoadingData(false)
    }
  }, [currentYear, handleUnauthorized, session])

  const hotelOfferFields = useMemo(() => offerFields(hotels), [hotels])

  const hotelColumns = useMemo(
    () => [
      {
        label: 'Hotel',
        render: (hotel) => (
          <div>
            <strong className="block text-stone-100">{hotel.name}</strong>
            <span className="text-xs text-stone-500">{hotel.description}</span>
          </div>
        ),
      },
      {
        label: 'Habitaciones',
        render: (hotel) => `${hotel.availableRooms}/${hotel.totalRooms}`,
      },
      {
        label: 'Plazas',
        render: (hotel) => `${hotel.availablePlaces}/${hotel.totalPlaces}`,
      },
      {
        label: 'Precios',
        render: (hotel) => (
          <div className="space-y-1">
            <div>{formatCurrency(hotel.halfBoardPrice)}</div>
            <div className="text-xs text-stone-500">{formatCurrency(hotel.fullBoardPrice)}</div>
          </div>
        ),
      },
    ],
    [],
  )

  const attractionColumns = useMemo(
    () => [
      {
        label: 'Atraccion',
        render: (attraction) => (
          <div>
            <strong className="block text-stone-100">{attraction.name}</strong>
            <span className="text-xs text-stone-500">{attraction.description}</span>
          </div>
        ),
      },
      { label: 'Tamano', render: (attraction) => attraction.size },
      {
        label: 'Estado',
        render: (attraction) => getAttractionStatusLabel(attraction.status),
      },
      {
        label: 'Plazas',
        render: (attraction) => `${attraction.availableSeats}/${attraction.totalSeats}`,
      },
    ],
    [],
  )

  const employeeColumns = useMemo(
    () => [
      {
        label: 'Empleado',
        render: (employee) => (
          <div>
            <strong className="block text-stone-100">{employee.firstName} {employee.lastName}</strong>
            <span className="text-xs text-stone-500">{employee.email}</span>
          </div>
        ),
      },
      {
        label: 'Tipo',
        render: (employee) => getEmployeeTypeLabel(employee.employeeType),
      },
      {
        label: 'Turno',
        render: (employee) => getShiftLabel(employee.shift),
      },
      {
        label: 'Estado',
        render: (employee) => (employee.active ? 'Activo' : 'Inactivo'),
      },
    ],
    [],
  )

  const offerColumns = useMemo(
    () => [
      {
        label: 'Oferta',
        render: (offer) => (
          <div>
            <strong className="block text-stone-100">{offer.title}</strong>
            <span className="text-xs text-stone-500">{offer.description}</span>
          </div>
        ),
      },
      {
        label: 'Hotel',
        render: (offer) => offer.hotelName,
      },
      {
        label: 'Plan',
        render: (offer) => getBoardTypeLabel(offer.boardType),
      },
      {
        label: 'Total',
        render: (offer) => formatCurrency(offer.totalPrice),
      },
    ],
    [],
  )

  useEffect(() => {
    if (!session?.token) {
      return
    }

    const timeoutId = setTimeout(() => {
      void loadProtectedData(session)
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [loadProtectedData, session])

  const handleLoginFieldChange = (event) => {
    const { name, value } = event.target
    setLoginForm((currentValue) => ({
      ...currentValue,
      [name]: value,
    }))
  }

  const handleProtectedError = (error) => {
    if (error.status === 401) {
      handleUnauthorized()
    }

    setPageError(getApiErrorMessage(error))
  }

  const resetHotelForm = () => {
    setHotelForm(createHotelForm())
    setHotelErrors({})
    setEditingHotelId(null)
  }

  const resetAttractionForm = () => {
    setAttractionForm(createAttractionForm())
    setAttractionErrors({})
    setEditingAttractionId(null)
  }

  const resetEmployeeForm = () => {
    setEmployeeForm(createEmployeeForm())
    setEmployeeErrors({})
    setEditingEmployeeId(null)
  }

  const resetOfferForm = () => {
    setOfferForm(createOfferForm())
    setOfferErrors({})
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    setIsLoggingIn(true)
    setLoginError(null)
    setPageError(null)

    try {
      const nextSession = await loginInternal(loginForm)
      setSession(nextSession)
      setLoginForm(createLoginForm())
      setSummary(null)
      setLastActionMessage('')
    } catch (error) {
      setLoginError(getApiErrorMessage(error))
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleLogout = () => {
    logoutInternal()
    setSession(null)
    setSummary(null)
    setBookings([])
    setHotels([])
    setAttractions([])
    setEmployees([])
    setOffers([])
    setShifts([])
    setMaintenance([])
    setSelectedBooking(null)
    setSelectedBookingId(null)
    setLastActionMessage('')
  }

  const submitCrudForm = async ({
    key,
    fields,
    form,
    editingId,
    createAction,
    updateAction,
    setErrors,
    resetForm,
    successMessage,
  }) => {
    const nextErrors = validateFields(fields, form)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setSavingKey(key)
    setPageError(null)

    try {
      const payload = buildPayloadFromForm(fields, form)

      if (editingId) {
        await updateAction(editingId, payload)
      } else {
        await createAction(payload)
      }

      resetForm()
      setLastActionMessage(successMessage)
      await loadProtectedData()
    } catch (error) {
      handleProtectedError(error)
    } finally {
      setSavingKey(null)
    }
  }

  const handleDeleteEntity = async ({ key, row, deleteAction, successMessage }) => {
    const confirmed = window.confirm(`Se eliminara el registro "${row.name || row.title || row.firstName}".`)

    if (!confirmed) {
      return
    }

    setSavingKey(key)
    setPageError(null)

    try {
      await deleteAction(row.id)
      setLastActionMessage(successMessage)
      await loadProtectedData()
    } catch (error) {
      handleProtectedError(error)
    } finally {
      setSavingKey(null)
    }
  }

  const handleLoadBookingDetail = async (bookingId) => {
    setSelectedBookingId(bookingId)
    setIsLoadingBookingDetail(true)

    try {
      const bookingResponse = await getBookingById(bookingId)
      setSelectedBooking(bookingResponse)
    } catch (error) {
      handleProtectedError(error)
    } finally {
      setIsLoadingBookingDetail(false)
    }
  }

  const handleGenerateWindow = async ({
    key,
    form,
    setErrors,
    generateAction,
    successMessageBuilder,
  }) => {
    const nextErrors = validateWindowForm(form)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setSavingKey(key)
    setPageError(null)

    try {
      const response = await generateAction(form)
      setLastActionMessage(successMessageBuilder(response))
      await loadProtectedData()
    } catch (error) {
      handleProtectedError(error)
    } finally {
      setSavingKey(null)
    }
  }

  const renderDashboardContent = () => {
    if (activeViewId === 'overview') {
      return (
        <DashboardOverviewSection
          summary={summary}
          bookings={bookings}
          attractions={attractions}
          maintenance={maintenance}
          currentYear={currentYear}
        />
      )
    }

    if (activeViewId === 'bookings') {
      return (
        <DashboardBookingsSection
          bookings={bookings}
          selectedBookingId={selectedBookingId}
          selectedBooking={selectedBooking}
          isLoadingDetail={isLoadingBookingDetail}
          onSelectBooking={handleLoadBookingDetail}
        />
      )
    }

    if (activeViewId === 'hotels') {
      return (
        <DashboardCrudPanel
          title="Hoteles"
          subtitle="CRUD protegido de hoteles."
          fields={hotelFields}
          rows={hotels}
          columns={hotelColumns}
          form={hotelForm}
          errors={hotelErrors}
          editingLabel={editingHotelId ? hotelForm.name : ''}
          isSaving={savingKey === 'hotels'}
          onFieldChange={(fieldName, value) =>
            setHotelForm((currentValue) => ({ ...currentValue, [fieldName]: value }))
          }
          onSubmit={() =>
            submitCrudForm({
              key: 'hotels',
              fields: hotelFields,
              form: hotelForm,
              editingId: editingHotelId,
              createAction: createHotel,
              updateAction: updateHotel,
              setErrors: setHotelErrors,
              resetForm: resetHotelForm,
              successMessage: editingHotelId ? 'Hotel actualizado.' : 'Hotel creado.',
            })
          }
          onReset={resetHotelForm}
          onEdit={(hotel) => {
            setEditingHotelId(hotel.id)
            setHotelForm(buildFormFromItem(hotelFields, hotel))
            setHotelErrors({})
          }}
          onDelete={(hotel) =>
            handleDeleteEntity({
              key: 'hotels',
              row: hotel,
              deleteAction: deleteHotel,
              successMessage: 'Hotel eliminado.',
            })
          }
          emptyMessage="No hay hoteles cargados."
          submitLabel={editingHotelId ? 'Guardar cambios' : 'Crear hotel'}
          createLabel="Nuevo hotel"
        />
      )
    }

    if (activeViewId === 'attractions') {
      return (
        <DashboardCrudPanel
          title="Atracciones"
          subtitle="CRUD protegido de atracciones."
          fields={attractionFields}
          rows={attractions}
          columns={attractionColumns}
          form={attractionForm}
          errors={attractionErrors}
          editingLabel={editingAttractionId ? attractionForm.name : ''}
          isSaving={savingKey === 'attractions'}
          onFieldChange={(fieldName, value) =>
            setAttractionForm((currentValue) => ({ ...currentValue, [fieldName]: value }))
          }
          onSubmit={() =>
            submitCrudForm({
              key: 'attractions',
              fields: attractionFields,
              form: attractionForm,
              editingId: editingAttractionId,
              createAction: createAttraction,
              updateAction: updateAttraction,
              setErrors: setAttractionErrors,
              resetForm: resetAttractionForm,
              successMessage: editingAttractionId ? 'Atraccion actualizada.' : 'Atraccion creada.',
            })
          }
          onReset={resetAttractionForm}
          onEdit={(attraction) => {
            setEditingAttractionId(attraction.id)
            setAttractionForm(buildFormFromItem(attractionFields, attraction))
            setAttractionErrors({})
          }}
          onDelete={(attraction) =>
            handleDeleteEntity({
              key: 'attractions',
              row: attraction,
              deleteAction: deleteAttraction,
              successMessage: 'Atraccion eliminada.',
            })
          }
          emptyMessage="No hay atracciones cargadas."
          submitLabel={editingAttractionId ? 'Guardar cambios' : 'Crear atraccion'}
          createLabel="Nueva atraccion"
        />
      )
    }

    if (activeViewId === 'employees') {
      return (
        <DashboardCrudPanel
          title="Equipo"
          subtitle="CRUD protegido de empleados."
          fields={employeeFields}
          rows={employees}
          columns={employeeColumns}
          form={employeeForm}
          errors={employeeErrors}
          editingLabel={editingEmployeeId ? `${employeeForm.firstName} ${employeeForm.lastName}` : ''}
          isSaving={savingKey === 'employees'}
          onFieldChange={(fieldName, value) =>
            setEmployeeForm((currentValue) => ({ ...currentValue, [fieldName]: value }))
          }
          onSubmit={() =>
            submitCrudForm({
              key: 'employees',
              fields: employeeFields,
              form: employeeForm,
              editingId: editingEmployeeId,
              createAction: createEmployee,
              updateAction: updateEmployee,
              setErrors: setEmployeeErrors,
              resetForm: resetEmployeeForm,
              successMessage: editingEmployeeId ? 'Empleado actualizado.' : 'Empleado creado.',
            })
          }
          onReset={resetEmployeeForm}
          onEdit={(employee) => {
            setEditingEmployeeId(employee.id)
            setEmployeeForm(buildFormFromItem(employeeFields, employee))
            setEmployeeErrors({})
          }}
          onDelete={(employee) =>
            handleDeleteEntity({
              key: 'employees',
              row: employee,
              deleteAction: deleteEmployee,
              successMessage: 'Empleado eliminado.',
            })
          }
          emptyMessage="No hay empleados cargados."
          submitLabel={editingEmployeeId ? 'Guardar cambios' : 'Crear empleado'}
          createLabel="Nuevo empleado"
        />
      )
    }

    if (activeViewId === 'offers') {
      return (
        <DashboardCrudPanel
          title="Ofertas"
          subtitle="La API actual permite listado y alta de ofertas."
          fields={hotelOfferFields}
          rows={offers}
          columns={offerColumns}
          form={offerForm}
          errors={offerErrors}
          editingLabel=""
          isSaving={savingKey === 'offers'}
          onFieldChange={(fieldName, value) =>
            setOfferForm((currentValue) => ({ ...currentValue, [fieldName]: value }))
          }
          onSubmit={() =>
            submitCrudForm({
              key: 'offers',
              fields: hotelOfferFields,
              form: offerForm,
              editingId: null,
              createAction: createOffer,
              updateAction: createOffer,
              setErrors: setOfferErrors,
              resetForm: resetOfferForm,
              successMessage: 'Oferta creada.',
            })
          }
          onReset={resetOfferForm}
          onEdit={() => {}}
          allowEdit={false}
          emptyMessage="No hay ofertas cargadas."
          submitLabel="Crear oferta"
          createLabel="Nueva oferta"
        />
      )
    }

    return (
      <DashboardOperationsSection
        shifts={shifts}
        maintenance={maintenance}
        shiftWindow={shiftWindow}
        maintenanceWindow={maintenanceWindow}
        shiftErrors={shiftErrors}
        maintenanceErrors={maintenanceErrors}
        lastActionMessage={lastActionMessage}
        isGeneratingShifts={savingKey === 'shifts'}
        isGeneratingMaintenance={savingKey === 'maintenance'}
        onShiftFieldChange={(fieldName, value) =>
          setShiftWindow((currentValue) => ({ ...currentValue, [fieldName]: value }))
        }
        onMaintenanceFieldChange={(fieldName, value) =>
          setMaintenanceWindow((currentValue) => ({ ...currentValue, [fieldName]: value }))
        }
        onGenerateShifts={() =>
          handleGenerateWindow({
            key: 'shifts',
            form: shiftWindow,
            setErrors: setShiftErrors,
            generateAction: generateShifts,
            successMessageBuilder: (response) => `${response.message} (${response.totalGeneratedShifts})`,
          })
        }
        onGenerateMaintenance={() =>
          handleGenerateWindow({
            key: 'maintenance',
            form: maintenanceWindow,
            setErrors: setMaintenanceErrors,
            generateAction: generateMaintenanceSchedule,
            successMessageBuilder: (response) => `${response.message} (${response.totalMaintenanceTasks})`,
          })
        }
      />
    )
  }

  if (!session?.token) {
    return (
      <main className="space-y-5">
        <header className="flex flex-col gap-3">
          <p className="text-xs font-black tracking-[0.24em] text-red-400 uppercase">Panel interno</p>
          <h1 className="max-w-none text-[clamp(2rem,3.2vw,3rem)] leading-[1.05] text-neutral-100">
            Acceso protegido de administracion
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-neutral-300">
            El dashboard consume endpoints protegidos con JWT. Inicia sesion interna para cargar
            reservas, metricas y gestion operativa.
          </p>
        </header>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]">
          <Card title="Abrir sesion interna" subtitle="Credenciales demo del backend en perfil dev.">
            <form className="space-y-4" onSubmit={handleLogin}>
              <TextField
                label="Usuario"
                name="username"
                value={loginForm.username}
                onChange={handleLoginFieldChange}
                placeholder="admin"
              />
              <TextField
                label="Contrasena"
                name="password"
                type="password"
                value={loginForm.password}
                onChange={handleLoginFieldChange}
                placeholder="admin12345"
              />
              <Button className="w-full" type="submit" disabled={isLoggingIn}>
                <LogIn className="h-4 w-4" />
                {isLoggingIn ? 'Abriendo sesion...' : 'Iniciar sesion'}
              </Button>
            </form>
          </Card>

          <Card title="Contexto de uso" subtitle="Accesos rapidos del sistema.">
            <div className="space-y-4 text-sm text-stone-400">
              <div className="rounded-md border border-white/10 bg-black/25 px-4 py-4">
                <div className="flex items-center gap-2 text-stone-100">
                  <LockKeyhole className="h-4 w-4 text-amber-300" />
                  <strong>Credenciales demo</strong>
                </div>
                <p className="mt-2">Usuario: admin</p>
                <p>Contrasena: admin12345</p>
              </div>
              <div className="rounded-md border border-white/10 bg-black/25 px-4 py-4">
                <p className="text-stone-100">La compra publica sigue disponible desde la home.</p>
                <Link className="mt-3 inline-flex text-sm font-black text-red-300 hover:text-red-200" to="/booking">
                  Ir al flujo de compra
                </Link>
              </div>
            </div>
          </Card>
        </section>

        {loginError ? (
          <StatusMessage title="No se ha podido iniciar sesion" message={loginError} variant="error" />
        ) : null}
      </main>
    )
  }

  return (
    <main className="space-y-5">
      <header className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-xs font-black tracking-[0.24em] text-red-400 uppercase">Panel interno</p>
          <h1 className="mt-2 max-w-none text-[clamp(2rem,3.2vw,3rem)] leading-[1.05] text-neutral-100">
            {activeView.label}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-300">
            Dashboard operativo conectado al backend real del parque.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:min-w-[360px]">
          <SelectField
            label="Ano de analisis"
            value={String(currentYear)}
            disabled
            options={[{ value: String(currentYear), label: String(currentYear) }]}
          />
          <Card title={session.username} subtitle={session.email} className="p-4">
            <div className="flex gap-2">
              <Button className="w-full" variant="ghost" onClick={loadProtectedData}>
                <RefreshCcw className="h-4 w-4" />
                Recargar
              </Button>
              <Button className="w-full" variant="ghost" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Salir
              </Button>
            </div>
          </Card>
        </div>
      </header>

      {pageError ? (
        <StatusMessage title="Operacion no disponible" message={pageError} variant="error" />
      ) : null}

      {lastActionMessage && activeViewId !== 'operations' ? (
        <StatusMessage title="Operacion completada" message={lastActionMessage} variant="success" />
      ) : null}

      {isLoadingData ? (
        <StatusMessage
          title="Cargando informacion interna"
          message="Se estan consultando metricas, reservas y modulos operativos."
          variant="info"
        />
      ) : null}

      {!isLoadingData && summary ? renderDashboardContent() : null}
    </main>
  )
}

export default DashboardPage
