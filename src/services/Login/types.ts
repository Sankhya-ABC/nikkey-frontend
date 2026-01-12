import { Usuario } from "../Usuario/types";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: Usuario;
  token: string;
  expires_in: number;
}
