function AttractionMarker({ attraction }) {
  const { name, waitTime, positionClass } = attraction

  return (
    <article className={`absolute ${positionClass}`}>
      <div className="absolute left-1/2 top-1/2 z-10 w-max -translate-x-1/2 -translate-y-[120%]">
        <p className="rounded-sm border border-white/20 bg-black/80 px-2 py-1 text-[0.55rem] font-bold leading-none text-white shadow-lg shadow-black/60">
          {name}
        </p>
        <p className="text-center text-[0.55rem] font-medium leading-none text-red-400">
          {waitTime} min
        </p>
      </div>

      <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 bg-red-500/70" />
      <span className="relative z-20 block h-2 w-2 animate-pulse rounded-full bg-red-600 ring-4 ring-red-600/20 shadow-[0_0_18px_rgba(239,68,68,0.95)]" />
    </article>
  )
}

export default AttractionMarker
