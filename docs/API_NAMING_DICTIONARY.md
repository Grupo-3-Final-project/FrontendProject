# API_NAMING_DICTIONARY.md - Diccionario de nombres acordados

## 1. Introduccion

Diccionario de contrato API - Parque de Atracciones.

Este documento es una guia humana de consulta rapida para el equipo. Recoge nombres acordados para backend, frontend, testing, Figma, Draw.io y diagramas de clases.

Contrato API - Parque de Atracciones.

Documento humano de consulta rapida para backend, frontend, testing, Figma, Draw.io y diagramas de clases.

## 2. Uso del documento

Este documento no sustituye a `docs/API_CONTRACT.md` ni a `docs/CONTRACT_TESTING.md`.

`docs/API_CONTRACT.md` sigue siendo la fuente de verdad para endpoints, requests, responses, campos JSON, codigos HTTP y errores.

`docs/CONTRACT_TESTING.md` sigue siendo la fuente de verdad para contract testing.

Este diccionario sirve como guia de lectura rapida para no inventar nombres distintos al picar codigo, crear DTOs, servicios API, tests o diagramas.

## 3. Cambio importante de esta version

La columna de tipos ya no usa solo `number`.

Ahora se distingue entre:

- Tipo JSON/API.
- Tipo Java recomendado.
- Tipo React/JS.

En JSON y JavaScript, `number` es correcto para identificadores, cantidades e importes.

Para Java y diagramas de clases se recomiendan tipos mas precisos: `Long`, `Integer`, `BigDecimal`, `LocalDate` o `LocalDateTime`.

## 4. Reglas rapidas antes de escribir codigo

| Regla | Criterio acordado |
| --- | --- |
| Idioma del codigo | Ingles |
| Idioma visible | Castellano |
| Formato de nombres | `camelCase` para variables, funciones, metodos y campos JSON; `PascalCase` para clases y componentes |
| Endpoints | Ingles, plural y minusculas |
| Fuente de verdad | `docs/API_CONTRACT.md` |
| Campos JSON | Usar exactamente los nombres definidos en el contrato |

## 5. Guia rapida de tipos

| Caso | Tipo JSON/API | Tipo Java recomendado | Tipo React/JS | Ejemplos |
| --- | --- | --- | --- | --- |
| Identificadores | `number` | `Long` | `number` | `id`, `userId`, `hotelId`, `offerId`, `attractionId`, `employeeId` |
| Cantidades enteras | `number` | `Integer` | `number` | `totalRooms`, `availableRooms`, `totalPlaces`, `availablePlaces`, `totalSeats`, `availableSeats`, `includedTickets`, `ticketsSold`, `totalTickets` |
| Importes / dinero | `number` | `BigDecimal` | `number` | `halfBoardPrice`, `fullBoardPrice`, `totalPrice`, `price`, `totalRevenue`, `revenue` |
| Texto | `string` | `String` | `string` | `firstName`, `lastName`, `name`, `description`, `email`, `phone`, `dni`, `imageUrl`, `publicId`, `message` |
| Fecha | `string` | `LocalDate` | `string` | `birthDate`, `visitDate`, `startDate`, `endDate`, `scheduledDate` |
| Fecha y hora | `string` | `LocalDateTime` | `string` | `createdAt`, `timestamp` |
| Booleano | `boolean` | `Boolean` | `boolean` | `active`, `emailSent` |
| Enumeracion | `string` | `enum` | `string` | `size`, `status`, `employeeType`, `shift`, `boardType`, `ageRange`, `folder` |
| Listas | `array` | `List<T>` | `Array` | `companions`, `tickets`, `technicians`, `ticketsByAgeRange`, `topHotels` |
| Archivo multipart | `multipart/form-data` | `MultipartFile` | `File` | `file` |

## 6. Entidades, dominios, endpoints y servicios

