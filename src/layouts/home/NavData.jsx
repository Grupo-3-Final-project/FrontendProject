import {
  HiOutlineHome,
  HiHome,
  HiOutlineMap,
  HiMap,
  HiOutlineTicket,
  HiTicket,
  HiOutlineSparkles,
  HiSparkles,
  HiOutlineCalendar,
  HiCalendar,
  HiOutlineInformationCircle,
  HiInformationCircle,
} from 'react-icons/hi2'

export const navItems = [
  { id: 'inicio', name: 'Inicio', icon: HiOutlineHome, activeIcon: HiHome },
  { id: 'atracciones', name: 'Atracciones', icon: HiOutlineMap, activeIcon: HiMap },
  { id: 'ofertas', name: 'Ofertas', icon: HiOutlineTicket, activeIcon: HiTicket },
  { id: 'hoteles', name: 'Hoteles', icon: HiOutlineSparkles, activeIcon: HiSparkles },
  { id: 'experiencia', name: 'Experiencia', icon: HiOutlineSparkles, activeIcon: HiSparkles },
  { id: 'visita', name: 'Planifica tu visita', icon: HiOutlineCalendar, activeIcon: HiCalendar },
  { id: 'info', name: 'Informacion', icon: HiOutlineInformationCircle, activeIcon: HiInformationCircle },
]
