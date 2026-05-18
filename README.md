<div align="center">

# 🚪 La Última Puerta — Frontend

[![React](https://img.shields.io/badge/React-19-red?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-red?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-red?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-red?style=flat-square)](LICENSE)

</div>

---

<div align="center">

[🇪🇸 Español](#es) &nbsp;·&nbsp; [🇬🇧 English](#en)

</div>

---

<a id="es"></a>

<div align="right"><a href="#en">🇬🇧 English ↓</a></div>

## 🇪🇸 Español

Interfaz web para la gestión y venta de un parque de atracciones de terror.
Proyecto final del bootcamp **Factoría F5 · 2026**.

El frontend se organiza en cuatro experiencias independientes,
cada una con su usuario y su función:

| Ruta | Experiencia | Función |
|------|------------|---------|
| `/home` | Home pública | Presentar el parque y dirigir a taquilla |
| `/dashboard` | Dashboard interno | Gestionar reservas, operaciones y métricas |
| `/mobile/:token` | Mobile visitante | Guiar la visita con mapa y ruta optimizada |
| `/entry/:token` | Control QR | Validar entradas en la puerta del parque |

---

### ⚙️ Stack

![React](https://img.shields.io/badge/React-19.2.5-red?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8.0.10-red?style=flat-square&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4.2.4-red?style=flat-square&logo=tailwindcss)
![React Router](https://img.shields.io/badge/React_Router-7.14.2-red?style=flat-square&logo=reactrouter)
![Axios](https://img.shields.io/badge/Axios-1.15.2-red?style=flat-square&logo=axios)
![Vitest](https://img.shields.io/badge/Vitest-4.0.8-red?style=flat-square&logo=vitest)

| Elemento | Tecnología |
|----------|-----------|
| Framework | React 19.2.5 |
| Build | Vite 8.0.10 |
| Estilos | Tailwind CSS 4.2.4 |
| Routing | React Router DOM 7.14.2 |
| HTTP | Axios 1.15.2 |
| Iconos | Lucide React · React Icons |
| Testing unitario | Vitest 4.0.8 + React Testing Library 16 |
| Gestor de paquetes | npm |

---

### 🗂️ Estructura del proyecto

![Experiencias](https://img.shields.io/badge/experiencias-4-red?style=flat-square)
![APIs](https://img.shields.io/badge/servicios_API-13-red?style=flat-square)
![Rutas](https://img.shields.io/badge/rutas-4-red?style=flat-square&logo=reactrouter)

```
src/
├── api/                  ← 13 servicios HTTP centralizados
│   ├── apiClient.js      ← cliente Axios con interceptores JWT
│   ├── attractionApi.js
│   ├── authApi.js
│   ├── bookingApi.js
│   ├── dashboardApi.js
│   ├── employeeApi.js
│   ├── hotelApi.js
│   ├── imageApi.js
│   ├── maintenanceApi.js
│   ├── offerApi.js
│   ├── shiftApi.js
│   ├── ticketApi.js
│   ├── userApi.js
│   └── weatherApi.js
├── assets/
│   └── home/             ← imágenes reales del parque
├── components/
│   ├── dashboard/        ← DashboardKpiCard · DashboardMapPanel · DashboardAlertsPanel
│   ├── mobileExperience/ ← MobileMap · AttractionMarker · AttractionModal · RouteCard
│   └── ui/               ← Button · Card · Badge · StatusChip · StatusMessage
├── data/                 ← datos estáticos (MapData)
├── features/
│   ├── admin/            ← BookingDesk · EntityManager · OperationsBoard · OverviewPanel
│   ├── auth/             ← internalAuth (sesión JWT)
│   └── mobile/           ← mobilePlan (lógica de ruta)
├── layouts/
│   ├── home/             ← Navbar y navegación pública
│   ├── mobile/           ← MobileTopBar
│   ├── HomeLayout.jsx
│   ├── DashboardLayout.jsx
│   └── MobileLayout.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── DashboardPage.jsx
│   ├── MobilePage.jsx
│   └── EntryValidationPage.jsx
├── router/
│   └── index.jsx         ← definición de rutas
└── test/
    └── setup.js
```

---

### 📋 Requisitos previos

![Node.js](https://img.shields.io/badge/Node.js-requerido-red?style=flat-square&logo=nodedotjs)
![npm](https://img.shields.io/badge/npm-requerido-red?style=flat-square&logo=npm)
![Backend](https://img.shields.io/badge/backend-localhost:8080-red?style=flat-square&logo=springboot)

- Node.js (versión compatible con Vite 8)
- npm
- Backend en ejecución en `http://localhost:8080`

---

### 🚀 Instalación

![npm](https://img.shields.io/badge/npm_install-dependencias-red?style=flat-square&logo=npm)
![Vite](https://img.shields.io/badge/Vite-dev_server-red?style=flat-square&logo=vite)
![Puerto](https://img.shields.io/badge/puerto-5173-red?style=flat-square)

```bash
# 1. Clonar el repositorio
git clone <url-repositorio-frontend>
cd FrontendProject

# 2. Instalar dependencias
npm install

# 3. Crear el archivo de entorno
cp .env.example .env
# Editar .env si el backend no corre en localhost:8080

# 4. Arrancar en modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

---

### 🔐 Variables de entorno

![dotenv](https://img.shields.io/badge/.env-requerido-red?style=flat-square&logo=dotenv)
![Vite](https://img.shields.io/badge/VITE__API__BASE__URL-variable_clave-red?style=flat-square&logo=vite)

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=http://localhost:8080
```

El cliente HTTP acepta tanto `http://localhost:8080` como `http://localhost:8080/api`.
Si la variable no está definida, usa `http://localhost:8080` por defecto.

> ⚠️ El archivo `.env` no se sube al repositorio.

---

### 💻 Comandos

![npm](https://img.shields.io/badge/npm-scripts-red?style=flat-square&logo=npm)
![Vitest](https://img.shields.io/badge/Vitest-tests-red?style=flat-square&logo=vitest)
![ESLint](https://img.shields.io/badge/ESLint-linting-red?style=flat-square&logo=eslint)

```bash
npm run dev          # servidor de desarrollo en http://localhost:5173
npm run build        # compilar para producción
npm run preview      # previsualizar la build de producción
npm run lint         # análisis estático del código
npm run test         # ejecutar tests unitarios (vitest run)
npm run test:watch   # ejecutar tests en modo watch
```

---

### 🔗 Servicios API

![Axios](https://img.shields.io/badge/Axios-cliente_HTTP-red?style=flat-square&logo=axios)
![JWT](https://img.shields.io/badge/JWT-Bearer_token-red?style=flat-square&logo=jsonwebtokens)
![Centralizado](https://img.shields.io/badge/llamadas-centralizadas_en_src/api-red?style=flat-square)
![Errores ES](https://img.shields.io/badge/errores-traducidos_al_castellano-red?style=flat-square)

Todas las llamadas HTTP están centralizadas en `src/api/`.
Ningún componente hace llamadas directas.

El cliente base (`apiClient.js`) gestiona:
- Cabecera `Content-Type: application/json` de forma automática.
- Token JWT `Bearer` en todas las peticiones autenticadas.
- Cierre de sesión automático ante respuestas `401`.
- Traducción al castellano de los mensajes de error del backend.

| Servicio | Módulo de backend |
|----------|------------------|
| `attractionApi` | `/api/attractions` |
| `authApi` | `/api/auth` |
| `bookingApi` | `/api/bookings` |
| `dashboardApi` | `/api/dashboard` |
| `employeeApi` | `/api/employees` |
| `hotelApi` | `/api/hotels` |
| `imageApi` | `/api/images` |
| `maintenanceApi` | `/api/maintenance` |
| `offerApi` | `/api/offers` |
| `shiftApi` | `/api/shifts` |
| `ticketApi` | `/api/tickets` |
| `userApi` | `/api/users` |
| `weatherApi` | `/api/weather/granada` |

---

### 🧪 Testing

![Tests](https://img.shields.io/badge/tests-7_archivos-red?style=flat-square&logo=vitest)
![Vitest](https://img.shields.io/badge/Vitest-runner-red?style=flat-square&logo=vitest)
![RTL](https://img.shields.io/badge/Testing_Library-React-red?style=flat-square&logo=testinglibrary)
![jsdom](https://img.shields.io/badge/entorno-jsdom-red?style=flat-square)

El proyecto tiene 7 archivos de test:

| Archivo | Qué cubre |
|---------|----------|
| `HomePage.test.jsx` | Renderizado y carga de datos de la home |
| `DashboardPage.test.jsx` | Componentes y métricas del dashboard |
| `MobilePage.test.jsx` | Mapa, ruta y progreso del visitante |
| `EntryValidationPage.test.jsx` | Flujo de validación QR |
| `DashboardLayout.test.jsx` | Layout y navegación interna |
| `BookingDesk.test.jsx` | Flujo completo de reserva desde taquilla |
| `mobilePlan.test.js` | Lógica de ruta optimizada |

```bash
npm run test          # ejecutar todos los tests una vez
npm run test:watch    # modo interactivo
```

---

### 📚 Documentación técnica

![Markdown](https://img.shields.io/badge/formato-Markdown-red?style=flat-square&logo=markdown)
![Figma](https://img.shields.io/badge/Figma-referencia_visual-red?style=flat-square&logo=figma)
![API Contract](https://img.shields.io/badge/contrato_API-fuente_de_verdad-red?style=flat-square)

| Archivo | Contenido |
|---------|----------|
| `docs/API_CONTRACT.md` | Fuente de verdad del contrato API |
| `docs/CONTRACT_TESTING.md` | Estrategia y casos mínimos de testing |
| `docs/FRONTEND_CONTEXT.md` | Contexto de producto y reglas del frontend |
| `docs/API_NAMING_DICTIONARY.md` | Diccionario de nombres de campos JSON |
| `docs/FIGMA_FINAL_REFERENCE.md` | Referencia de diseño final aprobado |
| `docs/VISUAL_REFERENCE.md` | Criterios visuales del proyecto |

---

### 👥 Equipo

![Factoría F5](https://img.shields.io/badge/Factoría_F5-2026-red?style=flat-square)
![Scrum](https://img.shields.io/badge/metodología-Scrum-red?style=flat-square)

Proyecto desarrollado por el equipo de **Factoría F5 · 2026**.

| Rol | Persona |
|-----|---------|
| Product Owner | Alberto |
| Scrum Master | Xavier |
| Desarrolladora | — |
| Desarrolladora | — |
| Desarrolladora / Líbero | David |

---

<div align="center"><a href="#es">⬆ Volver al inicio</a> · <a href="#en">🇬🇧 English ↓</a></div>

---
---

<a id="en"></a>

<div align="right"><a href="#es">🇪🇸 Español ↑</a></div>

## 🇬🇧 English

Web interface for the management and sale of a horror theme park.
Final project of the **Factoría F5 · 2026** bootcamp.

The frontend is organised into four independent experiences,
each with its own user and purpose:

| Route | Experience | Purpose |
|-------|-----------|---------|
| `/home` | Public home | Present the park and direct to ticket office |
| `/dashboard` | Internal dashboard | Manage bookings, operations and metrics |
| `/mobile/:token` | Visitor mobile | Guide the visit with map and optimised route |
| `/entry/:token` | QR control | Validate entry tickets at the park gate |

---

### ⚙️ Stack

![React](https://img.shields.io/badge/React-19.2.5-red?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8.0.10-red?style=flat-square&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4.2.4-red?style=flat-square&logo=tailwindcss)
![React Router](https://img.shields.io/badge/React_Router-7.14.2-red?style=flat-square&logo=reactrouter)
![Axios](https://img.shields.io/badge/Axios-1.15.2-red?style=flat-square&logo=axios)
![Vitest](https://img.shields.io/badge/Vitest-4.0.8-red?style=flat-square&logo=vitest)

| Element | Technology |
|---------|-----------|
| Framework | React 19.2.5 |
| Build | Vite 8.0.10 |
| Styles | Tailwind CSS 4.2.4 |
| Routing | React Router DOM 7.14.2 |
| HTTP | Axios 1.15.2 |
| Icons | Lucide React · React Icons |
| Unit testing | Vitest 4.0.8 + React Testing Library 16 |
| Package manager | npm |

---

### 🗂️ Project Structure

![Experiences](https://img.shields.io/badge/experiences-4-red?style=flat-square)
![APIs](https://img.shields.io/badge/API_services-13-red?style=flat-square)
![Routes](https://img.shields.io/badge/routes-4-red?style=flat-square&logo=reactrouter)

```
src/
├── api/                  ← 13 centralised HTTP services
│   ├── apiClient.js      ← Axios client with JWT interceptors
│   ├── attractionApi.js
│   ├── authApi.js
│   ├── bookingApi.js
│   ├── dashboardApi.js
│   ├── employeeApi.js
│   ├── hotelApi.js
│   ├── imageApi.js
│   ├── maintenanceApi.js
│   ├── offerApi.js
│   ├── shiftApi.js
│   ├── ticketApi.js
│   ├── userApi.js
│   └── weatherApi.js
├── assets/
│   └── home/             ← real park images
├── components/
│   ├── dashboard/        ← DashboardKpiCard · DashboardMapPanel · DashboardAlertsPanel
│   ├── mobileExperience/ ← MobileMap · AttractionMarker · AttractionModal · RouteCard
│   └── ui/               ← Button · Card · Badge · StatusChip · StatusMessage
├── data/                 ← static data (MapData)
├── features/
│   ├── admin/            ← BookingDesk · EntityManager · OperationsBoard · OverviewPanel
│   ├── auth/             ← internalAuth (JWT session)
│   └── mobile/           ← mobilePlan (route logic)
├── layouts/
│   ├── home/             ← Navbar and public navigation
│   ├── mobile/           ← MobileTopBar
│   ├── HomeLayout.jsx
│   ├── DashboardLayout.jsx
│   └── MobileLayout.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── DashboardPage.jsx
│   ├── MobilePage.jsx
│   └── EntryValidationPage.jsx
├── router/
│   └── index.jsx         ← route definitions
└── test/
    └── setup.js
```

---

### 📋 Prerequisites

![Node.js](https://img.shields.io/badge/Node.js-required-red?style=flat-square&logo=nodedotjs)
![npm](https://img.shields.io/badge/npm-required-red?style=flat-square&logo=npm)
![Backend](https://img.shields.io/badge/backend-localhost:8080-red?style=flat-square&logo=springboot)

- Node.js (version compatible with Vite 8)
- npm
- Backend running at `http://localhost:8080`

---

### 🚀 Installation

![npm](https://img.shields.io/badge/npm_install-dependencies-red?style=flat-square&logo=npm)
![Vite](https://img.shields.io/badge/Vite-dev_server-red?style=flat-square&logo=vite)
![Port](https://img.shields.io/badge/port-5173-red?style=flat-square)

```bash
# 1. Clone the repository
git clone <frontend-repository-url>
cd FrontendProject

# 2. Install dependencies
npm install

# 3. Create the environment file
cp .env.example .env
# Edit .env if the backend is not running on localhost:8080

# 4. Start in development mode
npm run dev
```

The application will be available at `http://localhost:5173`.

---

### 🔐 Environment Variables

![dotenv](https://img.shields.io/badge/.env-required-red?style=flat-square&logo=dotenv)
![Vite](https://img.shields.io/badge/VITE__API__BASE__URL-key_variable-red?style=flat-square&logo=vite)

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:8080
```

The HTTP client accepts both `http://localhost:8080` and `http://localhost:8080/api`.
If the variable is not set, it defaults to `http://localhost:8080`.

> ⚠️ The `.env` file must never be committed to the repository.

---

### 💻 Commands

![npm](https://img.shields.io/badge/npm-scripts-red?style=flat-square&logo=npm)
![Vitest](https://img.shields.io/badge/Vitest-tests-red?style=flat-square&logo=vitest)
![ESLint](https://img.shields.io/badge/ESLint-linting-red?style=flat-square&logo=eslint)

```bash
npm run dev          # development server at http://localhost:5173
npm run build        # production build
npm run preview      # preview the production build
npm run lint         # static code analysis
npm run test         # run unit tests once (vitest run)
npm run test:watch   # interactive watch mode
```

---

### 🔗 API Services

![Axios](https://img.shields.io/badge/Axios-HTTP_client-red?style=flat-square&logo=axios)
![JWT](https://img.shields.io/badge/JWT-Bearer_token-red?style=flat-square&logo=jsonwebtokens)
![Centralised](https://img.shields.io/badge/calls-centralised_in_src/api-red?style=flat-square)
![Errors EN](https://img.shields.io/badge/errors-translated_to_Spanish-red?style=flat-square)

All HTTP calls are centralised in `src/api/`.
No component makes direct HTTP calls.

The base client (`apiClient.js`) handles:
- Automatic `Content-Type: application/json` header.
- `Bearer` JWT token on all authenticated requests.
- Automatic session clear on `401` responses.
- Spanish translation of backend error messages.

| Service | Backend module |
|---------|---------------|
| `attractionApi` | `/api/attractions` |
| `authApi` | `/api/auth` |
| `bookingApi` | `/api/bookings` |
| `dashboardApi` | `/api/dashboard` |
| `employeeApi` | `/api/employees` |
| `hotelApi` | `/api/hotels` |
| `imageApi` | `/api/images` |
| `maintenanceApi` | `/api/maintenance` |
| `offerApi` | `/api/offers` |
| `shiftApi` | `/api/shifts` |
| `ticketApi` | `/api/tickets` |
| `userApi` | `/api/users` |
| `weatherApi` | `/api/weather/granada` |

---

### 🧪 Testing

![Tests](https://img.shields.io/badge/tests-7_files-red?style=flat-square&logo=vitest)
![Vitest](https://img.shields.io/badge/Vitest-runner-red?style=flat-square&logo=vitest)
![RTL](https://img.shields.io/badge/Testing_Library-React-red?style=flat-square&logo=testinglibrary)
![jsdom](https://img.shields.io/badge/environment-jsdom-red?style=flat-square)

The project has 7 test files:

| File | Scope |
|------|-------|
| `HomePage.test.jsx` | Home rendering and data loading |
| `DashboardPage.test.jsx` | Dashboard components and metrics |
| `MobilePage.test.jsx` | Map, route and visitor progress |
| `EntryValidationPage.test.jsx` | QR validation flow |
| `DashboardLayout.test.jsx` | Internal layout and navigation |
| `BookingDesk.test.jsx` | Full booking flow from ticket office |
| `mobilePlan.test.js` | Optimised route logic |

```bash
npm run test          # run all tests once
npm run test:watch    # interactive mode
```

---

### 📚 Technical Documentation

![Markdown](https://img.shields.io/badge/format-Markdown-red?style=flat-square&logo=markdown)
![Figma](https://img.shields.io/badge/Figma-visual_reference-red?style=flat-square&logo=figma)
![API Contract](https://img.shields.io/badge/API_contract-source_of_truth-red?style=flat-square)

| File | Content |
|------|---------|
| `docs/API_CONTRACT.md` | API contract source of truth |
| `docs/CONTRACT_TESTING.md` | Testing strategy and minimum cases |
| `docs/FRONTEND_CONTEXT.md` | Product context and frontend rules |
| `docs/API_NAMING_DICTIONARY.md` | JSON field naming dictionary |
| `docs/FIGMA_FINAL_REFERENCE.md` | Approved final design reference |
| `docs/VISUAL_REFERENCE.md` | Project visual criteria |

---

### 👥 Team

![Factoría F5](https://img.shields.io/badge/Factoría_F5-2026-red?style=flat-square)
![Scrum](https://img.shields.io/badge/methodology-Scrum-red?style=flat-square)

Project developed by the **Factoría F5 · 2026** team.

| Role | Person |
|------|--------|
| Product Owner | Alberto |
| Scrum Master | Xavier |
| Developer | — |
| Developer | — |
| Developer / Support Libero | David |

---

<div align="center"><a href="#en">⬆ Back to top</a> · <a href="#es">🇪🇸 Español ↑</a></div>

---

<div align="center">

**La Última Puerta · Factoría F5 · 2026**

</div>
