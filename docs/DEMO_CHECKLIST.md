# Checklist de demo frontend

## Antes de la demo

- `npm install` ejecutado
- `.env` creado desde `.env.example`
- backend disponible en `http://localhost:8080/api` o `http://127.0.0.1:8080/api`
- frontend arrancado con `npm run dev`

## Flujos publicos

- abrir `/home`
- comprobar hero, atracciones, ofertas y packs
- abrir `/booking` desde la home
- abrir `/mobile` desde el CTA o el QR visual

## Flujos de compra

- crear un titular nuevo
- seleccionar hotel y acompanante
- confirmar compra
- mostrar `Reserva #...`
- validar mensaje de conflicto para menor sin adulto

## Dashboard interno

- abrir `/dashboard`
- iniciar sesion con `admin / admin12345`
- revisar resumen
- abrir hoteles, atracciones, equipo y ofertas
- revisar operaciones de turnos y mantenimiento

## Mobile visitante

- abrir `/mobile`
- revisar mapa
- revisar ruta
- abrir detalle de atraccion
- comprobar progreso guardado en `localStorage`

## Verificaciones tecnicas

- `npm run lint` en verde
- `npm run test` en verde
- `npm run build` en verde
- `npm run test:e2e` en verde
