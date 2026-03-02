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

## 2️⃣ Inventario Inteligente con IA

### 📋 Características Principales

#### 1️⃣ Predicción de Demanda con IA
- **Análisis de Patrones Históricos:** ML Model que aprende del consumo histórico
- **Predicción de Agotamiento:** Cálculo preciso de cuándo se agotará un producto según tendencias
- **Sugerencias Automáticas:** Órdenes de compra predictivas basadas en algoritmos
- **Detección de Estacionalidad:** Identificación de patrones según época del año
- **Alertas Inteligentes:** "Se predice agotamiento en 7 días basado en consumo promedio"
- **Optimización de Stock:** Recomendaciones de niveles óptimos de inventario

#### 2️⃣ Sistema de Trazabilidad Completa
- **Blockchain-like Tracking:** Historial inmutable de todos los movimientos
- **Custodio Actual:** Registro de quién tiene qué en tiempo real
- **Ubicación Física Detallada:**
  - Edificio y piso específico
  - Oficina/Departamento
  - Estante/Bodega exacta
  - Gerencia asignada
  - Persona responsable actual
- **Geolocalización:** GPS para ítems en campo o en tránsito
- **Fotografías de Estado:** Captura visual del artículo en cada movimiento
- **Historial Completo:** Trazabilidad desde adquisición hasta disposición final

#### 3️⃣ Análisis de Comportamiento (IA Avanzada)
**Detección Automática de Patrones:**
```typescript
{
  "usuarioSospechoso": "Juan Pérez solicita laptops cada 2 meses",
  "patron": "POSIBLE_USO_PERSONAL",
  "accionSugerida": "Revisión manual requerida",
  "confianza": 0.87,
  "evidencia": ["5 solicitudes en 6 meses", "varios modelos diferentes"]
}
```

**Capacidades de Análisis:**
- **Detección de Anomalías:** Identificación de solicitudes inusuales o fuera de patrón
- **Prevención de Fraude:** Patrones irregulares que sugieren mal uso de recursos
- **Optimización de Uso:** Identificación de recursos subutilizados o mal distribuidos
- **Score de Confiabilidad:** Puntuación por usuario/departamento basada en historial
- **Recomendaciones Inteligentes:** Sugerencias de mejora en gestión de activos

#### 4️⃣ Asistente Virtual de Inventario
- **Chatbot con IA:** Consultas en lenguaje natural ("¿Dónde está el proyector Sony X?")
- **Procesamiento NLP:** Comprensión de preguntas complejas
- **Búsqueda Semántica:** Encuentra ítems por descripción, no solo por nombre exacto
- **Recomendaciones Contextuales:** "Mejor comprar estos 3 ítems juntos para ahorrar en envío"
- **Auto-respuestas:** Sistema de respuestas automáticas para preguntas frecuentes
- **Aprendizaje Continuo:** Mejora con cada interacción

#### 5️⃣ Sistema de Préstamos Inteligente

**Datos Completos de Préstamo:**
```typescript
{
  "item": "Taladro Milwaukee M18",
  "prestadoA": {
    "nombre": "Carlos López",
    "departamento": "Mantenimiento",
    "scoreConfiabilidad": 85
  },
  "ubicacion": {
    "oficina": "Bodega 3-A",
    "gps": { lat: 10.123, lng: -75.456 },
    "ultimaActualizacion": "2026-03-02 10:30"
  },
  "fechaPrestamo": "2026-02-15",
  "fechaDevolucionEstimada": "2026-02-20",
  "fechaDevolucionReal": null,
  "diasVencido": 10,
  "estado": "VENCIDO",
  "notificacionesEnviadas": 3,
  "estadoEsperado": "BUEN_ESTADO",
  "historialPrestatario": {
    "prestamosAnteriores": 15,
    "devolucionesATiempo": 12,
    "devolucionesTardias": 3,
    "tasaCumplimiento": "80%"
  }
}
```

**Funcionalidades:**
- **Tracking en Tiempo Real:** Ubicación actual del ítem prestado
- **Sistema de Notificaciones Escalonado:** Recordatorios progresivos antes y después del vencimiento
- **Score de Prestatario:** Historial de cumplimiento que afecta futuros préstamos
- **Verificación de Estado:** Fotos antes/después del préstamo
- **Cadena de Custodia:** Registro completo de transferencias
- **Alertas de Alto Riesgo:** Notificación a supervisores para usuarios con bajo score

#### 6️⃣ Mantenimiento Predictivo

**Sistema Automatizado de Mantenimiento:**
- **Calendario Inteligente:** Programación automática según uso real y fabricante
- **IA Predice Fallas:** Análisis de uso, antigüedad y patrones de deterioro
- **Historial de Reparaciones:** Trazabilidad completa con costos y proveedores
- **Costo Total de Propiedad (TCO):** Cálculo automático por activo
- **Sugerencia de Reemplazo:** Análisis de cuándo ya no es rentable reparar
- **Integración con n8n:**
  - Crear órdenes de mantenimiento automáticas
  - Solicitar cotizaciones a múltiples proveedores
  - Notificar a responsables antes del vencimiento
  - Escalar si no se atiende a tiempo

**Datos de Mantenimiento:**
```typescript
{
  "proximoMantenimiento": "2026-03-15",
  "diasRestantes": 13,
  "tipoRequerido": "PREVENTIVO",
  "ultimoMantenimiento": "2025-12-15",
  "frecuenciaDias": 90,
  "costoPromedioMantenimiento": 150000,
  "costoAcumuladoReparaciones": 850000,
  "valorActivo": 2500000,
  "recomendacion": "Continuar mantenimiento (TCO favorable)",
  "probabilidadFalla": 0.15
}
```

