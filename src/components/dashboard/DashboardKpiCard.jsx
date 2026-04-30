import './DashboardKpiCard.css'

function DashboardKpiCard({ title, value, note, tag, variant = 'neutral' }) {
  return (
    <article className={`dashboard-kpi-card dashboard-kpi-card--${variant}`}>
      <div className="dashboard-kpi-card__marker" aria-hidden="true" />
      <div>
        <div className="dashboard-kpi-card__topline">
          <p className="dashboard-kpi-card__title">{title}</p>
          <span>{tag}</span>
        </div>
        <strong className="dashboard-kpi-card__value">{value}</strong>
        <span className="dashboard-kpi-card__note">{note}</span>
      </div>
      <span className="dashboard-kpi-card__sparkline" aria-hidden="true" />
    </article>
  )
}

export default DashboardKpiCard
