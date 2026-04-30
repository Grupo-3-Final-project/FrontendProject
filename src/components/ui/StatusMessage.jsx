import './StatusMessage.css'

function StatusMessage({ title, message, variant = 'info' }) {
  return (
    <section className={`ui-status-message ui-status-message--${variant}`}>
      {title && <h2 className="ui-status-message__title">{title}</h2>}
      {message && <p className="ui-status-message__message">{message}</p>}
    </section>
  )
}

export default StatusMessage