#### 7️⃣ Gestión de Proveedores Inteligente

**Sistema de Evaluación de Proveedores:**
- **Score Automático:** Calificación basada en:
  - Cumplimiento de tiempos de entrega
  - Calidad de productos recibidos
  - Precio competitivo
  - Servicio postventa
  - Historial de devoluciones
  
- **Comparativa Automática:** Sistema que evalúa múltiples proveedores simultáneamente
- **Negociación Inteligente:** Cotizaciones paralelas automáticas
- **Predicción de Precios:** IA predice incrementos basándose en tendencias de mercado
- **Alertas de Oportunidad:** Notificación cuando un proveedor tiene oferta especial

**Datos por Proveedor:**
```typescript
{
  "nombre": "TecnoPartes S.A.",
  "scoreGlobal": 87,
  "metricas": {
    "cumplimientoEntrega": 92,
    "calidadProductos": 85,
    "precioCompetitivo": 78,
    "servicioPostventa": 90
  },
  "estadisticas": {
    "pedidosRealizados": 45,
    "tiempoEntregaPromedio": 3.2,
    "tasaDevolucion": 0.02,
    "ahorroGenerado": 1250000
  },
  "ultimaCompra": "2026-02-20",
  "proximaRevision": "2026-03-20"
}
```

#### 8️⃣ Reconocimiento de Imágenes

**Tecnología de Visión por Computadora:**
- **QR/Barcode Scanner:** Registro rápido mediante escaneo de códigos
- **Reconocimiento Visual:** IA identifica herramientas/equipos por foto
- **Evaluación de Estado:** Análisis automático de deterioro mediante fotografías
- **Inventario por Foto:** Tomar foto del estante → IA detecta todos los ítems presentes
- **Comparación Visual:** Verificación de estado antes/después de préstamos
- **Alertas de Daño:** Detección automática de deterioro significativo

#### 9️⃣ Alertas Contextuales Avanzadas

**Patrones n8n Configurables:**

```javascript
// Patrón 1: Item no devuelto
{
  trigger: "ITEM_OVERDUE",
  condiciones: "24h después de fecha estimada",
  flujo: [
    "1. WhatsApp a prestatario",
    "2. Si no responde en 2h → Email a supervisor",
    "3. Si no responde en 24h → Notificar a gerencia",
    "4. Crear incidente en sistema",
    "5. Afectar score de confiabilidad (-10 puntos)"
  ]
}

// Patrón 2: Mantenimiento predictivo
{
  trigger: "MAINTENANCE_DUE_SOON",
  prediccion: "IA detectó uso intensivo - adelantar mantenimiento",
  flujo: [
    "1. Crear orden de mantenimiento automática",
    "2. Cotizar con 3 proveedores vía API",
    "3. Comparar y sugerir mejor opción",
    "4. Notificar a responsable con opciones",
    "5. Si no hay respuesta en 48h → Escalar a gerencia"
  ]
}

// Patrón 3: Anomalía detectada
{
  trigger: "ANOMALY_DETECTED",
  tipo: "UNUSUAL_REQUEST_PATTERN",
  aiConfidence: 0.92,
  flujo: [
    "1. Pausar solicitud automáticamente",
    "2. Notificar a compliance/auditoría",
    "3. Solicitar justificación vía formulario",
    "4. Escalar si no hay respuesta en 4h",
    "5. Registrar en log de seguridad"
  ]
}

// Patrón 4: Stock crítico en proyecto activo
{
  trigger: "CRITICAL_STOCK_ACTIVE_PROJECT",
  contexto: "Proyecto prioritario necesita recursos",
  flujo: [
    "1. Verificar disponibilidad en otras ubicaciones",
    "2. Sugerir transferencia interna",
    "3. Si no hay stock → Compra urgente automática",
    "4. Notificar a Project Manager",
    "5. Actualizar timeline del proyecto si hay impacto"
  ]
}

// Patrón 5: Compra inteligente
{
  trigger: "SMART_PURCHASE_OPPORTUNITY",
  razon: "Precio histórico bajo + agotamiento predecido en 15 días",
  flujo: [
    "1. Comparar 5 proveedores vía APIs",
    "2. Calcular ROI de compra anticipada",
    "3. Verificar espacio disponible en bodega",
    "4. Generar orden de compra pre-aprobada",
    "5. Enviar a aprobación según monto (<$500k automático)"
  ]
}
```

### 🎯 Datos Gestionados

**Estructura Completa del Inventario:**

