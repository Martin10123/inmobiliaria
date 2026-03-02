# NEXUS ERP
## ERP Modular con Motor de Seguimiento Inteligente e Integración con n8n

Proyecto universitario orientado al diseño e implementación de un sistema ERP modular con automatización inteligente mediante integración con n8n.

---

# 📌 Descripción General

NEXUS ERP es un sistema de gestión empresarial modular que incorpora:

- Gestión de proyectos
- Control de inventario
- Gestión de clientes (CRM)
- Sistema de solicitudes y aprobaciones
- Motor de eventos
- Integración con n8n para automatización y bots
- Notificaciones automatizadas (WhatsApp simulado, Email)

El enfoque principal del proyecto es demostrar:

- Arquitectura orientada a eventos
- Integración de sistemas
- Automatización empresarial
- Diseño modular escalable
- Separación de responsabilidades

---

# 🎯 Objetivo del Proyecto

Diseñar e implementar un ERP académico funcional que:

1. Permita gestionar procesos internos empresariales.
2. Emita eventos ante cambios importantes.
3. Se integre con n8n como motor externo de automatización.
4. Ejecute flujos automatizados configurables.
5. Envíe notificaciones inteligentes basadas en reglas.

---

# 🏗 Arquitectura del Sistema

## Componentes

1. Backend ERP (API REST)
2. Base de datos relacional (PostgreSQL o MySQL)
3. n8n (motor de automatización)
4. Servicio de notificaciones (simulado o sandbox)

---

## Arquitectura Lógica

ERP Backend
    ↓ (Webhook)
n8n
    ↓
Acciones Automatizadas
    ↓
ERP API / Notificaciones

---

# 🧩 Módulos del Sistema

## 1️⃣ Gestión de Proyectos

### 📋 Características Principales

#### Vista General de Proyectos
- Lista completa de proyectos con filtros avanzados
- Búsqueda por nombre o código de proyecto
- Filtrado por estado (Planificación, En Progreso, Pausado, Completado, Cancelado)
- Filtrado por tipo (Residencial, Comercial, Industrial, Infraestructura, Remodelación)
- Filtrado por prioridad (Baja, Media, Alta, Crítica)
- Estadísticas en tiempo real (Total, En Progreso, En Planificación, Completados)
- Tabla interactiva con información de progreso y presupuesto

#### Detalle de Proyecto
Cada proyecto cuenta con un panel completo dividido en 6 pestañas:

**1. Información General (Overview)**
- Detalles del proyecto (tipo, prioridad, código, descripción)
- Cronograma completo (fechas planificadas vs reales)
- Información financiera (presupuesto, costo actual, ingresos proyectados, rentabilidad)
- Ubicación del proyecto (dirección, ciudad)
- Alertas automáticas (presupuesto excedido, proyecto atrasado)
- Indicador de progreso visual con porcentaje
- KPIs principales (días restantes, porcentaje de presupuesto usado)

**2. Tareas del Proyecto**
- Lista completa de tareas del proyecto
- Filtros por estado (Pendientes, En Progreso, Completadas)
- Estadísticas de tareas (total, pendientes, completadas)
- Información por tarea:
  - Nombre, descripción y estado
  - Prioridad visual con colores
  - Responsable asignado con avatar
  - Fecha de vencimiento con alertas de retraso
  - Horas estimadas vs horas reales
  - Barra de progreso porcentual
  - Sistema de dependencias entre tareas
- Botón para crear nuevas tareas
- Indicadores de tareas vencidas

**3. Eventos del Proyecto (Timeline)**
- Registro cronológico de todos los eventos
- Tipos de eventos:
  - PROJECT_CREATED (Creación del proyecto)
  - STATUS_CHANGED (Cambios de estado)
  - TASK_COMPLETED (Tareas completadas)
  - DOCUMENT_UPLOADED (Documentos subidos)
  - TEAM_MEMBER_ADDED (Miembros agregados)
  - BUDGET_UPDATED (Actualizaciones presupuestarias)
  - MILESTONE_REACHED (Hitos alcanzados)
  - PHASE_COMPLETED (Fases completadas)
  - CONTRACT_SIGNED (Contratos firmados)
  - CLIENT_MEETING (Reuniones con clientes)
  - PAYMENT_RECEIVED (Pagos recibidos)
- Metadata contextual para cada evento
- Íconos distintivos según tipo de evento
- Formato de fecha y hora
- Usuario que generó el evento

**4. Documentos del Proyecto**
- Biblioteca de documentos organizada
- Tipos de documentos:
  - Contratos
  - Planos
  - Permisos
  - Facturas
  - Reportes
  - Imágenes
  - Otros
- Información por documento:
  - Nombre y tipo
  - Tamaño del archivo (KB, MB)
  - Fecha de carga
  - Usuario que subió el archivo
  - Número de versión
