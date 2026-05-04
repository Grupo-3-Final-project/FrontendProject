# Frontend Parque de Atracciones

Frontend React + Vite del proyecto final del parque de atracciones. Implementa la home publica, el flujo de compra en taquilla, el dashboard interno y la experiencia mobile para visitante.

## Objetivo del repositorio

Este frontend consume el backend del proyecto para cubrir cuatro areas:

- home publica orientada a venta
- taquilla y compra de reservas
- panel interno de administracion
- experiencia mobile del visitante dentro del parque

La integracion sigue los documentos del equipo:

- `docs/FRONTEND_CONTEXT.md`
- `docs/API_NAMING_DICTIONARY.md`
- `docs/API_CONTRACT.md`
- `docs/CONTRACT_TESTING.md`

## Stack tecnico

- React 19
- Vite
- JavaScript
- React Router
- Axios
- ESLint
- Vitest
- Testing Library
- Playwright

## Estructura

```text
src/
|-- api/
|-- assets/
|-- components/
|-- features/
|   |-- bookings/
|   |-- dashboard/
|   `-- mobile/
|-- hooks/
|-- layouts/
|-- pages/
|-- router/
|-- styles/
`-- test/
```

## Variable de entorno

Crear un archivo `.env` usando `.env.example`.

Variable esperada:

```text
VITE_API_BASE_URL=http://localhost:8080/api
```

Tambien funciona con:

```text
VITE_API_BASE_URL=http://127.0.0.1:8080/api
```

## Instalacion

```bash
npm install
```

## Arranque en desarrollo

```bash
npm run dev
```

La aplicacion queda disponible en la URL que muestre Vite.

## Build de produccion

```bash
npm run build
```

## Calidad y testing

Lint:

```bash
npm run lint
```

Tests unitarios:

```bash
npm run test
```

Tests E2E:

```bash
npm run test:e2e
```

El comando de Playwright arranca automaticamente:

- este frontend en `127.0.0.1:4173`
- el backend hermano en `../BackendRepository` con perfil `e2e`

Si el repo backend no esta en esa ruta, hay que ajustar `playwright.config.js`.

## Rutas principales

- `/home`
- `/booking`
- `/dashboard`
- `/mobile`
- `/mobile/map`
- `/mobile/route`
- `/mobile/attraction/:id`

## Integracion con backend

La capa HTTP esta centralizada en `src/api/`.

Servicios principales:

- `apiClient.js`
- `authApi.js`
- `userApi.js`
- `hotelApi.js`
- `attractionApi.js`
- `offerApi.js`
- `bookingApi.js`
- `dashboardApi.js`
- `employeeApi.js`
- `shiftApi.js`
- `maintenanceApi.js`
- `imageApi.js`

## Flujos cubiertos

### Home publica

- hero de marca
- atracciones destacadas
- ofertas reales
- packs comerciales
- CTA a compra
- acceso a mobile por QR visual

### Taquilla y compra

- alta de titular
- login interno para reutilizar usuarios
- seleccion de hotel u oferta
- acompanantes
- resumen de compra
- detalle exacto de reserva
- errores funcionales en castellano

### Dashboard interno

- login con JWT
- resumen real
- reservas
- CRUD de hoteles
- CRUD de atracciones
- CRUD de empleados
- alta de ofertas
- turnos
- mantenimiento

### Mobile visitante

- mapa
- ruta
- detalle de atraccion
- progreso en `localStorage`
- sin login
- sin pago real

## Swagger y contrato

El Swagger pertenece al backend:

- `http://localhost:8080/swagger-ui.html`
- `http://localhost:8080/v3/api-docs`

La referencia funcional de integracion esta en:

- `docs/API_CONTRACT.md`
- `docs/CONTRACT_TESTING.md`
- `docs/API_NAMING_DICTIONARY.md`

## Credenciales demo internas

Para el dashboard y la seleccion interna de usuarios:

- usuario: `admin`
- password: `admin12345`

## Checklist de demo

La checklist final de demo esta en:

- `docs/DEMO_CHECKLIST.md`
