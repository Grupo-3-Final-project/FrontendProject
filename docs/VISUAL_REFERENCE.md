# VISUAL_REFERENCE.md - Referencia visual oficial

## 1. Objetivo

Este documento es la referencia visual oficial principal para orientar el frontend de La Última Puerta.

Este documento tambien concentra las reglas especificas para interpretar Figma Make dentro del proyecto real. No se mantiene ningun documento auxiliar separado para Figma Make.

Las capturas sirven para documentar composicion, jerarquia visual, atmosfera, paleta, estructura general, tono visual y nivel de acabado esperado.

Las imagenes no son contrato funcional. No autorizan por si solas nuevas funcionalidades, endpoints, DTOs, campos JSON, servicios API, logica de negocio ni cambios de arquitectura.

## 2. Decision final del cliente

Decision aprobada por el cliente:

- Nombre definitivo: La Última Puerta.
- Slogan definitivo: ¿Te atreves a cruzarla?
- Logo: puerta gótica roja.
- Color principal: rojo.
- Home definitiva: diseno 1.
- Dashboard definitivo: diseno 1.
- Mobile definitiva: diseno 3.

No se debe usar como branding final:

- Puerta del Abismo.
- PUERTA DEL ABISMO.
- puertadelabismo.
- ABISMO.

## 3. Carpeta visual actual

La referencia visual actual esta almacenada en:

```text
docs/visuals/
```

El ZIP aprobado se usa solo como fuente de extraccion de capturas. La referencia de trabajo dentro del proyecto es `docs/visuals/`.

Las 8 capturas principales estan directamente en `docs/visuals/`. Las capturas de apoyo futuro para backend estan en `docs/visuals/backend-reference-only/`.

La carpeta `docs/visuals/backend-reference-only/` no es referencia principal de implementacion actual.

## 4. Capturas principales actuales

Estas capturas son la referencia visual principal para futuras tareas visuales:

| Archivo | Uso recomendado |
| --- | --- |
| `home-hero-section.png` | Hero, primera jerarquia visual de Home, sidebar, CTA y acceso visual a experiencia mobile. |
| `home-attractions-section.png` | Cards comerciales de atracciones destacadas y composicion de seccion. |
| `home-offers-section.png` | Ofertas, promociones visuales y jerarquia de llamadas comerciales. |
| `home-experience-section.png` | Bloque de experiencia, atmosfera y contenido comercial secundario. |
| `home-visit-planning-section.png` | Mapa visual, horarios, transporte, servicios y planificacion de visita. |
| `home-information-section.png` | FAQ, contacto, informacion del parque y avisos visibles. |
| `dashboard-overview-full-page.png` | Dashboard interno completo: KPIs, mapa operativo, alertas, reservas y mantenimiento. |
| `dashboard-operational-map.png` | Mapa operativo interno y estados visuales de atracciones. |

Estas capturas sustituyen como referencia principal a las 3 capturas generales anteriores de Home, Dashboard y Mobile.

## 5. Home publica

La Home publica debe tomar las 6 capturas Home como referencia visual comercial actual.

Mantener como referencia:

- Landing cinematografica.
- Hero visual potente.
- Composicion oscura y roja.
- Estetica de terror premium.
- Atracciones destacadas.
- Ofertas visibles.
- Planificacion de visita.
- Mapa visual del parque.
- CTA de compra o reserva como referencia visual.
- QR o acceso visual hacia la experiencia mobile cuando aplique.

No inferir automaticamente:

- Compra real.
- Pasarela de pago.
- Login.
- KPIs internos.
- Tablas de administracion.
- Alertas internas.
- Datos de empleados.
- Metricas operativas.
- Precios, descuentos u ofertas como contrato definitivo.
- Funcionalidades no validadas.

## 6. Dashboard interno

El Dashboard interno debe tomar `dashboard-overview-full-page.png` y `dashboard-operational-map.png` como referencia visual actual.

Mantener como referencia:

