/**
 * Componente de Login
 * Formulario de inicio de sesión
 */

import React, { useState } from 'react';
import { iniciarSesion } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

interface LoginProps {
  alCambiarARegistro: () => void;
}

const Login: React.FC<LoginProps> = ({ alCambiarARegistro }) => {
  const { iniciarSesion: guardarSesion } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  /**
   * Manejar el envío del formulario de login
   */
  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      const respuesta = await iniciarSesion({ email, password });
      
      // Guardar token y datos del usuario
      guardarSesion(respuesta.datos.token, respuesta.datos.usuario);
    } catch (err: any) {
      const mensajeError =
        err.response?.data?.mensaje || 'Error al iniciar sesión. Verifica tus credenciales.';
      setError(mensajeError);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Iniciar Sesión</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={manejarEnvio}>
          {/* Campo Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="tu@email.com"
              required
            />
          </div>

          {/* Campo Contraseña */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Botón Enviar */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>

        {/* Link a registro */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <button
              onClick={alCambiarARegistro}
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;