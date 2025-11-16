/**
 * Componente Lista de Tareas
 * Muestra todas las tareas del usuario
 */

import React from 'react';
import { Tarea } from '../../services/api';
import TarjetaTarea from './TarjetaTarea';

interface ListaTareasProps {
  tareas: Tarea[];
  cargando: boolean;
  alEditar: (tarea: Tarea) => void;
  alEliminar: (id: number) => void;
  alActualizar: () => void;
}

const ListaTareas: React.FC<ListaTareasProps> = ({
  tareas,
  cargando,
  alEditar,
  alEliminar,
  alActualizar,
}) => {
  if (cargando) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Cargando tareas...</p>
      </div>
    );
  }

  if (tareas.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-8 text-center">
        <p className="text-gray-500 text-lg">
          No tienes tareas creadas. ¡Crea tu primera tarea arriba!
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Mis Tareas ({tareas.length})
      </h2>
      {tareas.map((tarea) => (
        <TarjetaTarea
          key={tarea.id}
          tarea={tarea}
          alEditar={alEditar}
          alEliminar={alEliminar}
          alActualizarTarea={alActualizar}
        />
      ))}
    </div>
  );
};

export default ListaTareas;