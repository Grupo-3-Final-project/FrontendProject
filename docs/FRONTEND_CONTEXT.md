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

El tono visual debe transmitir una estetica oscura, misteriosa, nocturna y tipo Halloween. La palabra "Puerta" es clave para la marca.

El nombre definitivo aprobado por el cliente el 30/04/2026 es "La Última Puerta".

El slogan definitivo es "¿Te atreves a cruzarla?"

El parque se situa funcionalmente en Granada. El cliente valoro mostrar el tiempo de Granada. Esta informacion puede aparecer en Home, Dashboard o Mobile si aporta valor real a la experiencia y sin sobrecargar la interfaz.

Ya hay decision final sobre las propuestas visuales. Las imagenes seleccionadas sirven como referencia visual y de composicion, pero no todo lo visible en una imagen implica funcionalidad automatica.

Cualquier funcionalidad no documentada debe validarse antes de implementarse.

## 3. Decision final del cliente

Decision aprobada el 30/04/2026:

- Logo: puerta gotica roja.
- Color principal: rojo.
- Home definitiva: diseno 1.
- Dashboard definitivo: diseno 1.
- Mobile definitiva: diseno 3.

Las imagenes seleccionadas son referencia visual y de composicion. No sustituyen a `docs/API_CONTRACT.md`, no definen campos JSON, no crean endpoints y no convierten automaticamente elementos visuales en funcionalidades.

Para referencia visual oficial aprobada por el cliente, revisar `docs/VISUAL_REFERENCE.md`. Las imágenes incluidas sirven como referencia de composición y estilo, pero no sustituyen al contrato funcional ni al contrato API.

## 4. Separacion de experiencias

El frontend se divide en tres experiencias principales:

- Home publica.
- Dashboard interno.
- Mobile visitante.

Nunca deben mezclarse funcionalidades entre estas experiencias.

La home publica no debe mostrar datos internos de administracion. El dashboard interno no debe convertirse en una landing comercial. La experiencia mobile no debe incluir funcionalidades de gestion interna ni login de visitante.

## 5. Home publica

La home publica debe ser una pagina comercial, visual y orientada a venta.

Las 6 capturas Home del paquete visual actual son referencia visual comercial actual: `home-hero-section.png`, `home-attractions-section.png`, `home-offers-section.png`, `home-experience-section.png`, `home-visit-planning-section.png` y `home-information-section.png`.

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

## 6. Dashboard interno

El dashboard interno debe ser operativo y estar pensado solo para administracion o trabajadores del parque.

`dashboard-overview-full-page.png` y `dashboard-operational-map.png` son la referencia visual actual para el Dashboard interno.

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

El Dashboard puede tener estructura visual inspirada en Figma, pero no debe fingir datos reales, CRUDs funcionales ni metricas backend. Las capturas de `backend-reference-only/` son apoyo futuro para backend, CRUDs o integracion real; no son referencia actual de implementacion.

## 7. Mobile visitante

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

## 8. Compra desde taquilla

La compra principal se gestiona desde taquilla o administracion.

No debe haber pagos reales ni login de visitante. Cuando se implemente el flujo de compra, puede generar email, factura o QR mock si encaja con el alcance aprobado.

La experiencia Mobile debe servir para acceder al recorrido dentro del parque, no para gestionar una compra compleja.

## 9. Rutas principales

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

## 10. Criterios visuales

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

### Criterio tecnico de estilos

Tailwind CSS es el sistema principal de estilos del frontend.

Si se anade nueva UI, debe hacerse con Tailwind CSS.

No se deben crear nuevos archivos CSS normales para componentes, paginas o layouts.

`src/index.css` queda reservado unicamente para:

- `@import "tailwindcss";`
- Minimos globales imprescindibles.
- Variables globales solo si siguen siendo necesarias.
- Base global de `html`, `body` y `#root` si aplica.

Si un componente necesita estilos repetidos, se debe resolver con componentes reutilizables o composicion de clases Tailwind, no creando CSS normal.

No se deben usar estilos inline.

No se deben introducir librerias UI externas sin aprobacion.

La UI debe seguir respetando la estetica oscura, el rojo como color principal, verde para estados positivos u operativos, amarillo o dorado para avisos o mantenimiento, rojo intenso para errores criticos y la prohibicion de usar morado.

## 11. Que NO implementar sin validacion

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

## 12. Relacion con backend

El frontend debe respetar siempre `docs/API_CONTRACT.md`.

`docs/API_CONTRACT.md` sigue siendo la fuente de verdad para endpoints, requests, responses y campos JSON.

`docs/API_NAMING_DICTIONARY.md`, si existe en la rama actual, es solo una guia rapida de naming y no sustituye al contrato API.

Reglas principales:

- No inventar campos.
- No renombrar campos JSON.
- No cambiar endpoints sin aprobacion.
- No inventar campos ni endpoints desde las maquetaciones.
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

## 13. Testing y calidad

Cada paso debe validarse antes de continuar.

Se deben anadir tests cuando se preparen:

- Componentes reutilizables.
- Servicios API.
- Logica de estado.
- Formularios.
- Flujos criticos.

No se debe avanzar sin validacion. Los commits deben ser pequenos, claros y con conventional commits.

## 14. Flujo de trabajo obligatorio

Flujo recomendado:

1. Trabajar desde `dev` actualizado.
2. Crear una rama especifica por tarea.
3. Hacer un cambio cada vez.
4. Validar el cambio.
5. Preparar commit con conventional commits.
6. Hacer push de la rama.
7. Integrar primero en `dev`.

No se deben modificar archivos no relacionados con la tarea.
