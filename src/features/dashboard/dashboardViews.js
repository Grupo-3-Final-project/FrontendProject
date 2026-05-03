import {
  BedDouble,
  BriefcaseBusiness,
  Building2,
  ClipboardList,
  FerrisWheel,
  LayoutDashboard,
  Sparkles,
} from 'lucide-react'

export const dashboardViews = [
  { id: 'overview', label: 'Resumen', icon: LayoutDashboard },
  { id: 'bookings', label: 'Reservas', icon: ClipboardList },
  { id: 'hotels', label: 'Hoteles', icon: BedDouble },
  { id: 'attractions', label: 'Atracciones', icon: FerrisWheel },
  { id: 'employees', label: 'Equipo', icon: BriefcaseBusiness },
  { id: 'offers', label: 'Ofertas', icon: Sparkles },
  { id: 'operations', label: 'Operaciones', icon: Building2 },
]
