import { useEffect, useRef } from 'react';
import { useAuth } from '@/store/AuthContext';
import {
  refreshAuthToken,
  calculateRefreshTimeout,
  isTokenExpiringSoon,
} from '@/services/authService';

/**
 * Hook personalizado que maneja el refresh automático del token
 * @param minutesBeforeExpiry - Minutos antes de la expiración para refrescar (default: 5)
 */
export const useTokenRefresh = (minutesBeforeExpiry: number = 5) => {
  const { token, updateToken, updateUser, logout } = useAuth();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isRefreshing = useRef(false);

  useEffect(() => {
    // Limpiar timeout anterior si existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Si no hay token, no hacer nada
    if (!token) {
      return;
    }

    // Función para refrescar el token
    const doRefresh = async () => {
      // Evitar múltiples llamadas simultáneas
      if (isRefreshing.current) {
        console.log('Ya hay un refresh en proceso, saltando...');
        return;
      }

      try {
        isRefreshing.current = true;
        console.log('Refrescando token...');

        const response = await refreshAuthToken(token);
        
        // Actualizar el nuevo token y usuario
        updateToken(response.state.token);
        updateUser(response.state.user);
        
        console.log('Token refrescado exitosamente');

        // Programar el siguiente refresh
        scheduleRefresh(response.state.token);
      } catch (error) {
        console.error('Error al refrescar token:', error);
        
        // Si falla el refresh, cerrar sesión
        logout();
      } finally {
        isRefreshing.current = false;
      }
    };

    // Función para programar el próximo refresh
    const scheduleRefresh = (currentToken: string) => {
      const refreshTime = calculateRefreshTimeout(currentToken, minutesBeforeExpiry);
      
      console.log(`Próximo refresh programado en ${Math.round(refreshTime / 1000 / 60)} minutos`);

      timeoutRef.current = setTimeout(() => {
        doRefresh();
      }, refreshTime);
    };

    // Verificar si el token necesita refresh inmediato
    if (isTokenExpiringSoon(token, minutesBeforeExpiry)) {
      console.log('Token próximo a expirar, refrescando inmediatamente...');
      doRefresh();
    } else {
      // Programar el refresh
      scheduleRefresh(token);
    }

    // Cleanup: limpiar el timeout cuando el componente se desmonte o el token cambie
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [token, minutesBeforeExpiry, updateToken, updateUser, logout]);
};