| Nombre funcional | Clase/entidad | Plural | Endpoint base | Dominio backend | Servicio frontend | Uso |
| --- | --- | --- | --- | --- | --- | --- |
| Usuario | `User` | `users` | `/api/users` | `user` | `userApi.js` | Clientes que compran entradas o reservas |
| Hotel | `Hotel` | `hotels` | `/api/hotels` | `hotel` | `hotelApi.js` | Hoteles, disponibilidad, plazas y precios |
| Atraccion | `Attraction` | `attractions` | `/api/attractions` | `attraction` | `attractionApi.js` | Atracciones del parque y estado operativo |
| Empleado | `Employee` | `employees` | `/api/employees` | `employee` | `employeeApi.js` | Limpiadores, animadores y tecnicos |
| Oferta | `Offer` | `offers` | `/api/offers` | `offer` | `offerApi.js` | Ofertas comerciales con hotel, pension y entradas |
| Reserva/compra | `Booking` | `bookings` | `/api/bookings` | `booking` | `bookingApi.js` | Compra o reserva con usuario, hotel, entradas y acompanantes |
| Turno | `Shift` | `shifts` | `/api/shifts` | `shift` | `-` | Turnos de empleados y rotacion |
| Mantenimiento | `Maintenance` | `maintenance` | `/api/maintenance` | `maintenance` | `-` | Agenda de mantenimiento de atracciones |
| Dashboard | `Dashboard` | `dashboard` | `/api/dashboard` | `dashboard` | `dashboardApi.js` | Metricas calculadas por backend |

## 7. Tabla anti-dudas: que nombre usar y que evitar

Regla practica: si un campo apunta a otro recurso, se usa el nombre de la entidad en singular + `Id`.

El campo `id` solo identifica al propio objeto que se esta devolviendo.

| Caso | Usar exactamente | Evitar |
| --- | --- | --- |
| Identificador interno de un recurso | `id` | `idUser`, `userID`, `idclient`, `clientid` |
| Relacion con usuario | `userId` | `idUser`, `clientId`, `idClient` |
| Relacion con hotel | `hotelId` | `idHotel` |
| Relacion con oferta | `offerId` | `idOffer` |
| Relacion con atraccion | `attractionId` | `idAttraction` |
| Relacion con empleado | `employeeId` | `idEmployee` |
| Nombre de persona | `firstName` | `name` para personas |
| Apellidos de persona | `lastName` | `surname`, `secondName` |
| Nombre completo ya calculado | `userFullName`, `employeeFullName`, `holderFullName`, `fullName` | Concatenar con nombres distintos en contrato |
| DNI | `dni` | `DNI`, `documentId`, `identityNumber` |
| Plazas de hotel | `totalPlaces`, `availablePlaces` | `totalSeats` para hoteles |
| Plazas de atraccion | `totalSeats`, `availableSeats` | `totalPlaces` para atracciones |
| Tipo de pension | `boardType` | `pensionType`, `planType` |
| Precio total | `totalPrice` | `priceTotal`, `amount` |
| URL de imagen | `imageUrl` | `img`, `image`, `urlImage` |
| Fecha de visita | `visitDate` | `date`, `bookingDate` |
| Fecha de creacion | `createdAt` | `creationDate`, `createdDate`, `dateCreated` |

## 8. Diccionario de campos por modulo

### 8.1 Usuario / User

| Campo exacto JSON/API | Tipo JSON/API | Tipo Java recomendado | Tipo React/JS | Uso | Significado / nota |
| --- | --- | --- | --- | --- | --- |
| `id` | `number` | `Long` | `number` | Response | Identificador del usuario |
| `firstName` | `string` | `String` | `string` | Request/response | Nombre del usuario |
| `lastName` | `string` | `String` | `string` | Request/response | Apellidos del usuario |
| `dni` | `string` | `String` | `string` | Request/response | Identificador documental del usuario |
| `email` | `string` | `String` | `string` | Request/response | Email del usuario |
| `phone` | `string` | `String` | `string` | Request/response | Telefono del usuario |
| `birthDate` | `string` | `LocalDate` | `string` | Request/response | Fecha de nacimiento en formato `YYYY-MM-DD` |

### 8.2 Hotel / Hotel

