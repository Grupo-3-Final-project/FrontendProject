function MapControlButton({ icon: Icon, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-md border border-white/15 bg-neutral-950/80 text-neutral-300 shadow-lg shadow-black/40 transition hover:border-red-500/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
    >
      <Icon className="text-base" />
    </button>
  )
}

export default MapControlButton
