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

export const markerPositionClasses = [
  'left-[48%] top-[16%]',
  'left-[18%] top-[28%]',
  'left-[70%] top-[48%]',
  'left-[35%] top-[40%]',
  'left-[23%] top-[55%]',
  'left-[42%] top-[68%]',
  'left-[52%] top-[88%]',
]
