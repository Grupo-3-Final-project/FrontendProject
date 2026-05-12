# FRONTEND_CONTEXT.md - Contexto frontend

## 1. Objetivo

Este documento define el alcance funcional frontend del proyecto "La Ultima Puerta".

El frontend debe mantener tres experiencias separadas:

- Home publica.
- Dashboard interno.
- Mobile visitante.

`AGENTS.md` sigue siendo la norma general del proyecto. `docs/API_CONTRACT.md` sigue siendo la fuente de verdad para endpoints, requests, responses y campos JSON. `docs/CONTRACT_TESTING.md` sigue siendo la fuente de verdad para contract testing.

## 2. Contexto del cliente

El cliente necesita una aplicacion web para un parque de atracciones de terror.

Decision de cliente:

- Nombre visual: La Ultima Puerta.
- Slogan visual: ¿Te atreves a cruzarla?
- Logo: puerta gotica roja.
- Color principal: rojo.
- Estetica: terror, noche, misterio, premium, minimalista y profesional.
- Ubicacion funcional: Granada.

La referencia visual activa esta consolidada en `docs/VISUAL_REFERENCE.md`.

Figma y la web publicada son referencia visual. No son contrato funcional, no crean endpoints y no autorizan por si solos nuevas funcionalidades.

## 3. Separacion de experiencias

### Home publica

Ruta principal prevista:

```text
/home
```

Objetivo: pagina comercial, visual y orientada a venta.

Puede incluir:

- Hero visual.
- Atracciones destacadas.
- Ofertas visibles.
- Packs familiares.
- Hotel + entrada.
- Descuento por discapacidad.
- CTA de compra o reserva.
- Acceso o QR hacia la experiencia mobile cuando aplique.

No debe incluir:

- KPIs internos.
- Tablas de administracion.
- Datos de empleados.
- Alertas internas.
- Metricas operativas.
- Logica propia del dashboard.

### Dashboard interno

Ruta principal prevista:

```text
/dashboard
```

Objetivo: administracion y operacion interna del parque.

Puede incluir:

- KPIs.
- Reservas.
- Hoteles.
- Atracciones.
- Empleados.
- Mantenimiento.
- Taquilla.
- Mapa operativo.
- Alertas internas.
- Metricas calculadas por backend cuando aplique.

No debe incluir:

- Enfoque comercial tipo landing.
- QR de visitante como experiencia principal.
- Flujo mobile del visitante.
- Logica de compra compleja para clientes finales.

### Mobile visitante

Rutas previstas:

```text
/mobile
/mobile/map
/mobile/route
/mobile/attraction/:id
```

Objetivo: experiencia web mobile-first para visitantes dentro del parque tras escanear un QR.

Debe incluir:

- Mapa del parque.
- Detalle de atraccion.
- Ruta optimizada o recomendada.
- Progreso del visitante.
- Atracciones completadas guardadas en `localStorage`.
- Boton para actualizar o recalcular ruta.

No debe incluir:

- Login obligatorio.
- Pago real.
- Dashboard interno.
- Gestion administrativa.
- App nativa.
- Geolocalizacion real.
- WebSockets.
- IA.
- Sensores o automatizacion real.

## 4. Decisiones MVP

Para el MVP se acuerda:

- Prioridad absoluta: estabilidad y entrega funcional.
- Las colas y tiempos de espera son simulados, pueden generarse con valores mock o random.
- Las atracciones visitadas se guardan en `localStorage`.
- No hay geolocalizacion real.
- No hay sensores ni automatizacion real.
- No se implementan formularios complejos de gestion manual de colas.
- El login es opcional y solo debe trabajarse en una rama separada si se aprueba.
- El QR de entrada y el QR del parque son conceptos distintos.
- El QR de entrada puede representar acceso, compra o reserva.
- El QR del parque puede abrir la experiencia mobile del visitante.
- Figma es referencia visual, no contrato funcional.

## 5. Compra y QR

La compra principal se gestiona desde taquilla o administracion.

No debe haber pagos reales ni login obligatorio de visitante en el MVP.

Cuando se trabaje el flujo de compra, puede incluir email, factura o QR mock si encaja con el alcance aprobado.

La experiencia mobile sirve para recorrer el parque, consultar atracciones y actualizar la ruta. No debe convertirse en un sistema complejo de compra.

## 6. Criterios visuales

La interfaz debe ser oscura, clara y defendible en evaluacion.

Reglas visuales:

- Fondo negro o gris muy oscuro.
- Rojo como color principal.
- Verde para estados positivos, operativo, abierto, completado o baja espera.
- Amarillo o dorado para avisos, mantenimiento o estados intermedios.
- Rojo intenso para criticos, cerrado, error o fuera de servicio.
- No usar morado.
- UI limpia, legible, con aire y sin exceso de informacion.

Los detalles visuales, capturas y fuentes activas se documentan en `docs/VISUAL_REFERENCE.md`.

## 7. Estilos frontend

Tailwind CSS es el sistema principal de estilos del frontend.

Si se añade nueva UI, debe hacerse con Tailwind CSS.

No se deben crear nuevos archivos CSS normales para componentes, paginas o layouts salvo aprobacion explicita.

`src/index.css` queda reservado para:

- `@import "tailwindcss";`
- Minimos globales imprescindibles.
- Variables globales si siguen siendo necesarias.
- Base global de `html`, `body` y `#root` si aplica.

No se deben usar estilos inline.

No se deben introducir librerias UI externas sin aprobacion.

## 8. Que NO implementar sin validacion

No implementar sin validacion previa:

- Login de visitante.
- Perfil complejo de usuario mobile.
- Compra real desde mobile.
- Pagos reales.
- Notificaciones reales.
- WebSockets.
- IA.
- Geolocalizacion real.
- Sensores.
- Automatizacion real de colas.
- Formularios complejos de gestion manual de colas.
- State manager global.
- Librerias UI externas.
- Graficas externas.
- Carruseles externos.
- Iconos externos.
- Funcionalidades que solo aparezcan en Figma o en una maqueta.

## 9. Relacion con backend/API

El frontend debe respetar siempre `docs/API_CONTRACT.md`.

Reglas principales:

- No inventar endpoints.
- No renombrar campos JSON.
- No cambiar requests o responses sin aprobacion.
- No crear servicios API desde una maqueta visual.
- No hacer llamadas API dentro de componentes JSX.
- Centralizar llamadas en `src/api/`.
- Mantener los nombres recibidos y enviados alineados con el contrato.
- Consumir metricas de negocio desde backend cuando esten definidas como responsabilidad del backend.

`docs/API_NAMING_DICTIONARY.md` es una guia rapida de naming. No sustituye a `docs/API_CONTRACT.md`.

Si un cambio afecta endpoints, DTOs, requests, responses, nombres JSON, servicios API, Swagger/OpenAPI o contract testing, tambien se deben revisar:

- `docs/API_CONTRACT.md`
- `docs/CONTRACT_TESTING.md`
- `docs/API_NAMING_DICTIONARY.md`

## 10. Documentacion relacionada

- `AGENTS.md`: normas generales, flujo de trabajo, estructura y limites.
- `docs/FRONTEND_CONTEXT.md`: alcance funcional frontend y decisiones MVP.
- `docs/VISUAL_REFERENCE.md`: fuente activa de referencia visual.
- `docs/API_CONTRACT.md`: contrato API.
- `docs/CONTRACT_TESTING.md`: estrategia de contract testing.
- `docs/API_NAMING_DICTIONARY.md`: guia rapida de nombres.
- `docs/FIGMA_FINAL_REFERENCE.md`: referencia historica/deprecated.
