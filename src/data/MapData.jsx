import {
  HiOutlineCloud,
  HiOutlineEye,
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlineSquare3Stack3D,
  HiOutlineUserGroup,
} from 'react-icons/hi2'
import attractionBloodRiverImage from '../assets/home/attractionBloodRiver.png'
import attractionDarkLabyrinthImage from '../assets/home/attractionDarkLabyrinth.png'
import attractionHauntedMansionImage from '../assets/home/attractionHauntedMansion.png'
import attractionTerrorTowerImage from '../assets/home/attractionTerrorTower.png'

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
    imageUrl: attractionTerrorTowerImage,
    difficulty: 'Extrema',
    minimumHeight: '140 cm',
    type: 'Recorrido oscuro',
    description:
      'Atrévete a entrar en la Torre del Terror, donde las almas perdidas aún vagan en la oscuridad. Un recorrido escalofriante que pondrá a prueba tu valentía.',
    intensity: 'Alta',
    duration: '8 min aprox.',
    accessibility: 'No accesible',
    restrictions: 'No recomendado para personas con problemas cardíacos.',
  },
  {
    id: 'haunted-mansion',
    name: 'Mansion Maldita',
    waitTime: 45,
    positionClass: 'left-[18%] top-[28%]',
    imageUrl: attractionHauntedMansionImage,
    difficulty: 'Alta',
    minimumHeight: '120 cm',
    type: 'Casa encantada',
    description:
      'Explora una mansión abandonada donde cada sala esconde una presencia distinta. Ideal para quienes buscan sustos cercanos y una atmósfera intensa.',
    intensity: 'Media alta',
    duration: '12 min aprox.',
    accessibility: 'Acceso parcial',
    restrictions: 'Menores acompañados por una persona adulta.',
  },
  {
    id: 'dark-labyrinth',
    name: 'Laberinto Oscuro',
    waitTime: 16,
    positionClass: 'left-[70%] top-[48%]',
    imageUrl: attractionDarkLabyrinthImage,
    difficulty: 'Media',
    minimumHeight: '110 cm',
    type: 'Laberinto inmersivo',
    description:
      'Avanza entre pasillos estrechos, luces mínimas y sonidos que cambian de dirección. La salida no siempre está donde parece.',
    intensity: 'Media',
    duration: '10 min aprox.',
    accessibility: 'No accesible',
    restrictions: 'No recomendado para personas con claustrofobia.',
  },
  {
    id: 'blood-river',
    name: 'Rio de Sangre',
    waitTime: 25,
    positionClass: 'left-[35%] top-[40%]',
    imageUrl: attractionBloodRiverImage,
    difficulty: 'Alta',
    minimumHeight: '130 cm',
    type: 'Atracción acuática',
    description:
      'Un descenso nocturno por aguas rojizas, niebla baja y figuras que emergen desde las orillas cuando menos lo esperas.',
    intensity: 'Alta',
    duration: '7 min aprox.',
    accessibility: 'Acceso asistido',
    restrictions: 'Puede salpicar. No recomendado para personas con movilidad reducida.',
  },
  {
    id: 'forgotten-zone',
    name: 'Zona Olvidada',
    waitTime: 20,
    positionClass: 'left-[23%] top-[55%]',
    imageUrl: attractionDarkLabyrinthImage,
    difficulty: 'Media',
    minimumHeight: '100 cm',
    type: 'Zona temática',
    description:
      'Un área silenciosa del parque con escenas abandonadas, pasos ocultos y encuentros inesperados entre edificios en ruinas.',
    intensity: 'Media',
    duration: '15 min aprox.',
    accessibility: 'Accesible',
    restrictions: 'Recomendado recorrer con el grupo completo.',
  },
  {
    id: 'macabre-carousel',
    name: 'Carrusel Macabro',
    waitTime: 35,
    positionClass: 'left-[42%] top-[68%]',
    imageUrl: attractionHauntedMansionImage,
    difficulty: 'Baja',
    minimumHeight: '90 cm',
    type: 'Atracción familiar',
    description:
      'Un carrusel oscuro, elegante y extraño, pensado para visitantes que quieren una experiencia inquietante sin demasiada intensidad.',
    intensity: 'Baja',
    duration: '5 min aprox.',
    accessibility: 'Accesible',
    restrictions: 'Menores de baja edad acompañados por una persona adulta.',
  },
  {
    id: 'lost-cemetery',
    name: 'Cementerio Perdido',
    waitTime: 6,
    positionClass: 'left-[52%] top-[88%]',
    imageUrl: attractionTerrorTowerImage,
    difficulty: 'Media',
    minimumHeight: '100 cm',
    type: 'Recorrido exterior',
    description:
      'Camina entre criptas, lápidas y sombras proyectadas por faroles rojos. Una parada corta para completar la ruta sin perder ritmo.',
    intensity: 'Media',
    duration: '6 min aprox.',
    accessibility: 'Accesible',
    restrictions: 'Precaución en zonas con poca iluminación.',
  },
]