| Campo exacto JSON/API | Tipo JSON/API | Tipo Java recomendado | Tipo React/JS | Uso | Significado / nota |
| --- | --- | --- | --- | --- | --- |
| `id` | `number` | `Long` | `number` | Response | Identificador del hotel |
| `name` | `string` | `String` | `string` | Request/response | Nombre del hotel |
| `description` | `string` | `String` | `string` | Request/response | Descripcion del hotel |
| `totalRooms` | `number` | `Integer` | `number` | Request/response | Habitaciones totales |
| `availableRooms` | `number` | `Integer` | `number` | Request/response | Habitaciones disponibles |
| `totalPlaces` | `number` | `Integer` | `number` | Request/response | Plazas totales del hotel |
| `availablePlaces` | `number` | `Integer` | `number` | Request/response | Plazas disponibles del hotel |
| `halfBoardPrice` | `number` | `BigDecimal` | `number` | Request/response | Precio de media pension |
| `fullBoardPrice` | `number` | `BigDecimal` | `number` | Request/response | Precio de pension completa |
| `imageUrl` | `string` | `String` | `string` | Request/response | URL de imagen del hotel |

### 8.3 Atraccion / Attraction

| Campo exacto JSON/API | Tipo JSON/API | Tipo Java recomendado | Tipo React/JS | Uso | Significado / nota |
| --- | --- | --- | --- | --- | --- |
| `id` | `number` | `Long` | `number` | Response | Identificador de la atraccion |
| `name` | `string` | `String` | `string` | Request/response | Nombre de la atraccion |
| `description` | `string` | `String` | `string` | Request/response | Descripcion de la atraccion |
| `size` | `string` | `enum` | `string` | Request/response | Tamano de la atraccion |
| `status` | `string` | `enum` | `string` | Request/response | Estado operativo de la atraccion |
| `totalSeats` | `number` | `Integer` | `number` | Request/response | Plazas totales de la atraccion |
| `availableSeats` | `number` | `Integer` | `number` | Request/response | Plazas disponibles de la atraccion |
| `maintenanceFrequencyDays` | `number` | `Integer` | `number` | Response | Frecuencia de mantenimiento en dias, calculada segun tamano |
| `imageUrl` | `string` | `String` | `string` | Request/response | URL de imagen de la atraccion |

### 8.4 Empleado / Employee

| Campo exacto JSON/API | Tipo JSON/API | Tipo Java recomendado | Tipo React/JS | Uso | Significado / nota |
| --- | --- | --- | --- | --- | --- |
| `id` | `number` | `Long` | `number` | Response | Identificador del empleado |
| `firstName` | `string` | `String` | `string` | Request/response | Nombre del empleado |
| `lastName` | `string` | `String` | `string` | Request/response | Apellidos del empleado |
| `dni` | `string` | `String` | `string` | Request/response | Identificador documental del empleado |
| `email` | `string` | `String` | `string` | Request/response | Email del empleado |
| `employeeType` | `string` | `enum` | `string` | Request/response | Tipo de empleado |
| `shift` | `string` | `enum` | `string` | Request/response | Turno asignado |
| `active` | `boolean` | `Boolean` | `boolean` | Request/response | Indica si el empleado esta activo |

### 8.5 Oferta / Offer

| Campo exacto JSON/API | Tipo JSON/API | Tipo Java recomendado | Tipo React/JS | Uso | Significado / nota |
| --- | --- | --- | --- | --- | --- |
| `id` | `number` | `Long` | `number` | Response | Identificador de la oferta |
| `title` | `string` | `String` | `string` | Request/response | Titulo de la oferta |
| `description` | `string` | `String` | `string` | Request/response | Descripcion de la oferta |
| `hotelId` | `number` | `Long` | `number` | Request/response | Hotel asociado |
| `hotelName` | `string` | `String` | `string` | Response | Nombre del hotel asociado |
| `boardType` | `string` | `enum` | `string` | Request/response | Tipo de pension |
| `includedTickets` | `number` | `Integer` | `number` | Request/response | Entradas incluidas |
| `totalPrice` | `number` | `BigDecimal` | `number` | Request/response | Precio total de la oferta |
| `imageUrl` | `string` | `String` | `string` | Request/response | URL de imagen de la oferta |

### 8.6 Reserva / Booking - Request

