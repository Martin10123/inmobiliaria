export interface Role {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  service: string | null;
  pivot: {
    model_type: string;
    model_id: string;
    role_id: string;
  };
  permissions: Permission[];
}

export interface Permission {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  num_sap: string;
  identificacion: string;
  cargo: string;
  direccion: string;
  jefe_inmediato: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  is_first_login: string;
  roles: Role[];
  permissions: Permission[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface TokenPayload {
  iss: string;
  iat: number;
  exp: number;
  nbf: number;
  jti: string;
  sub: string;
  prv: string;
  roles: string[];
  permissions: any[];
}

export interface RefreshTokenResponse {
  state: {
    user: User;
    token: string;
  };
  version: number;
}
