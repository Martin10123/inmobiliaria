import type { RefreshTokenResponse, TokenPayload } from '@/types/auth';

const API_BASE_URL = 'https://apigateway_dev.cotecmar.com/api/v1';

/**
 * Decodifica un JWT token sin verificar la firma
 * (la verificación se hace en el servidor)
 */
export const decodeToken = (token: string): TokenPayload | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Obtiene el tiempo restante en milisegundos antes de que expire el token
 */
export const getTokenExpirationTime = (token: string): number | null => {
  const payload = decodeToken(token);
  if (!payload || !payload.exp) return null;
  
  const now = Math.floor(Date.now() / 1000); // tiempo actual en segundos
  const expiresAt = payload.exp; // tiempo de expiración en segundos
  const timeRemaining = (expiresAt - now) * 1000; // convertir a milisegundos
  
  return timeRemaining > 0 ? timeRemaining : 0;
};

/**
 * Verifica si el token va a expirar en los próximos minutos especificados
 */
export const isTokenExpiringSoon = (token: string, minutesBeforeExpiry: number = 5): boolean => {
  const timeRemaining = getTokenExpirationTime(token);
  if (timeRemaining === null) return true;
  
  const thresholdMs = minutesBeforeExpiry * 60 * 1000;
  return timeRemaining <= thresholdMs;
};

/**
 * Refresca el token de autenticación
 */
export const refreshAuthToken = async (currentToken: string): Promise<RefreshTokenResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentToken}`,
      },
      body: JSON.stringify({ token: currentToken }),
    });

    if (!response.ok) {
      throw new Error(`Error al refrescar token: ${response.status}`);
    }

    const data: RefreshTokenResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error en refreshAuthToken:', error);
    throw error;
  }
};

/**
 * Calcula cuándo debe ejecutarse el próximo refresh (5 minutos antes de expirar)
 */
export const calculateRefreshTimeout = (token: string, minutesBeforeExpiry: number = 5): number => {
  const timeRemaining = getTokenExpirationTime(token);
  if (timeRemaining === null) return 0;
  
  const thresholdMs = minutesBeforeExpiry * 60 * 1000;
  const refreshTime = timeRemaining - thresholdMs;
  
  // Si falta menos del umbral, refrescar inmediatamente
  return refreshTime > 0 ? refreshTime : 0;
};
