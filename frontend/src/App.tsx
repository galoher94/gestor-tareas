/**
 * Componente Principal de la Aplicación
 * Maneja el enrutamiento y la protección de rutas
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

/**
 * Componente de Ruta Protegida
 * Redirige al login si el usuario no está autenticado
 */
const RutaProtegida: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { estaAutenticado } = useAuth();
  
  if (!estaAutenticado) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

/**
 * Componente de Rutas de la Aplicación
 */
const AppRoutes: React.FC = () => {
  const { estaAutenticado } = useAuth();

  return (
    <Routes>
      {/* Ruta de Login */}
      <Route
        path="/"
        element={estaAutenticado ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />

      {/* Ruta protegida del Dashboard */}
      <Route
        path="/dashboard"
        element={
          <RutaProtegida>
            <DashboardPage />
          </RutaProtegida>
        }
      />

      {/* Ruta 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

/**
 * Componente principal App
 */
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;