| Campo exacto JSON/API | Tipo JSON/API | Tipo Java recomendado | Tipo React/JS | Uso | Significado / nota |
| --- | --- | --- | --- | --- | --- |
| `userId` | `number` | `Long` | `number` | Request | Usuario que realiza la compra o reserva |
| `offerId` | `number/null` | `Long` | `number | null` | Request | Oferta asociada; puede ser opcional |
| `hotelId` | `number/null` | `Long` | `number | null` | Request | Hotel asociado; puede ser opcional si solo compra entradas |
| `boardType` | `string` | `enum` | `string` | Request | Tipo de pension |
| `visitDate` | `string` | `LocalDate` | `string` | Request | Fecha de visita en formato `YYYY-MM-DD` |
| `companions` | `array` | `List<CompanionRequest>` | `Array` | Request | Lista de acompanantes |
| `companions.firstName` | `string` | `String` | `string` | Request | Nombre del acompanante |
| `companions.lastName` | `string` | `String` | `string` | Request | Apellidos del acompanante |
| `companions.birthDate` | `string` | `LocalDate` | `string` | Request | Fecha de nacimiento del acompanante |

### 8.7 Reserva / Booking - Response

| Campo exacto JSON/API | Tipo JSON/API | Tipo Java recomendado | Tipo React/JS | Uso | Significado / nota |
| --- | --- | --- | --- | --- | --- |
| `id` | `number` | `Long` | `number` | Response | Identificador de la reserva |
| `userId` | `number` | `Long` | `number` | Response | Usuario asociado |
| `userFullName` | `string` | `String` | `string` | Response | Nombre completo del usuario |
| `hotelId` | `number/null` | `Long` | `number | null` | Response | Hotel asociado |
| `hotelName` | `string/null` | `String` | `string | null` | Response | Nombre del hotel asociado |
| `boardType` | `string` | `enum` | `string` | Response | Tipo de pension |
| `visitDate` | `string` | `LocalDate` | `string` | Response | Fecha de visita |
| `tickets` | `array` | `List<TicketResponse>` | `Array` | Response | Entradas generadas |
| `tickets.holderFullName` | `string` | `String` | `string` | Response | Nombre completo del titular de la entrada |
| `tickets.ageRange` | `string` | `enum` | `string` | Response | Rango de edad usado para calcular tarifa |
| `tickets.price` | `number` | `BigDecimal` | `number` | Response | Precio de la entrada |
| `totalPrice` | `number` | `BigDecimal` | `number` | Response | Precio total de la reserva |
| `emailSent` | `boolean` | `Boolean` | `boolean` | Response | Indica si el email fue enviado |
| `createdAt` | `string` | `LocalDateTime` | `string` | Response | Fecha y hora de creacion |

### 8.8 Turno / Shift

| Campo exacto JSON/API | Tipo JSON/API | Tipo Java recomendado | Tipo React/JS | Uso | Significado / nota |
| --- | --- | --- | --- | --- | --- |
| `id` | `number` | `Long` | `number` | Response | Identificador del turno |
| `employeeId` | `number` | `Long` | `number` | Response | Empleado asociado |
| `employeeFullName` | `string` | `String` | `string` | Response | Nombre completo del empleado |
| `employeeType` | `string` | `enum` | `string` | Response | Tipo de empleado |
| `shift` | `string` | `enum` | `string` | Response | Turno asignado |
| `startDate` | `string` | `LocalDate` | `string` | Request/response | Fecha de inicio |
| `endDate` | `string` | `LocalDate` | `string` | Request/response | Fecha de fin |
| `totalGeneratedShifts` | `number` | `Integer` | `number` | Response | Total de turnos generados |

### 8.9 Mantenimiento / Maintenance

| Campo exacto JSON/API | Tipo JSON/API | Tipo Java recomendado | Tipo React/JS | Uso | Significado / nota |
| --- | --- | --- | --- | --- | --- |
| `id` | `number` | `Long` | `number` | Response | Identificador del mantenimiento |
| `attractionId` | `number` | `Long` | `number` | Response | Atraccion asociada |
| `attractionName` | `string` | `String` | `string` | Response | Nombre de la atraccion |
| `scheduledDate` | `string` | `LocalDate` | `string` | Response | Fecha programada |
| `status` | `string` | `enum` | `string` | Response | Estado del mantenimiento |
| `technicians` | `array` | `List<TechnicianResponse>` | `Array` | Response | Tecnicos asignados |
| `technicians.id` | `number` | `Long` | `number` | Response | Identificador del tecnico |
| `technicians.fullName` | `string` | `String` | `string` | Response | Nombre completo del tecnico |
| `totalMaintenanceTasks` | `number` | `Integer` | `number` | Response | Total de tareas de mantenimiento generadas |

### 8.10 Dashboard

