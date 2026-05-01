function NavbarItem({ item, isActive, onClick }) {
  const Icon = isActive ? item.activeIcon : item.icon

  return (
    <li>
      <button
        type="button"
        onClick={() => onClick(item.id)}
        aria-pressed={isActive}
        className={`group flex w-full items-center gap-x-4 border-l-4 px-6 py-3 text-left text-sm font-medium transition-all duration-200
          ${
            isActive
              ? 'bg-red-950/20 text-white border-red-600'
              : 'text-gray-400 border-transparent hover:text-gray-200 hover:bg-white/5'
          }`}
      >
        <Icon className={`text-xl ${isActive ? 'text-red-500' : 'group-hover:text-red-400'}`} />
        <span>{item.name}</span>
      </button>
    </li>
  )
}

export default NavbarItem
