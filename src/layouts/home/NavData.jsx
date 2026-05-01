import { 
  HiOutlineHome, HiHome, 
  HiOutlineMap, HiMap, 
  HiOutlineTicket, HiTicket, 
  HiOutlineSparkles, HiSparkles, 
  HiOutlineCalendar, HiCalendar, 
  HiOutlineInformationCircle, HiInformationCircle 
} from 'react-icons/hi2';

export const navItems = [
  { id: 'inicio', name: 'Inicio', href: '#', icon: HiOutlineHome, activeIcon: HiHome },
  { id: 'atracciones', name: 'Atracciones', href: '#', icon: HiOutlineMap, activeIcon: HiMap },
  { id: 'ofertas', name: 'Ofertas', href: '#', icon: HiOutlineTicket, activeIcon: HiTicket },
  { id: 'experiencia', name: 'Experiencia', href: '#', icon: HiOutlineSparkles, activeIcon: HiSparkles },
  { id: 'visita', name: 'Planifica tu visita', href: '#', icon: HiOutlineCalendar, activeIcon: HiCalendar },
  { id: 'info', name: 'Información', href: '#', icon: HiOutlineInformationCircle, activeIcon: HiInformationCircle },
];