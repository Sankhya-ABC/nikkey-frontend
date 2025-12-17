import { Role } from "../../types";

export interface Usuario {
  id: number | null;
  nome: string;
  email: string;
  departamento: string;
  perfil: Role | null;
  idCliente: number | null;
  telefone: string;
  senha: string;
  confirmarSenha: string;
  ativo: boolean;
  dataCadastro: Date | null | string;
}
