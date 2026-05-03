const cardClasses =
  'w-full rounded-lg border border-stone-800 bg-[linear-gradient(180deg,rgba(24,22,22,0.92),rgba(14,14,15,0.94))] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.36)] max-[430px]:p-4'

const cardHeaderClasses = 'mb-4'

const cardTitleClasses = 'm-0 text-[1.15rem] leading-snug text-stone-100'

const cardSubtitleClasses = 'mt-2 mb-0 text-[0.95rem] leading-relaxed text-stone-400'

const cardContentClasses = 'text-stone-400 [&_p]:m-0'

function Card({ children, title, subtitle, className = '' }) {
  return (
    <article className={`${cardClasses} ${className}`}>
      {(title || subtitle) && (
        <header className={cardHeaderClasses}>
          {title && <h2 className={cardTitleClasses}>{title}</h2>}
          {subtitle && <p className={cardSubtitleClasses}>{subtitle}</p>}
        </header>
      )}
      <div className={cardContentClasses}>{children}</div>
    </article>
  )
}

export default Card
