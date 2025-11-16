/**
 * Página de Login y Registro
 * Pantalla de autenticación de usuarios
 */

import React, { useState } from 'react';
import Login from '../components/Auth/Login';
import Registro from '../components/Auth/Registro';

const LoginPage: React.FC = () => {
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Gestor de Tareas
          </h1>
          <p className="text-blue-100">Moshipp - Prueba Técnica By Gabriel López Hernández</p>
        </div>

        {/* Componente de Login o Registro */}
        {mostrarRegistro ? (
          <Registro alCambiarALogin={() => setMostrarRegistro(false)} />
        ) : (
          <Login alCambiarARegistro={() => setMostrarRegistro(true)} />
        )}
      </div>
    </div>
  );
};

export default LoginPage;