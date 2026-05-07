const buttonBaseClasses =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-[18px] py-[11px] font-extrabold leading-tight text-stone-100 no-underline shadow-[0_10px_28px_rgba(0,0,0,0.22)] transition duration-150 ease-out focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-yellow-500/80 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none enabled:cursor-pointer enabled:hover:-translate-y-px enabled:active:translate-y-0'

const buttonVariantClasses = {
  primary:
    'border-white/10 bg-gradient-to-b from-red-600 to-red-800 enabled:hover:from-red-500 enabled:hover:to-red-700 enabled:hover:shadow-[0_16px_34px_rgba(167,15,27,0.28)]',
  secondary:
    'border-stone-700 bg-stone-950/85 enabled:hover:border-stone-500 enabled:hover:bg-stone-800',
  danger:
    'border-white/10 bg-gradient-to-b from-red-500 to-red-900 enabled:hover:from-red-400 enabled:hover:to-red-700 enabled:hover:shadow-[0_16px_34px_rgba(209,42,58,0.28)]'
}

function Button({
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  onClick,
  className = '',
}) {
  const variantClasses = buttonVariantClasses[variant] ?? buttonVariantClasses.primary

  return (
    <button
      className={`${buttonBaseClasses} ${variantClasses} ${className}`.trim()}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
