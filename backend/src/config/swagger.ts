/**
 * Configuración de Swagger para documentación de API
 */

import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Gestor de Tareas Colaborativo - API',
      version: '1.0.0',
      description: 'API REST para gestión de tareas con autenticación JWT, CRUD de tareas y sistema de comentarios.',
      contact: {
        name: 'Gabriel López Hernández',
        email: 'galoher94@gmail.com',
        url: 'https://www.linkedin.com/in/galoher/',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desarrollo',
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Ingresa el token JWT obtenido del endpoint de login',
        },
      },
      schemas: {
        Usuario: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único del usuario',
              example: 1,
            },
            nombre: {
              type: 'string',
              description: 'Nombre completo del usuario',
              example: 'Gabriel López',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario',
              example: 'gabriel@ejemplo.com',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización',
            },
          },
        },
        Tarea: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único de la tarea',
              example: 1,
            },
            titulo: {
              type: 'string',
              description: 'Título de la tarea',
              example: 'Implementar autenticación',
            },
            descripcion: {
              type: 'string',
              description: 'Descripción detallada de la tarea',
              example: 'Desarrollar sistema de login con JWT',
            },
            estado: {
              type: 'string',
              enum: ['pendiente', 'en_progreso', 'completada'],
              description: 'Estado actual de la tarea',
              example: 'en_progreso',
            },
            usuarioId: {
              type: 'integer',
              description: 'ID del usuario creador',
              example: 1,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización',
            },
            comentarios: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Comentario',
              },
            },
          },
        },
        Comentario: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único del comentario',
              example: 1,
            },
            contenido: {
              type: 'string',
              description: 'Contenido del comentario',
              example: 'Excelente progreso en esta tarea',
            },
            tareaId: {
              type: 'integer',
              description: 'ID de la tarea',
              example: 1,
            },
            usuarioId: {
              type: 'integer',
              description: 'ID del usuario que comentó',
              example: 1,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización',
            },
            usuario: {
              $ref: '#/components/schemas/Usuario',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            exito: {
              type: 'boolean',
              example: false,
            },
            mensaje: {
              type: 'string',
              example: 'Mensaje de error',
            },
            errores: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  campo: {
                    type: 'string',
                  },
                  mensaje: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Autenticación',
        description: 'Endpoints para registro y login de usuarios',
      },
      {
        name: 'Tareas',
        description: 'Operaciones CRUD para tareas',
      },
      {
        name: 'Comentarios',
        description: 'Gestión de comentarios en tareas',
      },
    ],
  },
  apis: ['./src/rutas/*.ts'], // Archivos que contienen las anotaciones de Swagger
};

export const swaggerSpec = swaggerJsdoc(options);