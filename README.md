# 🚀 Gestor de Tareas Colaborativo - Moshipp

**Prueba Técnica - Desarrollador Full-Stack (Nivel Medio)**

Aplicación completa de gestión de tareas con sistema de autenticación JWT, CRUD de tareas y comentarios colaborativos.

---

## 📦 Contenido del Proyecto

Este proyecto contiene dos carpetas principales:

```
gestor-tareas-moshipp/
├── backend/          # API REST con Node.js, Express, TypeScript, Prisma
└── frontend/         # Aplicación React con TypeScript y TailwindCSS
```

---

## ✨ Características Principales

### Backend
- ✅ API REST completa con Express y TypeScript
- ✅ ORM Prisma con PostgreSQL/MySQL
- ✅ Autenticación JWT con tokens de 7 días
- ✅ Validaciones robustas con Zod
- ✅ Hash de contraseñas con bcryptjs
- ✅ Middleware de protección de rutas
- ✅ Relaciones de base de datos bien definidas
- ✅ Manejo de errores centralizado
- ✅ Código 100% en español y comentado

### Frontend
- ✅ Interfaz React moderna con TypeScript
- ✅ Diseño responsive con TailwindCSS
- ✅ Context API para estado global
- ✅ React Router para navegación
- ✅ Axios con interceptores para JWT
- ✅ Rutas protegidas
- ✅ Componentes reutilizables y organizados
- ✅ Feedback visual (loading, errores, éxito)
- ✅ Código 100% en español y comentado

---

## 🛠️ Stack Tecnológico

### Backend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Node.js | 18+ | Runtime de JavaScript |
| Express | 4.18 | Framework web |
| TypeScript | 5.3 | Tipado estático |
| Prisma | 5.7 | ORM |
| PostgreSQL | 12+ | Base de datos |
| JWT | 9.0 | Autenticación |
| Bcrypt | 2.4 | Hash de contraseñas |
| Zod | 3.22 | Validaciones |

### Frontend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 18.2 | Librería UI |
| TypeScript | 5.2 | Tipado estático |
| Vite | 5.0 | Build tool |
| TailwindCSS | 3.3 | Estilos |
| React Router | 6.20 | Navegación |
| Axios | 1.6 | Cliente HTTP |

---

## 🚀 Guía de Instalación Rápida

### Prerrequisitos
- Node.js 18 o superior
- PostgreSQL 12+ o MySQL 8+
- npm o yarn

### 1️⃣ Clonar o Extraer el Proyecto

```bash
# Si tienes el .zip
unzip gestor-tareas-moshipp.zip
cd gestor-tareas-moshipp
```

### 2️⃣ Configurar el Backend

```bash
cd backend

# Instalar dependencias
npm install

# Copiar y configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de base de datos

# Generar cliente de Prisma y crear tablas
npx prisma generate
npx prisma migrate dev --name init

# Iniciar servidor backend
npm run dev
```

El backend estará corriendo en `http://localhost:3000`

### 3️⃣ Configurar el Frontend

```bash
# En otra terminal
cd frontend

# Instalar dependencias
npm install

# Copiar y configurar variables de entorno
cp .env.example .env
# El .env debería tener: VITE_API_URL=http://localhost:3000/api

# Iniciar servidor frontend
npm run dev
```

El frontend estará corriendo en `http://localhost:5173`

### 4️⃣ ¡Listo para Usar! 🎉

Abre tu navegador en `http://localhost:5173` y:

1. **Regístrate** con tu nombre, email y contraseña
2. **Inicia sesión** con tus credenciales
3. **Crea tareas** desde el formulario del dashboard
4. **Edita, elimina y comenta** tus tareas

---

## 📚 Documentación Detallada

Cada carpeta tiene su propio README con instrucciones detalladas:

- 📖 [Backend README](./backend/README.md) - Documentación completa del API
- 📖 [Frontend README](./frontend/README.md) - Documentación completa del cliente

---

## 🎯 Endpoints del API

### Autenticación (Públicos)
```
POST /api/auth/register    # Registrar usuario
POST /api/auth/login       # Iniciar sesión
```

### Tareas (Protegidos - Requieren JWT)
```
GET    /api/tasks          # Listar tareas del usuario
POST   /api/tasks          # Crear nueva tarea
PUT    /api/tasks/:id      # Actualizar tarea
DELETE /api/tasks/:id      # Eliminar tarea
```

