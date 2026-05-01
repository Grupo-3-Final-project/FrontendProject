import { useState } from 'react'
import { HiBars3, HiXMark } from 'react-icons/hi2'
import { navItems } from './NavData'
import NavbarItem from './NavbarItem'
import NavbarIdentity from './NavbarIdentity'

function Navbar() {
  const [activeId, setActiveId] = useState('inicio')
  const [isOpen, setIsOpen] = useState(false)
  const ToggleIcon = isOpen ? HiXMark : HiBars3

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
        <ToggleIcon className="text-2xl" aria-hidden="true" />
      </button>

      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
          aria-label="Cerrar menu principal"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        id="home-navbar"
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r-2 border-white/10 bg-black transition-transform duration-300 md:translate-x-0 ${
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
