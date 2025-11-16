/**
 * Validaciones con Zod para Autenticación
 * Esquemas de validación para registro y login de usuarios
 */

import { z } from 'zod';

// Esquema de validación para registro de usuario
export const esquemaRegistro = z.object({
  nombre: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  
  email: z.string()
    .email('Debe ser un email válido')
    .toLowerCase(),
  
  password: z.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(100, 'La contraseña no puede exceder 100 caracteres'),
});

// Esquema de validación para login
export const esquemaLogin = z.object({
  email: z.string()
    .email('Debe ser un email válido')
    .toLowerCase(),
  
  password: z.string()
    .min(1, 'La contraseña es requerida'),
});

// Tipos TypeScript inferidos de los esquemas
export type DatosRegistro = z.infer<typeof esquemaRegistro>;
export type DatosLogin = z.infer<typeof esquemaLogin>;