### Comentarios (Protegidos - Requieren JWT)
```
GET  /api/tasks/:id/comments    # Listar comentarios de una tarea
POST /api/tasks/:id/comments    # Crear comentario
```

---

## 🗄️ Modelo de Base de Datos

### Tablas y Relaciones

```
Usuario (1) ────< (N) Tarea
Usuario (1) ────< (N) Comentario
Tarea (1) ──────< (N) Comentario
```

### usuarios
- `id` (PK)
- `nombre`
- `email` (unique)
- `password` (hasheado)
- `createdAt`
- `updatedAt`

### tareas
- `id` (PK)
- `titulo`
- `descripcion`
- `estado` (pendiente, en_progreso, completada)
- `usuarioId` (FK → usuarios.id)
- `createdAt`
- `updatedAt`

### comentarios
- `id` (PK)
- `contenido`
- `tareaId` (FK → tareas.id)
- `usuarioId` (FK → usuarios.id)
- `createdAt`
- `updatedAt`

---

## 🧪 Pruebas de Funcionalidad

### Flujo Completo de Prueba

1. **Registro y Login**
   - Registrar un nuevo usuario
   - Iniciar sesión
   - Verificar que se recibe el token JWT

2. **CRUD de Tareas**
   - Crear 3 tareas con diferentes estados
   - Editar el título de una tarea
   - Cambiar el estado de una tarea
   - Eliminar una tarea
   - Verificar que solo aparecen las tareas del usuario

3. **Sistema de Comentarios**
   - Agregar comentarios a diferentes tareas
   - Verificar que los comentarios persisten
   - Verificar que se muestra el autor del comentario

4. **Protección de Rutas**
   - Intentar acceder al dashboard sin token
   - Cerrar sesión y verificar redirección
   - Verificar que no se puede editar/eliminar tareas de otros usuarios

### Extras Implementados
- ✅ Sistema de comentarios completamente funcional
- ✅ Validaciones exhaustivas en backend y frontend
- ✅ Código 100% comentado en español
- ✅ Diseño responsive y moderno
- ✅ Manejo robusto de errores
- ✅ TypeScript estricto en todo el proyecto
- ✅ Context API para estado global
- ✅ Interceptores de Axios para JWT

---

## 🔒 Seguridad Implementada

- 🔐 Contraseñas hasheadas con bcrypt (10 rounds)
- 🔐 JWT con expiración de 7 días
- 🔐 Middleware de autenticación en todas las rutas protegidas
- 🔐 Validación de propiedad de recursos (solo el creador puede editar/eliminar)
- 🔐 Sanitización de inputs con Zod
- 🔐 Variables sensibles en .env (no en el código)
- 🔐 CORS configurado en el backend

---

## 🐛 Solución de Problemas Comunes

### Backend no inicia
- ✔️ Verificar que PostgreSQL/MySQL esté corriendo
- ✔️ Verificar que `DATABASE_URL` en `.env` sea correcta
- ✔️ Ejecutar `npx prisma generate` y `npx prisma migrate dev`

### Frontend no conecta con Backend
- ✔️ Verificar que backend esté corriendo en puerto 3000
- ✔️ Verificar `VITE_API_URL` en `.env` del frontend
- ✔️ Verificar configuración de CORS en backend

### Error de autenticación
- ✔️ Verificar que `JWT_SECRET` esté configurado en backend
- ✔️ Limpiar localStorage del navegador
- ✔️ Registrar un nuevo usuario e intentar de nuevo

---

## 💡 Notas para el Evaluador

### Aspectos Destacados

1. **Código Limpio**: Todo el código está organizado, comentado y sigue principios SOLID
2. **TypeScript Estricto**: Tipado completo sin usar `any` innecesariamente
3. **Español Consistente**: Variables, funciones y comentarios en español
4. **Escalabilidad**: Arquitectura preparada para crecer (separación de capas)
5. **UX/UI**: Interfaz intuitiva con feedback visual constante
6. **Seguridad**: Implementación correcta de JWT y validaciones



## 📞 Contacto
3

Si tienes alguna pregunta sobre la implementación, no dudes en contactarme.

---

## 📄 Licencia

MIT

---

**Desarrollado por Gabriel López Hernández**

*Prueba Técnica - Desarrollador Full-Stack*