```typescript
interface InventarioAvanzado {
  // 🔷 Información Básica
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  subcategoria: string;
  stock: number;
  stockMinimo: number;
  stockMaximo: number;
  unidadMedida: string;
  
  // 📍 Ubicación Física
  ubicacion: {
    edificio: string;
    piso: number;
    oficina: string;
    estante: string;
    posicion: string;
    coordenadas?: { lat: number; lng: number };
    codigoQR: string;
    ultimaActualizacion: Date;
  };
  
  // 👤 Custodia y Responsabilidad
  custodia: {
    responsablePrincipal: {
      id: string;
      nombre: string;
      email: string;
      telefono: string;
    };
    departamento: string;
    gerencia: string;
    tipoCustodia: 'PERMANENTE' | 'TEMPORAL' | 'PRESTAMO';
    fechaAsignacion: Date;
    autorizadoPor: string;
  };
  
  // 🔄 Sistema de Préstamos
  prestamos: {
    activos: [{
      id: string;
      prestatario: Usuario;
      fechaPrestamo: Date;
      fechaDevolucionEstimada: Date;
      fechaDevolucionReal?: Date;
      ubicacionActual: Ubicacion;
      estadoPrestamo: 'ACTIVO' | 'VENCIDO' | 'DEVUELTO';
      estadoItem: 'EXCELENTE' | 'BUENO' | 'REGULAR' | 'DETERIORADO' | 'PERDIDO';
      fotosEstado: string[];
      observaciones: string;
    }];
    historial: [{
      prestatario: Usuario;
      duracionDias: number;
      diasRetraso: number;
      estadoDevolucion: string;
      incidentes: string[];
      calificacion: number; // 1-5
    }];
  };
  
  // 🔧 Mantenimiento
  mantenimiento: {
    requiereMantenimiento: boolean;
    ultimoMantenimiento: Date;
    proximoMantenimiento: Date;
    frecuenciaDias: number;
    tipoMantenimiento: 'PREVENTIVO' | 'CORRECTIVO' | 'PREDICTIVO';
    historial: [{
      fecha: Date;
      tipo: string;
      costo: number;
      proveedor: string;
      tecnico: string;
      descripcion: string;
      repuestos: string[];
      tiempoInactividadHoras: number;
    }];
    costoAcumulado: number;
    proximaInspeccion: Date;
  };
  
  // 🤖 IA y Predicciones
  predicciones: {
    diasHastaAgotamiento: number;
    cantidadSugeridaCompra: number;
    fechaSugeridaCompra: Date;
    probabilidadFalla: number; // 0-1
    nivelRiesgo: 'BAJO' | 'MEDIO' | 'ALTO' | 'CRITICO';
    recomendacionReemplazo: boolean;
    razonReemplazo: string;
    patronUsoAnomalo: boolean;
    detalleAnomalia: string;
    scoreConfiabilidad: number; // 0-100
    tendenciaConsumo: 'CRECIENTE' | 'ESTABLE' | 'DECRECIENTE';
  };
  
  // 📊 Movimientos e Historial
  movimientos: [{
    id: string;
    fecha: Date;
    tipo: 'ENTRADA' | 'SALIDA' | 'PRESTAMO' | 'DEVOLUCION' | 'TRASLADO' | 'AJUSTE' | 'BAJA';
    usuario: Usuario;
    ubicacionOrigen?: Ubicacion;
    ubicacionDestino?: Ubicacion;
    cantidad: number;
    motivo: string;
    documento: string;
    aprobadoPor?: Usuario;
    observaciones: string;
    metadata: Record<string, any>;
  }];
  
  // 💰 Información Financiera
  valuacion: {
    precioCompra: number;
    fechaCompra: Date;
    moneda: string;
    depreciacionMensual: number;
    vidaUtilMeses: number;
    mesesUso: number;
    valorLibros: number;
    valorMercado: number;
    tco: number; // Total Cost of Ownership
    costoMantenimientoAcumulado: number;
    rentabilidad: number;
  };
  
  // 🏢 Información del Proveedor
  proveedor: {
    id: string;
    nombre: string;
    contacto: string;
    email: string;
    telefono: string;
    scoreProveedor: number; // 0-100
    ultimaCompra: Date;
    precioPromedio: number;
    tiempoEntregaPromedioDias: number;
    tasaCumplimiento: number;
    garantiaMeses: number;
    garantiaVencimiento?: Date;
  };
  
  // 🏷️ Metadatos y Documentación
  metadata: {
    codigoBarras: string;
    qrCode: string;
    rfid?: string;
    numeroSerie?: string;
    modelo?: string;
    marca?: string;
    color?: string;
    dimensiones?: string;
    peso?: number;
    fotos: string[];
    manuales: string[];
    certificados: string[];
    facturas: string[];
    garantias: string[];
  };
  
  // 🔐 Control y Auditoría
  auditoria: {
    creadoPor: Usuario;
    fechaCreacion: Date;
    modificadoPor: Usuario;
    fechaModificacion: Date;
    ultimaAuditoria: Date;
    proximaAuditoria: Date;
    estadoAuditoria: 'CONFORME' | 'NO_CONFORME' | 'PENDIENTE';
    observacionesAuditoria: string[];
    requiereAtencion: boolean;
  };
}
```

### 🔔 Eventos Emitidos

**Eventos de Stock:**
- Stock bajo nivel mínimo
- Stock crítico (<20% del mínimo)
- Producto agotado
- Stock excede máximo
- Agotamiento predicho en X días

**Eventos de Préstamos:**
- Nuevo préstamo realizado
- Préstamo vencido
- Devolución con retraso
- Item no devuelto después de múltiples notificaciones
- Préstamo a usuario con score bajo
- Item devuelto en mal estado

**Eventos de Mantenimiento:**
- Mantenimiento próximo (7 días)
- Mantenimiento vencido
- Alta probabilidad de falla detectada
- Mantenimiento completado
- Costo de mantenimiento excede umbral
- Sugerencia de reemplazo por TCO

**Eventos de IA:**
- Anomalía de uso detectada
- Patrón sospechoso identificado
- Oportunidad de compra detectada
- Predicción de agotamiento
- Recurso subutilizado identificado