- Estadísticas de documentos por tipo
- Botón para subir nuevos documentos
- Acciones: Ver, Descargar, Eliminar

**5. Equipo del Proyecto**
- Lista completa del equipo con avatar circular
- Roles del equipo:
  - Project Manager (Gerente de Proyecto)
  - Architect (Arquitecto)
  - Engineer (Ingeniero)
  - Contractor (Contratista)
  - Supervisor (Supervisor)
  - Designer (Diseñador)
  - Accountant (Contador)
  - Legal (Legal)
  - Other (Otro)
- Información por miembro:
  - Nombre completo con iniciales en avatar
  - Rol con etiquetas de color
  - Email y teléfono de contacto
  - Horas asignadas al proyecto
  - Número de tareas asignadas
- Estadísticas del equipo (total de miembros por rol)
- Botón para agregar nuevos miembros

**6. Timeline del Proyecto (Gantt)**
- Visualización cronológica de fases del proyecto
- Información por fase:
  - Nombre de la fase
  - Fechas de inicio y fin
  - Duración en días
  - Porcentaje de progreso
  - Estado (Completada, En Progreso, Pendiente, Retrasada)
- Barra de progreso visual para cada fase
- Indicadores de estado con colores
- Vista general del cronograma del proyecto
- Identificación de fases críticas o retrasadas

### 🎯 Datos Gestionados

**Proyecto Principal:**
- Información básica (nombre, código, descripción)
- Estado del proyecto (5 estados posibles)
- Tipo de proyecto (5 categorías)
- Prioridad (4 niveles)
- Cliente asociado (ID + nombre)
- Gerente de proyecto (ID + nombre)
- Fechas (planificadas y reales de inicio/fin)
- Presupuesto y costos actuales
- Ingresos proyectados
- Porcentaje de progreso general
- Ubicación (dirección, ciudad)

**Tareas:**
- Título, descripción y estado
- Prioridad y asignación
- Fechas de inicio, vencimiento y completación
- Horas estimadas vs reales
- Porcentaje de progreso
- Sistema de dependencias
- Vinculación al proyecto

**Eventos:**
- Tipo de evento (11 tipos)
- Fecha y hora del evento
- Usuario que lo generó
- Metadata contextual (JSON)
- Vinculación al proyecto

**Documentos:**
- Nombre y tipo
- Ruta del archivo
- Tamaño en bytes
- Número de versión
- Fecha de carga y usuario
- Vinculación al proyecto

**Equipo:**
- Información de contacto completa
- Rol en el proyecto
- Horas asignadas
- Vinculación al proyecto

**Fases:**
- Nombre y descripción
- Fechas de inicio y fin
- Estado y progreso
- Vinculación al proyecto

### 🔔 Eventos Emitidos

Por el Motor de Eventos del Sistema:

**Eventos de Proyecto:**
- Proyecto creado
- Estado del proyecto cambiado
- Presupuesto actualizado
- Proyecto completado
- Proyecto pausado/cancelado

**Eventos de Tareas:**
- Nueva tarea creada
- Tarea completada
- Tarea vencida
- Tarea sin iniciar después de 24h
- Cambio de prioridad de tarea

**Eventos de Documentos:**
- Documento subido
- Nueva versión de documento
- Documento eliminado

**Eventos de Equipo:**
- Miembro agregado al equipo
- Miembro removido del equipo
- Cambio de rol

**Eventos de Hitos:**
- Hito alcanzado
- Fase completada
- Contrato firmado
- Pago recibido

**Eventos de Clientes:**
- Reunión con cliente programada
- Reunión con cliente realizada
- Aprobación de cliente recibida

### 🏗 Arquitectura del Módulo

```
src/features/projects/
├── ProjectsPage.tsx (Vista principal con lista)
├── ProjectDetailPage.tsx (Vista de detalle con pestañas)
├── components/
│   ├── ProjectStats.tsx (Estadísticas)
│   ├── ProjectFilters.tsx (Búsqueda y filtros)
│   ├── ProjectTable.tsx (Tabla de proyectos)
│   ├── ProjectFormModal.tsx (Formulario crear/editar)
│   ├── ProjectOverview.tsx (Pestaña: Info general)
│   ├── TaskList.tsx (Pestaña: Tareas)
│   ├── EventsTimeline.tsx (Pestaña: Eventos)
│   ├── DocumentsList.tsx (Pestaña: Documentos)
│   ├── TeamSection.tsx (Pestaña: Equipo)
│   └── ProjectTimeline.tsx (Pestaña: Timeline/Gantt)
├── data/
│   ├── mockProjects.ts (4 proyectos de ejemplo)
│   ├── mockTasks.ts (10 tareas de ejemplo)
│   ├── mockEvents.ts (14 eventos de ejemplo)
│   └── mockData.ts (Documentos, equipo, fases)
└── utils/
    └── projectHelpers.ts (20+ funciones auxiliares)
```

### ✅ Buenas Prácticas Implementadas

