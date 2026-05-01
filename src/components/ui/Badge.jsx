const badgeBaseClasses =
  'inline-flex min-h-7 w-fit items-center rounded-full border px-2.5 py-1 text-[0.8rem] font-extrabold leading-tight'

const badgeVariantClasses = {
  success: 'border-green-500/50 bg-green-500/15 text-green-100',
  warning: 'border-yellow-500/60 bg-yellow-500/15 text-yellow-100',
  danger: 'border-red-500/60 bg-red-500/15 text-red-100',
  neutral: 'border-stone-600 bg-stone-100/5 text-stone-300'
}

function Badge({ children, variant = 'neutral' }) {
  const variantClasses = badgeVariantClasses[variant] ?? badgeVariantClasses.neutral

  return <span className={`${badgeBaseClasses} ${variantClasses}`}>{children}</span>
}

export default Badge
