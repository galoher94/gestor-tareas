# 🚀 Backend - Gestor de Tareas Colaborativo

API REST desarrollada con Node.js, Express, TypeScript, Prisma y PostgreSQL para la prueba técnica de Moshipp.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Base de Datos](#base-de-datos)
- [Validaciones](#validaciones)

## ✨ Características

- ✅ Autenticación JWT con tokens de 7 días
- ✅ CRUD completo de tareas con protección de usuario
- ✅ Sistema de comentarios en tareas
- ✅ Validaciones robustas con Zod
- ✅ Hash de contraseñas con bcrypt
- ✅ ORM Prisma con migraciones automáticas
- ✅ Middleware de autenticación
- ✅ Manejo de errores centralizado
- ✅ Código TypeScript 100% tipado
- ✅ Variables y funciones en español

## 🛠️ Tecnologías Utilizadas

- **Node.js** v18+
- **Express** - Framework web
- **TypeScript** - Superset de JavaScript tipado
- **Prisma** - ORM para base de datos
- **PostgreSQL** - Base de datos relacional
- **JWT** - Autenticación basada en tokens
- **Bcrypt** - Hash de contraseñas
- **Zod** - Validación de esquemas
- **dotenv** - Variables de entorno

## 📦 Requisitos Previos

Asegúrate de tener instalado:

- Node.js 18 o superior
- npm o yarn
- PostgreSQL 12+ o MySQL 8+

## 🔧 Instalación

1. **Clonar o extraer el proyecto**

```bash
cd backend
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

2. **Editar el archivo `.env` con tus datos**

```env
PORT=3000

# Para PostgreSQL (recomendado)
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/gestor_tareas?schema=public"

# Para MySQL (alternativo)
# DATABASE_URL="mysql://usuario:contraseña@localhost:3306/gestor_tareas"

JWT_SECRET="tu_secreto_super_seguro_cambia_esto_en_produccion_123456789"

NODE_ENV=development
```

3. **Configurar la base de datos en Prisma**

Si usas MySQL en lugar de PostgreSQL, edita `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "mysql" // Cambiar de "postgresql" a "mysql"
  url      = env("DATABASE_URL")
}
```

4. **Generar cliente de Prisma y crear tablas**

```bash
# Generar el cliente de Prisma
npx prisma generate

# Crear y aplicar migraciones (crea las tablas en la BD)
npx prisma migrate dev --name init

# (Opcional) Abrir Prisma Studio para ver la base de datos
npx prisma studio
```

## 🚀 Ejecución

### Modo Desarrollo (con hot-reload)

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### Modo Producción

```bash
# Compilar TypeScript a JavaScript
npm run build

# Ejecutar el código compilado
npm start
```

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts           # Configuración de Prisma Client
│   ├── middleware/
│   │   └── autenticacion.ts      # Middleware JWT
│   ├── rutas/
│   │   ├── auth.rutas.ts         # Rutas de autenticación
│   │   ├── tareas.rutas.ts       # Rutas de tareas
│   │   └── comentarios.rutas.ts  # Rutas de comentarios
│   ├── controladores/
│   │   ├── auth.controlador.ts        # Lógica de auth
│   │   ├── tareas.controlador.ts      # Lógica de tareas
│   │   └── comentarios.controlador.ts # Lógica de comentarios
│   ├── validaciones/
│   │   ├── auth.validacion.ts         # Esquemas Zod para auth
│   │   ├── tareas.validacion.ts       # Esquemas Zod para tareas
│   │   └── comentarios.validacion.ts  # Esquemas Zod para comentarios
│   ├── tipos/
│   │   └── express.d.ts          # Tipos extendidos de Express
│   └── servidor.ts               # Punto de entrada del servidor
├── prisma/
│   └── schema.prisma             # Definición del esquema de BD
├── .env                          # Variables de entorno (no subir a Git)
├── .env.example                  # Ejemplo de variables de entorno
├── package.json
├── tsconfig.json
└── README.md
```

## 🔗 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Autenticación

#### Registro de Usuario
```http
POST /auth/register
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "password": "123456"
}
```

**Respuesta exitosa (201):**
```json
{
  "exito": true,
  "mensaje": "Usuario registrado exitosamente",
  "datos": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "juan@ejemplo.com",
  "password": "123456"
}
```

**Respuesta exitosa (200):**
```json
{
  "exito": true,
  "mensaje": "Inicio de sesión exitoso",
  "datos": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "usuario": {
      "id": 1,
      "nombre": "Juan Pérez",
      "email": "juan@ejemplo.com"
    }
  }
}
```

### Tareas (Requieren autenticación)

**Nota:** Todas las peticiones de tareas deben incluir el header:
```
Authorization: Bearer {token}
```

#### Listar Tareas del Usuario
```http
GET /tasks
Authorization: Bearer {token}
```

**Respuesta exitosa (200):**
```json
{
  "exito": true,
  "datos": [
    {
      "id": 1,
      "titulo": "Implementar autenticación",
      "descripcion": "Desarrollar sistema de login con JWT",
      "estado": "en_progreso",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "usuarioId": 1,
      "comentarios": []
    }
  ]
}
```

#### Crear Tarea
```http
POST /tasks
Authorization: Bearer {token}
Content-Type: application/json

{
  "titulo": "Nueva tarea de prueba",
  "descripcion": "Descripción detallada de la tarea",
  "estado": "pendiente"
}
```

**Respuesta exitosa (201):**
```json
{
  "exito": true,
  "mensaje": "Tarea creada exitosamente",
  "datos": {
    "id": 2,
    "titulo": "Nueva tarea de prueba",
    "descripcion": "Descripción detallada de la tarea",
    "estado": "pendiente",
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z",
    "usuarioId": 1,
    "comentarios": []
  }
}
```

#### Actualizar Tarea
```http
PUT /tasks/2
Authorization: Bearer {token}
Content-Type: application/json

{
  "titulo": "Tarea actualizada",
  "estado": "completada"
}
```

**Respuesta exitosa (200):**
```json
{
  "exito": true,
  "mensaje": "Tarea actualizada exitosamente",
  "datos": {
    "id": 2,
    "titulo": "Tarea actualizada",
    "descripcion": "Descripción detallada de la tarea",
    "estado": "completada",
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z",
    "usuarioId": 1,
    "comentarios": []
  }
}
```

#### Eliminar Tarea
```http
DELETE /tasks/2
Authorization: Bearer {token}
```

**Respuesta exitosa (200):**
```json
{
  "exito": true,
  "mensaje": "Tarea eliminada exitosamente"
}
```

### Comentarios (Requieren autenticación)

#### Listar Comentarios de una Tarea
```http
GET /tasks/1/comments
Authorization: Bearer {token}
```

**Respuesta exitosa (200):**
```json
{
  "exito": true,
  "datos": [
    {
      "id": 1,
      "contenido": "Este es un comentario de prueba",
      "createdAt": "2024-01-15T12:30:00.000Z",
      "updatedAt": "2024-01-15T12:30:00.000Z",
      "tareaId": 1,
      "usuarioId": 1,
      "usuario": {
        "id": 1,
        "nombre": "Juan Pérez",
        "email": "juan@ejemplo.com"
      }
    }
  ]
}
```

#### Crear Comentario en una Tarea
```http
POST /tasks/1/comments
Authorization: Bearer {token}
Content-Type: application/json

{
  "contenido": "Excelente progreso en esta tarea"
}
```

**Respuesta exitosa (201):**
```json
{
  "exito": true,
  "mensaje": "Comentario creado exitosamente",
  "datos": {
    "id": 2,
    "contenido": "Excelente progreso en esta tarea",
    "createdAt": "2024-01-15T13:00:00.000Z",
    "updatedAt": "2024-01-15T13:00:00.000Z",
    "tareaId": 1,
    "usuarioId": 1,
    "usuario": {
      "id": 1,
      "nombre": "Juan Pérez",
      "email": "juan@ejemplo.com"
    }
  }
}
```

## 🗄️ Base de Datos

### Esquema de Relaciones

```
Usuario (1) ----< (N) Tarea
Usuario (1) ----< (N) Comentario
Tarea (1) ----< (N) Comentario
```

### Tablas

#### usuarios
- `id` - INT, Primary Key, Auto-increment
- `nombre` - VARCHAR
- `email` - VARCHAR, Unique
- `password` - VARCHAR (hasheado)
- `createdAt` - TIMESTAMP
- `updatedAt` - TIMESTAMP

#### tareas
- `id` - INT, Primary Key, Auto-increment
- `titulo` - VARCHAR
- `descripcion` - TEXT
- `estado` - VARCHAR (pendiente, en_progreso, completada)
- `usuarioId` - INT, Foreign Key → usuarios.id
- `createdAt` - TIMESTAMP
- `updatedAt` - TIMESTAMP

#### comentarios
- `id` - INT, Primary Key, Auto-increment
- `contenido` - TEXT
- `tareaId` - INT, Foreign Key → tareas.id
- `usuarioId` - INT, Foreign Key → usuarios.id
- `createdAt` - TIMESTAMP
- `updatedAt` - TIMESTAMP

## ✅ Validaciones

### Registro
- **nombre**: 2-100 caracteres
- **email**: formato de email válido
- **password**: mínimo 6 caracteres

### Login
- **email**: formato de email válido
- **password**: requerido

### Crear Tarea
- **titulo**: 3-200 caracteres
- **descripcion**: 10-2000 caracteres
- **estado**: 'pendiente' | 'en_progreso' | 'completada' (opcional, default: 'pendiente')

### Actualizar Tarea
- Al menos un campo debe ser proporcionado
- Los campos tienen las mismas validaciones que crear tarea

### Crear Comentario
- **contenido**: 1-1000 caracteres

## 🔐 Seguridad

- Las contraseñas se hashean con bcrypt (10 rounds)
- Los tokens JWT expiran en 7 días
- Las rutas de tareas y comentarios están protegidas con middleware de autenticación
- Solo el creador de una tarea puede editarla o eliminarla
- Todos los usuarios autenticados pueden comentar en cualquier tarea

## 📝 Notas Técnicas

- El proyecto usa TypeScript en modo estricto
- Todas las variables y funciones están en español
- Código documentado con comentarios explicativos
- Manejo de errores robusto con respuestas JSON consistentes
- Validaciones exhaustivas antes de operaciones en BD
- Relaciones con eliminación en cascada (onDelete: Cascade)

## 🐛 Solución de Problemas

### Error: "JWT_SECRET not configured"
Asegúrate de tener la variable `JWT_SECRET` en tu archivo `.env`

### Error de conexión a la base de datos
Verifica que PostgreSQL/MySQL esté corriendo y que la `DATABASE_URL` en `.env` sea correcta

### Error: "Prisma Client could not be generated"
Ejecuta: `npx prisma generate`

### Las migraciones no se aplican
Ejecuta: `npx prisma migrate dev`

## 👨‍💻 Autor

Gabriel Domingo López Hernández
Desarrollador Full-Stack - Prueba Técnica Moshipp

## 📄 Licencia

MIT