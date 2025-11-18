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

/**
 * @swagger
 * /api/tasks/{id}/comments:
 *   get:
 *     summary: Obtener todos los comentarios de una tarea
 *     tags: [Comentarios]
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
 *         description: Lista de comentarios obtenida exitosamente
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
 *                     $ref: '#/components/schemas/Comentario'
 *       400:
 *         description: ID de tarea inválido
 *       401:
 *         description: No autenticado
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/:id/comments', obtenerComentarios);

/**
 * @swagger
 * /api/tasks/{id}/comments:
 *   post:
 *     summary: Crear un comentario en una tarea
 *     tags: [Comentarios]
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
 *             required:
 *               - contenido
 *             properties:
 *               contenido:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 1000
 *                 example: Excelente progreso en esta tarea
 *     responses:
 *       201:
 *         description: Comentario creado exitosamente
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
 *                   example: Comentario creado exitosamente
 *                 datos:
 *                   $ref: '#/components/schemas/Comentario'
 *       400:
 *         description: Datos inválidos o ID de tarea inválido
 *       401:
 *         description: No autenticado
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error del servidor
 */
router.post('/:id/comments', crearComentario);

export default router;