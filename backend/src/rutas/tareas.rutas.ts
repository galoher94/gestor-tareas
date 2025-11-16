/**
 * Rutas de Tareas
 * Define las rutas para el CRUD de tareas
 */

import { Router } from 'express';
import {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
} from '../controladores/tareas.controlador';
import { verificarAutenticacion } from '../middleware/autenticacion';

const router = Router();

// Todas las rutas de tareas requieren autenticación
router.use(verificarAutenticacion);

// GET /api/tasks - Listar tareas del usuario
router.get('/', obtenerTareas);

// POST /api/tasks - Crear nueva tarea
router.post('/', crearTarea);

// PUT /api/tasks/:id - Actualizar tarea
router.put('/:id', actualizarTarea);

// DELETE /api/tasks/:id - Eliminar tarea
router.delete('/:id', eliminarTarea);

export default router;