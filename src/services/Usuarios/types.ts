import { Role } from "../../types";
import { ClienteDTO } from "../Clientes/types";

export interface Usuario {
  id: number | null;
  nome: string;
  email: string;
  departamento: string;
  perfil: Role | null;
  cliente: ClienteDTO;
  telefone: string;
  senha: string;
  confirmarSenha: string;
  ativo: boolean;
  dataCadastro: Date | null | string;
}
