import { useState } from 'react'
import { navItems } from './NavData'
import NavbarItem from './NavbarItem'
import NavbarIdentity from './NavbarIdentity'

function Navbar() {
  const [activeId, setActiveId] = useState('inicio')

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-[30%] flex-col border-r-2 border-white/10 lg:w-64">
      <NavbarIdentity />

      <nav className="flex-1">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <NavbarItem
              key={item.id}
              item={item}
              isActive={activeId === item.id}
              onClick={setActiveId}
            />
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Navbar
