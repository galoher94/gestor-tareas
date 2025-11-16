/**
 * Extensión de tipos de Express
 * Añade la propiedad 'usuario' al objeto Request para almacenar datos del usuario autenticado
 */

import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      usuario?: {
        id: number;
        email: string;
        nombre: string;
      };
    }
  }
}