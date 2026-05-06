import { useState } from 'react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import StatusMessage from '../../components/ui/StatusMessage'

const inputClasses =
  'min-h-11 w-full rounded-md border border-stone-700 bg-stone-950/90 px-3 py-2 text-sm text-stone-100 outline-none transition focus:border-red-500'

function AdminLoginPanel({ onSubmit, isSubmitting, errorMessage }) {
  const [credentials, setCredentials] = useState({
    username: 'admin',
    password: 'admin12345',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentials((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await onSubmit(credentials)
  }

  return (
    <div className="mx-auto max-w-lg">
      <Card
        title="Acceso interno"
        subtitle="Inicia sesion para trabajar con ventas en taquilla, CRUDs de administracion y metricas de direccion."
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-sm font-bold text-stone-200">Usuario</span>
            <input
              className={inputClasses}
              name="username"
              type="text"
              value={credentials.username}
              onChange={handleChange}
              autoComplete="username"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-bold text-stone-200">Contrasena</span>
            <input
              className={inputClasses}
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </label>

          {errorMessage ? (
            <StatusMessage title="No se ha podido iniciar sesion" message={errorMessage} variant="error" />
          ) : null}

          <div className="pt-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Accediendo...' : 'Entrar al panel'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default AdminLoginPanel