| Campo exacto JSON/API | Tipo JSON/API | Tipo Java recomendado | Tipo React/JS | Uso | Significado / nota |
| --- | --- | --- | --- | --- | --- |
| `year` | `number` | `Integer` | `number` | Query/response | Ano de la metrica |
| `totalRevenue` | `number` | `BigDecimal` | `number` | Response | Recaudacion total |
| `ageRange` | `string` | `enum` | `string` | Response | Rango de edad |
| `ticketsSold` | `number` | `Integer` | `number` | Response | Entradas vendidas |
| `hotelId` | `number` | `Long` | `number` | Response | Hotel asociado a la metrica |
| `hotelName` | `string` | `String` | `string` | Response | Nombre del hotel |
| `revenue` | `number` | `BigDecimal` | `number` | Response | Recaudacion del hotel |
| `ticketsByAgeRange` | `array` | `List<TicketsByAgeRangeResponse>` | `Array` | Response | Metricas de entradas por edad |
| `topHotels` | `array` | `List<TopHotelResponse>` | `Array` | Response | Top 3 hoteles por recaudacion |

### 8.11 Cloudinary / Images

| Campo exacto JSON/API | Tipo JSON/API | Tipo Java recomendado | Tipo React/JS | Uso | Significado / nota |
| --- | --- | --- | --- | --- | --- |
| `file` | `multipart/form-data` | `MultipartFile` | `File` | Request | Imagen seleccionada |
| `folder` | `string` | `enum` | `string` | Request | Carpeta de destino en Cloudinary |
| `imageUrl` | `string` | `String` | `string` | Response | URL publica de la imagen |
| `publicId` | `string` | `String` | `string` | Response | Identificador publico de Cloudinary |

### 8.12 Error comun

| Campo exacto JSON/API | Tipo JSON/API | Tipo Java recomendado | Tipo React/JS | Uso | Significado / nota |
| --- | --- | --- | --- | --- | --- |
| `status` | `number` | `Integer` | `number` | Response error | Codigo HTTP numerico |
| `error` | `string` | `String` | `string` | Response error | Nombre del error HTTP |
| `message` | `string` | `String` | `string` | Response error | Mensaje controlado |
| `path` | `string` | `String` | `string` | Response error | Ruta que produjo el error |
| `timestamp` | `string` | `LocalDateTime` | `string` | Response error | Fecha y hora del error |

## 9. Enumeraciones acordadas

| Campo | Modulo | Valores permitidos |
| --- | --- | --- |
| `size` | Atraccion | `SMALL`, `MEDIUM`, `LARGE` |
| `status` | Atraccion | `OPEN`, `CLOSED`, `MAINTENANCE` |
| `employeeType` | Empleado/turnos | `CLEANER`, `ANIMATOR`, `TECHNICIAN` |
| `shift` | Empleado/turnos | `MORNING`, `AFTERNOON` |
| `boardType` | Oferta/reserva | `HALF_BOARD`, `FULL_BOARD` |
| `ageRange` | Tickets/dashboard | `CHILD`, `ADULT`, `SENIOR` |
| `status` | Mantenimiento | `SCHEDULED`, `COMPLETED`, `CANCELLED` |
| `folder` | Cloudinary | `hotels`, `attractions`, `offers`, `employees` |

## 10. Endpoints acordados