- Sidebar vertical.
- Panel operativo limpio.
- KPIs superiores como estructura visual.
- Mapa operativo.
- Estados de atracciones.
- Alertas internas.
- Reservas recientes como bloque visual.
- Mantenimiento programado como bloque visual.
- Uso de rojo, verde y amarillo para estados.
- Enfoque administrativo.
- Separacion clara entre datos internos y contenido comercial.

No inferir automaticamente:

- Datos reales hardcodeados.
- Metricas reales calculadas en React.
- CRUDs funcionales sin backend.
- Endpoints nuevos.
- Servicios API no definidos.
- Campos JSON no definidos.
- Funcionalidades backend no documentadas.
- Acciones reales de crear, editar, eliminar, cancelar, guardar o exportar.
- Elementos comerciales propios de la Home publica.
- Flujo mobile del visitante.
- Graficas externas sin aprobacion.
- Librerias externas sin aprobacion.

Las metricas reales del dashboard deben venir del backend cuando esten definidas en `docs/API_CONTRACT.md`.

## 7. Mobile Experience

La experiencia mobile sigue formando parte de la referencia visual aprobada, pero el paquete actual prioriza nuevas capturas de Home y Dashboard.

`docs/visuals/mobileExperience.png` se conserva como referencia mobile provisional/legacy hasta que se sustituya por capturas mobile finales.

Mantener como referencia:

- Diseno mobile-first.
- Mapa del parque.
- Detalle de atraccion.
- Ruta optimizada.
- Estado de atracciones dentro del recorrido.
- Boton de actualizar ruta.
- Progreso del visitante.
- Uso de LocalStorage para progreso.
- Acceso mediante QR.
- Interfaz simple para visitante dentro del parque.

No inferir automaticamente:

- App nativa.
- Login.
- Pago real.
- Perfil complejo.
- Dashboard interno.
- Gestion administrativa.
- Geolocalizacion real.
- WebSockets.
- IA.
- Funcionalidades no validadas.

## 8. Carpeta backend-reference-only

La carpeta `docs/visuals/backend-reference-only/` contiene capturas de apoyo futuro para pantallas que dependen de backend, CRUDs o integracion real.

No se debe usar `docs/visuals/backend-reference-only/` para implementar ahora.

Solo sirve como apoyo futuro cuando existan tarea aprobada, backend, endpoints, DTOs, validaciones, servicios y contrato alineado.

| Archivo | Decision |
| --- | --- |
| `dashboard-attractions-management-reference.png` | Futuro/backend. Gestion de atracciones. No implementar CRUD ahora. |
| `dashboard-employees-management-reference.png` | Futuro/backend. Gestion de empleados. No implementar CRUD ahora. |
| `dashboard-tasks-management-reference.png` | Futuro/backend. Gestion de tareas. No implementar funcionalidad real ahora. |
| `dashboard-bookings-management-reference.png` | Futuro/backend. Gestion de reservas. Alinear siempre con `docs/API_CONTRACT.md`. |
| `dashboard-hotels-management-reference.png` | Futuro/backend. Gestion de hoteles. No implementar CRUD ahora. |
| `dashboard-maintenance-management-reference.png` | Futuro/backend. Gestion de mantenimiento. No implementar acciones reales ahora. |
| `dashboard-offers-management-reference.png` | Futuro/backend. Gestion de ofertas. No implementar toggles ni edicion real ahora. |

## 9. Reglas de interpretacion

Las imagenes deben interpretarse como referencia visual y de composicion.

Reglas:

- No todo lo visible en las imagenes implica funcionalidad automatica.
- La funcionalidad real debe validarse con la documentacion del proyecto.
- No se deben inventar endpoints, campos JSON, DTOs ni servicios API a partir de una imagen.
- No se deben crear rutas nuevas solo porque aparezcan elementos visuales en una maqueta.
- No se deben mezclar Home, Dashboard y Mobile.
- Si una funcionalidad aparece en una captura pero no esta documentada, debe validarse antes de implementarse.
- Si una captura contradice el contrato API, manda `docs/API_CONTRACT.md`.
- Si una captura contradice el alcance frontend, manda `docs/FRONTEND_CONTEXT.md`.
- Si una captura procede de `docs/visuals/backend-reference-only/`, no se usa como referencia principal actual.

