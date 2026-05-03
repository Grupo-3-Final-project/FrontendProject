const labelClasses = 'mb-2 block text-sm font-bold text-stone-200'
const selectBaseClasses =
  'min-h-11 w-full rounded-md border border-stone-700 bg-stone-950/90 px-3 py-2 text-sm text-stone-100 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/30'
const helpClasses = 'mt-2 text-xs text-stone-500'
const errorClasses = 'mt-2 text-xs font-semibold text-red-300'

function SelectField({
  label,
  error,
  helpText,
  className = '',
  options = [],
  ...props
}) {
  return (
    <label className={`block ${className}`}>
      {label && <span className={labelClasses}>{label}</span>}
      <select
        {...props}
        className={`${selectBaseClasses} ${error ? 'border-red-500/80 ring-2 ring-red-500/20' : ''}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <p className={errorClasses}>{error}</p> : null}
      {!error && helpText ? <p className={helpClasses}>{helpText}</p> : null}
    </label>
  )
}

export default SelectField
