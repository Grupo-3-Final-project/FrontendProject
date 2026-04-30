# FRONTEND_CONTEXT.md - Contexto Frontend

## 1. Objetivo del frontend

El frontend pertenece a una aplicacion web de gestion y venta para un parque de atracciones de terror.

Su objetivo es ofrecer tres experiencias separadas:

- Una home publica orientada a venta y presentacion visual del parque.
- Un dashboard interno para administracion y operacion.
- Una experiencia mobile para visitantes dentro del parque.

Este documento aporta contexto funcional frontend para futuros trabajos. `AGENTS.md` sigue siendo la norma principal del proyecto. `docs/API_CONTRACT.md` sigue siendo la fuente de verdad para contrato API. `docs/CONTRACT_TESTING.md` sigue siendo la fuente de verdad para contract testing.

## 2. Contexto del cliente

El cliente necesita una aplicacion para un parque de atracciones de terror.

El tono visual debe transmitir una estetica oscura, misteriosa, nocturna y tipo Halloween. La palabra "Puerta" es importante para el cliente, pero el nombre definitivo del producto todavia esta pendiente.

El parque se situa funcionalmente en Granada. El cliente valoro mostrar el tiempo de Granada. Esta informacion puede aparecer en Home, Dashboard o Mobile si aporta valor real a la experiencia y sin sobrecargar la interfaz.

Mientras no haya decision final de marca, se pueden usar placeholders neutros como "Puerta" o "Parque de terror". No se debe tratar ningun nombre provisional como nombre definitivo.

Se han enviado tres propuestas visuales, pero todavia no hay decision final. Esas propuestas deben entenderse como inspiracion visual, no como contrato funcional. No se deben crear funcionalidades nuevas solo porque aparezcan en una maqueta generada si el cliente no las ha pedido.

## 3. Separacion de experiencias

El frontend se divide en tres experiencias principales:

- Home publica.
- Dashboard interno.
- Mobile visitante.

Nunca deben mezclarse funcionalidades entre estas experiencias.

La home publica no debe mostrar datos internos de administracion. El dashboard interno no debe convertirse en una landing comercial. La experiencia mobile no debe incluir funcionalidades de gestion interna ni login de visitante.

## 4. Home publica

La home publica debe ser una pagina comercial, visual y orientada a venta.

Debe incluir:

- Hero visual.
- Atracciones destacadas.
- Ofertas visibles.
- Packs familiares, hotel + entrada y descuento por discapacidad como contenido comercial.
- CTA o acceso relacionado con compra.
- QR o acceso a la experiencia mobile.

No debe incluir:

- KPIs internos.
- Tablas de administracion.
- Datos de empleados.
- Alertas internas.
- Metricas operativas.
- Logica propia del dashboard.

## 5. Dashboard interno

El dashboard interno debe ser operativo y estar pensado solo para administracion o trabajadores del parque.

Debe incluir:

- KPIs.
- Reservas.
- Hoteles.
- Atracciones.
- Empleados.
- Mantenimiento.
- Mapa operativo.
- Alertas o estados internos.
- Metricas calculadas por backend cuando aplique.

Las metricas de negocio no deben calcularse en React si estan definidas como responsabilidad del backend.

## 6. Mobile visitante

La experiencia mobile visitante debe ser mobile-first y accesible mediante QR.

Debe ser una experiencia web movil, no una app nativa real. No debe tener login, pago real ni flujo de compra complejo.

Debe incluir:

- Mapa.
- Ruta optimizada.
- Detalle de atraccion.
- Progreso del visitante.
- Boton de actualizar ruta.
- Atracciones completadas guardadas en LocalStorage.

La logica debe mantenerse simple. No se deben usar websockets ni sistemas complejos para este flujo.

## 7. Compra desde taquilla

La compra principal se gestiona desde taquilla o administracion.

No debe haber pagos reales ni login de visitante. Cuando se implemente el flujo de compra, puede generar email, factura o QR mock si encaja con el alcance aprobado.

