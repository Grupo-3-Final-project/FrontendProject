import { useEffect, useMemo, useState } from 'react'
import { HiOutlineCloud } from 'react-icons/hi2'
import { getGranadaWeather } from '../api/weatherApi'
import MobileMap from '../components/mobileExperience/MobileMap'
import PrimaryCTA from '../components/mobileExperience/PrimaryCTA'
import RouteCard from '../components/mobileExperience/RouteCard'
import StatusChip from '../components/mobileExperience/StatusChip'
import {
  attractionMarkers,
  mapControls,
  statusChips,
} from '../data/MapData'

function MobilePage() {
  const [weatherLabel, setWeatherLabel] = useState('Granada sin datos')

  useEffect(() => {
    let isMounted = true

    const loadWeather = async () => {
      try {
        const weather = await getGranadaWeather()

        if (isMounted) {
          setWeatherLabel(`${Math.round(weather.temperatureCelsius)} C ${weather.condition}`)
        }
      } catch {
        if (isMounted) {
          setWeatherLabel('Granada sin datos')
        }
      }
    }

    void loadWeather()

    return () => {
      isMounted = false
    }
  }, [])

  const mobileStatusChips = useMemo(
    () => [
      {
        id: 'weather',
        label: weatherLabel,
        icon: HiOutlineCloud,
        variant: 'default',
      },
      ...statusChips,
    ],
    [weatherLabel],
  )

  return (
    <main className="flex min-h-0 flex-1 overflow-y-auto bg-black px-2.5 py-3">
      <section className="flex h-full min-h-full w-full flex-col gap-2.5">
        <div className="flex shrink-0 gap-2 overflow-x-auto pb-0.5">
          {mobileStatusChips.map((chip) => (
            <StatusChip key={chip.id} {...chip} />
          ))}
        </div>

        <MobileMap markers={attractionMarkers} controls={mapControls} />

        <RouteCard />

        <PrimaryCTA />
      </section>
    </main>
  )
}

export default MobilePage
