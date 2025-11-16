/**
 * Componente Lista de Comentarios
 * Muestra todos los comentarios de una tarea
 */

import React, { useState, useEffect } from 'react';
import { Comentario, obtenerComentarios } from '../../services/api';
import FormularioComentario from './FormularioComentario';

interface ListaComentariosProps {
  tareaId: number;
  alActualizar: () => void;
}

const ListaComentarios: React.FC<ListaComentariosProps> = ({ tareaId, alActualizar }) => {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [cargando, setCargando] = useState(false);

  /**
   * Cargar comentarios de la tarea
   */
  const cargarComentarios = async () => {
    setCargando(true);
    try {
      const datos = await obtenerComentarios(tareaId);
      setComentarios(datos);
    } catch (err) {
      console.error('Error al cargar comentarios:', err);
    } finally {
      setCargando(false);
    }
  };

  // Cargar comentarios al montar el componente
  useEffect(() => {
    cargarComentarios();
  }, [tareaId]);

  /**
   * Manejar la creación de un nuevo comentario
   */
  const manejarNuevoComentario = () => {
    cargarComentarios();
    alActualizar(); // Actualizar la tarea para reflejar el nuevo comentario
  };

  /**
   * Formatear la fecha
   */
  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div>
      <h4 className="text-lg font-bold mb-3 text-gray-800">Comentarios</h4>

      {/* Formulario para nuevo comentario */}
      <FormularioComentario tareaId={tareaId} alCrear={manejarNuevoComentario} />

      {/* Lista de comentarios */}
      {cargando ? (
        <p className="text-gray-500 text-sm">Cargando comentarios...</p>
      ) : comentarios.length === 0 ? (
        <p className="text-gray-500 text-sm">No hay comentarios aún. ¡Sé el primero en comentar!</p>
      ) : (
        <div className="space-y-3">
          {comentarios.map((comentario) => (
            <div key={comentario.id} className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <p className="font-semibold text-sm text-gray-800">
                  {comentario.usuario.nombre}
                </p>
                <p className="text-xs text-gray-500">{formatearFecha(comentario.createdAt)}</p>
              </div>
              <p className="text-gray-700 text-sm whitespace-pre-wrap">{comentario.contenido}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaComentarios;