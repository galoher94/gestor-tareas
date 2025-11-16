/**
 * Rutas de Comentarios
 * Define las rutas para crear y listar comentarios en tareas
 */

import { Router } from 'express';
import {
  obtenerComentarios,
  crearComentario,
} from '../controladores/comentarios.controlador';
import { verificarAutenticacion } from '../middleware/autenticacion';

const router = Router();

// Todas las rutas de comentarios requieren autenticación
router.use(verificarAutenticacion);

// GET /api/tasks/:id/comments - Listar comentarios de una tarea
router.get('/:id/comments', obtenerComentarios);

// POST /api/tasks/:id/comments - Crear comentario en una tarea
router.post('/:id/comments', crearComentario);

export default router;