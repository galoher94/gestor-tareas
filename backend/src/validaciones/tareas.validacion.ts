/**
 * Validaciones con Zod para Tareas
 * Esquemas de validación para crear y actualizar tareas
 */

import { z } from 'zod';

// Estados válidos para una tarea
const estadosValidos = ['pendiente', 'en_progreso', 'completada'] as const;

// Esquema de validación para crear tarea
export const esquemaCrearTarea = z.object({
  titulo: z.string()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(200, 'El título no puede exceder 200 caracteres'),
  
  descripcion: z.string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(2000, 'La descripción no puede exceder 2000 caracteres'),
  
  estado: z.enum(estadosValidos)
    .optional()
    .default('pendiente'),
});

// Esquema de validación para actualizar tarea
export const esquemaActualizarTarea = z.object({
  titulo: z.string()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(200, 'El título no puede exceder 200 caracteres')
    .optional(),
  
  descripcion: z.string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(2000, 'La descripción no puede exceder 2000 caracteres')
    .optional(),
  
  estado: z.enum(estadosValidos)
    .optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: 'Debe proporcionar al menos un campo para actualizar',
});

// Tipos TypeScript inferidos de los esquemas
export type DatosCrearTarea = z.infer<typeof esquemaCrearTarea>;
export type DatosActualizarTarea = z.infer<typeof esquemaActualizarTarea>;