**Eventos de Proveedores:**
- Precio histórico bajo detectado
- Nuevo proveedor con mejor score
- Proveedor con problemas de cumplimiento
- Garantía próxima a vencer

**Eventos de Ubicación:**
- Item movido de ubicación
- Item no encontrado en ubicación registrada
- Consolidación de items sugerida
- Espacio de almacenamiento crítico

### 🎯 Dashboard Innovador

**KPIs Principales:**
- 📊 **Eficiencia de Inventario:** % de uso real vs stock disponible
- 🎯 **Precisión de Predicciones IA:** % de acierto en predicciones de agotamiento
- ⚠️ **Items en Riesgo:** Número de items con alta probabilidad de pérdida/robo/falla
- 💰 **Ahorro por Optimización:** Dinero ahorrado por recomendaciones de IA
- 👤 **Score Promedio Usuarios:** Confiabilidad promedio en devoluciones
- 🏢 **Mapa de Calor:** Uso de inventario por oficina/departamento
- 📈 **Tendencia de Consumo:** Crecimiento/decrecimiento por categoría
- 🔧 **Efectividad Mantenimiento:** Reducción de fallas por mantenimiento preventivo
- 🏆 **Ranking Proveedores:** Top 10 proveedores por score
- ⏱️ **Tiempo Promedio Préstamo:** Duración promedio por categoría de item

**Visualizaciones:**
- Mapa 3D del almacén con ubicaciones en tiempo real
- Heatmap de uso por departamento
- Gráfico de predicciones vs realidad
- Timeline de mantenimientos programados
- Red de dependencias entre items

### 🏗 Arquitectura del Módulo

```
src/features/inventory/
├── InventoryPage.tsx (Vista principal con dashboard)
├── InventoryDetailPage.tsx (Vista detallada de item)
├── components/
│   ├── InventoryStats.tsx (KPIs y métricas)
│   ├── InventoryFilters.tsx (Búsqueda y filtros avanzados)
│   ├── InventoryTable.tsx (Tabla principal de items)
│   ├── InventoryFormModal.tsx (Crear/editar item)
│   ├── ItemOverview.tsx (Información general del item)
│   ├── LocationTracker.tsx (Trazabilidad y ubicación)
│   ├── LoanManagement.tsx (Gestión de préstamos)
│   ├── MaintenanceSchedule.tsx (Calendario de mantenimiento)
│   ├── AIPredictions.tsx (Predicciones y recomendaciones)
│   ├── SupplierComparison.tsx (Comparativa de proveedores)
│   ├── MovementHistory.tsx (Historial de movimientos)
│   ├── ImageRecognition.tsx (Scanner y reconocimiento visual)
│   ├── WarehouseMap.tsx (Mapa 3D del almacén)
│   └── AnomalyAlerts.tsx (Alertas de anomalías)
├── data/
│   ├── mockInventory.ts (Items de ejemplo)
│   ├── mockLoans.ts (Préstamos de ejemplo)
│   ├── mockMaintenance.ts (Registros de mantenimiento)
│   ├── mockPredictions.ts (Predicciones IA)
│   └── mockSuppliers.ts (Proveedores)
├── utils/
│   ├── inventoryHelpers.ts (Funciones auxiliares)
│   ├── predictionEngine.ts (Simulador de IA)
│   ├── loanCalculations.ts (Cálculos de préstamos)
│   └── maintenanceScheduler.ts (Programador de mantenimiento)
└── services/
    ├── aiService.ts (Servicio de IA simulado)
    ├── imageRecognition.ts (Reconocimiento de imágenes)
    └── n8nIntegration.ts (Integración con n8n)
```

### ✅ Buenas Prácticas Implementadas

1. **Arquitectura Modular:** Separación clara de responsabilidades
2. **TypeScript Estricto:** Tipado completo sin uso de 'any'
3. **Componentización:** Componentes reutilizables y pequeños (<150 líneas)
4. **Optimización de Performance:** Memoización y lazy loading
5. **Responsive Design:** Adaptable a móviles, tablets y desktop
6. **Accesibilidad (a11y):** WCAG 2.1 nivel AA
7. **Testing:** Cobertura de tests unitarios y de integración
8. **Documentación:** Código autodocumentado con JSDoc
9. **Seguridad:** Validación de datos y control de acceso
10. **Escalabilidad:** Preparado para crecer sin refactorización mayor

---

## 3️⃣ CRM (Gestión de Clientes)

### 📋 Características Principales

El módulo CRM está profundamente integrado con **Proyectos** e **Inventario**, permitiendo una visión 360° de cada cliente y automatización inteligente de todo el ciclo de vida comercial.

#### 1️⃣ Vista 360° del Cliente (Customer 360)

**Panel Completo del Cliente con 5 Pestañas:**

**Pestaña 1: Información General**
- Datos de contacto completos
- Tipo de cliente (Persona Natural, Empresa Pequeña, Corporativo, Gobierno)
- Nivel de importancia (Bronce, Plata, Oro, Platino, VIP)
- Fuente de adquisición (Referido, Marketing, Web, Evento)
- **Score de Satisfacción:** Calculado automáticamente (0-100)
- **Customer Lifetime Value (CLV):** Valor total histórico + proyectado
- Ejecutivo de cuenta asignado
- Fecha de registro y última interacción
- Alertas automáticas (cliente inactivo, deuda pendiente, oportunidad de upselling)

