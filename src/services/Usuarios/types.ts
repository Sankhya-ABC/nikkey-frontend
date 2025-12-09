import { Role } from "../../types";

export interface Usuario {
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
