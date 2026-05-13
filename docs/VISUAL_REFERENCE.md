# VISUAL_REFERENCE.md - Referencia visual activa

## 1. Objetivo

Este documento es la fuente principal de referencia visual para el frontend de "La Ultima Puerta".

Consolida:

- Web publicada.
- Capturas actuales en `docs/visuals`.
- Reglas visuales.
- Interpretacion correcta de Figma.
- Elementos visuales que no autorizan funcionalidad real.

Este documento no sustituye a `docs/FRONTEND_CONTEXT.md` ni a `docs/API_CONTRACT.md`.

## 2. Fuentes visuales

### Fuente principal

Web publicada:

```text
https://probe-done-00171519.figma.site
```

Rutas visuales a tener en cuenta:

```text
/
/home
/dashboard
/mobile
```

La web publicada es la referencia visual principal para composicion, tono, jerarquia y acabado.

### Fuente secundaria

Figma Make:

```text
https://www.figma.com/make/MbG9S30c2rmBoRAz8rPptU/Figma-File-Organization?t=IzWwYrZTqJmJQBUF-1
```

Si Figma Make no es accesible por permisos, Starter plan, MCP o limite de uso, no se debe insistir. En ese caso se trabaja con:

- Web publicada.
- Capturas de `docs/visuals`.
- `docs/FRONTEND_CONTEXT.md`.
- Esta referencia visual.

Figma Make es secundario y no debe usarse para copiar codigo, arquitectura, librerias, rutas ni estilos generados.

## 3. Estado de capturas

Capturas actuales:

```text
docs/visuals/publicHome.png
docs/visuals/internalDashboard.png
docs/visuals/mobileExperience.png
```

Estado:

| Captura | Estado | Uso |
| --- | --- | --- |
| `publicHome.png` | Vigente como referencia visual | Home publica |
| `internalDashboard.png` | Vigente como referencia visual | Dashboard interno |
| `mobileExperience.png` | Vigente como referencia visual | Mobile visitante |

No se deben borrar ni reemplazar capturas sin tarea especifica.

Las capturas siguen siendo referencia local valida para el equipo y para Codex.

Si la web publicada cambia de forma relevante, prevalece la web publicada como fuente visual activa y las capturas deben renovarse en una tarea especifica futura.

## 4. Branding visual

Decision visual del cliente:

- Nombre: La Ultima Puerta.
- Slogan: ¿Te atreves a cruzarla?
- Logo: puerta gotica roja.
- Color principal: rojo.
- Estetica: terror, misterio, noche, premium, minimalista y profesional.
- Ubicacion funcional: Granada.

No usar como marca principal:

- Puerta del Abismo.
- ABISMO.
- puertadelabismo.

## 5. Reglas visuales

La UI debe sentirse oscura, limpia y profesional.

Reglas:

- Fondo negro o gris muy oscuro.
- Rojo como color principal.
- Verde para estados positivos, abierto, operativo, completado o baja espera.
- Amarillo o dorado para avisos, mantenimiento o estados intermedios.
- Rojo intenso para alertas criticas, cerrado, error o fuera de servicio.
- No usar morado.
- Evitar sobrecarga visual.
- Priorizar legibilidad, aire y jerarquia clara.
- Mantener una estetica de terror premium, no decorativa en exceso.

## 6. Home publica

Referencia local:

![Home publica final](./visuals/publicHome.png)

Objetivo visual: landing comercial de terror, orientada a venta y presentacion del parque.

Mantener como referencia:

- Hero visual potente.
- Atmosfera cinematografica.
- Atracciones destacadas.
- Ofertas visibles.
- Packs comerciales.
- Hotel + entrada.
- Descuento por discapacidad.
- CTA de compra o reserva.
- Mapa visual del parque.
- Acceso o QR hacia experiencia mobile cuando aplique.

No inferir automaticamente:

- Pago real.
- Pasarela de pago.
- Login.
- KPIs internos.
- Alertas internas.
- Datos de empleados.
- Metricas operativas.
- Endpoints nuevos.

## 7. Dashboard interno

Referencia local:

![Dashboard interno final](./visuals/internalDashboard.png)

Objetivo visual: panel operativo para administracion y trabajadores del parque.

Mantener como referencia:

