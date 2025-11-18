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

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtener todas las tareas del usuario autenticado
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exito:
 *                   type: boolean
 *                   example: true
 *                 datos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Tarea'
 *       401:
 *         description: No autenticado
 *       500:
 *         description: Error del servidor
 */
router.get('/', obtenerTareas);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descripcion
 *             properties:
 *               titulo:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 200
 *                 example: Implementar autenticación
 *               descripcion:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 2000
 *                 example: Desarrollar sistema de login con JWT
 *               estado:
 *                 type: string
 *                 enum: [pendiente, en_progreso, completada]
 *                 default: pendiente
 *                 example: pendiente
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exito:
 *                   type: boolean
 *                   example: true
 *                 mensaje:
 *                   type: string
 *                   example: Tarea creada exitosamente
 *                 datos:
 *                   $ref: '#/components/schemas/Tarea'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autenticado
 *       500:
 *         description: Error del servidor
 */
router.post('/', crearTarea);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea existente
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 200
 *                 example: Tarea actualizada
 *               descripcion:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 2000
 *                 example: Descripción actualizada
 *               estado:
 *                 type: string
 *                 enum: [pendiente, en_progreso, completada]
 *                 example: completada
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exito:
 *                   type: boolean
 *                   example: true
 *                 mensaje:
 *                   type: string
 *                   example: Tarea actualizada exitosamente
 *                 datos:
 *                   $ref: '#/components/schemas/Tarea'
 *       400:
 *         description: Datos inválidos o ID inválido
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No tienes permiso para editar esta tarea
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', actualizarTarea);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exito:
 *                   type: boolean
 *                   example: true
 *                 mensaje:
 *                   type: string
 *                   example: Tarea eliminada exitosamente
 *       400:
 *         description: ID inválido
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No tienes permiso para eliminar esta tarea
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', eliminarTarea);

export default router;