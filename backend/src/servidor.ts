/**
 * Servidor Principal de Express
 * Configura y arranca el servidor de la API REST
 */

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import authRutas from './rutas/auth.rutas';
import tareasRutas from './rutas/tareas.rutas';
import comentariosRutas from './rutas/comentarios.rutas';

// Cargar variables de entorno
dotenv.config();

// Crear aplicación Express
const app: Application = express();
const PUERTO = process.env.PORT || 3000;

// Middleware global
app.use(cors()); // Habilitar CORS para todas las rutas
app.use(express.json()); // Parser de JSON en el body
app.use(express.urlencoded({ extended: true })); // Parser de datos URL encoded

// Documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info .title { color: #2563eb }
    .swagger-ui .opblock-tag { font-size: 18px; font-weight: bold }
  `,
  customSiteTitle: 'API Gestor de Tareas - Documentación',
  customfavIcon: '/favicon.ico',
}));

// Ruta para obtener el swagger.json
app.get('/api-docs.json', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Ruta de bienvenida
app.get('/', (req: Request, res: Response) => {
  res.json({
    mensaje: 'API Gestor de Tareas Colaborativo - Moshipp',
    version: '1.0.0',
    documentacion: `${req.protocol}://${req.get('host')}/api-docs`,
    endpoints: {
      autenticacion: '/api/auth',
      tareas: '/api/tasks',
      comentarios: '/api/tasks/:id/comments',
    },
  });
});

// Rutas de la API
app.use('/api/auth', authRutas); // Rutas de autenticación
app.use('/api/tasks', tareasRutas); // Rutas de tareas
app.use('/api/tasks', comentariosRutas); // Rutas de comentarios

// Manejo de rutas no encontradas (404)
app.use((req: Request, res: Response) => {
  res.status(404).json({
    exito: false,
    mensaje: 'Ruta no encontrada',
    ruta: req.originalUrl,
  });
});

// Manejo global de errores
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('Error no manejado:', err);
  res.status(500).json({
    exito: false,
    mensaje: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Iniciar servidor
app.listen(PUERTO, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PUERTO}`);
  console.log(`📚 Documentación Swagger en http://localhost:${PUERTO}/api-docs`);
});

export default app;