**Pestaña 2: Proyectos del Cliente**
- Lista de todos sus proyectos (actuales e históricos)
- Filtros por estado (Todos, Activos, Completados, Cancelados)
- Estadísticas del cliente:
  - Total de proyectos realizados
  - Proyectos activos
  - Proyectos completados exitosamente
  - Tasa de cumplimiento de presupuesto (%)
  - Tasa de cumplimiento de plazos (%)
  - Revenue total generado
- **Gráfico de rentabilidad por proyecto**
- **Proyectos próximos o en negociación**
- Botón para crear nuevo proyecto directamente

**Pestaña 3: Historial de Interacciones (Timeline)**
- Registro cronológico completo de todas las interacciones
- Tipos de interacciones:
  - REUNION (fecha, asistentes, acuerdos, actas)
  - LLAMADA (duración, motivo, resultado)
  - EMAIL (enviados/recibidos, asunto)
  - COTIZACION_ENVIADA (estado: Enviada, Vista, Aceptada, Rechazada)
  - CONTRATO_FIRMADO
  - PAGO_RECIBIDO
  - INCIDENT/RECLAMO
  - CAMBIO_SOLICITADO
  - SEGUIMIENTO_COMERCIAL
- **Tags personalizados** por interacción
- **Sentiment Analysis:** Tono positivo/neutral/negativo de cada interacción
- Filtros por tipo y rango de fechas
- Usuario que registró la interacción
- Documentos adjuntos por interacción

**Pestaña 4: Documentación**
- Biblioteca de documentos organizada por tipo:
  - Contratos vigentes y vencidos
  - Cotizaciones históricas (con estado)
  - Facturas y estados de cuenta
  - NDA (Non-Disclosure Agreements)
  - Permisos y autorizaciones
  - Correspondencia legal
  - Certificaciones
- **Alertas de vencimientos** (contratos, garantías, seguros)
- Información por documento:
  - Nombre y tipo
  - Fecha de emisión y vencimiento
  - Estado (Vigente, Vencido, Por Renovar)
  - Usuario que subió el documento
  - Acciones: Ver, Descargar, Eliminar

**Pestaña 5: Análisis Predictivo**
- **🎯 Probabilidad de Cierre:** Próximo proyecto estimado en X meses
- **⚠️ Risk Score:** Probabilidad de pérdida del cliente (0-100)
- **💰 Próxima Oportunidad:** IA predice próximo proyecto basado en patrones
- **📊 Tendencia de Inversión:** Crecimiento/decrecimiento en gasto
- **🔔 Alertas Inteligentes:**
  - "Cliente inactivo por 90 días - riesgo de pérdida"
  - "Momento óptimo para contactar (basado en patrones históricos)"
  - "Cliente similar cerró proyecto - oportunidad de upselling"
  - "Patrón de compra detectado: contactar en 15 días"
- **Métricas RFM:**
  - Recency (días desde último contacto)
  - Frequency (número total de proyectos)
  - Monetary (valor total histórico)
  - Score RFM calculado (0-100)

#### 3️⃣ Pipeline de Ventas (Embudo Comercial)

**Etapas del Embudo:**
1. **Lead** → Contacto inicial identificado
2. **Prospecto** → Interés confirmado, primera reunión realizada
3. **Calificado** → Presupuesto confirmado, necesidad real validada
4. **Propuesta Enviada** → Cotización formal entregada
5. **Negociación** → Ajustes de precio/alcance en proceso
6. **Contrato Firmado** → Cliente activo
7. **Entrega/Ejecución** → Proyecto en curso
8. **Postventa** → Proyecto completado, seguimiento activo

**Dashboard del Pipeline:**
- **Visualización tipo Kanban:** Arrastrar clientes/oportunidades entre etapas
- **Filtros avanzados:** Por ejecutivo, por valor, por antigüedad en etapa, por tipo de proyecto
- **Métricas del Pipeline:**
  - Tasa de conversión por etapa (%)
  - Tiempo promedio por etapa (días)
  - Valor total del pipeline ($)
  - Número de oportunidades por etapa
  - Proyectos cerrados este mes/trimestre
  - Revenue proyectado vs real
  - Win Rate (tasa de éxito en cierre)

**Alertas Automáticas del Pipeline:**
- "Oportunidad lleva 14 días en 'Propuesta Enviada' sin respuesta"
- "3 clientes en 'Negociación' requieren seguimiento urgente"
- "Cliente retrocedió de etapa - requiere atención inmediata"
- "Oportunidad de alto valor ($X+) estancada por 7 días"

**Datos por Oportunidad:**
```typescript
{
  nombre: "Remodelación Oficinas Centro",
  cliente: "Empresa XYZ",
  valorEstimado: 150000000,
  etapaActual: "NEGOCIACION",
  probabilidadCierre: 75, // %
  fechaEstimadaCierre: "2026-04-15",
  competidores: ["Constructora Rival 1", "Constructora Rival 2"],
  fortalezas: ["Experiencia", "Precio competitivo"],
  debilidades: ["Plazo más largo que competencia"],
  proximaAccion: {
    tipo: "REUNION",
    fecha: "2026-03-10",
    responsable: "Juan Pérez",
    objetivo: "Presentar propuesta final ajustada"
  },
  historialCambios: [
    { fecha: "2026-02-20", cambio: "Valor estimado aumentó 10%" },
    { fecha: "2026-02-25", cambio: "Probabilidad subió de 60% a 75%" }
  ]
}
```

#### 5️⃣ Segmentación Avanzada de Clientes

