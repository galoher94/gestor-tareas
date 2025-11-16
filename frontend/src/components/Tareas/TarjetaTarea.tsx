/**
 * Componente Tarjeta de Tarea
 * Muestra una tarjeta individual de tarea con sus comentarios
 */

import React, { useState } from 'react';
import { Tarea } from '../../services/api';
import ListaComentarios from '../Comentarios/ListaComentarios';

interface TarjetaTareaProps {
  tarea: Tarea;
  alEditar: (tarea: Tarea) => void;
  alEliminar: (id: number) => void;
  alActualizarTarea: () => void;
}

const TarjetaTarea: React.FC<TarjetaTareaProps> = ({
  tarea,
  alEditar,
  alEliminar,
  alActualizarTarea,
}) => {
  const [mostrarComentarios, setMostrarComentarios] = useState(false);

  /**
   * Obtener el color del badge según el estado
   */
  const obtenerColorEstado = () => {
    switch (tarea.estado) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'en_progreso':
        return 'bg-blue-100 text-blue-800';
      case 'completada':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
      {/* Header con título y estado */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-800 flex-1">{tarea.titulo}</h3>
        <span
          className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${obtenerColorEstado()}`}
        >
          {tarea.estado.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      {/* Descripción */}
      <p className="text-gray-600 mb-4 whitespace-pre-wrap">{tarea.descripcion}</p>

      {/* Fecha de creación */}
      <p className="text-sm text-gray-500 mb-4">
        Creada: {formatearFecha(tarea.createdAt)}
      </p>

      {/* Botones de acción */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => alEditar(tarea)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded text-sm"
        >
          ✏️ Editar
        </button>
        <button
          onClick={() => {
            if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
              alEliminar(tarea.id);
            }
          }}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-sm"
        >
          🗑️ Eliminar
        </button>
        <button
          onClick={() => setMostrarComentarios(!mostrarComentarios)}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded text-sm ml-auto"
        >
          💬 Comentarios ({tarea.comentarios.length})
        </button>
      </div>

      {/* Sección de comentarios (desplegable) */}
      {mostrarComentarios && (
        <div className="border-t pt-4">
          <ListaComentarios tareaId={tarea.id} alActualizar={alActualizarTarea} />
        </div>
      )}
    </div>
  );
};

export default TarjetaTarea;