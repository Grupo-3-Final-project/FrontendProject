import { 
  HiOutlineHome, HiHome, 
  HiOutlineMap, HiMap, 
  HiOutlineTicket, HiTicket, 
  HiOutlineSparkles, HiSparkles, 
  HiOutlineCalendar, HiCalendar, 
  HiOutlineInformationCircle, HiInformationCircle 
} from 'react-icons/hi2'

export const navItems = [
  { id: 'inicio', name: 'Inicio', href: '#home', icon: HiOutlineHome, activeIcon: HiHome },
  { id: 'atracciones', name: 'Atracciones', href: '#attractions', icon: HiOutlineMap, activeIcon: HiMap },
  { id: 'ofertas', name: 'Ofertas', href: '#offers', icon: HiOutlineTicket, activeIcon: HiTicket },
  { id: 'experiencia', name: 'Experiencia', href: '#experience', icon: HiOutlineSparkles, activeIcon: HiSparkles },
  { id: 'visita', name: 'Planifica tu visita', href: '#visit', icon: HiOutlineCalendar, activeIcon: HiCalendar },
  { id: 'info', name: 'Información', href: '#info', icon: HiOutlineInformationCircle, activeIcon: HiInformationCircle },
]