**Criterios de Segmentación Automática:**

**Por Valor (RFM Analysis):**
- **Recency:** Cuándo fue su último proyecto/contacto
- **Frequency:** Cuántos proyectos ha tenido
- **Monetary:** Cuánto ha invertido en total

**Por Comportamiento:**
- **Clientes Champions:** Alto valor + alta frecuencia + contacto reciente
- **Clientes Leales:** Alta frecuencia, sin importar valor
- **Clientes Ballena:** Muy alto valor, baja frecuencia
- **Clientes en Riesgo:** Alto valor histórico + inactivos >60 días
- **Clientes Perdidos:** Sin contacto en >180 días
- **Nuevos Clientes:** <6 meses de antigüedad
- **Clientes Estacionales:** Patrón de proyecto anual/semestral

**Por Potencial:**
- **Alto Potencial sin Explotar:** CLV bajo vs capacidad financiera alta
- **Maduros:** Máximo potencial ya explotado
- **En Crecimiento:** Incrementando inversión por proyecto
- **En Declive:** Reduciendo inversión consistentemente

**Acciones Automáticas por Segmento:**

**Ejemplo: Segmento "Alto Valor Inactivo"**
```javascript
{
  segmento: "ALTO_VALOR_INACTIVO",
  criterios: "CLV > $50M && ultimoContacto > 60 días",
  color: "red",
  prioridad: "ALTA",
  accionesAutomaticas: [
    "1. Asignar ejecutivo premium",
    "2. Crear tarea urgente de re-engagement",
    "3. Generar propuesta personalizada basada en historial",
    "4. Enviar email con oferta especial",
    "5. Si no responde en 7 días → Escalar a gerencia comercial",
    "6. Programar llamada personal del gerente"
  ],
  kpis: {
    tasaReactivacion: 65,
    tiempoPromedioRespuesta: 3.5
  }
}
```

**Dashboard de Segmentación:**
- Matriz de segmentación (Valor vs Frecuencia)
- Distribución de clientes por segmento (gráfico de torta)
- Evolución de segmentos en el tiempo
- Acciones pendientes por segmento
- Performance de estrategias por segmento

#### 7️⃣ Integración con Proyectos e Inventario

**Cross-Module Intelligence:**

**Escenario 1: Cliente solicita proyecto urgente**
```javascript
{
  trigger: "CLIENTE_SOLICITA_PROYECTO_URGENTE",
  clienteId: "42",
  tipoProyecto: "COMERCIAL",
  valorEstimado: 80000000,
  flujo: [
    "1. Verificar disponibilidad de recursos en inventario",
    "2. Consultar capacidad de equipo en módulo proyectos",
    "3. Verificar proyectos activos del mismo cliente",
    "4. IF recursos disponibles:",
    "   → Crear propuesta automática con cronograma",
    "   → Notificar ejecutivo de cuenta",
    "5. IF NO hay recursos:",
    "   → Sugerir fecha alternativa viable",
    "   → Explicar razón (inventario/capacidad)",
    "   → Ofrecer alternativas"
  ]
}
```

**Escenario 2: Proyecto excede presupuesto**
```javascript
{
  trigger: "PROYECTO_EXCEDE_PRESUPUESTO",
  proyectoId: "88",
  clienteId: "25",
  excesoPresupuesto: 15, // %
  flujo: [
    "1. Registrar evento en timeline del cliente",
    "2. Afectar score de satisfacción (-5 puntos)",
    "3. Generar reporte automático de variación presupuestaria",
    "4. Crear tarea para Project Manager: 'Reunión con cliente'",
    "5. Enviar notificación al ejecutivo de cuenta",
    "6. Si exceso > 20% → Notificar a gerencia también",
    "7. Preparar propuesta de ajuste o cambio de alcance"
  ]
}
```

**Escenario 3: Cliente cumple pago a tiempo**
```javascript
{
  trigger: "PAGO_RECIBIDO_A_TIEMPO",
  proyectoId: "65",
  clienteId: "18",
  monto: 25000000,
  flujo: [
    "1. Actualizar estado financiero del proyecto",
    "2. Registrar interacción positiva en timeline",
    "3. Aumentar score de confiabilidad del cliente (+10 puntos)",
    "4. Enviar email automático de agradecimiento",
    "5. Si es pago final del proyecto:",
    "   → Activar workflow de encuesta NPS (3 días después)",
    "   → Crear tarea de seguimiento postventa",
    "6. Si cliente es recurrente → Evaluar upgrade de nivel"
  ]
}
```

**Escenario 4: Stock crítico afecta proyecto de cliente VIP**
```javascript
{
  trigger: "STOCK_CRITICO_PROYECTO_VIP",
  itemId: "123",
  proyectoId: "45",
  clienteId: "8",
  nivelCliente: "VIP",
  flujo: [
    "1. Priorizar transferencia interna para este proyecto",
    "2. Notificar al Project Manager inmediatamente",
    "3. Notificar al ejecutivo de cuenta del cliente",
    "4. Si no hay stock en ninguna ubicación:",
    "   → Compra urgente (aprobación automática para VIP)",
    "   → Notificar al cliente proactivamente del impacto",
    "5. Registrar en timeline del cliente",
    "6. Compensar con descuento si hay retraso"
  ]
}
```

### 🎯 Datos Gestionados

**Estructura Completa del Cliente:**

