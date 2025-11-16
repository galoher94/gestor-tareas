/**
 * Controlador de Autenticación
 * Maneja el registro y login de usuarios
 */

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';
import { esquemaRegistro, esquemaLogin } from '../validaciones/auth.validacion';

/**
 * POST /api/auth/register
 * Registra un nuevo usuario en el sistema
 */
export const registrarUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validar datos de entrada
    const datosValidados = esquemaRegistro.parse(req.body);

    // Verificar si el email ya existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email: datosValidados.email },
    });

    if (usuarioExistente) {
      res.status(400).json({
        exito: false,
        mensaje: 'El email ya está registrado',
      });
      return;
    }

    // Hashear la contraseña
    const passwordHasheado = await bcrypt.hash(datosValidados.password, 10);

    // Crear el usuario
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre: datosValidados.nombre,
        email: datosValidados.email,
        password: passwordHasheado,
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        createdAt: true,
      },
    });

    res.status(201).json({
      exito: true,
      mensaje: 'Usuario registrado exitosamente',
      datos: nuevoUsuario,
    });
  } catch (error: any) {
    // Manejo de errores de validación Zod
    if (error.name === 'ZodError') {
      res.status(400).json({
        exito: false,
        mensaje: 'Datos de registro inválidos',
        errores: error.errors.map((err: any) => ({
          campo: err.path.join('.'),
          mensaje: err.message,
        })),
      });
      return;
    }

    console.error('Error en registrarUsuario:', error);
    res.status(500).json({
      exito: false,
      mensaje: 'Error del servidor al registrar usuario',
    });
  }
};

/**
 * POST /api/auth/login
 * Autentica un usuario y devuelve un token JWT
 */
export const iniciarSesion = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validar datos de entrada
    const datosValidados = esquemaLogin.parse(req.body);

    // Buscar usuario por email
    const usuario = await prisma.usuario.findUnique({
      where: { email: datosValidados.email },
    });

    if (!usuario) {
      res.status(401).json({
        exito: false,
        mensaje: 'Credenciales inválidas',
      });
      return;
    }

    // Verificar contraseña
    const passwordValido = await bcrypt.compare(datosValidados.password, usuario.password);

    if (!passwordValido) {
      res.status(401).json({
        exito: false,
        mensaje: 'Credenciales inválidas',
      });
      return;
    }

    // Generar token JWT
    const secretoJWT = process.env.JWT_SECRET;
    if (!secretoJWT) {
      throw new Error('JWT_SECRET no configurado');
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
      },
      secretoJWT,
      { expiresIn: '7d' } // Token válido por 7 días
    );

    res.json({
      exito: true,
      mensaje: 'Inicio de sesión exitoso',
      datos: {
        token,
        usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email,
        },
      },
    });
  } catch (error: any) {
    // Manejo de errores de validación Zod
    if (error.name === 'ZodError') {
      res.status(400).json({
        exito: false,
        mensaje: 'Datos de login inválidos',
        errores: error.errors.map((err: any) => ({
          campo: err.path.join('.'),
          mensaje: err.message,
        })),
      });
      return;
    }

    console.error('Error en iniciarSesion:', error);
    res.status(500).json({
      exito: false,
      mensaje: 'Error del servidor al iniciar sesión',
    });
  }
};