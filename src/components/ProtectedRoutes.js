import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => !!state.auth.token);

  useEffect(() => {
    if (!isAuthenticated) {
      // Se não estiver autenticado, limpa o localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
  }, [isAuthenticated]);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