| Metodo | Ruta exacta | Uso | Estructura principal |
| --- | --- | --- | --- |
| `GET` | `/api/users` | Obtener todos los usuarios | Array de `User` |
| `GET` | `/api/users/{id}` | Obtener usuario por ID | `User` |
| `POST` | `/api/users` | Crear usuario | Request/response `User` |
| `PUT` | `/api/users/{id}` | Actualizar usuario | Request/response `User` |
| `DELETE` | `/api/users/{id}` | Eliminar usuario | `204 No Content` |
| `GET` | `/api/hotels` | Obtener todos los hoteles | Array de `Hotel` |
| `GET` | `/api/hotels/{id}` | Obtener hotel por ID | `Hotel` |
| `POST` | `/api/hotels` | Crear hotel | Request/response `Hotel` |
| `PUT` | `/api/hotels/{id}` | Actualizar hotel | Request/response `Hotel` |
| `DELETE` | `/api/hotels/{id}` | Eliminar hotel | `204 No Content` |
| `GET` | `/api/attractions` | Obtener todas las atracciones | Array de `Attraction` |
| `GET` | `/api/attractions/{id}` | Obtener atraccion por ID | `Attraction` |
| `POST` | `/api/attractions` | Crear atraccion | Request/response `Attraction` |
| `PUT` | `/api/attractions/{id}` | Actualizar atraccion | Request/response `Attraction` |
| `DELETE` | `/api/attractions/{id}` | Eliminar atraccion | `204 No Content` |
| `GET` | `/api/employees` | Obtener todos los empleados | Array de `Employee` |
| `GET` | `/api/employees/{id}` | Obtener empleado por ID | `Employee` |
| `POST` | `/api/employees` | Crear empleado | Request/response `Employee` |
| `PUT` | `/api/employees/{id}` | Actualizar empleado | Request/response `Employee` |
| `DELETE` | `/api/employees/{id}` | Eliminar empleado | `204 No Content` |
| `GET` | `/api/offers` | Obtener ofertas disponibles | Array de `Offer` |
| `GET` | `/api/offers/{id}` | Obtener oferta por ID | `Offer` |
| `POST` | `/api/offers` | Crear oferta | Request/response `Offer` |
| `POST` | `/api/bookings` | Crear compra o reserva | `Booking` request/response |
| `GET` | `/api/bookings` | Obtener compras o reservas | Array resumen de `Booking` |
| `GET` | `/api/bookings/{id}` | Obtener detalle de reserva | `Booking` completo |
| `GET` | `/api/shifts` | Obtener turnos generados | Array de `Shift` |
| `POST` | `/api/shifts/generate` | Generar turnos automaticamente | Request con fechas y response de generacion |
| `GET` | `/api/maintenance` | Obtener agenda de mantenimiento | Array de `Maintenance` |
| `POST` | `/api/maintenance/generate` | Generar agenda de mantenimiento | Request con fechas y response de generacion |
| `GET` | `/api/dashboard/tickets-by-age-range?year=2026` | Entradas vendidas por rango de edad | Array con `ageRange` y `ticketsSold` |
| `GET` | `/api/dashboard/current-year-revenue` | Recaudacion del ano en curso | `year` y `totalRevenue` |
| `GET` | `/api/dashboard/top-hotels?year=2026` | Top 3 hoteles por recaudacion | Array con `hotelId`, `hotelName` y `revenue` |
| `GET` | `/api/dashboard/summary?year=2026` | Resumen de metricas principales | `Dashboard` summary |
| `POST` | `/api/images/upload` | Subir imagen a Cloudinary | Multipart request y response con `imageUrl` y `publicId` |

## 11. Formatos tecnicos comunes

| Elemento | Formato acordado |
| --- | --- |
| Base URL | `/api` |
| Content-Type esperado | `application/json` para API general; `multipart/form-data` para subida de imagenes |
| Fecha | `YYYY-MM-DD` |
| Fecha y hora | `YYYY-MM-DDTHH:mm:ss` |
| Importes | Numeros decimales, por ejemplo `149.99` |
| Booleanos | `true` o `false` |
| Eliminaciones | `204 No Content` sin body |

## 12. Codigos de error y mensajes acordados

| Codigo | Mensaje exacto | Cuando usarlo |
| --- | --- | --- |
| `400 Bad Request` | `Invalid user data` | Datos de usuario invalidos |
| `400 Bad Request` | `Invalid booking data` | Datos de reserva invalidos |
| `400 Bad Request` | `Invalid image file` | Archivo de imagen invalido |
| `404 Not Found` | `User not found` | Usuario inexistente |
| `404 Not Found` | `Hotel not found` | Hotel inexistente |
| `409 Conflict` | `Email already exists` | Email duplicado |
| `409 Conflict` | `DNI already exists` | DNI duplicado |
| `409 Conflict` | `Hotel is full` | Hotel sin plazas disponibles |
| `409 Conflict` | `A minor cannot travel without an adult` | Menor sin adulto acompanante |
| `409 Conflict` | `Not enough employees to cover required shifts` | No hay empleados suficientes para cubrir turnos |
| `409 Conflict` | `Not enough technicians available` | No hay tecnicos suficientes para mantenimiento |
| `500 Internal Server Error` | `Email could not be sent` | Error al enviar email |
| `500 Internal Server Error` | `Image upload failed` | Error al subir imagen |