## 10. Reglas específicas para Figma Make

Figma Make es referencia visual, no codigo fuente del proyecto real.

Se puede usar para orientar composicion, jerarquia, atmosfera, densidad visual, estilo de cards, CTAs, labels y paneles. No debe usarse para decidir arquitectura tecnica, contrato API, rutas reales, estructura de carpetas, librerias ni logica interna.

No se debe copiar desde Figma Make:

- Codigo generado.
- TypeScript.
- shadcn/ui.
- Arquitectura `src/app/*`.
- Carpeta `src/app/components/ui/*`.
- Estilos globales generados.
- `default_shadcn_theme.css`.
- `pnpm-workspace.yaml`.
- `vite.config.ts` generado.
- `package.json` generado.
- Rutas generadas.
- Librerias nuevas.
- Estilos inline.
- Endpoints, campos JSON o servicios API.
- Funcionalidades reales que solo aparezcan en la maqueta.

La regla principal es adaptar la referencia visual al proyecto real, no adaptar el proyecto al codigo de Figma Make.

## 11. Fuente de verdad funcional

La funcionalidad real se valida siempre con:

- `AGENTS.md`.
- `docs/FRONTEND_CONTEXT.md`.
- `docs/API_CONTRACT.md`.
- `docs/CONTRACT_TESTING.md`.
- `docs/API_NAMING_DICTIONARY.md` si existe en la rama actual.

Prioridad documental:

1. `AGENTS.md` define normas generales y flujo de trabajo.
2. `docs/FRONTEND_CONTEXT.md` define contexto funcional frontend, separacion de experiencias, alcance y decisiones del cliente.
3. `docs/VISUAL_REFERENCE.md` manda como referencia visual oficial.
4. `docs/API_CONTRACT.md` manda sobre endpoints, requests, responses y campos JSON.
5. `docs/CONTRACT_TESTING.md` manda sobre contract testing.
6. `docs/API_NAMING_DICTIONARY.md` es una guia rapida de naming y no sustituye al contrato API.

## 12. Limites de alcance

No implementar sin validacion previa:

- Login de visitante.
- Perfil.
- Admin user block.
- Roles.
- Pago real.
- Compra real desde mobile.
- WebSockets.
- IA.
- Geolocalizacion real.
- State manager global.
- Librerias UI externas.
- Graficas externas.
- Carruseles externos.
- Iconos externos.
- CRUDs funcionales sin backend.
- Metricas reales inventadas.
- Datos de negocio hardcodeados como si vinieran del backend.
- Funcionalidades visibles en las imagenes pero no documentadas.
- Endpoints no definidos en `docs/API_CONTRACT.md`.
- Campos JSON no definidos en `docs/API_CONTRACT.md`.
- Servicios API no alineados con `docs/API_CONTRACT.md`.

## 13. Uso recomendado

Antes de trabajar en una vista visual concreta:

- Para Home publica, revisar las 6 capturas Home de este documento.
- Para Dashboard interno, revisar `dashboard-overview-full-page.png` y `dashboard-operational-map.png`.
- Para Mobile Experience, revisar esta seccion y el alcance de `docs/FRONTEND_CONTEXT.md`.
- Para pantallas de `docs/visuals/backend-reference-only/`, esperar tarea futura aprobada y revisar contrato API antes de implementar.

Despues, validar siempre el alcance con `docs/FRONTEND_CONTEXT.md`.

Si el trabajo afecta a comunicacion frontend-backend, revisar tambien `docs/API_CONTRACT.md`, `docs/CONTRACT_TESTING.md` y `docs/API_NAMING_DICTIONARY.md` si existe.
