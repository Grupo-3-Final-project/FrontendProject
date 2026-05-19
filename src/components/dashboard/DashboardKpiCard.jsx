const variantStyles = {
  success: {
    icon: 'text-emerald-400',
    marker: 'border-emerald-500/60 bg-emerald-500/15 shadow-[inset_0_0_18px_rgba(16,185,129,0.18)]',
    sparkline: 'border-emerald-500/70 text-emerald-500/60',
  },
  warning: {
    icon: 'text-amber-400',
    marker: 'border-amber-500/65 bg-amber-500/15 shadow-[inset_0_0_18px_rgba(245,158,11,0.18)]',
    sparkline: 'border-amber-500/75 text-amber-500/60',
  },
  danger: {
    icon: 'text-red-400',
    marker: 'border-red-500/70 bg-red-600/15 shadow-[inset_0_0_18px_rgba(239,68,68,0.18)]',
    sparkline: 'border-red-500/75 text-red-500/60',
  },
  neutral: {
    icon: 'text-red-400',
    marker: 'border-red-700/60 bg-red-700/15 shadow-[inset_0_0_18px_rgba(185,28,28,0.18)]',
    sparkline: 'border-red-600/75 text-red-600/60',
  },
}

function DashboardKpiCard({ title, value, note, tag, icon: Icon, variant = 'neutral' }) {
  const currentVariant = variantStyles[variant] ?? variantStyles.neutral

  return (
    <article className="relative grid min-h-[136px] grid-cols-[auto_minmax(0,1fr)] items-start gap-3 overflow-hidden rounded-lg border border-red-900/30 bg-[linear-gradient(145deg,rgba(21,24,24,0.94),rgba(8,9,10,0.98))] p-4 pb-5 shadow-[0_18px_48px_rgba(0,0,0,0.36)] after:absolute after:right-0 after:bottom-0 after:h-28 after:w-28 after:translate-x-8 after:translate-y-8 after:rounded-full after:bg-red-700/20 after:blur-2xl">
      <div
        className={`relative z-10 flex aspect-square w-10 items-center justify-center rounded-xl border ${currentVariant.marker}`}
        aria-hidden="true"
      >
        {Icon ? <Icon className={`h-5 w-5 ${currentVariant.icon}`} /> : null}
      </div>
      <div className="relative z-10 min-w-0">
        <div className="flex items-center justify-between gap-3">
          <p className="m-0 text-xs font-extrabold tracking-normal text-neutral-400 uppercase">{title}</p>
          <span className="text-[0.72rem] font-extrabold tracking-normal text-red-500 uppercase">{tag}</span>
        </div>
        <strong className="mt-4 block text-[clamp(1.15rem,1.6vw,1.55rem)] leading-none font-extrabold text-neutral-100">
          {value}
        </strong>
        <span className="mt-2 block text-sm text-neutral-500">{note}</span>
      </div>
      <span
        className={`absolute right-4 bottom-4 h-8 w-20 -skew-x-12 rounded-t-[55%] border-b-2 opacity-80 ${currentVariant.sparkline}`}
        aria-hidden="true"
      >
        <span className="absolute right-2 bottom-1.5 h-3.5 w-16 rounded-[50%] border-b-2 border-current opacity-45" />
      </span>
    </article>
  )
}

export default DashboardKpiCard
