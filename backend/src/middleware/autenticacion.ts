/**
 * Middleware de Autenticación JWT
 * Verifica el token JWT en las peticiones y protege las rutas
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Interfaz para el payload del JWT
interface PayloadJWT {
  id: number;
  email: string;
  nombre: string;
}

/**
 * Middleware que verifica la autenticación del usuario mediante JWT
 * Extrae el token del header Authorization y valida su autenticidad
 */
export const verificarAutenticacion = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Obtener el token del header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        exito: false,
        mensaje: 'Token de autenticación no proporcionado',
      });
      return;
    }

    // Extraer el token (formato: "Bearer TOKEN")
    const token = authHeader.split(' ')[1];

    // Verificar el secreto JWT
    const secretoJWT = process.env.JWT_SECRET;
    if (!secretoJWT) {
      throw new Error('JWT_SECRET no está configurado en las variables de entorno');
    }

    // Verificar y decodificar el token
    const payload = jwt.verify(token, secretoJWT) as PayloadJWT;

    // Agregar los datos del usuario al objeto request
    req.usuario = {
      id: payload.id,
      email: payload.email,
      nombre: payload.nombre,
    };

    // Continuar con el siguiente middleware o controlador
    next();
  } catch (error) {
    // Manejo de errores de JWT
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        exito: false,
        mensaje: 'Token inválido o expirado',
      });
      return;
    }

    // Otros errores
    res.status(500).json({
      exito: false,
      mensaje: 'Error en el servidor al verificar autenticación',
    });
  }
};