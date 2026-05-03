import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navItems } from './NavData'
import NavbarItem from './NavbarItem'
import NavbarIdentity from './NavbarIdentity'

function Navbar() {
  const [activeId, setActiveId] = useState('inicio')
  const [isOpen, setIsOpen] = useState(false)

  const handleItemClick = (itemId) => {
    setActiveId(itemId)
    setIsOpen(false)
  }

  return (
    <>
      <button
        type="button"
        className="fixed top-4 left-4 z-[60] flex h-11 w-11 items-center justify-center border border-white/15 bg-black/90 text-white shadow-xl shadow-black/40 transition hover:border-red-600 hover:text-red-500 md:hidden"
        aria-label={isOpen ? 'Cerrar menu principal' : 'Abrir menu principal'}
        aria-expanded={isOpen}
        aria-controls="home-navbar"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
          aria-label="Cerrar menu principal"
          onClick={() => setIsOpen(false)}
        />
      ) : null}

      <aside
        id="home-navbar"
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r-2 border-white/10 bg-black pt-16 transition-transform duration-300 md:translate-x-0 md:pt-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <NavbarIdentity />

        <nav className="flex-1" aria-label="Navegacion principal">
          <ul className="flex flex-col gap-1 px-2 md:px-0">
            {navItems.map((item) => (
              <NavbarItem
                key={item.id}
                item={item}
                isActive={activeId === item.id}
                onClick={handleItemClick}
              />
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default Navbar
