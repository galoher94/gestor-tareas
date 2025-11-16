/**
 * Componente Formulario de Tarea
 * Formulario para crear o editar tareas
 */

import React, { useState, useEffect } from 'react';
import { Tarea } from '../../services/api';

interface FormularioTareaProps {
  tareaEditar?: Tarea | null;
  alGuardar: (datos: {
    titulo: string;
    descripcion: string;
    estado: 'pendiente' | 'en_progreso' | 'completada';
  }) => Promise<void>;
  alCancelar: () => void;
}

const FormularioTarea: React.FC<FormularioTareaProps> = ({
  tareaEditar,
  alGuardar,
  alCancelar,
}) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState<'pendiente' | 'en_progreso' | 'completada'>('pendiente');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  // Cargar datos de la tarea si estamos editando
  useEffect(() => {
    if (tareaEditar) {
      setTitulo(tareaEditar.titulo);
      setDescripcion(tareaEditar.descripcion);
      setEstado(tareaEditar.estado);
    }
  }, [tareaEditar]);

  /**
   * Manejar el envío del formulario
   */
  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      await alGuardar({ titulo, descripcion, estado });
      
      // Limpiar formulario si es creación nueva
      if (!tareaEditar) {
        setTitulo('');
        setDescripcion('');
        setEstado('pendiente');
      }
    } catch (err: any) {
      const mensajeError =
        err.response?.data?.mensaje || 'Error al guardar la tarea';
      setError(mensajeError);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">
        {tareaEditar ? 'Editar Tarea' : 'Nueva Tarea'}
      </h3>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={manejarEnvio}>
        {/* Campo Título */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="titulo">
            Título
          </label>
          <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Título de la tarea"
            required
            minLength={3}
            maxLength={200}
          />
        </div>

        {/* Campo Descripción */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
            Descripción
          </label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
            placeholder="Descripción detallada de la tarea"
            required
            minLength={10}
            maxLength={2000}
          />
        </div>

        {/* Campo Estado */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">
            Estado
          </label>
          <select
            id="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value as any)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pendiente">Pendiente</option>
            <option value="en_progreso">En Progreso</option>
            <option value="completada">Completada</option>
          </select>
        </div>

        {/* Botones */}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={cargando}
            className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cargando ? 'Guardando...' : tareaEditar ? 'Actualizar' : 'Crear Tarea'}
          </button>
          
          {tareaEditar && (
            <button
              type="button"
              onClick={alCancelar}
              className="flex-1 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormularioTarea;