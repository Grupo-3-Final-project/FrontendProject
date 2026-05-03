const chipStyles = {
  default: 'border-white/15 bg-neutral-950/85 text-neutral-200',
  danger: 'border-red-600/45 bg-red-950/50 text-red-400',
}

function StatusChip({ icon: Icon, label, variant = 'default' }) {
  return (
    <div
      className={`flex min-h-8 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 text-[0.68rem] font-medium ${chipStyles[variant]}`}
    >
      <Icon className="text-sm" />
      <span>{label}</span>
    </div>
  )
}

export default StatusChip
