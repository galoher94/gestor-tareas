/**
 * Servicio de API
 * Maneja todas las peticiones HTTP al backend
 */

import axios from 'axios';

// Configuración base de axios
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token JWT a todas las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido o expirado, limpiar storage y recargar
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Tipos de datos
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  estado: 'pendiente' | 'en_progreso' | 'completada';
  createdAt: string;
  updatedAt: string;
  usuarioId: number;
  comentarios: Comentario[];
}

export interface Comentario {
  id: number;
  contenido: string;
  createdAt: string;
  updatedAt: string;
  tareaId: number;
  usuarioId: number;
  usuario: Usuario;
}

// ============ AUTENTICACIÓN ============

/**
 * Registrar un nuevo usuario
 */
export const registrarUsuario = async (datos: {
  nombre: string;
  email: string;
  password: string;
}) => {
  const response = await api.post('/auth/register', datos);
  return response.data;
};

/**
 * Iniciar sesión
 */
export const iniciarSesion = async (datos: { email: string; password: string }) => {
  const response = await api.post('/auth/login', datos);
  return response.data;
};

// ============ TAREAS ============

/**
 * Obtener todas las tareas del usuario
 */
export const obtenerTareas = async (): Promise<Tarea[]> => {
  const response = await api.get('/tasks');
  return response.data.datos;
};

/**
 * Crear una nueva tarea
 */
export const crearTarea = async (datos: {
  titulo: string;
  descripcion: string;
  estado?: 'pendiente' | 'en_progreso' | 'completada';
}): Promise<Tarea> => {
  const response = await api.post('/tasks', datos);
  return response.data.datos;
};

/**
 * Actualizar una tarea existente
 */
export const actualizarTarea = async (
  id: number,
  datos: {
    titulo?: string;
    descripcion?: string;
    estado?: 'pendiente' | 'en_progreso' | 'completada';
  }
): Promise<Tarea> => {
  const response = await api.put(`/tasks/${id}`, datos);
  return response.data.datos;
};

/**
 * Eliminar una tarea
 */
export const eliminarTarea = async (id: number) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

// ============ COMENTARIOS ============

/**
 * Obtener comentarios de una tarea
 */
export const obtenerComentarios = async (tareaId: number): Promise<Comentario[]> => {
  const response = await api.get(`/tasks/${tareaId}/comments`);
  return response.data.datos;
};

/**
 * Crear un comentario en una tarea
 */
export const crearComentario = async (
  tareaId: number,
  contenido: string
): Promise<Comentario> => {
  const response = await api.post(`/tasks/${tareaId}/comments`, { contenido });
  return response.data.datos;
};

export default api;