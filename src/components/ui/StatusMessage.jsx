const statusMessageBaseClasses =
  'rounded-lg border p-4 shadow-[0_18px_60px_rgba(0,0,0,0.36)]'

const statusMessageVariantClasses = {
  info: 'border-slate-500/60 bg-[linear-gradient(180deg,rgba(97,112,132,0.18),rgba(18,18,18,0.84))]',
  success:
    'border-green-500/60 bg-[linear-gradient(180deg,rgba(47,161,92,0.18),rgba(18,18,18,0.84))]',
  warning:
    'border-yellow-500/60 bg-[linear-gradient(180deg,rgba(199,149,46,0.2),rgba(18,18,18,0.84))]',
  error:
    'border-red-500/65 bg-[linear-gradient(180deg,rgba(209,42,58,0.2),rgba(18,18,18,0.84))]',
  empty:
    'border-dashed border-stone-700 bg-[linear-gradient(180deg,rgba(24,22,22,0.82),rgba(14,14,15,0.9))]'
}

const statusMessageTitleClasses = 'm-0 text-base leading-snug text-stone-100'

const statusMessageTextClasses = 'mt-2 mb-0 text-[0.95rem] leading-relaxed text-stone-400'

function StatusMessage({ title, message, variant = 'info' }) {
  const variantClasses =
    statusMessageVariantClasses[variant] ?? statusMessageVariantClasses.info

  return (
    <section className={`${statusMessageBaseClasses} ${variantClasses}`}>
      {title && <h2 className={statusMessageTitleClasses}>{title}</h2>}
      {message && <p className={statusMessageTextClasses}>{message}</p>}
    </section>
  )
}

export default StatusMessage
