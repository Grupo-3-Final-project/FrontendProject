# FIGMA_FINAL_REFERENCE.md - Referencia visual del Figma final

## 1. Objetivo del documento

Este documento explica como usar el Figma Make final como referencia visual para el desarrollo del frontend de La Última Puerta.

El Figma final debe interpretarse como una guia de composicion, jerarquia, estilo y experiencia. No debe tratarse como codigo fuente del proyecto real.

La maqueta generada puede ayudar a decidir como se ven las pantallas, pero no autoriza a copiar su arquitectura, sus componentes, sus rutas, sus estilos globales ni su logica interna.

## 2. Estado del Figma final

El Figma Make final queda validado como referencia visual para las tres experiencias principales del proyecto:

- Home publica.
- Dashboard interno.
- Mobile visitante.

Esta validacion es visual y de producto. No cambia el contrato API, no crea endpoints y no sustituye la documentacion tecnica existente.

El Figma contiene una maqueta funcional generada con IA. Puede servir para orientar acabados, distribucion de bloques, tono visual y copy visible. El proyecto real debe seguir manteniendo su propia estructura y su propio stack.

## Enlace de referencia

Figma Make final:

https://www.figma.com/make/MbG9S30c2rmBoRAz8rPptU/Figma-File-Organization?t=DihhnOcl209UeYPX-20&fullscreen=1

Si la conexion directa con Figma esta limitada por el plan Starter, los agentes deben trabajar con este documento y con las imagenes disponibles en `docs/visuals/`.

## 3. Branding final

El branding final aprobado para el proyecto es:

- Nombre: La Última Puerta.
- Slogan: ¿Te atreves a cruzarla?
- Logo: puerta gótica roja.
- Email visual permitido: info@laultimapuerta.es.
- Código promocional visual permitido: PUERTA20.

No se debe usar como branding:

- Puerta del Abismo.
- PUERTA DEL ABISMO.
- puertadelabismo.
- ABISMO.

Correcciones aplicadas en el Figma final:

- "ABISMO" paso a "PUERTA" en headers mobile.
- "PUERTA DEL" / "ABISMO" paso a "LA ÚLTIMA" / "PUERTA".
- "Hotel Abismo" paso a "Hotel La Última Puerta".
- "UNA NOCHE EN EL ABISMO" paso a "NOCHE SIN ESCAPE".
- "Parque del Abismo" paso a "La Última Puerta".
- "código ABISMO20" paso a "código PUERTA20".
- "info@puertadelabismo.es" paso a "info@laultimapuerta.es".

Resultado de busqueda indicado para el Figma final:

- "Puerta del Abismo": 0 resultados.
- "PUERTA DEL ABISMO": 0 resultados.
- "puertadelabismo": 0 resultados.
- "ABISMO": 0 resultados visibles de branding.
- "La Última Puerta": 16 resultados.
- "¿Te atreves a cruzarla?": 2 resultados.

## 4. Que se puede tomar del Figma

Del Figma final se puede tomar:

- Composicion visual.
- Jerarquia visual.
- Paleta oscura con rojo como color principal.
- Atmosfera de terror, misterio y acabado premium.
- Orden general de secciones.
- Copy visible ya validado.
- Proporciones aproximadas.
- Ideas de interaccion como mock o referencia visual.
- Separacion entre Home publica, Dashboard interno y Mobile visitante.
- Tratamiento visual de cards, CTAs, labels y paneles.
- Nivel de densidad esperado para cada pantalla.

Estas decisiones deben adaptarse al codigo real del proyecto. La referencia visual no obliga a copiar estructura interna ni implementacion.

## 5. Que NO se debe copiar del Figma

No se debe copiar directamente del Figma Make:

- TypeScript.
- shadcn/ui.
- La carpeta `src/app/components/ui/*`.
- La arquitectura `src/app/*`.
- Estilos globales generados.
- `default_shadcn_theme.css`.
- `pnpm-workspace.yaml`.
- Rutas generadas si contradicen nuestro router real.
- Modales avanzados sin tarea especifica.
- Comentarios tecnicos en codigo.
- Logica no validada.
- Nuevos endpoints.
- Nuevos campos JSON.
- Funcionalidades reales no documentadas.
- Componentes atomicos o moleculares si no encajan con la estructura real.
- Configuracion de `vite.config.ts` generada por Figma.
- `package.json` generado por Figma.
- Librerias no aprobadas.
- Estilos inline.

El Figma Make usa una estructura generada tipo:

```text
src/app/App.tsx
src/app/components/public/PublicHome.tsx
src/app/components/dashboard/Dashboard.tsx
src/app/components/mobile/MobileExperience.tsx
src/app/components/atoms/*
src/app/components/molecules/*
src/app/components/ui/*
src/app/routes.tsx
src/styles/*
vite.config.ts
package.json
imagenes generadas
```

Esa estructura no debe copiarse tal cual al proyecto real.

Nuestro proyecto real debe mantenerse en:

- React.
- Vite.
- JavaScript.
- JSX.
- Tailwind CSS.
- Componentes simples.
- Flujo de trabajo de bootcamp.
- Cambios pequenos y revisables.
- Sin sobreingenieria.

## 6. Interpretacion por pantalla

### Home publica

La Home publica debe interpretarse como una pantalla comercial, visual y orientada a venta.

Del Figma se puede tomar:

- Hero visual.
- Sidebar.
- Atracciones destacadas.
- Ofertas especiales.
- Mapa visual.
- CTA final.
- QR, entradas y trailer como mock visual.