```typescript
interface Cliente {
  // 🔷 Información Básica
  id: string;
  nombre: string;
  tipoCliente: 'PERSONA_NATURAL' | 'EMPRESA_PEQUENA' | 'CORPORATIVO' | 'GOBIERNO';
  nit?: string;
  telefono: string;
  email: string;
  direccion: string;
  ciudad: string;
  pais: string;
  sitioWeb?: string;
  
  // 🏆 Clasificación
  nivel: 'BRONCE' | 'PLATA' | 'ORO' | 'PLATINO' | 'VIP';
  fuenteAdquisicion: 'REFERIDO' | 'MARKETING' | 'WEB' | 'EVENTO' | 'LLAMADA_FRIA' | 'OTRO';
  ejecutivoAsignado: {
    id: string;
    nombre: string;
    email: string;
    telefono: string;
  };
  
  // 📊 Métricas RFM
  rfm: {
    recency: number; // días desde último contacto
    frequency: number; // número total de proyectos
    monetary: number; // valor total histórico
    score: number; // calculado de 0-100
  };
  
  // 💰 Financiero
  clv: number; // Customer Lifetime Value
  revenueHistorico: number;
  revenueProyectado: number;
  deudaPendiente: number;
  limiteCredito: number;
  
  // ⭐ Satisfacción
  nps: {
    ultimaEncuesta: Date;
    score: number; // 0-10
    categoria: 'PROMOTOR' | 'PASIVO' | 'DETRACTOR';
    comentarios: string[];
  };
  scoreSatisfaccion: number; // 0-100
  
  // 🏗️ Proyectos
  proyectos: {
    total: number;
    activos: number;
    completados: number;
    cancelados: number;
    tasaCumplimientoPresupuesto: number; // %
    tasaCumplimientoPlazos: number; // %
  };
  
  // 🎯 Pipeline/Oportunidades
  oportunidadesActivas: [{
    id: string;
    nombre: string;
    valorEstimado: number;
    probabilidadCierre: number;
    etapa: string;
    fechaEstimadaCierre: Date;
  }];
  
  // 📞 Interacciones
  interacciones: [{
    id: string;
    tipo: 'REUNION' | 'LLAMADA' | 'EMAIL' | 'COTIZACION' | 'CONTRATO' | 'PAGO' | 'RECLAMO';
    fecha: Date;
    usuario: Usuario;
    descripcion: string;
    sentiment?: 'POSITIVO' | 'NEUTRAL' | 'NEGATIVO';
    tags: string[];
    documentosAdjuntos: string[];
  }];
  
  // 🤖 Predicciones IA
  predicciones: {
    probabilidadChurn: number; // 0-1
    proximaCompraEstimada?: Date;
    valorProximaCompra?: number;
    serviciosSugeridos: string[];
    momentoOptimoContacto?: Date;
    razonesChurn?: string[];
  };
  
  // 🏷️ Segmentación
  segmento: string;
  tags: string[];
  
  // 📄 Documentos
  documentos: [{
    id: string;
    nombre: string;
    tipo: 'CONTRATO' | 'COTIZACION' | 'FACTURA' | 'NDA' | 'PERMISO' | 'OTRO';
    fechaEmision: Date;
    fechaVencimiento?: Date;
    estado: 'VIGENTE' | 'VENCIDO' | 'POR_RENOVAR';
    rutaArchivo: string;
    tamano: number;
    usuarioSubio: Usuario;
  }];
  
  // 🔐 Auditoría
  fechaRegistro: Date;
  ultimaInteraccion?: Date;
  estadoActual: 'ACTIVO' | 'INACTIVO' | 'EN_RIESGO' | 'PERDIDO';
  creadoPor: Usuario;
  modificadoPor: Usuario;
  fechaModificacion: Date;
}
```

### 🔔 Eventos Emitidos

**Eventos de Cliente:**
- Cliente creado
- Cliente actualizado
- Cliente inactivo (sin contacto en X días)
- Cliente en riesgo de pérdida (churn risk alto)
- Nivel de cliente cambiado (upgrade/downgrade)
- Ejecutivo de cuenta reasignado

**Eventos de Interacciones:**
- Nueva interacción registrada
- Reunión programada
- Cotización enviada
- Cotización aceptada/rechazada
- Pago recibido (a tiempo/con retraso)
- Reclamo recibido

**Eventos de Pipeline:**
- Nueva oportunidad creada
- Oportunidad cambió de etapa
- Oportunidad ganada
- Oportunidad perdida
- Oportunidad estancada (sin cambios por X días)

**Eventos de Satisfacción:**
- NPS registrado
- Score de satisfacción bajo detectado
- Cliente se convirtió en detractor
- Cliente se convirtió en promotor

**Eventos de Predicción:**
- Alto riesgo de churn detectado
- Oportunidad de upselling identificada
- Momento óptimo de contacto alcanzado
- Patrón de compra detectado

**Eventos de Integración:**
- Proyecto del cliente excedió presupuesto
- Proyecto del cliente completado
- Pago del cliente procesado
- Stock crítico afecta proyecto del cliente

### 🏗 Arquitectura del Módulo

