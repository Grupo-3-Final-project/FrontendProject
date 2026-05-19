import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.route('**/api/attractions', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: 1,
          name: 'Dragon Coaster',
          description: 'Montana rusa principal del parque.',
          status: 'OPEN',
          size: 'LARGE',
          totalSeats: 32,
          availableSeats: 28,
          maintenanceFrequencyDays: 7,
          imageUrl: 'https://example.com/dragon.jpg',
        },
      ]),
    })
  })

  await page.route('**/api/hotels', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: 1,
          name: 'Hotel Magic Park',
          description: 'Hotel familiar situado junto al parque.',
          totalRooms: 120,
          availableRooms: 85,
          totalPlaces: 240,
          availablePlaces: 170,
          halfBoardPrice: 80,
          fullBoardPrice: 120,
          imageUrl: 'https://example.com/hotel.jpg',
        },
      ]),
    })
  })

  await page.route('**/api/offers', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: 1,
          title: 'Pack familiar',
          description: 'Hotel y entradas para cuatro personas.',
          hotelName: 'Hotel Magic Park',
          boardType: 'FULL_BOARD',
          includedTickets: 4,
          totalPrice: 399.99,
          imageUrl: 'https://example.com/offer.jpg',
        },
      ]),
    })
  })

  await page.route('**/api/weather/granada', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        city: 'Granada',
        temperatureCelsius: 24.5,
        apparentTemperatureCelsius: 26,
        condition: 'Poco nuboso',
        day: true,
        updatedAt: '2026-05-18T12:00:00',
      }),
    })
  })
})

test('renders the public home with live catalog data', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1, name: /Cruza la puerta si te atreves/i })).toBeVisible()
  await expect(page.getByText('Granada - 25 C')).toBeVisible()
  await expect(page.getByLabel('Carrusel de atracciones').getByRole('heading', { name: 'Dragon Coaster' }).first()).toBeVisible()
  await expect(page.getByText('Hotel Magic Park')).toHaveCount(2)
  await expect(page.getByText('Pack familiar')).toBeVisible()
})

test('validates an entry only after pressing the confirmation button', async ({ page }) => {
  let validationCalls = 0

  await page.route('**/api/tickets/entry/entry-token-1/validate', async (route) => {
    validationCalls += 1
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        ticketId: 19,
        bookingId: 10,
        holderFullName: 'Visitante E2E',
        ticketStatus: 'USED',
        visitDate: '2026-05-18',
        usedAt: '2026-05-18T13:05:31',
      }),
    })
  })

  await page.goto('/entry/entry-token-1')

  await expect(page.getByText('Entrada lista para validar')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Validar entrada' })).toBeVisible()
  expect(validationCalls).toBe(0)

  await page.getByRole('button', { name: 'Validar entrada' }).click()

  await expect(page.getByText('Entrada validada')).toBeVisible()
  await expect(page.getByText('Visitante E2E')).toBeVisible()
  expect(validationCalls).toBe(1)
})