La experiencia Mobile debe servir para acceder al recorrido dentro del parque, no para gestionar una compra compleja.

## 8. Rutas principales

Rutas principales previstas:

```text
/home
/dashboard
/mobile
/mobile/map
/mobile/route
/mobile/attraction/:id
```

Las subrutas mobile pueden implementarse mas adelante. La existencia de estas rutas no implica que todas deban implementarse en el mismo paso.

## 9. Criterios visuales

La estetica general debe ser oscura, misteriosa, premium, minimalista y profesional.

Criterios visuales:

- Fondo negro o gris muy oscuro.
- Rojo como color principal.
- Verde para estados positivos u operativos.
- Amarillo o dorado para avisos, mantenimiento o estados intermedios.
- Rojo intenso para errores criticos, alertas graves o fuera de servicio.
- No usar morado.
- UI limpia, legible, con espacio y sin sobrecarga.

El objetivo es que la interfaz sea presentable y defendible, no recargada ni dificil de mantener.

## 10. Que NO implementar sin validacion

No implementar sin validacion previa del equipo o cliente:

- Login de visitante.
- Perfil de usuario mobile.
- Compra real desde mobile.
- Pagos reales.
- Notificaciones reales.
- WebSockets.
- IA.
- Geolocalizacion real.
- State manager global.
- Librerias UI externas.
- Graficas externas sin aprobacion.
- Carruseles externos sin aprobacion.
- Iconos externos sin aprobacion.
- Funcionalidades que solo aparezcan en una maqueta generada pero no esten pedidas por cliente.

La prioridad es mantener el alcance claro y evitar sobreingenieria.

## 11. Relacion con backend

El frontend debe respetar siempre `docs/API_CONTRACT.md`.

Reglas principales:

- No inventar campos.
- No renombrar campos JSON.
- No cambiar endpoints sin aprobacion.
- No hacer llamadas API dentro de componentes.
- Centralizar llamadas en `src/api/`.
- Mantener los nombres recibidos y enviados alineados con el contrato.
- Consumir las metricas de negocio desde backend cuando esten definidas en contrato.

Antes de crear servicios API en frontend, se debe revisar siempre `docs/API_CONTRACT.md`. Los servicios deben usar los endpoints y campos JSON exactos del contrato, sin inventar variantes de naming.

Ejemplos de errores a evitar:

- Usar `clientId` o `idClient` si el contrato usa `userId`.
- Usar `idHotel` si el contrato usa `hotelId`.
- Usar `surname` si el contrato usa `lastName`.
- Usar `totalSeats` o `availableSeats` para hoteles, porque hoteles usan `totalPlaces` y `availablePlaces`.
- Usar `totalPlaces` o `availablePlaces` para atracciones, porque atracciones usan `totalSeats` y `availableSeats`.

Si hay duda, se debe mandar `docs/API_CONTRACT.md` como fuente de verdad.

Si un cambio afecta endpoints, DTOs, requests, responses, nombres de campos JSON, servicios API, tests de contrato, Swagger/OpenAPI o comunicacion frontend-backend, se deben revisar tambien `docs/API_CONTRACT.md` y `docs/CONTRACT_TESTING.md`.

## 12. Testing y calidad

Cada paso debe validarse antes de continuar.

Se deben anadir tests cuando se preparen:

- Componentes reutilizables.
- Servicios API.
- Logica de estado.
- Formularios.
- Flujos criticos.

No se debe avanzar sin validacion. Los commits deben ser pequenos, claros y con conventional commits.

## 13. Flujo de trabajo obligatorio

Flujo recomendado:

1. Trabajar desde `dev` actualizado.
2. Crear una rama especifica por tarea.
3. Hacer un cambio cada vez.
4. Validar el cambio.
5. Preparar commit con conventional commits.
6. Hacer push de la rama.
7. Integrar primero en `dev`.

No se deben modificar archivos no relacionados con la tarea.
