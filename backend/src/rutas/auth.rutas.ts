/**
 * Rutas de Autenticación
 * Define las rutas para registro y login
 */

import { Router } from 'express';
import { registrarUsuario, iniciarSesion } from '../controladores/auth.controlador';

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *               - password
 *             properties:
 *               nombre:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 example: Gabriel López
 *               email:
 *                 type: string
 *                 format: email
 *                 example: gabriel@ejemplo.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 100
 *                 example: password123
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
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
 *                   example: Usuario registrado exitosamente
 *                 datos:
 *                   $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Datos inválidos o email ya registrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 */
router.post('/register', registrarUsuario);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: gabriel@ejemplo.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login exitoso
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
 *                   example: Inicio de sesión exitoso
 *                 datos:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     usuario:
 *                       $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 */
router.post('/login', iniciarSesion);

export default router;