function NavbarItem({ item, isActive, onClick }) {
  const Icon = isActive ? item.activeIcon : item.icon

  return (
    <li>
      <a
        href={`#${item.id}`}
        onClick={() => onClick(item.id)}
        aria-current={isActive ? 'page' : undefined}
        className={`group flex min-h-[52px] w-full items-center gap-x-2 border-l-4 px-2 py-2 text-left text-[0.72rem] font-medium transition-all duration-200 sm:px-3 sm:text-xs md:min-h-0 md:gap-x-4 md:px-6 md:py-3 md:text-sm
          ${
            isActive
              ? 'bg-red-950/20 text-white border-red-600'
              : 'text-gray-400 border-transparent hover:text-gray-200 hover:bg-white/5'
          }`}
      >
        <Icon className={`shrink-0 text-lg md:text-xl ${isActive ? 'text-red-500' : 'group-hover:text-red-400'}`} />
        <span className="min-w-0 leading-tight break-words">{item.name}</span>
      </a>
    </li>
  )
}

export default NavbarItem
