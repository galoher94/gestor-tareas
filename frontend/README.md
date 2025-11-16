# 🎨 Frontend - Gestor de Tareas Colaborativo

Aplicación web React con TypeScript y TailwindCSS para la prueba técnica de Moshipp.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Funcionalidades](#funcionalidades)
- [Componentes](#componentes)

## ✨ Características

- ✅ Autenticación completa (Login y Registro)
- ✅ Dashboard protegido con rutas privadas
- ✅ CRUD completo de tareas
- ✅ Sistema de comentarios en tiempo real
- ✅ Diseño responsive con TailwindCSS
- ✅ Context API para estado global
- ✅ Interceptores de Axios para manejo de tokens
- ✅ Manejo de errores robusto
- ✅ Validaciones en formularios
- ✅ Feedback visual (loading, errores, éxito)
- ✅ Código TypeScript 100% tipado

## 🛠️ Tecnologías Utilizadas

- **React** 18 - Librería de UI
- **TypeScript** - Superset tipado de JavaScript
- **Vite** - Build tool y dev server
- **React Router DOM** - Enrutamiento
- **Axios** - Cliente HTTP
- **TailwindCSS** - Framework de estilos
- **Context API** - Manejo de estado global

## 📦 Requisitos Previos

- Node.js 18 o superior
- npm o yarn
- Backend API corriendo (ver carpeta backend/)

## 🔧 Instalación

1. **Navegar a la carpeta del frontend**

```bash
cd frontend
```

2. **Instalar dependencias**

```bash
npm install
```

## ⚙️ Configuración

1. **Crear archivo de variables de entorno**

```bash
cp .env.example .env
```

2. **Editar el archivo `.env`**

```env
VITE_API_URL=http://localhost:3000/api
```

Asegúrate de que la URL coincida con la del backend.

## 🚀 Ejecución

### Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para Producción

```bash
# Compilar aplicación
npm run build

# Previsualizar build
npm run preview
```

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/           # Componentes reutilizables
│   │   ├── Auth/            # Componentes de autenticación
│   │   │   ├── Login.tsx
│   │   │   └── Registro.tsx
│   │   ├── Tareas/          # Componentes de tareas
│   │   │   ├── ListaTareas.tsx
│   │   │   ├── FormularioTarea.tsx
│   │   │   └── TarjetaTarea.tsx
│   │   └── Comentarios/     # Componentes de comentarios
│   │       ├── ListaComentarios.tsx
│   │       └── FormularioComentario.tsx
│   ├── context/             # Context API
│   │   └── AuthContext.tsx  # Estado global de autenticación
│   ├── pages/               # Páginas principales
│   │   ├── LoginPage.tsx    # Página de login/registro
│   │   └── DashboardPage.tsx # Dashboard principal
│   ├── services/            # Servicios de API
│   │   └── api.ts           # Cliente Axios y peticiones
│   ├── App.tsx              # Componente raíz
│   ├── main.tsx             # Punto de entrada
│   └── index.css            # Estilos globales
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## 🎯 Funcionalidades

### Autenticación

#### Registro
- Formulario con validación
- Campos: nombre, email, password, confirmar password
- Verificación de coincidencia de contraseñas
- Redirección automática al login tras registro exitoso

#### Login
- Formulario con validación
- Almacenamiento seguro del token JWT
- Redirección automática al dashboard

#### Protección de Rutas
- Las rutas protegidas redirigen al login si no hay sesión activa
- El token se verifica en cada petición HTTP
- Cierre de sesión automático si el token expira

### Dashboard

#### Gestión de Tareas
- **Crear**: Formulario para nuevas tareas con título, descripción y estado
- **Listar**: Vista de todas las tareas del usuario con badges de estado
- **Editar**: Modificar tareas existentes (solo el creador)
- **Eliminar**: Borrar tareas con confirmación (solo el creador)

#### Estados de Tareas
- 🟡 **Pendiente** - Tarea por iniciar
- 🔵 **En Progreso** - Tarea en desarrollo
- 🟢 **Completada** - Tarea finalizada

#### Sistema de Comentarios
- Ver todos los comentarios de una tarea
- Agregar nuevos comentarios
- Cualquier usuario puede comentar en cualquier tarea
- Información del autor y fecha en cada comentario

## 🧩 Componentes

### Context/AuthContext
Maneja el estado global de autenticación:
- Usuario autenticado
- Token JWT
- Funciones de login/logout
- Persistencia en localStorage

### Services/api
Cliente Axios configurado con:
- Base URL del backend
- Interceptor para agregar token a todas las peticiones
- Interceptor para manejar errores de autenticación
- Funciones tipadas para todas las operaciones CRUD

### Pages/LoginPage
- Alterna entre formularios de Login y Registro
- Diseño centrado con gradiente
- Manejo de estado local para alternar vistas

### Pages/DashboardPage
- Layout con navbar
- Grid responsivo (formulario + lista de tareas)
- Gestión completa de estado de tareas
- Botón de cerrar sesión

### Components/Auth
- **Login**: Formulario de inicio de sesión
- **Registro**: Formulario de registro con confirmación de contraseña

### Components/Tareas
- **FormularioTarea**: Crear/editar tareas con validación
- **ListaTareas**: Muestra todas las tareas del usuario
- **TarjetaTarea**: Card individual con acciones y comentarios

### Components/Comentarios
- **FormularioComentario**: Campo para nuevo comentario
- **ListaComentarios**: Lista todos los comentarios con autor y fecha

## 🎨 Diseño y UX

### Responsive Design
- Mobile-first approach
- Breakpoints de TailwindCSS
- Grid adaptativo para desktop/mobile

### Feedback Visual
- Loading spinners durante peticiones
- Mensajes de error en rojo
- Mensajes de éxito en verde
- Estados disabled en botones durante carga
- Animaciones suaves (hover, transitions)

### Accesibilidad
- Labels en todos los inputs
- Atributos required en campos obligatorios
- Validaciones HTML5
- Contraste de colores adecuado
- Mensajes de error descriptivos

## 🔐 Seguridad

- Token JWT almacenado en localStorage
- Limpieza automática del token al cerrar sesión
- Interceptor que agrega token a todas las peticiones
- Redirección automática si el token expira (401)
- Rutas protegidas con verificación de autenticación

## 🌐 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_API_URL` | URL base del backend | `http://localhost:3000/api` |

## 📝 Notas Técnicas

- El proyecto usa Vite para un dev server ultra-rápido
- TailwindCSS en modo JIT (Just-In-Time) para optimización
- TypeScript en modo estricto para máxima seguridad de tipos
- Todas las variables y funciones están en español
- Código documentado con comentarios explicativos
- Componentes funcionales con hooks de React

## 🐛 Solución de Problemas

### Error: Cannot connect to API
Verifica que:
1. El backend esté corriendo en `http://localhost:3000`
2. La variable `VITE_API_URL` en `.env` sea correcta
3. No haya problemas de CORS en el backend

### Token expira constantemente
El token JWT del backend tiene una duración de 7 días. Si expira, el usuario será redirigido al login automáticamente.

### Estilos de Tailwind no se aplican
Ejecuta:
```bash
npm run build
```

Si el problema persiste, elimina `node_modules` y reinstala:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Hot reload no funciona
Reinicia el servidor de desarrollo:
```bash
npm run dev
```

## 🚀 Optimizaciones Implementadas

- Lazy loading de componentes con React.lazy (opcional)
- Memoización de componentes con React.memo donde es necesario
- Debounce en inputs de búsqueda (si se implementa)
- Código splitting automático con Vite
- Tree shaking de TailwindCSS para reducir el bundle

## 👨‍💻 Autor

Gabriel Domingo López Hernández
Desarrollador Full-Stack - Prueba Técnica Moshipp

## 📄 Licencia

MIT