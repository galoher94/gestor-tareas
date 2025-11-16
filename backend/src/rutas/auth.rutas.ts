/**
 * Rutas de Autenticación
 * Define las rutas para registro y login
 */

import { Router } from 'express';
import { registrarUsuario, iniciarSesion } from '../controladores/auth.controlador';

const router = Router();

// POST /api/auth/register - Registrar nuevo usuario
router.post('/register', registrarUsuario);

// POST /api/auth/login - Iniciar sesión
router.post('/login', iniciarSesion);

export default router;