- Sidebar vertical.
- KPIs superiores.
- Reservas.
- Hoteles.
- Atracciones.
- Empleados.
- Mantenimiento.
- Taquilla.
- Mapa operativo.
- Alertas internas.
- Estados visuales con rojo, verde y amarillo/dorado.
- Densidad propia de herramienta interna.

No inferir automaticamente:

- Datos reales hardcodeados.
- Metricas calculadas en React si corresponden al backend.
- Endpoints nuevos.
- Servicios API no definidos.
- Elementos comerciales propios de Home.
- Flujo mobile del visitante.
- Graficas externas sin aprobacion.
- Librerias externas sin aprobacion.

## 8. Mobile visitante

Referencia local:

![Mobile experience final](./visuals/mobileExperience.png)

Objetivo visual: experiencia web mobile-first para visitantes dentro del parque.

Mantener como referencia:

- Mapa del parque.
- Detalle de atraccion.
- Ruta optimizada o recomendada.
- Progreso del visitante.
- Tiempos de espera simulados.
- Estado de atracciones dentro del recorrido.
- Boton de actualizar ruta.
- Atracciones visitadas guardadas en `localStorage`.
- Acceso mediante QR del parque.

No inferir automaticamente:

- App nativa.
- Login obligatorio.
- Pago real.
- Perfil complejo.
- Dashboard interno.
- Gestion administrativa.
- Geolocalizacion real.
- Sensores.
- Automatizacion real.
- WebSockets.
- IA.

## 9. QR y elementos visuales especiales

El QR de entrada y el QR del parque son conceptos distintos.

- QR de entrada: puede representar acceso, compra o reserva.
- QR del parque: puede abrir la experiencia mobile del visitante.

Ambos pueden aparecer visualmente, pero no autorizan por si solos:

- Pago real.
- Validacion real de entrada.
- Sistema completo de ticketing.
- Login de visitante.
- Integracion externa.

## 10. Elementos visuales que NO autorizan funcionalidad

Los siguientes elementos se consideran mock, demo o referencia visual salvo tarea aprobada:

- QR funcional completo.
- Compra real.
- Pago real.
- Trailer funcional.
- Favoritos.
- Notificaciones reales.
- Formularios complejos.
- Formularios de gestion manual de colas.
- Mapa interactivo real.
- Geolocalizacion real.
- Sensores.
- Automatizacion real.
- Login.
- Perfil complejo.
- KPIs reales si no vienen del backend.
- Datos de dashboard reales hardcodeados.
- Datos mobile reales no documentados.
- Nuevos endpoints.
- Nuevos campos JSON.

## 11. Que no copiar de Figma Make

No copiar directamente:

- TypeScript.
- shadcn/ui.
- Arquitectura `src/app/*`.
- Componentes generados `components/ui/*`.
- Estilos globales generados.
- `default_shadcn_theme.css`.
- `pnpm-workspace.yaml`.
- `package.json`.
- `vite.config.ts`.
- Rutas generadas si contradicen el router real.
- Librerias no aprobadas.
- Estilos inline.
- Comentarios tecnicos.
- Logica no validada.

El proyecto real debe mantenerse en React, Vite, JavaScript, JSX, Tailwind CSS y estructura acordada en `AGENTS.md`.

## 12. Reglas de interpretacion

- Figma y la web publicada son referencia visual, no contrato funcional.
- No todo lo visible implica implementacion.
- No se deben inventar endpoints, DTOs, campos JSON ni servicios API desde una maqueta.
- No se deben crear rutas nuevas solo porque aparezcan en Figma.
- No se deben mezclar Home, Dashboard y Mobile.
- Si Figma contradice `docs/FRONTEND_CONTEXT.md`, manda `docs/FRONTEND_CONTEXT.md`.
- Si Figma contradice `docs/API_CONTRACT.md`, manda `docs/API_CONTRACT.md`.
- Si una funcionalidad aparece solo en la referencia visual, se valida antes de implementarla.

## 13. Prioridad documental

1. `AGENTS.md`: normas generales, flujo de trabajo y limites.
2. `docs/API_CONTRACT.md`: contrato API.
3. `docs/CONTRACT_TESTING.md`: contract testing.
4. `docs/API_NAMING_DICTIONARY.md`: guia rapida de naming.
5. `docs/FRONTEND_CONTEXT.md`: alcance funcional frontend y decisiones MVP.
6. `docs/VISUAL_REFERENCE.md`: referencia visual activa.
7. `docs/FIGMA_FINAL_REFERENCE.md`: historico/deprecated.
