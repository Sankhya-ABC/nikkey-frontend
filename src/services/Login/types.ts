import { Role } from "../../types";

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  cliente_id: number | null;
  cliente: string;
  tipo_usuario_id: number;
  tipo_usuario: Role;
  departamento_id: number;
  departamento: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: UserResponse;
  token: string;
  expires_in: number;
}
