import {
  HiCalendar,
  HiDevicePhoneMobile,
  HiHome,
  HiMap,
  HiOutlineCalendar,
  HiOutlineDevicePhoneMobile,
  HiOutlineHome,
  HiOutlineMap,
  HiOutlineSparkles,
  HiOutlineTicket,
  HiSparkles,
  HiTicket,
} from 'react-icons/hi2'

export const navItems = [
  { id: 'inicio', name: 'Inicio', icon: HiOutlineHome, activeIcon: HiHome },
  { id: 'atracciones', name: 'Atracciones', icon: HiOutlineMap, activeIcon: HiMap },
  { id: 'ofertas', name: 'Ofertas', icon: HiOutlineTicket, activeIcon: HiTicket },
  { id: 'packs', name: 'Packs', icon: HiOutlineSparkles, activeIcon: HiSparkles },
  { id: 'mobile', name: 'QR y mobile', icon: HiOutlineDevicePhoneMobile, activeIcon: HiDevicePhoneMobile },
  { id: 'reserva', name: 'Reserva', icon: HiOutlineCalendar, activeIcon: HiCalendar },
]
