import { expect, test } from '@playwright/test'

const createUniqueIdentity = (prefix) => {
  const uniqueValue = `${Date.now()}${Math.floor(Math.random() * 1000)}`
  const identitySeed = uniqueValue.slice(-8)

  return {
    firstName: prefix === 'minor' ? 'Nora' : 'David',
    lastName: prefix === 'minor' ? 'Peque' : 'Torres',
    dni: `${identitySeed}A`,
    email: `${prefix}${identitySeed}@mail.test`,
    phone: `6${identitySeed}`,
  }
}

const waitForBackend = async (request) => {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    try {
      const response = await request.get('http://127.0.0.1:8080/v3/api-docs')

      if (response.ok()) {
        return
      }
    } catch {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000)
      })
    }
  }

  throw new Error('Backend E2E no disponible')
}

test.beforeEach(async ({ request }) => {
  await waitForBackend(request)
})

test('public home loads connected sections', async ({ page }) => {
  await page.goto('/home')
  await page.waitForLoadState('networkidle')

  await expect(page.getByRole('heading', { name: /Cruza la puerta si te atreves/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /Comprar entradas/i }).first()).toBeVisible()
  await expect(page.getByText(/Atracciones destacadas/i)).toBeVisible()
  await expect(page.getByText(/Ofertas visibles/i)).toBeVisible()
  await expect(page.getByText(/Dragon Coaster/i)).toBeVisible({ timeout: 10000 })
  await expect(page.getByRole('heading', { name: /Escapada Familiar Magic Park/i })).toBeVisible({ timeout: 10000 })
})

test('ticket office flow creates a booking with hotel selection', async ({ page }) => {
  const user = createUniqueIdentity('adult')

  await page.goto('/booking')
  await page.waitForLoadState('networkidle')

  await expect(page.getByRole('heading', { name: /Titular de la compra/i })).toBeVisible()

  await page.getByLabel('Nombre').first().fill(user.firstName)
  await page.getByLabel('Apellidos').first().fill(user.lastName)
  await page.getByLabel('DNI').fill(user.dni)
  await page.getByLabel('Telefono').fill(user.phone)
  await page.getByLabel('Email').fill(user.email)
  await page.getByLabel('Fecha de nacimiento').first().fill('1990-01-01')

  await page.getByRole('button', { name: /Hotel \+ entradas/i }).click()
  await expect(page.getByRole('combobox', { name: /^Hotel$/i }).locator('option')).toHaveCount(4, { timeout: 10000 })
  await page.getByLabel('Hotel').selectOption({ index: 1 })

  await page.getByLabel('Nombre').nth(1).fill('Lucas')
  await page.getByLabel('Apellidos').nth(1).fill('Torres')
  await page.getByLabel('Fecha de nacimiento').nth(1).fill('2015-04-04')

  await page.getByRole('button', { name: /Confirmar compra/i }).click()

  await expect(page.getByRole('heading', { name: /Reserva #/i })).toBeVisible()
  await expect(page.getByRole('combobox', { name: /^Hotel$/i })).toHaveValue('1')
})

test('dashboard login loads protected operational view', async ({ page }) => {
  await page.goto('/dashboard')
  await page.waitForLoadState('networkidle')

  await page.getByLabel('Usuario').fill('admin')
  await page.getByLabel('Contrasena').fill('admin12345')
  await page.getByRole('button', { name: /Iniciar sesion/i }).click()

  await expect(page.getByRole('heading', { name: /Resumen/i })).toBeVisible({ timeout: 10000 })
  await page.getByRole('link', { name: /Hoteles/i }).click()
  await expect(page.getByText(/CRUD protegido de hoteles/i)).toBeVisible()
})

test('booking flow surfaces the minor conflict from backend', async ({ page }) => {
  const user = createUniqueIdentity('minor')

  await page.goto('/booking')
  await page.waitForLoadState('networkidle')

  await expect(page.getByRole('heading', { name: /Titular de la compra/i })).toBeVisible()

  await page.getByLabel('Nombre').first().fill(user.firstName)
  await page.getByLabel('Apellidos').first().fill(user.lastName)
  await page.getByLabel('DNI').fill(user.dni)
  await page.getByLabel('Telefono').fill(user.phone)
  await page.getByLabel('Email').fill(user.email)
  await page.getByLabel('Fecha de nacimiento').first().fill('2012-01-01')

  await page.getByLabel('Nombre').nth(1).fill('Lia')
  await page.getByLabel('Apellidos').nth(1).fill('Peque')
  await page.getByLabel('Fecha de nacimiento').nth(1).fill('2014-05-05')

  await page.getByRole('button', { name: /Confirmar compra/i }).click()

  await expect(page.getByText(/Debe haber al menos un adulto en la reserva/i)).toBeVisible({ timeout: 10000 })
})
