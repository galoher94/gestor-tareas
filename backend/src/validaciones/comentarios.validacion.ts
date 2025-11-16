/**
 * Validaciones con Zod para Comentarios
 * Esquema de validación para crear comentarios en tareas
 */

import { z } from 'zod';

// Esquema de validación para crear comentario
export const esquemaCrearComentario = z.object({
  contenido: z.string()
    .min(1, 'El comentario no puede estar vacío')
    .max(1000, 'El comentario no puede exceder 1000 caracteres')
    .trim(),
});

// Tipo TypeScript inferido del esquema
export type DatosCrearComentario = z.infer<typeof esquemaCrearComentario>;