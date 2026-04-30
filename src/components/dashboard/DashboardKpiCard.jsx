import './DashboardKpiCard.css'

function DashboardKpiCard({ title, value, note, variant = 'neutral' }) {
  return (
    <article className={`dashboard-kpi-card dashboard-kpi-card--${variant}`}>
      <div className="dashboard-kpi-card__marker" aria-hidden="true" />
      <div>
        <p className="dashboard-kpi-card__title">{title}</p>
        <strong className="dashboard-kpi-card__value">{value}</strong>
        <span className="dashboard-kpi-card__note">{note}</span>
      </div>
    </article>
  )
}

export default DashboardKpiCard
