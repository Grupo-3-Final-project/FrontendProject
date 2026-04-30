import './Card.css'

function Card({ children, title, subtitle }) {
  return (
    <article className="ui-card">
      {(title || subtitle) && (
        <header className="ui-card__header">
          {title && <h2 className="ui-card__title">{title}</h2>}
          {subtitle && <p className="ui-card__subtitle">{subtitle}</p>}
        </header>
      )}
      <div className="ui-card__content">{children}</div>
    </article>
  )
}

export default Card
