# 🚀 Portafolio Web de Martin Simarra

Portafolio web moderno y responsivo construido con React, TypeScript, Framer Motion y Three.js. Presenta un diseño elegante con animaciones fluidas, efectos parallax y una experiencia 3D inmersiva.

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz limpia con colores cálidos (naranjas, amarillos y ámbar)
- 🌊 **Animaciones Fluidas**: Integración de Framer Motion para transiciones suaves
- 🎭 **Efectos 3D**: Implementación de Three.js para experiencias visuales únicas
- 📱 **Totalmente Responsive**: Adaptado para todos los dispositivos
- 🎯 **Navegación Intuitiva**: Sistema de navegación entre secciones
- 📊 **Línea de Tiempo**: Visualización profesional de experiencia laboral
- 💼 **Galería de Proyectos**: Filtrado y visualización de proyectos personales y colaborativos
- 📬 **Formulario de Contacto**: Múltiples métodos de contacto integrados

## 🛠️ Tecnologías Utilizadas

- **React 19** - Framework principal
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Framer Motion** - Animaciones y transiciones
- **Three.js** - Gráficos 3D
- **@react-three/fiber** - React renderer para Three.js
- **Tailwind CSS v4** - Estilos utilitarios
- **GSAP** - Animaciones avanzadas

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Navigation.tsx  # Barra de navegación
│   └── Scene3D.tsx     # Componente 3D con Three.js
├── pages/              # Páginas principales
│   ├── Home.tsx        # Página de inicio (sin scroll)
│   ├── About.tsx       # Sobre mí con timeline (con scroll)
│   ├── Projects.tsx    # Proyectos en grid (con scroll)
│   └── Contact.tsx     # Contacto (sin scroll)
├── data/               # Datos del portafolio
│   └── portfolio.ts    # Información personal, proyectos, habilidades, etc.
├── App.tsx             # Componente principal
├── main.tsx            # Punto de entrada
└── index.css           # Estilos globales
```

## 🚀 Instalación y Uso

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd portafolio-web-great
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Construir para producción**
```bash
npm run build
```

5. **Vista previa de producción**
```bash
npm run preview
```

## 📋 Configuración

### Personalizar Datos

Edita el archivo `src/data/portfolio.ts` para actualizar:
- ✅ Información personal
- ✅ Experiencia laboral
- ✅ Habilidades técnicas
- ✅ Proyectos
- ✅ Métodos de contacto
- ✅ Educación

### Agregar Imágenes de Proyectos

Coloca las imágenes de los proyectos en la carpeta `public/images/`:
- facebookdemo.png
- university.png
- methodsNumeric.png
- taxis-app.png
- envi-app.png

## 🎨 Secciones del Portafolio

### 🏠 Inicio (Sin Scroll)
- Presentación principal
- Tech stack en tags animados
- Elemento 3D interactivo
- Círculos animados de fondo
- Botones de acción (Ver Proyectos, Descargar CV)

### 👨‍💻 Sobre Mí (Con Scroll)
- Descripción profesional
- Educación
- **Línea de tiempo** de experiencia laboral
- Habilidades técnicas en **cards interactivas** con barras de progreso
- Habilidades blandas

### 💼 Proyectos (Con Scroll)
- **Grid de proyectos** (todos visibles)
- Filtros: Todos / Personales / Colaborativos
- Cards con imágenes, descripción y tecnologías
- Enlaces a demo y repositorio GitHub
- Estadísticas de proyectos

### 📧 Contacto (Sin Scroll)
- Formulario de contacto
- Métodos de contacto directos:
  - Email
  - LinkedIn  
  - GitHub
  - WhatsApp
- Elementos decorativos animados

## 🎯 Características de UX/UI

- **Colores cálidos** bien combinados (naranja, ámbar, amarillo)
- **Modo glassmorphism** en tarjetas
- **Hover effects** en todos los elementos interactivos
- **Gradientes** dinámicos
- **Animaciones** en scroll con Framer Motion
- **Transiciones** suaves entre estados
- **Responsive design** mobile-first

## 📱 Compatibilidad

- ✅ Chrome / Edge
- ✅ Firefox
- ✅ Safari
- ✅ Dispositivos móviles y tablets

## 👨‍💻 Desarrollado por

**Martin Elias Simarra Salgado**
- 📧 Email: martinsimarra4@gmail.com
- 💼 LinkedIn: [martinsimarrapro](https://www.linkedin.com/in/martinsimarrapro/)
- 💻 GitHub: [Martin10123](https://github.com/Martin10123)

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