## 13. Estructura comun de error

| Campo exacto JSON/API | Tipo JSON/API | Tipo Java recomendado | Tipo React/JS | Uso | Significado |
| --- | --- | --- | --- | --- | --- |
| `status` | `number` | `Integer` | `number` | Response error | Codigo HTTP numerico |
| `error` | `string` | `String` | `string` | Response error | Nombre del error HTTP |
| `message` | `string` | `String` | `string` | Response error | Mensaje controlado |
| `path` | `string` | `String` | `string` | Response error | Ruta que produjo el error |
| `timestamp` | `string` | `LocalDateTime` | `string` | Response error | Fecha y hora del error |

## 14. Checklist para el equipo antes de cerrar una tarea

1. He usado los nombres exactos del contrato.
2. Si he tocado frontend-backend, he revisado `API_CONTRACT` y `CONTRACT_TESTING`.
3. Si he cambiado un campo JSON, endpoint, request o response, lo he comunicado y actualizado.
4. Swagger/OpenAPI refleja el contrato real.
5. Los servicios frontend usan los mismos nombres que el contrato.
6. Los tests de contrato relevantes estan actualizados.
7. No he usado `clientId`/`idClient` si el contrato dice `userId`.
8. No he mezclado `totalPlaces`/`availablePlaces` de hoteles con `totalSeats`/`availableSeats` de atracciones.
9. En Java no he copiado `number` como tipo.

## 15. Resumen minimo para diagramas de clases

| Clase / DTO base | Campos principales con tipo Java recomendado | Relaciones / notas |
| --- | --- | --- |
| `User` | `id: Long`, `firstName: String`, `lastName: String`, `dni: String`, `email: String`, `phone: String`, `birthDate: LocalDate` | Cliente que compra entradas o reservas |
| `Hotel` | `id: Long`, `name: String`, `description: String`, `totalRooms: Integer`, `availableRooms: Integer`, `totalPlaces: Integer`, `availablePlaces: Integer`, `halfBoardPrice: BigDecimal`, `fullBoardPrice: BigDecimal`, `imageUrl: String` | Puede asociarse a ofertas y reservas |
| `Attraction` | `id: Long`, `name: String`, `description: String`, `size: enum`, `status: enum`, `totalSeats: Integer`, `availableSeats: Integer`, `maintenanceFrequencyDays: Integer`, `imageUrl: String` | Puede tener mantenimientos programados |
| `Employee` | `id: Long`, `firstName: String`, `lastName: String`, `dni: String`, `email: String`, `employeeType: enum`, `shift: enum`, `active: Boolean` | Usado para turnos y tecnicos de mantenimiento |
| `Offer` | `id: Long`, `title: String`, `description: String`, `hotelId: Long`, `hotelName: String`, `boardType: enum`, `includedTickets: Integer`, `totalPrice: BigDecimal`, `imageUrl: String` | Combina hotel, pension y entradas |
| `Booking` | `id: Long`, `userId: Long`, `userFullName: String`, `hotelId: Long`, `hotelName: String`, `boardType: enum`, `visitDate: LocalDate`, `tickets: List<TicketResponse>`, `totalPrice: BigDecimal`, `emailSent: Boolean`, `createdAt: LocalDateTime` | Compra o reserva; puede incluir hotel y tickets |
| `Ticket` | `holderFullName: String`, `ageRange: enum`, `price: BigDecimal` | Entrada calculada segun edad |
| `Shift` | `id: Long`, `employeeId: Long`, `employeeType: enum`, `shift: enum`, `startDate: LocalDate`, `endDate: LocalDate` | Turnos rotativos de empleados |
| `Maintenance` | `id: Long`, `attractionId: Long`, `scheduledDate: LocalDate`, `status: enum`, `technicians: List<TechnicianResponse>` | Mantenimiento generado para atracciones |

## 16. Fuentes usadas

| Documento | Uso en este diccionario |
| --- | --- |
| `docs/API_CONTRACT.md` | Fuente de verdad para endpoints, requests, responses, campos JSON, errores y formatos |
| `docs/CONTRACT_TESTING.md` | Fuente de verdad para validaciones de contrato, campos criticos y casos minimos |
| `AGENTS.md` | Normas del proyecto, naming, estructura, flujo de trabajo y responsabilidades frontend-backend |
