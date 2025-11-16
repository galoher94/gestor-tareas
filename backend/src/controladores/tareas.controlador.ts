/**
 * Controlador de Tareas
 * Maneja el CRUD de tareas (crear, listar, actualizar, eliminar)
 */

import { Request, Response } from 'express';
import prisma from '../config/database';
import { esquemaCrearTarea, esquemaActualizarTarea } from '../validaciones/tareas.validacion';

/**
 * GET /api/tasks
 * Lista todas las tareas del usuario autenticado
 */
export const obtenerTareas = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarioId = req.usuario!.id;

    const tareas = await prisma.tarea.findMany({
      where: { usuarioId },
      include: {
        comentarios: {
          include: {
            usuario: {
              select: {
                id: true,
                nombre: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      exito: true,
      datos: tareas,
    });
  } catch (error) {
    console.error('Error en obtenerTareas:', error);
    res.status(500).json({
      exito: false,
      mensaje: 'Error del servidor al obtener tareas',
    });
  }
};

/**
 * POST /api/tasks
 * Crea una nueva tarea para el usuario autenticado
 */
export const crearTarea = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validar datos de entrada
    const datosValidados = esquemaCrearTarea.parse(req.body);
    const usuarioId = req.usuario!.id;

    // Crear la tarea
    const nuevaTarea = await prisma.tarea.create({
      data: {
        titulo: datosValidados.titulo,
        descripcion: datosValidados.descripcion,
        estado: datosValidados.estado,
        usuarioId,
      },
      include: {
        comentarios: true,
      },
    });

    res.status(201).json({
      exito: true,
      mensaje: 'Tarea creada exitosamente',
      datos: nuevaTarea,
    });
  } catch (error: any) {
    // Manejo de errores de validación Zod
    if (error.name === 'ZodError') {
      res.status(400).json({
        exito: false,
        mensaje: 'Datos de tarea inválidos',
        errores: error.errors.map((err: any) => ({
          campo: err.path.join('.'),
          mensaje: err.message,
        })),
      });
      return;
    }

    console.error('Error en crearTarea:', error);
    res.status(500).json({
      exito: false,
      mensaje: 'Error del servidor al crear tarea',
    });
  }
};

/**
 * PUT /api/tasks/:id
 * Actualiza una tarea existente (solo el creador puede editar)
 */
export const actualizarTarea = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const tareaId = parseInt(id);
    const usuarioId = req.usuario!.id;

    // Validar que el ID sea un número
    if (isNaN(tareaId)) {
      res.status(400).json({
        exito: false,
        mensaje: 'ID de tarea inválido',
      });
      return;
    }

    // Validar datos de entrada
    const datosValidados = esquemaActualizarTarea.parse(req.body);

    // Verificar que la tarea existe y pertenece al usuario
    const tareaExistente = await prisma.tarea.findUnique({
      where: { id: tareaId },
    });

    if (!tareaExistente) {
      res.status(404).json({
        exito: false,
        mensaje: 'Tarea no encontrada',
      });
      return;
    }

    if (tareaExistente.usuarioId !== usuarioId) {
      res.status(403).json({
        exito: false,
        mensaje: 'No tienes permiso para editar esta tarea',
      });
      return;
    }

    // Actualizar la tarea
    const tareaActualizada = await prisma.tarea.update({
      where: { id: tareaId },
      data: datosValidados,
      include: {
        comentarios: {
          include: {
            usuario: {
              select: {
                id: true,
                nombre: true,
                email: true,
              },
            },
          },
        },
      },
    });

    res.json({
      exito: true,
      mensaje: 'Tarea actualizada exitosamente',
      datos: tareaActualizada,
    });
  } catch (error: any) {
    // Manejo de errores de validación Zod
    if (error.name === 'ZodError') {
      res.status(400).json({
        exito: false,
        mensaje: 'Datos de actualización inválidos',
        errores: error.errors.map((err: any) => ({
          campo: err.path.join('.'),
          mensaje: err.message,
        })),
      });
      return;
    }

    console.error('Error en actualizarTarea:', error);
    res.status(500).json({
      exito: false,
      mensaje: 'Error del servidor al actualizar tarea',
    });
  }
};

/**
 * DELETE /api/tasks/:id
 * Elimina una tarea (solo el creador puede eliminar)
 */
export const eliminarTarea = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const tareaId = parseInt(id);
    const usuarioId = req.usuario!.id;

    // Validar que el ID sea un número
    if (isNaN(tareaId)) {
      res.status(400).json({
        exito: false,
        mensaje: 'ID de tarea inválido',
      });
      return;
    }

    // Verificar que la tarea existe y pertenece al usuario
    const tareaExistente = await prisma.tarea.findUnique({
      where: { id: tareaId },
    });

    if (!tareaExistente) {
      res.status(404).json({
        exito: false,
        mensaje: 'Tarea no encontrada',
      });
      return;
    }

    if (tareaExistente.usuarioId !== usuarioId) {
      res.status(403).json({
        exito: false,
        mensaje: 'No tienes permiso para eliminar esta tarea',
      });
      return;
    }

    // Eliminar la tarea (los comentarios se eliminan en cascada)
    await prisma.tarea.delete({
      where: { id: tareaId },
    });

    res.json({
      exito: true,
      mensaje: 'Tarea eliminada exitosamente',
    });
  } catch (error) {
    console.error('Error en eliminarTarea:', error);
    res.status(500).json({
      exito: false,
      mensaje: 'Error del servidor al eliminar tarea',
    });
  }
};