```
src/features/customers/
├── CustomersPage.tsx (Vista principal con lista y filtros)
├── CustomerDetailPage.tsx (Vista 360° con 5 pestañas)
├── PipelinePage.tsx (Vista Kanban del embudo de ventas)
├── components/
│   ├── CustomerStats.tsx (KPIs y métricas generales)
│   ├── CustomerFilters.tsx (Búsqueda y filtros avanzados)
│   ├── CustomerTable.tsx (Tabla de clientes)
│   ├── CustomerFormModal.tsx (Formulario crear/editar cliente)
│   ├── CustomerOverview.tsx (Pestaña 1: Info general + RFM)
│   ├── CustomerProjects.tsx (Pestaña 2: Proyectos del cliente)
│   ├── CustomerTimeline.tsx (Pestaña 3: Historial interacciones)
│   ├── CustomerDocuments.tsx (Pestaña 4: Documentos)
│   ├── CustomerPredictions.tsx (Pestaña 5: Análisis predictivo)
│   ├── InteractionModal.tsx (Registrar nueva interacción)
│   ├── OpportunityCard.tsx (Tarjeta de oportunidad en pipeline)
│   ├── OpportunityFormModal.tsx (Crear/editar oportunidad)
│   ├── PipelineKanban.tsx (Vista Kanban del pipeline)
│   ├── SegmentationDashboard.tsx (Dashboard de segmentos)
│   └── CustomerAlerts.tsx (Alertas inteligentes)
├── data/
│   ├── mockCustomers.ts (Clientes de ejemplo)
│   ├── mockInteractions.ts (Interacciones de ejemplo)
│   ├── mockOpportunities.ts (Oportunidades de ejemplo)
│   └── mockSegments.ts (Segmentos definidos)
└── utils/
    ├── customerHelpers.ts (Funciones auxiliares)
    ├── rfmCalculator.ts (Cálculo de RFM Score)
    ├── clvCalculator.ts (Cálculo de CLV)
    ├── churnPredictor.ts (Predicción de pérdida)
    └── segmentationEngine.ts (Motor de segmentación)
```

### ✅ Buenas Prácticas Implementadas

1. **Integración Multi-Módulo:** Conexión profunda con Proyectos e Inventario
2. **Componentes Reutilizables:** Uso de tablas, modales y filtros existentes
3. **TypeScript Estricto:** Tipado completo de todas las interfaces
4. **Arquitectura Orientada a Eventos:** Emisión de eventos para n8n
5. **Cálculos Automáticos:** RFM, CLV, scores de satisfacción
6. **Responsive Design:** Adaptable a todos los dispositivos
7. **Performance:** Renderizado eficiente y paginación
8. **UX Intuitiva:** Navegación clara entre módulos relacionados

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

### 1️⃣ Stock Crítico con Decisión Inteligente

**🎬 Qué muestra en demo:**
- Un producto baja del mínimo
- El sistema decide si transferir desde otra ubicación o comprar
- Crea solicitud automática

**📩 Evento que envía el ERP:**
```json
{
  "event": "STOCK_CRITICAL",
  "itemId": "123",
  "stock": 3,
  "stockMinimo": 10
}
```

**🔁 Flujo en n8n:**
1. Recibe webhook
2. Consulta `GET /inventory/123`
3. Verifica si hay stock en otra sede
4. **IF:**
   - Si hay → crear transferencia interna
   - Si no hay → crear solicitud de compra
5. Notificar responsable

**🎓 Qué demuestra:**
- Arquitectura orientada a eventos
- Lógica condicional
- Llamadas API bidireccionales
- Automatización empresarial real

---

### 2️⃣ Préstamo Vencido con Escalamiento Progresivo

**🎬 Qué muestra en demo:**
- Un usuario no devuelve un equipo → el sistema escala automáticamente

**📩 Evento que envía el ERP:**
```json
{
  "event": "LOAN_OVERDUE",
  "loanId": "55",
  "diasVencido": 1
}
```

**🔁 Flujo en n8n:**
1. Esperar 24h (Wait Node)
2. Verificar si ya devolvió
3. **Si no:**
   - Día 1 → Email usuario
   - Día 2 → Notificar supervisor
   - Día 3 → Crear incidente automático
   - Reducir score del usuario

**🎓 Qué demuestra:**
- Uso de Wait Node
- Escalamiento automático
- Control de estados
- Automatización con impacto en datos

---

### 3️⃣ Anomalía Detectada (Simulación de IA)

**🎬 Qué muestra en demo:**
- Usuario solicita demasiados equipos en poco tiempo
- El sistema detecta comportamiento anómalo y actúa

**📩 Evento que envía el ERP:**
```json
{
  "event": "ANOMALY_DETECTED",
  "userId": "8",
  "confidence": 0.87,
  "type": "UNUSUAL_REQUEST_PATTERN"
}
```

**🔁 Flujo en n8n:**
1. Pausar solicitud automáticamente
2. Crear tarea para auditoría
3. Notificar compliance
4. Registrar log especial

**🎓 Qué demuestra:**
- Integración con "IA"
- Automatización basada en score
- Flujo condicional complejo
- Seguridad empresarial

---

### 4️⃣ Mantenimiento Predictivo Automático

**🎬 Qué muestra en demo:**
- El sistema detecta alta probabilidad de falla
- Crea orden de mantenimiento preventivo automáticamente

**📩 Evento que envía el ERP:**
```json
{
  "event": "HIGH_FAILURE_PROBABILITY",
  "itemId": "88",
  "probabilidadFalla": 0.76
}
```

**🔁 Flujo en n8n:**
1. Crear orden de mantenimiento
2. Notificar responsable
3. Si no se atiende en 48h → escalar
4. Registrar evento financiero

**🎓 Qué demuestra:**
- Automatización preventiva
- Impacto financiero
- Flujo programado
- Integración multi-módulo

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