1. **Componentización:** Componentes pequeños (< 100 líneas)
2. **Separación de responsabilidades:** Datos, lógica y presentación separados
3. **TypeScript:** 100% tipado, sin uso de 'any'
4. **Reutilización:** Helpers compartidos para formateo y etiquetado
5. **Responsive:** Diseño adaptable a diferentes pantallas
6. **Accesibilidad:** Etiquetas semánticas y navegación por teclado
7. **Performance:** Renderizado condicional y filtrado eficiente

---

## 2️⃣ Inventario

- Registro de productos
- Control de stock
- Stock mínimo
- Historial de movimientos

Eventos emitidos:
- Stock bajo
- Producto agotado

---

## 3️⃣ CRM (Clientes)

- Registro de clientes
- Historial de interacciones
- Seguimiento de actividad

Eventos emitidos:
- Cliente inactivo (X días sin actividad)

---

## 4️⃣ Solicitudes y Aprobaciones

- Solicitudes internas
- Estados: Pendiente, Aprobada, Rechazada
- Flujo básico de aprobación

Eventos emitidos:
- Nueva solicitud creada
- Solicitud pendiente por más de X horas

---

# ⚙ Integración con n8n

Se utiliza n8n como motor de automatización externo.

n8n recibe eventos del ERP mediante Webhooks y ejecuta flujos configurados.

---

## 🔁 Automatizaciones Implementadas

### 1️⃣ Recordatorio de tareas

Trigger:
- Nueva tarea creada

Flujo:
- Esperar 24 horas
- Consultar estado vía API
- Si sigue pendiente → enviar notificación

---

### 2️⃣ Inventario bajo

Trigger:
- Stock < stock mínimo

Flujo:
- Notificar responsable
- Crear solicitud automática
- Enviar alerta

---

### 3️⃣ Cliente inactivo

Trigger:
- 45 días sin actividad

Flujo:
- Crear tarea de seguimiento
- Notificar asesor

---

# 🔌 Endpoints del Backend

## Autenticación
POST /auth/login

## Tareas
POST /tasks
GET /tasks/:id
PATCH /tasks/:id
GET /tasks/user/:userId

## Inventario
POST /inventory
GET /inventory
PATCH /inventory/:id

## Clientes
POST /clients
GET /clients
PATCH /clients/:id

## Solicitudes
POST /requests
PATCH /requests/:id

## Eventos
POST /events/webhook

---

# 🧠 Motor de Eventos

Cada acción relevante genera un evento:

Ejemplo:
{
  "event": "TASK_CREATED",
  "taskId": 12,
  "assignedTo": 5,
  "createdAt": "2026-02-27"
}

Este evento es enviado automáticamente a n8n.

---

# 📊 Cronograma del Proyecto (16 semanas)

## Fase 1 – Análisis y Diseño (Semanas 1-3)
- Definición de requerimientos
- Diseño de base de datos
- Diseño de arquitectura
- Wireframes

## Fase 2 – Desarrollo Backend (Semanas 4-8)
- Autenticación
- CRUD módulos principales
- Sistema de eventos
- Webhooks

## Fase 3 – Integración con n8n (Semanas 9-11)
- Configuración de n8n
- Creación de flujos
- Pruebas de automatización

## Fase 4 – Frontend (Semanas 12-14)
- Dashboard
- Formularios
- Visualización de tareas e inventario

## Fase 5 – Pruebas y Documentación (Semanas 15-16)
- Casos de prueba
- Validación funcional
- Documentación técnica
- Preparación presentación final

---

# ⚠ Riesgos Académicos

1. Alcance excesivo
2. Complejidad innecesaria
3. Integración mal documentada
4. Falta de pruebas

Mitigación:
- Limitar funcionalidades
- Implementar automatizaciones controladas
- Documentar arquitectura claramente

---

# 🧪 Pruebas

Se implementarán:

- Pruebas unitarias básicas
- Pruebas de integración con n8n
- Casos de prueba documentados
- Escenarios reales simulados

---

# 📈 Alcance del MVP

Incluye:
- Gestión de tareas
- Control básico de inventario
- Eventos automatizados
- 3 flujos funcionales en n8n

No incluye:
- IA avanzada real
- Microservicios distribuidos
- Integración productiva con WhatsApp Business

---

# 🎓 Valor Académico

Este proyecto demuestra:

- Diseño de sistemas empresariales
- Arquitectura orientada a eventos
- Integración con herramientas de automatización
- Desarrollo modular
- Buenas prácticas de ingeniería de software

---

# 🏁 Conclusión

NEXUS ERP no busca competir comercialmente, sino demostrar cómo un sistema empresarial moderno puede:

- Centralizar operaciones
- Generar eventos inteligentes
- Integrarse con motores de automatización
- Mejorar el seguimiento y cumplimiento organizacional

---

Proyecto desarrollado con fines académicos.