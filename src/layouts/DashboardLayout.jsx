import { Outlet } from 'react-router-dom'

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <aside className="dashboard-layout__sidebar" aria-label="Navegacion interna">
        <span className="layout-brand">Puerta</span>
        <nav className="dashboard-layout__nav">
          <span>Resumen</span>
          <span>Atracciones</span>
          <span>Reservas</span>
          <span>Equipo</span>
        </nav>
      </aside>
      <div className="dashboard-layout__content">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
