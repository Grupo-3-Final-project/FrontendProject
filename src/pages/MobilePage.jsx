import { useState } from 'react'
import AttractionDetailModal from '../components/mobileExperience/AttractionDetailModal'
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
  const [selectedAttraction, setSelectedAttraction] = useState(null)
  const [routeAttractionIds, setRouteAttractionIds] = useState([])

  const handleAddToRoute = (attractionId) => {
    setRouteAttractionIds((currentIds) =>
      currentIds.includes(attractionId) ? currentIds : [...currentIds, attractionId],
    )
  }

  return (
    <main className="flex flex-1 bg-black px-2.5 py-3">
      <section className="flex min-h-0 w-full flex-col gap-2.5">
        <div className="flex gap-2 overflow-x-auto pb-0.5">
          {statusChips.map((chip) => (
            <StatusChip key={chip.id} {...chip} />
          ))}
        </div>

        <MobileMap
          markers={attractionMarkers}
          controls={mapControls}
          onSelectAttraction={setSelectedAttraction}
        />

        <RouteCard />

        <PrimaryCTA />
      </section>

      <AttractionDetailModal
        attraction={selectedAttraction}
        isInRoute={routeAttractionIds.includes(selectedAttraction?.id)}
        onClose={() => setSelectedAttraction(null)}
        onAddToRoute={handleAddToRoute}
      />
    </main>
  )
}

export default MobilePage
