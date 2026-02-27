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

- Crear tareas
- Asignar responsables
- Estados (Pendiente, En progreso, Finalizada)
- Fechas límite
- Seguimiento de carga laboral

Eventos emitidos:
- Nueva tarea creada
- Tarea vencida
- Tarea sin iniciar después de 24h

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