import { Outlet } from 'react-router-dom'

function HomeLayout() {
  return (
    <div className="home-layout">
      <header className="home-layout__header">
        <span className="layout-brand">Parque de terror</span>
        <nav className="home-layout__nav" aria-label="Navegacion publica">
          <span>Inicio</span>
          <span>Atracciones</span>
          <span>Entradas</span>
        </nav>
      </header>
      <Outlet />
    </div>
  )
}

export default HomeLayout
