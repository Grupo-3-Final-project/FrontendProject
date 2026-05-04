import parkMapImage from '../../assets/home/publicHomeParkMap.png'
import AttractionMarker from './AttractionMarker'
import MapControlButton from './MapControlButton'

function MobileMap({ markers, controls }) {
  return (
    <section className="relative min-h-[356px] overflow-hidden rounded-xl border border-white/10 bg-neutral-950 shadow-2xl shadow-black/50">
      <img
        src={parkMapImage}
        alt="Mapa nocturno del parque de terror"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(239,68,68,0.04),rgba(0,0,0,0.1)_45%,rgba(0,0,0,0.42)_100%)]" />
      <div className="pointer-events-none absolute inset-0">
        <span className="absolute left-[28%] top-[58%] h-36 w-36 rounded-full bg-white/5 blur-2xl" />
        <span className="absolute left-[44%] top-[20%] h-44 w-44 rounded-full bg-white/[0.04] blur-2xl" />
        <span className="absolute right-[8%] top-[2%] h-32 w-32 rounded-full bg-white/5 blur-2xl" />
      </div>

      <div className="absolute right-2 top-2 z-30 grid gap-2">
        {controls.map((control) => (
          <MapControlButton key={control.id} {...control} />
        ))}
      </div>

      {markers.map((marker) => (
        <AttractionMarker key={marker.id} attraction={marker} />
      ))}
    </section>
  )
}

export default MobileMap
