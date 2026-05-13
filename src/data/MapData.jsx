import {
  HiOutlineEye,
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlineSquare3Stack3D,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import hauntedMansion from "../assets/home/attractionHauntedMansion.png";
import terrorTower from "../assets/home/attractionTerrorTower.png";
import darkLabyrinth from "../assets/home/attractionDarkLabyrinth.png";
import bloodRiver from "../assets/home/attractionBloodRiver.png";
export const statusChips = [
  {
    id: "crowd",
    label: "Afluencia: Alta",
    icon: HiOutlineUserGroup,
    variant: "danger",
  },
];

export const mapControls = [
  {id: "zoom-in", label: "Acercar mapa", icon: HiOutlinePlus},
  {id: "zoom-out", label: "Alejar mapa", icon: HiOutlineMinus},
  {id: "layers", label: "Capas del mapa", icon: HiOutlineSquare3Stack3D},
  {id: "focus", label: "Centrar vista", icon: HiOutlineEye},
];

export const attractionMarkers = [
  {
    id: "terror-tower",
    name: "TORRE DEL TERROR",
    category: "EXTREMA",
    minHeight: "140 cm",
    type: "Recorrido oscuro",
    description:
      "Atrévete a entrar en la Torre del Terror, donde las almas perdidas aún vagan en la oscuridad. Un recorrido escalofriante que pondrá a prueba tu valentía.",
    info: {
      intensity: "★★★★★",
      duration: "8 min aprox.",
      accessibility: "No accesible",
      restrictions: "No recomendado para personas con problemas cardíacos.",
    },
    waitTime: 0,
    location: "Zona Norte",
    positionClass: "left-[48%] top-[16%]",
    image: terrorTower,
  },

  {
    id: "haunted-mansion",
    name: "MANSIÓN MALDITA",
    category: "TERROR",
    minHeight: "130 cm",
    type: "Casa embrujada",
    description: "Explora los pasillos de una antigua mansión donde cada puerta esconde un nuevo susto.",
    info: {
      intensity: "★★★★☆",
      duration: "6 min aprox.",
      accessibility: "Parcialmente accesible",
      restrictions: "No apto para menores de 8 años.",
    },
    waitTime: 45,
    location: "Zona Oeste",
    positionClass: "left-[18%] top-[28%]",
    image: hauntedMansion,
  },

  {
    id: "dark-labyrinth",
    name: "LABERINTO OSCURO",
    category: "AVENTURA",
    minHeight: "120 cm",
    type: "Recorrido interactivo",
    description: "Encuentra la salida antes de que las sombras te atrapen.",
    info: {
      intensity: "★★★☆☆",
      duration: "10 min aprox.",
      accessibility: "Accesible",
      restrictions: "Menores deben entrar acompañados.",
    },
    waitTime: 16,
    location: "Zona Central",
    positionClass: "left-[70%] top-[48%]",
    image: darkLabyrinth,
  },

  {
    id: "blood-river",
    name: "RÍO DE SANGRE",
    category: "ACUÁTICA",
    minHeight: "110 cm",
    type: "Atracción acuática",
    description: "Navega por aguas oscuras en una experiencia llena de misterio.",
    info: {
      intensity: "★★★☆☆",
      duration: "7 min aprox.",
      accessibility: "No accesible",
      restrictions: "Podrías salir mojado.",
    },
    waitTime: 25,
    location: "Zona Este",
    positionClass: "left-[35%] top-[40%]",
    image: bloodRiver,
  },

  {
    id: "forgotten-zone",
    name: "ZONA OLVIDADA",
    category: "MISTERIO",
    minHeight: "120 cm",
    type: "Zona inmersiva",
    description: "Una zona misteriosa abandonada hace decadas donde cada paso revela una nueva presencia.",
    info: {
      intensity: "Media",
      duration: "9 min aprox.",
      accessibility: "Parcialmente accesible",
      restrictions: "No recomendado para personas sensibles a espacios oscuros.",
    },
    waitTime: 20,
    location: "Zona Sur",
    positionClass: "left-[23%] top-[55%]",
  },

  {
    id: "macabre-carousel",
    name: "CARRUSEL MACABRO",
    category: "FAMILIAR",
    minHeight: "100 cm",
    type: "Atraccion giratoria",
    description: "Un carrusel encantado con figuras sombrias y una melodia que parece no terminar nunca.",
    info: {
      intensity: "Baja",
      duration: "5 min aprox.",
      accessibility: "Accesible",
      restrictions: "Menores deben subir acompanados.",
    },
    waitTime: 35,
    location: "Zona Infantil",
    positionClass: "left-[42%] top-[68%]",
  },

  {
    id: "lost-cemetery",
    name: "CEMENTERIO PERDIDO",
    category: "TERROR",
    minHeight: "120 cm",
    type: "Recorrido exterior",
    description: "Camina entre tumbas y espiritus olvidados mientras buscas la salida del cementerio.",
    info: {
      intensity: "Alta",
      duration: "8 min aprox.",
      accessibility: "No accesible",
      restrictions: "No apto para menores de 10 anos.",
    },
    waitTime: 6,
    location: "Zona Final",
    positionClass: "left-[52%] top-[88%]",
  },
];
