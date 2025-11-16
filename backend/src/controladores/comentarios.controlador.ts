/**
 * Controlador de Comentarios
 * Maneja la creación y listado de comentarios en tareas
 */

import { Request, Response } from 'express';
import prisma from '../config/database';
import { esquemaCrearComentario } from '../validaciones/comentarios.validacion';

/**
 * GET /api/tasks/:id/comments
 * Lista todos los comentarios de una tarea específica
 */
export const obtenerComentarios = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const tareaId = parseInt(id);

    // Validar que el ID sea un número
    if (isNaN(tareaId)) {
      res.status(400).json({
        exito: false,
        mensaje: 'ID de tarea inválido',
      });
      return;
    }

    // Verificar que la tarea existe
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

    // Obtener comentarios de la tarea
    const comentarios = await prisma.comentario.findMany({
      where: { tareaId },
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
    });

    res.json({
      exito: true,
      datos: comentarios,
    });
  } catch (error) {
    console.error('Error en obtenerComentarios:', error);
    res.status(500).json({
      exito: false,
      mensaje: 'Error del servidor al obtener comentarios',
    });
  }
};

/**
 * POST /api/tasks/:id/comments
 * Crea un nuevo comentario en una tarea
 */
export const crearComentario = async (req: Request, res: Response): Promise<void> => {
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
    const datosValidados = esquemaCrearComentario.parse(req.body);

    // Verificar que la tarea existe
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

    // Crear el comentario
    const nuevoComentario = await prisma.comentario.create({
      data: {
        contenido: datosValidados.contenido,
        tareaId,
        usuarioId,
      },
      include: {
        usuario: {
          select: {
            id: true,
            nombre: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json({
      exito: true,
      mensaje: 'Comentario creado exitosamente',
      datos: nuevoComentario,
    });
  } catch (error: any) {
    // Manejo de errores de validación Zod
    if (error.name === 'ZodError') {
      res.status(400).json({
        exito: false,
        mensaje: 'Datos de comentario inválidos',
        errores: error.errors.map((err: any) => ({
          campo: err.path.join('.'),
          mensaje: err.message,
        })),
      });
      return;
    }

    console.error('Error en crearComentario:', error);
    res.status(500).json({
      exito: false,
      mensaje: 'Error del servidor al crear comentario',
    });
  }
};