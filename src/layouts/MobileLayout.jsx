import { Outlet } from 'react-router-dom'

function MobileLayout() {
  return (
    <div className="mobile-layout">
      <div className="mobile-layout__screen">
        <Outlet />
        <nav className="mobile-layout__nav" aria-label="Navegacion movil">
          <span>Mapa</span>
          <span>Ruta</span>
          <span>Detalle</span>
        </nav>
      </div>
    </div>
  )
}

export default MobileLayout
