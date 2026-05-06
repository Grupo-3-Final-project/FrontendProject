const variantStyles = {
  success: {
    indicator: 'border-emerald-500/55 bg-emerald-500/10 text-emerald-400 shadow-[0_0_22px_rgba(16,185,129,0.18)]',
    trend: 'text-emerald-400',
    sparkline: 'border-emerald-500/80 text-emerald-400/80',
  },
  warning: {
    indicator: 'border-amber-500/60 bg-amber-500/10 text-amber-400 shadow-[0_0_22px_rgba(245,158,11,0.18)]',
    trend: 'text-amber-400',
    sparkline: 'border-amber-500/80 text-amber-400/80',
  },
  danger: {
    indicator: 'border-red-500/65 bg-red-600/12 text-red-400 shadow-[0_0_22px_rgba(239,68,68,0.18)]',
    trend: 'text-red-400',
    sparkline: 'border-red-500/80 text-red-400/80',
  },
  neutral: {
    indicator: 'border-neutral-600/70 bg-neutral-800/70 text-neutral-300 shadow-[0_0_22px_rgba(185,28,28,0.12)]',
    trend: 'text-neutral-400',
    sparkline: 'border-red-700/75 text-red-500/70',
  },
}

function DashboardKpiCard({ title, value, note, tag, variant = 'neutral' }) {
  const currentVariant = variantStyles[variant] ?? variantStyles.neutral

  return (
    <article className="relative min-h-[126px] overflow-hidden rounded-lg border border-neutral-800/80 bg-[linear-gradient(145deg,rgba(22,22,23,0.96),rgba(8,9,10,0.99))] p-4 shadow-[0_18px_42px_rgba(0,0,0,0.34)] after:absolute after:right-0 after:bottom-0 after:h-24 after:w-28 after:translate-x-8 after:translate-y-8 after:rounded-full after:bg-red-700/16 after:blur-2xl">
      <div className="relative z-10 flex items-start justify-between gap-4">
        <p className="m-0 text-[0.72rem] font-extrabold tracking-normal text-neutral-500 uppercase">{title}</p>
        <span
          className={`grid h-7 w-7 shrink-0 place-items-center rounded-md border text-xs font-extrabold ${currentVariant.indicator}`}
          aria-hidden="true"
        >
          {tag.slice(0, 1)}
        </span>
      </div>
      <div className="relative z-10 mt-4 min-w-0 pr-16">
        <strong className="block text-[clamp(1.45rem,2.1vw,1.85rem)] leading-none font-extrabold text-neutral-100">
          {value}
        </strong>
        <span className={`mt-3 block text-[0.78rem] leading-5 font-bold ${currentVariant.trend}`}>{note}</span>
        <span className="mt-1 block text-[0.7rem] font-extrabold tracking-normal text-neutral-600 uppercase">
          {tag}
        </span>
      </div>
      <span
        className={`absolute right-4 bottom-5 h-7 w-20 -skew-x-12 rounded-t-[55%] border-b-2 opacity-85 ${currentVariant.sparkline}`}
        aria-hidden="true"
      >
        <span className="absolute right-2 bottom-1.5 h-3 w-16 rounded-[50%] border-b-2 border-current opacity-45" />
        <span className="absolute right-0 bottom-0 h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_10px_currentColor]" />
      </span>
    </article>
  )
}

export default DashboardKpiCard
