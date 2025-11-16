/**
 * Página del Dashboard
 * Pantalla principal con las tareas del usuario
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Tarea,
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
} from '../services/api';
import FormularioTarea from '../components/Tareas/FormularioTarea';
import ListaTareas from '../components/Tareas/ListaTareas';

const DashboardPage: React.FC = () => {
  const { usuario, cerrarSesion } = useAuth();
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [tareaEditar, setTareaEditar] = useState<Tarea | null>(null);
  const [cargando, setCargando] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(true);

  /**
   * Cargar tareas del usuario
   */
  const cargarTareas = async () => {
    setCargando(true);
    try {
      const datos = await obtenerTareas();
      setTareas(datos);
    } catch (err) {
      console.error('Error al cargar tareas:', err);
    } finally {
      setCargando(false);
    }
  };

  // Cargar tareas al montar el componente
  useEffect(() => {
    cargarTareas();
  }, []);

  /**
   * Manejar guardado de tarea (crear o actualizar)
   */
  const manejarGuardarTarea = async (datos: {
    titulo: string;
    descripcion: string;
    estado: 'pendiente' | 'en_progreso' | 'completada';
  }) => {
    if (tareaEditar) {
      // Actualizar tarea existente
      await actualizarTarea(tareaEditar.id, datos);
      setTareaEditar(null);
    } else {
      // Crear nueva tarea
      await crearTarea(datos);
    }
    
    await cargarTareas();
  };

  /**
   * Manejar edición de tarea
   */
  const manejarEditarTarea = (tarea: Tarea) => {
    setTareaEditar(tarea);
    setMostrarFormulario(true);
    // Scroll suave al formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Manejar eliminación de tarea
   */
  const manejarEliminarTarea = async (id: number) => {
    try {
      await eliminarTarea(id);
      await cargarTareas();
    } catch (err) {
      console.error('Error al eliminar tarea:', err);
      alert('Error al eliminar la tarea');
    }
  };

  /**
   * Cancelar edición
   */
  const manejarCancelarEdicion = () => {
    setTareaEditar(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Gestor de Tareas</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">
                Bienvenido, <strong>{usuario?.nombre}</strong>
              </span>
              <button
                onClick={cerrarSesion}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna izquierda - Formulario */}
          <div className="lg:col-span-1">
            <button
              onClick={() => setMostrarFormulario(!mostrarFormulario)}
              className="lg:hidden w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              {mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}
            </button>

            {(mostrarFormulario || window.innerWidth >= 1024) && (
              <FormularioTarea
                tareaEditar={tareaEditar}
                alGuardar={manejarGuardarTarea}
                alCancelar={manejarCancelarEdicion}
              />
            )}
          </div>

          {/* Columna derecha - Lista de tareas */}
          <div className="lg:col-span-2">
            <ListaTareas
              tareas={tareas}
              cargando={cargando}
              alEditar={manejarEditarTarea}
              alEliminar={manejarEliminarTarea}
              alActualizar={cargarTareas}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;