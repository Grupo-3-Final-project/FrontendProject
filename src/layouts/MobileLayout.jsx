function MobileLayout({ children }) {
  return (
    <div className="mobile-layout">
      <div className="mobile-layout__screen">
        {children}
        <nav className="mobile-layout__nav" aria-label="Navegación móvil">
          <span>Mapa</span>
          <span>Ruta</span>
          <span>Detalle</span>
        </nav>
      </div>
    </div>
  )
}

export default MobileLayout
