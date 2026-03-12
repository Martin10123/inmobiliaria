import { useEffect } from 'react';
import { useTokenRefresh } from '@/hooks/useTokenRefresh';
import { useAuth } from '@/store/AuthContext';

/**
 * Componente que maneja el refresh automático del token
 * Debe estar dentro del árbol de componentes envuelto por AuthProvider
 */
export const TokenRefreshManager = () => {
  const { isAuthenticated } = useAuth();
  
  // Este hook se encarga automáticamente de:
  // 1. Verificar cuando el token está por expirar (5 minutos antes)
  // 2. Hacer el refresh automáticamente
  // 3. Actualizar el token en el estado global
  // 4. Programar el siguiente refresh
  useTokenRefresh(5); // 5 minutos antes de expirar

  useEffect(() => {
    if (isAuthenticated) {
      console.log('Sistema de refresh automático de token activado');
    }
  }, [isAuthenticated]);

  // Este componente no renderiza nada visualmente
  return null;
};
