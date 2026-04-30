import './Button.css'

function Button({
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  onClick,
}) {
  return (
    <button
      className={`ui-button ui-button--${variant}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
