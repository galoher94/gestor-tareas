/**
 * Componente Formulario de Comentario
 * Formulario para crear nuevos comentarios en tareas
 */

import React, { useState } from 'react';
import { crearComentario } from '../../services/api';

interface FormularioComentarioProps {
  tareaId: number;
  alCrear: () => void;
}

const FormularioComentario: React.FC<FormularioComentarioProps> = ({ tareaId, alCrear }) => {
  const [contenido, setContenido] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  /**
   * Manejar el envío del formulario
   */
  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contenido.trim()) {
      setError('El comentario no puede estar vacío');
      return;
    }

    setError('');
    setCargando(true);

    try {
      await crearComentario(tareaId, contenido);
      setContenido('');
      alCrear(); // Actualizar lista de comentarios
    } catch (err: any) {
      const mensajeError =
        err.response?.data?.mensaje || 'Error al crear el comentario';
      setError(mensajeError);
    } finally {
      setCargando(false);
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="mb-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-2 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-2">
        <textarea
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          placeholder="Escribe un comentario..."
          className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={3}
          maxLength={1000}
        />
        <button
          type="submit"
          disabled={cargando || !contenido.trim()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed h-fit"
        >
          {cargando ? '...' : 'Enviar'}
        </button>
      </div>
    </form>
  );
};

export default FormularioComentario;