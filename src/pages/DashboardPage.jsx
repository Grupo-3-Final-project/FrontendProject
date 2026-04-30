import DashboardLayout from '../layouts/DashboardLayout'

function DashboardPage() {
  return (
    <DashboardLayout>
      <main className="dashboard-page">
        <section className="page-panel">
          <p className="page-kicker">Dashboard interno</p>
          <h1>Panel de operación</h1>
          <p className="page-description">
            Base para la gestión interna. Aquí se prepararán KPIs, reservas,
            hoteles, empleados, mantenimiento, taquilla y estado de atracciones.
          </p>
        </section>
      </main>
    </DashboardLayout>
  )
}

export default DashboardPage