No debe implementar:

- Pago real.
- Compra real.
- Login.
- Datos internos.
- KPIs de dashboard.
- Alertas operativas.
- Endpoints nuevos.

### Dashboard interno

El Dashboard debe interpretarse como una pantalla de uso interno para administracion y operacion del parque.

Del Figma se puede tomar:

- KPIs.
- Reservas.
- Hoteles.
- Atracciones.
- Empleados.
- Mantenimiento.
- Mapa operativo.
- Estados visuales.
- Datos mock hasta conectar backend.

Cuando toque conectar backend, las metricas reales deben venir desde backend. No se deben calcular metricas de negocio en React si el contrato las define como responsabilidad del backend.

### Mobile visitante

La experiencia Mobile debe interpretarse como una experiencia web mobile-first para visitantes dentro del parque.

Del Figma se puede tomar:

- Mapa.
- Atracciones.
- Ruta.
- Perfil simple si existe visualmente.
- Progreso del recorrido.
- UI compacta para visitante.

Debe mantenerse:

- Sin login.
- Sin pago real.
- Sin geolocalizacion real.
- Sin WebSockets.
- Sin IA.
- Progreso con LocalStorage cuando toque implementarlo.

## 7. Elementos mock/demo

Los siguientes elementos deben tratarse como mock visual o demo salvo que exista una tarea aprobada para convertirlos en funcionalidad real:

- QR.
- Compra o entradas.
- Trailer.
- Favoritos.
- KPIs.
- Datos de dashboard.
- Datos mobile.
- Mapa interactivo.
- Notificaciones.
- Formularios.
- Promociones.
- Codigos de descuento.
- Emails visibles.

Que algo aparezca en Figma no significa que deba implementarse como funcionalidad real.

## 8. Relacion con documentacion existente

Prioridad documental:

1. `AGENTS.md` manda en normas generales del proyecto, estructura, flujo de trabajo y limites.
2. `docs/FRONTEND_CONTEXT.md` manda en alcance frontend, separacion de experiencias y criterios visuales.
3. `docs/VISUAL_REFERENCE.md` manda en referencia visual oficial aprobada.
4. `docs/FIGMA_FINAL_REFERENCE.md` complementa la interpretacion del Figma final.
5. `docs/API_CONTRACT.md` manda sobre endpoints, requests, responses y campos JSON.
6. `docs/CONTRACT_TESTING.md` manda sobre contract testing.
7. `docs/API_NAMING_DICTIONARY.md` sirve como guia rapida de naming y no sustituye al contrato API.

Si el Figma contradice el contrato API, manda `docs/API_CONTRACT.md`.

Si el Figma contradice el alcance frontend, manda `docs/FRONTEND_CONTEXT.md`.

Si el Figma sugiere una funcionalidad no documentada, debe validarse antes de implementarla.

## 9. Reglas para Codex y agentes

Antes de ajustar UI basada en el Figma final:

- Leer `AGENTS.md`.
- Leer `docs/FRONTEND_CONTEXT.md`.
- Leer `docs/VISUAL_REFERENCE.md`.
- Leer `docs/FIGMA_FINAL_REFERENCE.md`.

Reglas de trabajo:

- No copiar codigo de Figma Make.
- Implementar en el proyecto real con React, JavaScript, JSX y Tailwind CSS.
- Hacer un cambio cada vez.
- Validar con build y lint cuando se toque codigo.
- No tocar Dashboard o Mobile si la tarea es Home.
- No tocar Home o Mobile si la tarea es Dashboard.
- No tocar Home o Dashboard si la tarea es Mobile.
- No tocar API si la tarea es solo visual.
- No inventar funcionalidad desde Figma.
- No añadir librerias externas.
- No usar estilos inline.
- No crear arquitectura paralela.
- No modificar `AGENTS.md`.
- No hacer commits ni push automaticamente.

Si una tarea afecta a endpoints, DTOs, requests, responses, servicios API, campos JSON, Swagger/OpenAPI o contract testing, tambien deben revisarse:

- `docs/API_CONTRACT.md`.
- `docs/CONTRACT_TESTING.md`.
- `docs/API_NAMING_DICTIONARY.md`.

## 10. Checklist antes de implementar desde Figma

Antes de implementar cualquier ajuste inspirado en el Figma final:

- ¿La tarea indica que pantalla se toca?
- ¿Se ha leido `AGENTS.md`?
- ¿Se ha leido `docs/FRONTEND_CONTEXT.md`?
- ¿Se ha leido `docs/VISUAL_REFERENCE.md`?
- ¿Se ha leido `docs/FIGMA_FINAL_REFERENCE.md`?
- ¿Afecta a API?
- Si afecta a API, ¿se han leido `docs/API_CONTRACT.md` y `docs/CONTRACT_TESTING.md`?
- ¿El cambio copia codigo de Figma?
- Si copia codigo de Figma, no hacerlo.
- ¿Es solo visual?
- Si es solo visual, no tocar backend ni API.
- ¿Se puede validar con build y lint?
- ¿El commit sera pequeno?
- ¿Se mantiene separada la Home publica, el Dashboard interno y la experiencia Mobile?
- ¿Se evita crear una funcionalidad real que solo aparece como mock?

## 11. Resumen practico

El Figma final sirve para mirar como debe sentirse el producto.

No sirve para decidir arquitectura tecnica, contrato API, librerias, rutas reales ni estructura de carpetas.

La regla principal es adaptar la referencia visual al proyecto real, no adaptar el proyecto real al codigo generado por Figma Make.
