import {
  HiOutlineCloud,
  HiOutlineEye,
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlineSquare3Stack3D,
  HiOutlineUserGroup,
} from 'react-icons/hi2'

export const statusChips = [
  {
    id: 'weather',
    label: '18 C Parcialmente nublado',
    icon: HiOutlineCloud,
    variant: 'default',
  },
  {
    id: 'crowd',
    label: 'Afluencia: Alta',
    icon: HiOutlineUserGroup,
    variant: 'danger',
  },
]

export const mapControls = [
  { id: 'zoom-in', label: 'Acercar mapa', icon: HiOutlinePlus },
  { id: 'zoom-out', label: 'Alejar mapa', icon: HiOutlineMinus },
  { id: 'layers', label: 'Capas del mapa', icon: HiOutlineSquare3Stack3D },
  { id: 'focus', label: 'Centrar vista', icon: HiOutlineEye },
]

export const attractionMarkers = [
  {
    id: 'terror-tower',
    name: 'Torre del Terror',
    waitTime: 0,
    positionClass: 'left-[48%] top-[16%]',
  },
  {
    id: 'haunted-mansion',
    name: 'Mansion Maldita',
    waitTime: 45,
    positionClass: 'left-[18%] top-[28%]',
  },
  {
    id: 'dark-labyrinth',
    name: 'Laberinto Oscuro',
    waitTime: 16,
    positionClass: 'left-[70%] top-[48%]',
  },
  {
    id: 'blood-river',
    name: 'Rio de Sangre',
    waitTime: 25,
    positionClass: 'left-[35%] top-[40%]',
  },
  {
    id: 'forgotten-zone',
    name: 'Zona Olvidada',
    waitTime: 20,
    positionClass: 'left-[23%] top-[55%]',
  },
  {
    id: 'macabre-carousel',
    name: 'Carrusel Macabro',
    waitTime: 35,
    positionClass: 'left-[42%] top-[68%]',
  },
  {
    id: 'lost-cemetery',
    name: 'Cementerio Perdido',
    waitTime: 6,
    positionClass: 'left-[52%] top-[88%]',
  },
]
